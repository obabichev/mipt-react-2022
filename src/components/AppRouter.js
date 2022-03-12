import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ProductsPage} from "./ProductsPage";
import {ProductPage} from "./ProductPage";
<<<<<<< HEAD
import {ProductEdit} from "./ProductEdit";
=======
import {Test} from "./Test";
>>>>>>> 8393ea4c1d2e0bd3db8540ef069b2e880bd9a960

const AppRouter = () => {
    return <BrowserRouter basename="/">
        <Routes>
            <Route path="/products" element={<ProductsPage/>}/>
            <Route path="/products/:tag" element={<ProductsPage/>}/>
            <Route path="/product/:usin" element={<ProductPage/>}/>
<<<<<<< HEAD
            <Route path="/edit" element={<ProductEdit/>}/>
            <Route path="/edit/:usin" element={<ProductEdit/>}/>
            <Route path="*" element={<ProductsPage/>}/>
=======
            <Route path="/test" element={<Test/>}/>
>>>>>>> 8393ea4c1d2e0bd3db8540ef069b2e880bd9a960
        </Routes>
    </BrowserRouter>
}

export default AppRouter;
