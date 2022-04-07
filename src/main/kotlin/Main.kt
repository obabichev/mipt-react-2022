import kotlinx.browser.document
import react.*
import react.dom.render
import kotlinx.serialization.Serializable

@Serializable
data class Rating(
    val rate : Int,
    val amount : Int
)

@Serializable
data class SellOption(
    val price : Int,
    val currency : String,
    val type : String
)

@Serializable
data class Product(
    val usin: String,
    val title: String,
    val description: String,
    val attributes: Attributes,
    val images: List<String>,
    val ratings: List<Rating>,
    val sellOptions: List<SellOption>,
    val tag: String
)

@Serializable
data class Attributes(
    val isbn10: String,
    val author: String,
    val publisher: String,
    val paperback: String,
    val isbn13: String,
    val language: String,
    val dimensions: String
)

fun main() {
    val container = document.getElementById("root") ?: error("Couldn't find root container!")
    render(ReactRouterDomApp.create(), container)
}