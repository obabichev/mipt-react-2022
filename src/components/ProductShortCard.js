import React from 'react';
import { Space, Card, Image, Typography } from "antd";
import { Link } from 'react-router-dom';
const { Title, Text } = Typography;

export const ProductShortCard = ({product}) => {
    return <Space key={product.usin}>
        <Image
            height={265}
            width={200}
            src={product.images[0]}
        />
        <Card title={<Link to={'/product/'+product.usin}><Title ellipsis={true} level={3}>{product.title}</Title></Link>} style={{ height: 265, width: " calc(90vw - 300px)" }}
              bodyStyle={{ paddingTop: 16, paddingBottom: 16, display: 'flex', flexDirection: 'column', alignContent:'space-between'}}>
            <Text mark>by {product.attributes.author}</Text>
            <Space>
                {product.sellOptions && product.sellOptions.map(option => <Card headStyle={{ height: 40}} title={option.type}>{option.price}
                    {option.currency === "EUR" ? '€' : option.currency}</Card>)}
            </Space>
        </Card>
    </Space>;
}