import { ProductForm } from "./ProductForm"
import { v4 as uuidv4 } from 'uuid';
import { useProducts } from "../hooks/UseProducts";
import { useNavigate } from "react-router-dom";

export const CreateProductPage = () => {
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

    const { add } = useProducts()

    const handleSubmit = (values) => {
        const uuid = uuidv4()
        const newProduct = {
            ...values,
            usin: uuid,
        }
        add(newProduct)

        navigate(`/products/${uuid}`)
    }

    return (
        <ProductForm defaultValues={defaultValues} onSubmit={handleSubmit} />
    )
}
