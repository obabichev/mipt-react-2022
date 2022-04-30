import { ProductForm } from "./ProductForm"
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/UseFetch";
import { editProductPath, getProductDetailsPath } from "../apiPaths";

export const ChangeProductPage = () => {
    const params = useParams();
    const navigate = useNavigate()

    const { fetch }= useFetch({
        url: editProductPath,
        method: 'put',
        lazy: true,
    })
    
    const { responseData: product }= useFetch({
        url: getProductDetailsPath(params.usin),
    })

    const handleSubmit = async (values) => {
        const { usin } = await fetch({
            data: values
        })
        navigate(`/products/${usin}`)
    }

    if (!product) {
        return null
    }
 
    return (
        <ProductForm defaultValues={product} onSubmit={handleSubmit} />
    )
}
