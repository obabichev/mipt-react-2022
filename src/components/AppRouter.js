import React, {useState} from 'react';
import {BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {ProductsPage} from "./ProductsPage";
import {ProductPage} from "./ProductPage";
import {Test} from "./Test";
import {LocalStorageTest} from "./LocalStorageTest";
import {UseIntervalTest} from "./UseIntervalTest";
import {Layout, Button} from "antd";
import {ProductsSearch} from "./ProductsSearch";
import {ProductForm} from "./ProductForm";
import {TagTree} from "./TagTree";
const { Header, Sider, Content } = Layout;

const AppRouter = () => {

    const [formVisible, setFormVisible] = useState(false)

    const closeForm = () => {
        setFormVisible(false)
    }


    return <>
        <ProductForm close_form={closeForm} formVisible={formVisible}/>
        <Layout>
            <Header className="header" style={{display: "flex", justifyContent:"space-between"}}>
                <ProductsSearch/>
                <div style={{ height: "inherit"}}>
                    <Button onClick={() => {setFormVisible(true)}}>Create new product</Button>
                </div>
            </Header>
            <Layout>
                <Sider width={180} className="site-layout-background" theme="light">
                    <Button style={{width: "100%"}} onClick={()=>{window.location='/products/all';}}>Home</Button>
                    <TagTree/>
                </Sider>
                <Content  style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/products/:tag" element={<ProductsPage/>}/>
                            <Route path="/product/:usin" element={<ProductPage/>}/>
                            <Route path="/test" element={<Test/>}/>
                            <Route path="/lst" element={<LocalStorageTest/>}/>
                            <Route path="/uit" element={<UseIntervalTest/>}/>
                            <Route exact path="/" element={<Navigate replace to="/products/all" />} />
                        </Routes>
                    </BrowserRouter>
                </Content>
            </Layout>
        </Layout>
    </>;
}

export default AppRouter;
