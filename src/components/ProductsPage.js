import React from 'react';
import sample from "../mock/products-sample.json";
import {ProductsSearch} from "./ProductsSearch";

export const ProductsPage = () => {
    return <div>
        <ProductsSearch/>
        {sample.products.map(product => <div key={product.usin}>
            {product.title}
        </div>)}
    </div>;
}