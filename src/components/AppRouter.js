import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ProductsPage} from "./ProductsPage";
import {ProductPage} from "./ProductPage";
import {ProductEdit} from "./ProductEdit";
import {TestServerApi} from "./TestServerApi";

const AppRouter = () => {
    return <BrowserRouter basename="/">
        <Routes>
            <Route path="/products" element={<ProductsPage/>}/>
            <Route path="/products/:tag" element={<ProductsPage/>}/>
            <Route path="/product/:usin" element={<ProductPage/>}/>
            <Route path="/edit" element={<ProductEdit/>}/>
            <Route path="/edit/:usin" element={<ProductEdit/>}/>
            <Route path="*" element={<ProductsPage/>}/>
            <Route path="/test-server-api" element={<TestServerApi/>}/>
        </Routes>
    </BrowserRouter>
}

export default AppRouter;
