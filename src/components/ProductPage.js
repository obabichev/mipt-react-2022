import {React, useCallback} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import "../css/ProductPage.css"
import Button from 'react-bootstrap/Button'
import {useLoading, getProduct} from './server/request';

export const ProductPage = () => {
    const params = useParams();
    const navigate = useNavigate()

    const getProductData = useCallback(
        () => getProduct(params.usin),
        [params.usin]
    )
    const productResponse = useLoading(getProductData);
    
    if (productResponse.error) {
        return <div>Error loading product! ({productResponse.error.message})</div>;
    }

    if (productResponse.loading) {
        return <div>Loading product...</div>
    }

    if (!productResponse.data) {
        return <div>
            404 Product not found
        </div>
    }

    const product = productResponse.data
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