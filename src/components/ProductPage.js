import React from 'react';
import {useParams} from "react-router-dom";

import {ProductCard} from './ProductCard/ProductCard'
import {ProductList} from 'utils/product-list'


import {ProductCard} from './ProductCard/ProductCard'

export const ProductPage = () => {
    let productList = new ProductList();
    const params = useParams();

    const product = productList.get().find(p => p.usin === params.usin);

    if (!product) {
        return <div>
            404 Product not found
        </div>
    }

    return <ProductCard product={product}/>
}