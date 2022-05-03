import React, {useState, useCallback} from 'react';
import {useNavigate} from "react-router-dom";
import {ProductsSearch} from "./ProductsSearch";
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import {useLoading, getProducts} from '../url/ServerRequest.js';

export const ProductsPage = () => {
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState("")
    const handleTextToParent = (text) => {
        setSearchText(text)
    }

    const getFilteredProducts = useCallback(
        () => getProducts(searchText),
        [searchText]
    )
    const productsResponse = useLoading(getFilteredProducts);
    return <div style={{padding: 10, margin: 10}}>
        <ProductsSearch handleTextToParent={handleTextToParent}/>
        {productsResponse.loading && <div>Loading products...</div>}
        {productsResponse.error && <div>Error loading products! ({productsResponse.error.message})</div>}
        {
            productsResponse.data &&
            <ListGroup style={{color: "blue"}}>
                {productsResponse.data.map(product =>
                    <ListGroup.Item key={product.usin} onClick={() => navigate(`/product/${product.usin}`)}>
                    {product.title}
                </ListGroup.Item>)}
            </ListGroup>
        }
        <Button style={{width: "15%", marginTop: "1%"}} variant="outline-dark" size="med" onClick={() => navigate("/create_product")}>Create product</Button>
    </div>;
}