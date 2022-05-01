import React, {useEffect, useState} from 'react';
import {ProductShortCard} from "./ProductShortCard";
import {Alert, Space, Spin} from "antd";
import {emptyProduct} from "../utils";
import { StarOutlined } from '@ant-design/icons';
import {DataModel} from "./DataModel.tsx";
import {useParams} from "react-router-dom";


export const ProductsPage = () => {
    const params = useParams();
    console.log(params)
    const [dataLoaded, setDataLoaded] = useState(false)
    const [productList, setProductList] = useState([emptyProduct])
    const searchTag = params.tag === "all" ? '' : params.tag;
    useEffect(() =>{
        DataModel.getProductList(searchTag, 'design')
            .then(products => {
                setProductList(products);
                setDataLoaded(true);
            })
            .catch(err => console.error(err))
    }, [searchTag])

    return <>
        {dataLoaded === true
            ? <Space direction="vertical">
                {searchTag === '' && <Alert icon={<StarOutlined />} message="Here are books, popular among users in the last month. If you are looking for something special, use search bar." type="info" showIcon />}
                {productList.map(product => <ProductShortCard product={product}/>)}
            </Space>
            : <Space style={{width: "100%"}} direction="vertical" align="center"> <Spin size="large" tip="Loading..." /> </Space>}
    </>
}