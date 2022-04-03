import csstype.Display
import csstype.Position
import csstype.px
import org.w3c.dom.HTMLInputElement
import react.FC
import react.css.css
import react.dom.html.ReactHTML
import react.dom.html.ReactHTML.div
import react.router.useLocation
import react.useState
import kotlin.math.floor

val ProductAdditing = FC<ProductProps> { _ ->

    var (title, setTitle) = useState<String>("")
    var (usin, setUsin) = useState<String>("")
    var (description, setDescription) = useState<String>("")
    var (author, setAuthor) = useState<String>("")
    var (isbn10, setIsbn10) = useState<String>("")
    var (isb13, setIsbn13) = useState<String>("")
    var (language, setLanguage) = useState<String>("")
    var (dementions, setDementions) = useState<String>("")
    var (imageUrl, setImageurl) = useState<String>("")
    var (tag, setTag) = useState<String>("")
    var (publisher, setPublisher) = useState<String>("")
    var (paperback, setPaperback) = useState<String>("")
    var (audiobookPrice, setAudiobookPrice) = useState<Int>(0)
    var (paperbackPrice, setPaperbackPrice) = useState<Int>(0)
    var (currency, setCurrency) = useState<String>("")

    ReactHTML.h1 {
        +"Добавление нового продукта"
    }
    ReactHTML.h2 {
        +"Пожалуйста, заполните форму"
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
            placeholder = "Book usin"
            onChange = { event ->
                val target = event.target as HTMLInputElement
                setUsin(target.value)
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
            productList.add(Product(usin,
                title,
                description,
                Attributes(isbn10, author, publisher,
                    paperback, isb13, language, dementions), listOf(imageUrl),
                listOf(Rating(0, 0), Rating(0, 0), Rating(0, 0),
                    Rating(0, 0), Rating(0, 0)), listOf(SellOption(audiobookPrice, currency, "Audiobook"),
                    SellOption(paperbackPrice, currency, "Paperback")), tag
            ))
            console.log("Product was added")
        }
        +"Add"
    }
//    productList.add(Product(usin,
//        title,
//        description,
//        Attributes(isbn10, author, publisher,
//            paperback, isb13, language, dementions), listOf(imageUrl),
//        listOf(Rating(0, 0), Rating(0, 0), Rating(0, 0),
//            Rating(0, 0), Rating(0, 0)), listOf(SellOption(audiobookPrice.toInt(), currency, "Audiobook"),
//            SellOption(paperbackPrice.toInt(), currency, "Paperback")), tag
//    ))
}