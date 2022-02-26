import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useNavigate, useParams} from "react-router-dom";

import {ProductsList} from './ProductsList/ProductsList'
import { ProductTags } from "components/Common/ProductTags/ProductTags";


export const ProductsPage = () => {
    const params = useParams();
    let tag = params.tag;
    return <Row>
            <Col sm="auto">
                <ProductTags tag={tag}/>
            </Col>
            <Col>
                <ProductsList tag={tag}/>
            </Col>
        </Row>;
}