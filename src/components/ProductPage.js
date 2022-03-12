import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import sample from "../mock/products-sample.json";

import {PageHeader, Tabs, Button, Statistic, Descriptions, Rate, Col, Row, Breadcrumb} from 'antd';
import {sumRating} from "./ProductsPage";
import tagSample from "../mock/tags-sample.json";

const { TabPane } = Tabs;

const TagTree = tag => {
    let tKey = tagSample.find(t => t.key === tag);

    let tags = []
    tags[0] = tKey.title
    let i = 0
    while (true) {
        tKey = tagSample.find(t => t.key === tKey.parent)
        if(!tKey) {
            break;
        }
        i += 1
        tags[i] = tKey.title
        if(tKey.parent === null) {
            break;
        }
    }
    let routes = []
    routes[0] = {
        path: 'index',
        breadcrumbName: 'Home'
    }
    for (let j = 1; j < tags.length+1; j++) {
        routes[j] = {
            path: '' + j,
            breadcrumbName: tags[tags.length - j]
        }
    }
    return routes
}

const NotFountPage = (
    <div>
        <h2>404 Product not found</h2>
    </div>
);



export const ProductPage = () => {
    const params = useParams();
    const navigate = useNavigate()

    const product = sample.products.find(p => p.usin === params.usin);

    if (!product) {
        return NotFountPage
    }
    const SellOptions = () => {
        let data = [];
        for (let i = 0; i < product.sellOptions.length; i++) {
            data[i] = <Col span={6} style={{
                width:120
            }}>
                <Statistic

                title={product.sellOptions[i].type + " price"}
                prefix={product.sellOptions[i].currency}
                value={product.sellOptions[i].price}
            />
            </Col>
        }
        return data
    }
    const Attributes = () => {
        let data = [];
        let i = 1
        data[0] = <Descriptions.Item label="title">{product.title}</Descriptions.Item>
        for(let attribute in product.attributes) {
            data[i] = <Descriptions.Item label={attribute}>{product.attributes[attribute]}</Descriptions.Item>
            i += 1
        }
        return <Descriptions size="big" column={3}>
            {data}
        </Descriptions>
    }
    const Rating = () => {
        let data = [];
        const [_sumAmount, _sumRating] = sumRating(product.ratings)
        data[0] = <Col span={6} style={{
            width:120
        }}> <Statistic

            title="Ratings"
            value={"(" + _sumAmount + ")"}
            prefix={<Rate disabled allowHalf defaultValue={_sumRating}/>}
        />
        </Col>
        for (let i = 0; i < product.ratings.length; i++) {
            data[i+1] = <Col span={6} style={{
                width:120
            }}> <Statistic
                title={product.ratings[i].rate}
                value={"("+product.ratings[i].amount+")"}
                prefix={<Rate disabled allowHalf defaultValue={product.ratings[i].rate}/>}
            />
            </Col>
        }
        return data
    }
    const renderContent = () => (
        <Attributes />
    );
    const extraContent = (

        <div
            style={{
                display: 'flex',
                width: 'max-content',
                justifyContent: 'flex-end',
            }}
        >
            <Row gutter={[16, 16]}>
                <SellOptions />
                <Rating />
            </Row>
        </div>
    );
    const Content = ({ children, extra }) => (
        <div className="content">
            <table width="100%" cellSpacing="0" cellPadding="0">
                <tr>
                    <td className="leftcol">
                        <img
                            align="right"
                            width="200"
                            height="300"
                            style={{box: 100}}
                            src={product.images[0]}
                        /></td>
                    <td valign="top">{children}
                        <hr/>
                        {extra}
                    </td>
                </tr>
            </table>
        </div>
    );
    const routes = TagTree(product.tag)
    return <PageHeader
        className="site-page-header-responsive"
        onBack={() => navigate("/products")}
        title="Product Card"
        subTitle={product.usin}
        breadcrumb = {{ routes }}
        extra={[
            <Button key="1" type="primary">
                Add to cart
            </Button>,
        ]}
        footer={
        <div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Description" key="1" />
            </Tabs>
        {product.description}
        </div>
        }
    >

        <Content extra={extraContent}>{renderContent()}</Content>
    </PageHeader>
}