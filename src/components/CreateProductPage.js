import { ProductForm } from "./ProductForm"
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/UseFetch";
import { createProductPath } from "../apiPaths";

export const CreateProductPage = () => {
    const { fetch } = useFetch({
        url: createProductPath,
        lazy: true,
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post'
    })
    const defaultValues = {
        usin: '',
        title: '',
        description: '',
        images: [' '],
        attributes: {
          'isbn-10': '',
          'isbn-13': '',
          publisher: '',
          language: '',
          paperback: '',
          dimensions: '',
          author: '',
        },
        ratings: [],
        sellOptions: [{price: 0, currency: '', type: ''}],
        tag: ''
    }

    const navigate = useNavigate()

    const handleSubmit = async (values) => {
        const newProduct = {
            ...values,
        }

        const { usin } = await fetch({
            data: newProduct,
        })
        

        navigate(`/products/${usin}`)
    }

    return (
        <ProductForm defaultValues={defaultValues} onSubmit={handleSubmit} />
    )
}
