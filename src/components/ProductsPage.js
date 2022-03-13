import React from 'react';
import sample from "../mock/products-sample.json";
import {Breadcrumb, Button, Card, Col, Layout, Menu, Rate, Row} from "antd";
import {SearchOutlined, UserOutlined} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import {useNavigate} from "react-router-dom";

export const sumRating = rating => {
    let sumAmount = 0
    let sumRating = 0
    for (let i = 0; i < rating.length; i++) {
        sumAmount += rating[i].amount;
        sumRating += rating[i].amount * rating[i].rate;
    }
    if (sumRating !== 0) {
        sumRating = Math.round(sumRating/sumAmount * 2) / 2 ;
    }
    return [sumAmount, sumRating]
}

export const ProductsPage = () => {
    const { SubMenu } = Menu;
    const { Header, Content, Sider } = Layout;
    const { Meta } = Card;
    const navigate = useNavigate()

    return <Layout>
        {(
            <Header className="header">
                <div className="logo"/>
                <img
                    width="100"
                    src="https://logos.textgiraffe.com/logos/logo-name/Clay-designstyle-jungle-m.png"
                />
                <span style={{padding: 70}}>
                <Button icon={<SearchOutlined/>} float="left">Search</Button>
            </span>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">nav 1</Menu.Item>
                </Menu>
            </Header>
        )}
        <Layout>
            {(
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{height: '100%', borderRight: 0}}
                    >
                        <SubMenu key="sub1" icon={<UserOutlined/>} title="Account">
                            <Menu.Item key="1">Sign in</Menu.Item>
                            <Menu.Item key="2">Log in</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
            )}
            <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                >
                    {(
                        <div className="site-card-wrapper">
                            <Title level={2}>Catalogue</Title>
                            <Row gutter={16}>
                                {sample.products.map(product =>
                                    <Col key={product.usin} span={8} style={{padding: 20}}>
                                        <Card
                                            hoverable
                                            style={{width: 240}}
                                            onClick={() => {
                                                navigate(`/product/${product.usin}`);
                                            }}
                                            cover={<img width="100" height="350" alt="example"
                                                        src={product.images[0]}/>}
                                        >
                                            <Meta title={product.title}
                                                  description={"by " + product.attributes.author}/>
                                            <Rate disabled allowHalf defaultValue={sumRating(product.ratings)[1]}/>
                                            <span
                                                className="ant-rate-text">{"(" + sumRating(product.ratings)[0] + ")"}</span>
                                        </Card>
                                    </Col>)}
                            </Row>
                        </div>
                    )}
                </Content>
            </Layout>
        </Layout>
    </Layout>
}