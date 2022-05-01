import react.*
import react.dom.html.ReactHTML.h1
import react.dom.html.ReactHTML.h3
import react.dom.html.ReactHTML.div
import react.dom.html.ReactHTML.h2

val Index = FC<Props> {
    h1 {
        +"Это тестовое приложение на React"
    }
    div {
        h2 {
            +"Вы можете использовать следующие методы:"
        }
        h3 {
            +"/list -- список товаров"
        }
        h3 {
            +"/addProduct -- добавить продукт"
        }
        h3 {
            +"editProduct/{id} -- редактировать продукт"
        }
    }
}