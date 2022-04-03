import { useContext } from "react"
import { ProductsContext } from "../contexts"

export const useProducts = () => {
    const [products, setProducts] = useContext(ProductsContext)

    const add = (product) => {
        setProducts((products) => {
            const newProducts = [...products, product]
            localStorage.setItem('products', JSON.stringify(newProducts))

            return newProducts
        })
    }

    const remove = (usin) => {
        setProducts((products) => {
            const newProducts = products.filter((product) => product.usin !== usin)
            localStorage.setItem('products', JSON.stringify(newProducts))

            return newProducts
        })
    }

    const edit = (editedProduct) => {
        setProducts((products) => {
            const newProducts = [...products]
            const productToEditIndex = newProducts.findIndex(product => product.usin === editedProduct.usin)
            if (productToEditIndex === -1) {
                throw new Error('Product with provided usin not found')
            }

            newProducts[productToEditIndex] = editedProduct
            
            localStorage.setItem('products', JSON.stringify(newProducts))

            return newProducts
        })
    }

    const get = (usin) => {
        const product = products.find(product => product.usin === usin)
        if (!product) {
            throw new Error('Product with provided usin not found')
        }

        return { ...product }
    }

    return {add,remove,edit,get,products}
}