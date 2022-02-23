import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import sample from "../mock/products-sample.json";

import {ProductCard} from './ProductCard/ProductCard'

export const ProductPage = () => {
    const params = useParams();
    const navigate = useNavigate()

    const product = sample.products.find(p => p.usin === params.usin);

    if (!product) {
        return <div>
            404 Product not found
        </div>
    }

    return <ProductCard product={product}/>
}