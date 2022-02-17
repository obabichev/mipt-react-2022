import React from 'react';
import sample from "../mock/products-sample.json";

export const ProductsPage = () => {
    return <div>
        {sample.products.map(product => <div key={product.usin}>
            {product.title}
        </div>)}
    </div>;
}