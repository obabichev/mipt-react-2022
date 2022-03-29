import React from 'react';
import {useParams} from "react-router-dom";
import {Col, Descriptions, Image, Rate, Row, Tag, Typography} from "antd";
import {countProductMetrics, useLocalStorage} from "../utils";

const {Title, Text, Paragraph} = Typography;

export const ProductPage = () => {
    document.title = "Продукт";

    const [products, setProducts] = useLocalStorage();

    const params = useParams();

    const product = products.find(p => p.usin === params.usin);

    if (!product) {
        return <div>
            404 Product not found
        </div>
    }

    const [count, sum] = countProductMetrics(product);

    return <div>
        <Row>
            <Col span={4}>
                <Image.PreviewGroup>
                    {product.images && product.images.map((img => <Image src={img}/>))}
                </Image.PreviewGroup>
            </Col>
            <Col span={19} offset={1}>
                <Title level={2}>
                    {product.title}
                </Title>
                <Paragraph>
                    <Text>Автор: {product.attributes.author}</Text>
                </Paragraph>
                <Paragraph>
                    <Text>Тег: </Text>
                    <Tag>
                        {product.tag}
                    </Tag>
                </Paragraph>
                <Rate allowHalf disabled={true} value={sum / count}/>
                <span className="ant-rate-text">{count}</span>

                <Paragraph>
                    <Title level={4}>Описание</Title>
                    <Text>{product.description}</Text>
                </Paragraph>

                <Descriptions bordered>
                    <Descriptions.Item label="Число страниц">{product.attributes.paperback}</Descriptions.Item>
                    <Descriptions.Item label="Язык">{product.attributes.language}</Descriptions.Item>
                    <Descriptions.Item label="Издатель">{product.attributes.publisher}</Descriptions.Item>
                    <Descriptions.Item label="Размеры">{product.attributes.dimensions}</Descriptions.Item>
                    <Descriptions.Item label="ISBN-13">{product.attributes["isbn-13"]}</Descriptions.Item>
                </Descriptions>
            </Col>
        </Row>
    </div>
}