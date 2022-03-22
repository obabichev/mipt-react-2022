import React from 'react';
import {BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {ProductsPage} from "./ProductsPage";
import {ProductPage} from "./ProductPage";
import {Test} from "./Test";
import {LocalStorageTest} from "./LocalStorageTest";
import {UseIntervalTest} from "./UseIntervalTest";
import {Layout, Tree} from "antd";
import {ProductsSearch} from "./ProductsSearch";
const { Header, Sider, Content } = Layout;

const AppRouter = () => {
    const treeData = [
        {
            title: 'future tag tree',
            key: '0-0',
            children: [],
        },
    ];

    return <>
        <Layout>
            <Header className="header">
                <ProductsSearch/>
            </Header>
            <Layout>
                <Sider width={180} className="site-layout-background" theme="light">
                    <Tree
                        style={{ height: '100%', borderRight: 0 }}
                        defaultExpandAll={true}
                        treeData={treeData}
                    />
                </Sider>
                <Content  style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/products" element={<ProductsPage/>}/>
                            <Route path="/product/:usin" element={<ProductPage/>}/>
                            <Route path="/test" element={<Test/>}/>
                            <Route path="/lst" element={<LocalStorageTest/>}/>
                            <Route path="/uit" element={<UseIntervalTest/>}/>
                            <Route exact path="/" element={<Navigate replace to="/products" />} />
                        </Routes>
                    </BrowserRouter>
                </Content>
            </Layout>
        </Layout>
    </>;
}

export default AppRouter;
