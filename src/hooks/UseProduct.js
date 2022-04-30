import axios from 'axios'
import { useState } from 'react'
import { createProductPath, editProductPath, getFindProductPath, getProductDetailsPath } from "../apiPaths"

export const useProducts = () => {
    const [products, setProducts] = useState()

    const add = async (product) => {
        const response = await axios.post(createProductPath, product)
    
        const newProduct = {...response, product}
        if (!products) {
            setProducts(products => [...products, newProduct])
        }
        return newProduct
    }
    
    const remove = async (usin) => {
        const response = await axios.delete(getProductDetailsPath, usin)

        if (products) {
            setProducts((products) => {
                const newProducts = products.filter((product) => product.usin !== usin)
    
                return newProducts
            })
        }
    
        return response
    }
    
    const edit = async (editedProduct) => {
        const response = await axios.put(editProductPath, editedProduct)

        if (products) {
            setProducts((products) => {
                const newProducts = products.filter((product) => product.usin !== editedProduct.usin)
    
                return newProducts
            })
        }
    
        return response
    }
    
    const get = async (usin) => {
        const product = products.find(product => product.usin === usin)

        if (product) {
            return product
        }

        const response = axios.get(getProductDetailsPath(usin))
    
        return response
    }
    
    const getAll = async (text, tag, product) => {
        const { data } = await axios.get(getFindProductPath(tag, text))

        setProducts(data)
        
        return data
    }


    return { get, getAll, edit, add, remove, products }
}