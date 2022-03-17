import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import sample from "../mock/products-sample.json";

export const ProductPage = () => {
    const params = useParams();
    const navigate = useNavigate()

    const product = useMemo(() => sample.products.find(p => p.usin === params.usin) || null, [params])

    if (product === null) {
        return <div>
            404 Product not found
        </div>
    }

    if (typeof product === 'undefined') {
        return <div>
            loading
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
        </div>
    )
}