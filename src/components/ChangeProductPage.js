import { ProductForm } from "./ProductForm"
import { useProducts } from "../hooks/UseProducts";
import { useNavigate, useParams } from "react-router-dom";
import { useMemo } from "react";

export const ChangeProductPage = () => {
    const params = useParams();
    const navigate = useNavigate()

    const { edit, get } = useProducts()

    const product = useMemo(
        () => {
            return get(params.usin) || null
        }, 
        [params]
    )

    const handleSubmit = (values) => {
        console.log(values)
        edit(values)

        navigate(`/products/${values.usin}`)
    }

    if (product === null) {
        return <div>
            404 Product not found
        </div>
    }
 
    return (
        <ProductForm defaultValues={product} onSubmit={handleSubmit} />
    )
}
