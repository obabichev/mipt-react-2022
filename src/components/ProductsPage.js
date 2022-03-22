import React from 'react';
import {ProductShortCard} from "./ProductShortCard";
import {Space} from "antd";
import sample from "../mock/products-sample.json";


export const ProductsPage = () => {

    return <Space direction="vertical">
            {sample.products.map(product => <ProductShortCard product={product}/>)}
        </Space>
}