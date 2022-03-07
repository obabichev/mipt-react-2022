import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import sample from "../mock/products-sample.json";
import "../css/ProductPage.css"
import Button from 'react-bootstrap/Button'

export const ProductPage = () => {
    const params = useParams();
    const navigate = useNavigate()

    const product = sample.products.find(p => p.usin === params.usin);

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
            </div>
        </div>
    </div>
}