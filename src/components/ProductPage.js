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
        <div>
            {product.description}
        </div>
        <img height={200} src={product.images[0]}/>
        <button onClick={() => navigate("/products")}>Back</button>
    </div>
}