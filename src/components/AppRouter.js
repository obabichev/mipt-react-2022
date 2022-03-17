import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ProductsPage} from "./ProductsPage";
import {ProductPage} from "./ProductPage";
import {Test} from "./Test";

const AppRouter = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/products" element={<ProductsPage/>}/>
            <Route path="/product/:usin" element={<ProductPage/>}/>
            <Route path="/test" element={<Test/>}/>
        </Routes>
    </BrowserRouter>
}

export default AppRouter;
