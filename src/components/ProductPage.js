import React, { useMemo } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from '../hooks/UseProducts';

export const ProductPage = () => {
    const params = useParams();
    const navigate = useNavigate()

    const { get } = useProducts()

    const product = useMemo(
        () => {
            return get(params.usin) || null
        }, 
        [params]
    )

    if (product === null) {
        return <div>
            404 Product not found
        </div>
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