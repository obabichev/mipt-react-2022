import csstype.Position
import csstype.px
import org.w3c.dom.HTMLInputElement
import react.FC
import react.css.css
import react.dom.html.ReactHTML
import react.router.useLocation
import react.useState

val ProductEditing = FC<ProductProps> { _ ->
    var product = useLocation().pathname
    product = product.subSequence(18, product.length).toString()

    var data = productList.filter { it.usin == product }[0]

    var (_title, _setTitle) = useState<String>("")
    var (author, setAuthor) = useState<String>("")
    var (isbn10, setIsbn10) = useState<String>("")
    var (isb13, setIsbn13) = useState<String>("")
    var (language, setLanguage) = useState<String>("")
    var (dementions, setDementions) = useState<String>("")
    var (imageUrl, setImageurl) = useState<String>("")
    var (publisher, setPublisher) = useState<String>("")
    var (paperback, setPaperback) = useState<String>("")
    var (audiobookPrice, setAudiobookPrice) = useState<Int>(0)
    var (paperbackPrice, setPaperbackPrice) = useState<Int>(0)


    ReactHTML.div {
        css {
            position = Position.absolute
            top = 10.px
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
            productList.remove(data)
            productList.add(Product(data.usin,
                _title,
                data.description,
                Attributes(isbn10, author, publisher,
                    paperback, isb13, language, dementions), listOf(imageUrl),
                data.ratings, listOf(SellOption(audiobookPrice, "EUR", "Audiobook"),
                    SellOption(paperbackPrice, "EUR", "Paperback")), data.tag
            ))
            console.log(productList.size)
            console.log("Product was edited")
        }
        +"Edit"
    }
}