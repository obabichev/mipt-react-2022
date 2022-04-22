import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ProductsPage} from "./ProductsPage";
import {ProductPage} from "./ProductPage";
import {FormPage} from "./FormPage";
import sample from "../mock/products-sample.json";
import EditPage from "./EditPage";
import {TestServerApi} from "./TestServerApi";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from 'react-query/devtools'

const queryClient = new QueryClient()

const AppRouter = () => {

    const [products, setProducts] = useState(() =>
        JSON.parse(localStorage.getItem('products') || JSON.stringify(sample.products)))

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
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="/products" element={<ProductsPage products={products}/>}/>
                <Route path="/product/:usin" element={<ProductPage products={products}/>}/>
                <Route path="/products/new" element={<FormPage products={products} addProduct={addProduct}/>}/>
                <Route path="/product/:usin/edit" element={<EditPage products={products} updateProduct={updateProduct}/>}/>
                <Route path="/server" element={<TestServerApi/>}/>
            </Routes>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    </BrowserRouter>
}

export default AppRouter;
