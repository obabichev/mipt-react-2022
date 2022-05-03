import React, {useCallback} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import "../cssClasses/ProductPage.css"
import Button from 'react-bootstrap/Button'
import {useLoading, getProduct} from '../url/ServerRequest';

export const ProductPage = () => {
    const params = useParams();
    const navigate = useNavigate()

    const getProductData = useCallback(
        () => getProduct(params.usin),
        [params.usin]
    )
    const productResponse = useLoading(getProductData);

    if (productResponse.loading) {
        return <div>
            Loading product...
        </div>
    }

    if (productResponse.error) {
        return <div>
            Error loading product! ({productResponse.error.message})
        </div>;
    }

    if (!productResponse.data) {
        return <div>
            404 Not Found
        </div>
    }
    const product = productResponse.data
    return <div class='main-container'>
        <img height={320} src={product.images[0]} alt=""/>
        <div>
            <div class='product-description-box'>
                <div style={{margin: "1.5%"}}>
                    <b>
                        {product.title}
                    </b>
                </div>
                <div style={{margin: "1.5%"}}>
                    {product.description}
                </div>
                <div style={{alignItems: "left", margin: "1.5%"}}>
                <Button style={{width: "20%", marginBottom: "0.5%", justifyContent: "left"}} variant="outline-dark" size="lg" onClick={() => navigate("/products")}>Back</Button>
                </div>
                <div style={{alignItems: "left", margin: "1.5%", marginTop: "-1.5%"}}>
                <Button style={{width: "20%", marginBottom: "0.5%", justifyContent: "left"}} variant="outline-dark" size="lg" onClick={() => navigate(`/create_product/${params.usin}`)}>Edit</Button>
                </div>
            </div>
        </div>
    </div>
}