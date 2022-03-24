import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import sample from "../mock/products-sample.json";

export const ProductPage = () => {
    const params = useParams();
    const navigate = useNavigate()
    const product = sample.products.find(p => p.usin === params.usin);
    if (!product) {
        return <div>
            404 Product not found
        </div>
    }

    return <div>
        <div>
            <b>
                {product.title}
            </b>
        </div>
        <p>
            <img height={200} src={product.images[0]} alt={""} align="top"/>
        </p>
        {product.description}

        <p/>
        <button onClick={() => navigate("/products")}>Back to product page</button>
    </div>
}