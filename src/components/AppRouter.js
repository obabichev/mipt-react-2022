import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ProductsPage} from "./ProductsPage";
import {ProductPage} from "./ProductPage";
import {Test} from "./Test";
import { CreateProductPage } from './CreateProductPage';
import { ChangeProductPage } from './ChangeProductPage';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/products" element={<ProductsPage/>}/>
                <Route path="/products/new" element={<CreateProductPage/>}/>
                <Route path="/products/:usin" element={<ProductPage/>}/>
                <Route path="/products/:usin/edit" element={<ChangeProductPage/>}/>
                <Route path="/test" element={<Test/>}/>
            </Routes>
        </BrowserRouter>
    )
}
