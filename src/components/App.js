import { AppRouter } from "./AppRouter"
import sample from "../mock/products-sample.json";
import { useState } from "react";
import { ProductsContext } from "../contexts";

const App = () => {
    const [products, setProducts] = useState(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products'))
        if (!storedProducts) {
            localStorage.setItem('products', JSON.stringify(sample.products))
            return sample.products
        }

        return storedProducts
    })

    return (
        <ProductsContext.Provider value={[products, setProducts]}>
            <AppRouter />
        </ProductsContext.Provider>
    )
}

export default App