import csstype.Position
import csstype.px
import kotlinx.browser.window
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.await
import kotlinx.coroutines.launch
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.w3c.dom.HTMLInputElement
import org.w3c.fetch.Headers
import org.w3c.fetch.RequestInit
import react.FC
import react.css.css
import react.dom.html.ReactHTML
import react.router.useLocation
import react.useState

suspend fun editData(body : String) : String {
    val headers = Headers()
    headers.append("Content-Type", "application/json")
    val requestParams = RequestInit(method = "PUT", body = body, headers = headers)
    val adding = window.fetch("https://ultimate-ecommerce.v-query.com/api/service-boarding/boarding", requestParams)
        .await()
        .text()
        .await()
    return adding
}

val ProductEditing = FC<ProductProps> { _ ->
    console.log(productList.size)
    var product = useLocation().pathname
    product = product.subSequence(18, product.length).toString()

    var data = productList.filter { it.usin == product }[0]

    var (_title, _setTitle) = useState("")
    var (author, setAuthor) = useState("")
    var (isbn10, setIsbn10) = useState("")
    var (isb13, setIsbn13) = useState("")
    var (language, setLanguage) = useState("")
    var (dementions, setDementions) = useState("")
    var (imageUrl, setImageurl) = useState("")
    var (publisher, setPublisher) = useState("")
    var (paperback, setPaperback) = useState("")
    var (audiobookPrice, setAudiobookPrice) = useState(0)
    var (paperbackPrice, setPaperbackPrice) = useState(0)

    var (h1, seth1) = useState("Редактирование продукта")
    var (h2, seth2) = useState("Пожалуйста, заполните форму")


    ReactHTML.h1 {
        +h1
    }
    ReactHTML.h2 {
        +h2
    }

    ReactHTML.div {
        css {
            position = Position.absolute
            top = 210.px
            left = 250.px
        }
        ReactHTML.img {
            src = "${data.images[0]}"
            width = 400.0
        }
    }
    ReactHTML.div {
        css {
            position = Position.absolute
            top = 200.px
            left = 750.px
        }
        ReactHTML.h2 {
            +"Title: "
            ReactHTML.input {
                placeholder = "${data.title}"
                onChange = { event ->
                    val target = event.target as HTMLInputElement
                    _setTitle(target.value)
                    console.log(productList.size)
                }
            }
        }
        ReactHTML.h2 {
            +"Author: "
            ReactHTML.input {
                placeholder = "${data.attributes.author}"
                onChange = { event ->
                    val target = event.target as HTMLInputElement
                    setAuthor(target.value)
                    console.log(productList.size)
                }
            }
        }
        ReactHTML.h2 {
            +"Language: "
            ReactHTML.input {
                placeholder = "${data.attributes.language}"
                onChange = { event ->
                    val target = event.target as HTMLInputElement
                    setLanguage(target.value)
                    console.log(productList.size)
                }
            }
        }
        ReactHTML.h2 {
            +"Count of pages: "
            ReactHTML.input {
                placeholder = "${data.attributes.paperback}"
                onChange = { event ->
                    val target = event.target as HTMLInputElement
                    setPaperback(target.value)
                    console.log(productList.size)
                }
            }
        }
        ReactHTML.h2 {
            +"ISBN10: "
            ReactHTML.input {
                placeholder = "${data.attributes.isbn10}"
                onChange = { event ->
                    val target = event.target as HTMLInputElement
                    setIsbn10(target.value)
                    console.log(productList.size)
                }
            }
        }
        ReactHTML.h2 {
            +"ISBN13: "
            ReactHTML.input {
                placeholder = "${data.attributes.isbn13}"
                onChange = { event ->
                    val target = event.target as HTMLInputElement
                    setIsbn13(target.value)
                    console.log(productList.size)
                }
            }
        }
        ReactHTML.h3 {
            +"Dementions: "
            ReactHTML.input {
                placeholder = "${data.attributes.dimensions}"
                onChange = { event ->
                    val target = event.target as HTMLInputElement
                    setDementions(target.value)
                    console.log(productList.size)
                }
            }
        }
        ReactHTML.h3 {
            +"Image URL: "
            ReactHTML.input {
                placeholder = "Image URL"
                onChange = { event ->
                    val target = event.target as HTMLInputElement
                    setImageurl(target.value)
                    console.log(productList.size)
                }
            }
        }
        ReactHTML.h3 {
            +"Paperback price: "
            ReactHTML.input {
                placeholder = "EUR"
                onChange = { event ->
                    val target = event.target as HTMLInputElement
                    setPaperbackPrice(target.value.toInt())
                    console.log(productList.size)
                }
            }
        }
        ReactHTML.h3 {
            +"Audiobook price: "
            ReactHTML.input {
                placeholder = "EUR"
                onChange = { event ->
                    val target = event.target as HTMLInputElement
                    setAudiobookPrice(target.value.toInt())
                    console.log(productList.size)
                }
            }
        }
        ReactHTML.h5 {
            +"Publisher: "
            ReactHTML.input {
                placeholder = "${data.attributes.publisher}"
                onChange = { event ->
                    val target = event.target as HTMLInputElement
                    setPublisher(target.value)
                    console.log(productList.size)
                }
            }
        }
    }
    ReactHTML.button {
        css {
            position = Position.absolute
            top = 150.px
            left = 750.px
        }
        onClick = {
            val format = Json { prettyPrint = true }
            val mainScope = MainScope()
            val product = Product(data.usin,
                _title,
                data.description,
                Attributes(isbn10, author, publisher,
                    paperback, isb13, language, dementions), listOf(imageUrl),
                data.ratings, listOf(SellOption(audiobookPrice, "EUR", "Audiobook"),
                    SellOption(paperbackPrice, "EUR", "Paperback")), data.tag
            )
            val requestBody = format.encodeToString(product)
            console.log(requestBody)
            mainScope.launch {
                val response = editData(requestBody)
                if (response.contains("error")) {
                    seth1("Обнаружена ошибка!")
                    seth2("${response}")
                }
            }
            console.log("Product was edited")
        }
        +"Edit"
    }
}