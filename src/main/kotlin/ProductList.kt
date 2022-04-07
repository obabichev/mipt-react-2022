import react.*
import react.dom.html.ReactHTML.li
import react.dom.html.ReactHTML.p
import react.router.dom.Link

external interface ProductListProps : Props {
    var products: List<Product>
    var selectedProduct: Product?
    var onSelectProduct: (Product) -> Unit
}

val ProductList = FC<ProductListProps> { props ->
    for (product in props.products) {
        p {
            key = product.usin
            onClick = {
                props.onSelectProduct(product)
            }
            li {
                +"${product.attributes.author}: ${product.title}  "
                Link {
                    to = "/${product.usin}"
                    +"Read More "
                }
                Link {
                    to = "editProduct/${product.usin}"
                    +" Edit"
                }
            }
        }
    }
}