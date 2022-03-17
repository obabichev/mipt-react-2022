import csstype.*
import react.*
import react.css.css
import react.dom.html.ReactHTML.div
import react.dom.html.ReactHTML.h4
import react.dom.html.ReactHTML.h5
import react.dom.html.ReactHTML.img

external interface ProductPreviewProps : Props {
    var product: Good
}

val ProductPreview = FC<ProductPreviewProps> { props ->
    div {
        css {
            position = Position.absolute
            top = 10.px
            right = 10.px
        }
        h4 {
            +"${props.product.attributes.author}"
        }
        img {
            src = "${props.product.images[0]}"
            width = 300.0
        }
        h5 {
            +"Count of pages: ${props.product.attributes.paperback}"
        }
    }
}