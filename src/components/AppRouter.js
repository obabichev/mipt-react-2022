import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ProductsPage} from "./ProductsPage";
import {ProductPage} from "./ProductPage";
import {FormPage} from "./FormPage";
import sample from "../mock/products-sample.json";
import EditPage from "./EditPage";

const AppRouter = () => {

    const [products, setProducts] = useState(() =>
        JSON.parse(localStorage.getItem('products') || sample.products))

    const addProduct = newProduct => {
        const updatedProducts = [...products, newProduct];
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        setProducts(updatedProducts)
    }

    const updateProduct = (usin, patch) => {
        const updatedProducts = products.map(p => p.usin === usin ? patch : p)
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        setProducts(updatedProducts)
    }

    return <BrowserRouter>
        <Routes>
            <Route path="/products" element={<ProductsPage products={products}/>}/>
            <Route path="/product/:usin" element={<ProductPage products={products}/>}/>
            <Route path="/products/new" element={<FormPage products={products} addProduct={addProduct}/>}/>
            <Route path="/product/:usin/edit" element={<EditPage products={products} updateProduct={updateProduct}/>}/>
        </Routes>
    </BrowserRouter>
}

export default AppRouter;
