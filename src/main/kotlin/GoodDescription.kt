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

external interface GoodProps : Props {
    var good : Good
}

fun inMemoryData(id : String) : Good {
    var result : Good = Good("", "", "",
        Attributes("", "", "", "", "", "", ""),
        arrayListOf(), arrayListOf(), arrayListOf(), "")
    fetchData().forEach {
        if (it.usin == id) {
            result = it
        }
    }
    return result
}

fun getMarks(good : Good) : Pair<Long, Long> {
    var countOfMarks = 0L
    var amountofMarks = 0L
    good.ratings.forEach {
        countOfMarks += it.amount
        amountofMarks += it.rate * it.amount
    }
    return Pair(amountofMarks, countOfMarks)
}

val GoodDescription = FC<GoodProps> { _ ->
    var good = useLocation().pathname
    good = good.subSequence(1, good.length).toString()
    var data = inMemoryData(good)

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
            +"count: ${getMarks(inMemoryData(good)).second.toDouble()}"
        }
        h3 {
            +"amount: ${getMarks(inMemoryData(good)).first.toDouble()}"
        }
        h3 {
            +"Средняя оценка: ${floor(((getMarks(inMemoryData(good)).first.toDouble() / getMarks(inMemoryData(good)).second.toDouble())) * 10.0) / 10.0}"
        }
        h3 {
            +"Всего оценок: ${getMarks(inMemoryData(good)).first}"
        }
        h5 {
            +"Publisher${data.attributes.publisher}"
        }
    }
}