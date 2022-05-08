import csstype.Display
import kotlinx.browser.window
import kotlinx.coroutines.*
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonContentPolymorphicSerializer
import kotlinx.serialization.json.JsonElement
import org.w3c.dom.HTMLInputElement
import react.*
import react.css.css
import react.dom.html.ReactHTML.button
import react.dom.html.ReactHTML.div
import react.dom.html.ReactHTML.h1
import react.dom.html.ReactHTML.h3
import react.dom.html.ReactHTML.input

object ProductSerializer : JsonContentPolymorphicSerializer<Product>(Product::class) {
    override fun selectDeserializer(element: JsonElement) = run { Product.serializer() }
}

suspend fun fetchData(word : String) : String {
    val data = window
        .fetch("https://ultimate-ecommerce.v-query.com/api/service-product/search?text=${word}")
        .await()
        .text()
        .await()
    return data
}

var productList = arrayListOf<Product>()

val ProductCatalog = FC<ProductProps> { props ->
    val mainScope = MainScope()
    var currentProduct: Product? by useState(null)
    var (list, setList) = useState<List<Product>>(listOf())
    var (word, setWord) = useState<String>("")

    mainScope.launch {
        val data = fetchData(word)
        var mass = arrayListOf<Product>()
        if (data.contains("error")) {
            setWord(data)
        }
        else {
            Json {
                ignoreUnknownKeys = true
                explicitNulls = true
            }
                .decodeFromString(ListSerializer(ProductSerializer), data).forEach {
                    mass.add(it)
                }
            productList = mass
        }
    }

    h1 {
        +"Products list"
    }

    input {
        placeholder = "Type book title here"
        onChange = { event ->
            val target = event.target as HTMLInputElement
            setWord(target.value)
        }
    }
    button {
        css {
            display = Display.block
        }
        onClick = {
            mainScope.async {
                var mass = arrayListOf<Product>()
                Json {
                    ignoreUnknownKeys = true
                    explicitNulls = true
                }
                    .decodeFromString(ListSerializer(ProductSerializer), fetchData(word)).forEach {
                        mass.add(it)
                    }
                setList(mass)
            }
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