import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetailsPath } from '../apiPaths';
import { useFetch } from '../hooks/UseFetch';

export const ProductPage = () => {
    const params = useParams();
    const navigate = useNavigate()

    const { responseData: product } = useFetch({
        url: getProductDetailsPath(params.usin)
    })

    if (!product) {
        return null
    }
 
    return (
        <div>
            <div>
                <b>
                    {product.title}
                </b>
            </div>
            <div>
                {product.description}
            </div>
            <img height={200} src={product.images[0]} alt="cover" />
            <button onClick={() => navigate("/products")}>Back</button>
            <button onClick={() => navigate(`/products/${params.usin}/edit`)}>Change</button>
        </div>
    )
}