import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ProductsPage} from "./ProductsPage";
import {ProductPage} from "./ProductPage";
import {Test} from "./Test";
import {LocalStorageTest} from "./LocalStorageTest";
import {UseIntervalTest} from "./UseIntervalTest";

const AppRouter = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/products" element={<ProductsPage/>}/>
            <Route path="/product/:usin" element={<ProductPage/>}/>
            <Route path="/test" element={<Test/>}/>
            <Route path="/lst" element={<LocalStorageTest/>}/>
            <Route path="/uit" element={<UseIntervalTest/>}/>
        </Routes>
    </BrowserRouter>
}

export default AppRouter;
