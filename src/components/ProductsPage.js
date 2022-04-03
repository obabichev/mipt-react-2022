import React from 'react';
import {ProductShortCard} from "./ProductShortCard";
import {Space} from "antd";
import {useLocalStorage} from "../utils";


export const ProductsPage = () => {

    const [productList, setProductList ]= useLocalStorage()

    return <Space direction="vertical">
            {productList.map(product => <ProductShortCard product={product}/>)}
        </Space>
}