import csstype.Display
import react.*
import kotlinx.coroutines.*
import org.w3c.dom.HTMLInputElement
import react.dom.html.ReactHTML.h1
import react.dom.html.ReactHTML.h3
import react.dom.html.ReactHTML.div
import react.dom.html.ReactHTML.input
import react.css.css
import react.dom.html.ReactHTML.button

//эмуляция запросов в БД (например, в MongoDB)
//была мысль раздать статику с JSON product-sample.json,
//но делать так не стал
fun fetchData(data : ArrayList<Product>): ArrayList<Product>  {
    data.add(Product("f2f5e7ea-edf8-42c2-96bb-d31d81e67092",
        "Designing Data-Intensive Applications: The Big Ideas Behind Reliable, Scalable, and Maintainable Systems",
        "Data is at the center of many challenges in system design today. Difficult issues need to be figured out, such as scalability, consistency, reliability, efficiency, and maintainability. In addition, we have an overwhelming variety of tools, including relational databases, NoSQL datastores, stream or batch processors, and message brokers. What are the right choices for your application? How do you make sense of all these buzzwords?\n\nIn this practical and comprehensive guide, author Martin Kleppmann helps you navigate this diverse landscape by examining the pros and cons of various technologies for processing and storing data. Software keeps changing, but the fundamental principles remain the same. With this book, software engineers and architects will learn how to apply those ideas in practice, and how to make full use of data in modern applications.",
        Attributes("1449373321", "Martin Kleppmann", "O'Reilly UK Ltd.; Revised edition (14 Mar. 2017)",
        "590 pages", "978-1449373320", "English", "17.8 x 3.15 x 23.3 cm"), listOf("https://images-na.ssl-images-amazon.com/images/I/91JAIKQUkYL.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/8104cSQS92L.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/31jaOnaK+uL.jpg"),
        listOf(Rating(5, 1577), Rating(4, 206), Rating(3, 56),
            Rating(2, 18), Rating(1, 27)), listOf(SellOption(0, "EUR", "Audiobook"),
        SellOption(3400, "EUR", "Paperback")), "it-training-and-professions"
    ))
    data.add(Product("0a54bedf-8c7e-41d6-8ef1-31aab08dbb36",
        "Architecture Patterns with Python: Enabling Test-Driven Development, Domain-Driven Design, and Event-Driven Microservices",
        "As Python continues to grow in popularity, projects are becoming larger and more complex. Many Python developers are taking an interest in high-level software design patterns such as hexagonal/clean architecture, event-driven architecture, and the strategic patterns prescribed by domain-driven design (DDD). But translating those patterns into Python isn&;t always straightforward.\n\nWith this hands-on guide, Harry Percival and Bob Gregory from MADE.com introduce proven architectural design patterns to help Python developers manage application complexity&;and get the most value out of their test suites.",
        Attributes("1492052205","Harry Percival, Bob Gregory", "O'Reilly UK Ltd.; Illustrated edition (24 Mar. 2020)",
            "276 pages", "978-1492052203", "English", "17.8 x 3.15 x 23.3 cm"), listOf("https://images-na.ssl-images-amazon.com/images/I/91EC3gsKfYL.jpg",
            "https://images-na.ssl-images-amazon.com/images/I/71AQv-4tV6L.jpg"),
        listOf(Rating(5, 150), Rating(4, 25), Rating(3, 14),
            Rating(2, 4), Rating(1, 6)), listOf(SellOption(1499, "EUR", "Paperback")), "it-training-and-professions"
    ))
    return data
}

var productList = arrayListOf<Product>()

val ProductCatalog = FC<ProductProps> { props ->
    val mainScope = MainScope()
    var currentProduct: Product? by useState(null)
    var (list, setList) = useState<List<Product>>(listOf())
    var (word, setWord) = useState<String>("")

    useEffectOnce {
        mainScope.launch {
            if (productList.isEmpty()) {
                productList = fetchData(productList)
            }
        }
    }

    h1 {
        +"Products list"
    }

    input {
        placeholder = "Type book title here"
        onChange = { event ->
            val target = event.target as HTMLInputElement
            setList(productList.filter { it.title.contains(target.value) })
            setWord(target.value)
            //console.log(target.value)
        }
    }
    button {
        css {
            display = Display.block
        }
        onClick = {
            list
            //console.log(word)
        }
        +"Let's search!"
    }
    div {
        h3 {
            +"${word}"
        }
        ProductList {
            products = list
            selectedProduct = currentProduct
            onSelectProduct = { product ->
                currentProduct = product
            }
        }
    }
    currentProduct?.let { curr ->
        ProductPreview {
            product = curr
        }
    }
}