import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import "../css/ProductPage.css"
import Button from 'react-bootstrap/Button'
import {ProductsData} from "./storage/ProductsData.js"

export const ProductPage = () => {
    const params = useParams();
    const navigate = useNavigate()
    const productsData = new ProductsData();

    const product = productsData.get().find(p => p.usin === params.usin);

    if (!product) {
        return <div>
            404 Product not found
        </div>
    }

    return <div class='main-container'>
        <img height={320} src={product.images[0]}/>
        <div>
            <div class='vert-container'>
                <div>
                    <b>
                        {product.title}
                    </b>
                </div>
                <div style={{margin: "1.5%"}}>
                    {product.description}
                </div>
                <Button style={{width: "20%", marginBottom: "0.5%"}}variant="outline-dark" size="lg" onClick={() => navigate("/products")}>Back</Button>
                <Button style={{width: "20%", marginBottom: "0.5%"}}variant="outline-dark" size="lg" onClick={() => navigate(`/create_product/${params.usin}`)}>Edit</Button>
            </div>
        </div>
    </div>
}