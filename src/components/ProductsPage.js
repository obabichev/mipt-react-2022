import React from 'react';

import {ProductsList} from './ProductsList/ProductsList'


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