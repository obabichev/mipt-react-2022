import react.*
import react.dom.html.ReactHTML.h1
import react.dom.html.ReactHTML.h3
import react.dom.html.ReactHTML.div
import react.dom.html.ReactHTML.h2
import react.dom.html.ReactHTML.p
import react.dom.html.ReactHTML.link

val Index = FC<Props> {
    h1 {
        +"Это тестовое приложение на React"
    }
    div {
        h2 {
            +"Разработал"
        }
        h3 {
            +"Лаврентьев Владимир"
        }
        h3 {
            +"Б-05-812, ФПМИ МФТИ, БИТ"
        }
    }
}