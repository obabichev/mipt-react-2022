import csstype.Display
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
import react.dom.html.ReactHTML.div
import react.useState


suspend fun sendData(body : String) : String {
    val headers = Headers()
    headers.append("Content-Type", "application/json")
    val requestParams = RequestInit(method = "POST", body = body, headers = headers)
    val adding = window.fetch("https://ultimate-ecommerce.v-query.com/api/service-boarding/boardsdfrhing", requestParams)
        .await()
        .text()
        .await()
    console.log(adding)
    return adding
}

val ProductAdditing = FC<ProductProps> { _ ->

    var (title, setTitle) = useState("")
    var (description, setDescription) = useState("")
    var (author, setAuthor) = useState("")
    var (isbn10, setIsbn10) = useState("")
    var (isb13, setIsbn13) = useState("")
    var (language, setLanguage) = useState("")
    var (dementions, setDementions) = useState("")
    var (imageUrl, setImageurl) = useState("")
    var (tag, setTag) = useState("")
    var (publisher, setPublisher) = useState("")
    var (paperback, setPaperback) = useState("")
    var (audiobookPrice, setAudiobookPrice) = useState(0)
    var (paperbackPrice, setPaperbackPrice) = useState(0)
    var (currency, setCurrency) = useState("")

    var (h1, seth1) = useState("Добавление нового продукта")
    var (h2, seth2) = useState("Пожалуйста, заполните форму")


    ReactHTML.h1 {
        +h1
    }
    ReactHTML.h2 {
        +h2
    }
    div {
        ReactHTML.input {
            placeholder = "Book title"
            onChange = { event ->
                val target = event.target as HTMLInputElement
                setTitle(target.value)
            }
        }
    }
    div {
        ReactHTML.input {
            placeholder = "Book description"
            onChange = { event ->
                val target = event.target as HTMLInputElement
                setDescription(target.value)
            }
        }
    }
    div {
        ReactHTML.input {
            placeholder = "Author of book"
            onChange = { event ->
                val target = event.target as HTMLInputElement
                setAuthor(target.value)
            }
        }
    }
    div {
        ReactHTML.input {
            placeholder = "Paperback"
            onChange = { event ->
                val target = event.target as HTMLInputElement
                setPaperback(target.value)
            }
        }
    }
    div {
        ReactHTML.input {
            placeholder = "Publisher of book"
            onChange = { event ->
                val target = event.target as HTMLInputElement
                setPublisher(target.value)
            }
        }
    }
    div {
        ReactHTML.input {
            placeholder = "ISBN10"
            onChange = { event ->
                val target = event.target as HTMLInputElement
                setIsbn10(target.value)
            }
        }
    }
    div {
        ReactHTML.input {
            placeholder = "ISBN13"
            onChange = { event ->
                val target = event.target as HTMLInputElement
                setIsbn13(target.value)
            }
        }
    }
    div {
        ReactHTML.input {
            placeholder = "Language"
            onChange = { event ->
                val target = event.target as HTMLInputElement
                setLanguage(target.value)
            }
        }
    }
    div {
        ReactHTML.input {
            placeholder = "Dementions"
            onChange = { event ->
                val target = event.target as HTMLInputElement
                setDementions(target.value)
            }
        }
    }
    div {
        ReactHTML.input {
            placeholder = "Image URL"
            onChange = { event ->
                val target = event.target as HTMLInputElement
                setImageurl(target.value)
            }
        }
    }
    div {
        ReactHTML.input {
            placeholder = "Tag"
            onChange = { event ->
                val target = event.target as HTMLInputElement
                setTag(target.value)
            }
        }
    }
    div {
        ReactHTML.input {
            placeholder = "Audiobook Price"
            onChange = { event ->
                val target = event.target as HTMLInputElement
                setAudiobookPrice(target.value.toInt())
            }
        }
    }
    div {
        ReactHTML.input {
            placeholder = "Paperback Price"
            onChange = { event ->
                val target = event.target as HTMLInputElement
                setPaperbackPrice(target.value.toInt())
            }
        }
    }
    div {
        ReactHTML.input {
            placeholder = "Currency"
            onChange = { event ->
                val target = event.target as HTMLInputElement
                setCurrency(target.value)
            }
        }
    }
    ReactHTML.button {
        css {
            display = Display.block
        }
        onClick = {
            val format = Json { prettyPrint = true }
            val mainScope = MainScope()
            val product =  Product(null,
                title,
                description,
                Attributes(isbn10, author, publisher,
                    paperback, isb13, language, dementions), listOf(imageUrl),
                listOf(Rating(0, 0), Rating(0, 0), Rating(0, 0),
                    Rating(0, 0), Rating(0, 0)), listOf(SellOption(audiobookPrice, currency, "Audiobook"),
                SellOption(paperbackPrice, currency, "Paperback")), tag
                )
            val requestBody = format.encodeToString(product)
            console.log(requestBody)
            mainScope.launch {
                val response = sendData(requestBody)
                if (response.contains("error")) {
                    seth1("Обнаружена ошибка!")
                    seth2("${response}")
                }
            }
            console.log("Product was added")
        }
        +"Add"
    }

}
