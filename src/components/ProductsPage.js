import React from 'react';
import sample from "../mock/products-sample.json";
import {useNavigate, useParams} from "react-router-dom";
import {ProductsSearch} from "./ProductsSearch";
import ListGroup from 'react-bootstrap/ListGroup'

export const ProductsPage = () => {
    const params = useParams();
    const navigate = useNavigate()

    return <div>
        <ProductsSearch/>
        <ListGroup>
            {sample.products.map(product => <ListGroup.Item key={product.usin} onClick={() => navigate(`/product/${product.usin}`)}>
                {product.title}
            </ListGroup.Item>)}
        </ListGroup>
    </div>;
}