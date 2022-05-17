import React, {useCallback} from 'react';
import {useParams} from "react-router-dom";

import {ProductCard} from './ProductCard/ProductCard'

import {useLoading} from 'utils/loader'
import {getProduct} from 'utils/loader'


export const ProductPage = () => {
    const params = useParams();
    const getCurrentProduct = useCallback(
        () => getProduct(params.usin),
        [params])
    const product = useLoading(getCurrentProduct);
    return <ProductCard product={product}/>
}