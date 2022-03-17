import React from 'react';
import tagSample from "../mock/tags-sample.json";
import {useParams, Link} from "react-router-dom";
import {Result, Button, Space, Image, Card, Typography, Rate, Popover, Progress, Breadcrumb} from 'antd';
import sample from "../mock/products-sample.json";
import Icon, { BarcodeOutlined, IdcardOutlined, CopyOutlined,  BookOutlined, TranslationOutlined, FieldNumberOutlined, FullscreenOutlined } from '@ant-design/icons';
const { Title } = Typography;

export const ProductPage = () => {

    const params = useParams();

    const attributesIcons = {
        "isbn-10": BarcodeOutlined,
        "author": IdcardOutlined,
        "publisher": CopyOutlined,
        "paperback": BookOutlined,
        "language": TranslationOutlined,
        "isbn-13": FieldNumberOutlined,
        "dimensions": FullscreenOutlined
    }

    const product = sample.products.find(p => p.usin === params.usin);


    if (!product) {
        return <Result
            status="404"
            title="404"
            subTitle="Sorry, the product you are trying to find does not exist."
            extra={<Link to={'/products'}><Button type="primary">Back Home</Button></Link>}
        />
    }

    function findTag(tag) {
        return tagSample.find(t => t.key === tag)
    }

    let tags_r = [findTag(product.tag).title];
    let t_parent = findTag(product.tag).parent
    while (t_parent) {
        tags_r.push(findTag(t_parent).title)
        t_parent = findTag(t_parent).parent
    }
    const tags = tags_r.reverse()

    let totalRatings = product.ratings.reduce((a, b) => (
            {
                sum: a.sum + b.rate * b.amount,
                amount: a.amount + b.amount
            }
        ),
        {
            sum: 0,
            amount: 0
        }
    );
    const overallRating = (totalRatings.sum / totalRatings.amount).toFixed(2)

    return  <>
        <Breadcrumb style={{ marginBottom: 15}}>
            {tags.map(tag => <Breadcrumb.Item>{tag}</Breadcrumb.Item>)}
        </Breadcrumb>
        <Space align="start">
                <Image
                    width={300}
                    src={product.images[0]}
                />
            <div style={{ width: "calc(90vw - 500px)"}}>
                <Title ellipsis={{ rows: 2, expandable: true }} level={3}>{product.title}</Title>
            <Card bordered={false} title={
                <Space direction="vertical">
                    {"Author(s): "+product.attributes.author}
                    <Popover content={
                            product.ratings.map(rating =>
                                <div>{rating.rate}<Progress strokeColor={{from:'#ffa500', to:'#ffff00'}} percent={Math.round((rating.amount / totalRatings.amount).toFixed(2)*100)}/></div>
                            )
                    } title={'Rating statistics'}>
                        <div>{overallRating.toString()+' '}<Rate allowHalf disabled defaultValue={ Math.round(overallRating*2)/2}/></div>
                    </Popover>
                </Space>
                }>
                <Space direction="vertical" align="start">
                    <Space>
                        {product.sellOptions.map(option => <Button shape="round" style={{height: 80}}>
                            <Space direction="vertical" align="center">
                                <b>{option.type}</b>
                                <div>{option.price}{option.currency === "EUR" ? '€' : option.currency}</div>
                            </Space>
                            </Button>)}
                    </Space>
                    {product.description}
                    <Space align="start">
                        {Object.entries(product.attributes).map(([key, value]) =>
                            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", alignItems: "center", alignContent: "space-between" }}>
                                <Icon component={attributesIcons[key]}/>
                                <b>{key}</b>
                                {value}
                            </div>)
                        }
                    </Space>
                </Space>
            </Card>
            </div>
        </Space>
    </>
}