import React, {useCallback} from 'react';
import {useParams} from "react-router-dom";

import {ProductCard} from './ProductCard/ProductCard'
import {ProductList} from 'utils/product-list'

import {getProduct} from 'utils/loader'
import {useLoading} from 'utils/loader'


import {ProductCard} from './ProductCard/ProductCard'
import {ProductList} from 'utils/product-list'


export const ProductPage = () => {
    //let productList = new ProductList();
    const params = useParams();

    //const product = productList.get().find(p => p.usin === params.usin);

    const productRequest = useLoading(getProduct(params.usin));

    /*if (!product) {
        return <div>
            404 Product not found
        </div>
    }*/

    return <ProductCard product={productRequest.data}/>
}