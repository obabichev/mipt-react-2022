import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ProductsPage} from "./ProductsPage";
import {ProductPage} from "./ProductPage";
import {FormPage} from "./FormPage";
import sample from "../mock/products-sample.json";
import EditPage from "./EditPage";

const AppRouter = () => {

    if (localStorage.length === 0) {
        sample.products.forEach(p =>
            localStorage.setItem(p.usin, JSON.stringify(p))
        )
    }

    const products = []
    for(let i=0; i<localStorage.length; i++) {
        console.log(JSON.parse(localStorage.getItem(localStorage.key(i))))
        products.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }

    return <BrowserRouter>
        <Routes>
            <Route path="/products" element={<ProductsPage state={[products]}/>}/>
            <Route path="/product/:usin" element={<ProductPage state={[products]}/>}/>
            <Route path="/products/new" element={<FormPage state={[products]}/>}/>
            <Route path="/product/:usin/edit" element={<EditPage state={[products]}/>}/>
        </Routes>
    </BrowserRouter>
}

export default AppRouter;
