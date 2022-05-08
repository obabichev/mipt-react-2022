import csstype.Position
import csstype.px
import react.*
import react.css.css
import react.dom.html.ReactHTML
import react.dom.html.ReactHTML.div
import react.dom.html.ReactHTML.h1
import react.dom.html.ReactHTML.h2
import react.dom.html.ReactHTML.h3
import react.dom.html.ReactHTML.h5
import react.router.useLocation
import kotlin.math.floor

external interface ProductProps : Props {
    var Product : Product
}

fun inMemoryData(id : String) : Product {
    var result : Product = Product("", "", "",
        Attributes("", "", "", "", "", "", ""),
        arrayListOf(), arrayListOf(), arrayListOf(), "")
    productList.forEach {
        if (it.usin == id) {
            result = it
        }
    }
    console.log(result.title)
    return result
}

fun getMarks(Product : Product) : Pair<Long, Long> {
    var countOfMarks = 0L
    var amountofMarks = 0L
    Product.ratings.forEach {
        countOfMarks += it.amount
        amountofMarks += it.rate * it.amount
    }
    return Pair(amountofMarks, countOfMarks)
}

val ProductDescription = FC<ProductProps> { _ ->
    console.log(productList.size)
    var Product = useLocation().pathname
    Product = Product.subSequence(1, Product.length).toString()
    var data = inMemoryData(Product)

    div {
        css {
            position = Position.absolute
            top = 10.px
            left = 250.px
        }
        h1 {
            +"${data.title}"
        }
        ReactHTML.img {
            src = "${data.images[0]}"
            width = 400.0
        }
    }
    div {
        css {
            position = Position.absolute
            top = 200.px
            left = 750.px
        }
        h2 {
            +"Author: ${data.attributes.author}"
        }
        h2 {
            +"Language: ${data.attributes.language}"
        }
        h2 {
            +"Count of pages: ${data.attributes.paperback}"
        }
        data.sellOptions.forEach {
            h3 {
                +"${it.type} PRICE: ${it.price} ${it.currency}"
            }
        }
        h3 {
            +"Count: ${getMarks(inMemoryData(Product)).second.toDouble()}"
        }
        h3 {
            +"Amount: ${getMarks(inMemoryData(Product)).first.toDouble()}"
        }
        h3 {
            +"Средняя оценка: ${floor(((getMarks(inMemoryData(Product)).first.toDouble() / getMarks(inMemoryData(Product)).second.toDouble())) * 10.0) / 10.0}"
        }
        h3 {
            +"Всего оценок: ${getMarks(inMemoryData(Product)).first}"
        }
        h5 {
            +"Publisher${data.attributes.publisher}"
        }
    }
}