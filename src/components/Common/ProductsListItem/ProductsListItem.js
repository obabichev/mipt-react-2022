import {Link} from "react-router-dom";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {ProductSellOptions} from 'components/Common/ProductSellOptions/ProductSellOptions'
import {ProductRating} from 'components/Common/ProductRating/ProductRating'

import './ProductsListItem.css'


export const ProductsListItem = ({product}) => {
    return <Row className="products-list-item" key={product.usin}>
        <Col md="3">
            <img height={200} src={product.images[0]} alt={product.title}/>
        </Col>
        <Col style={{display: "flex", flexDirection: "column"}}>
            <Row>
                <h2 className="products-list-item__title">
                    <Link to={'/product/' + product.usin}>
                        {product.title}
                    </Link>
                </h2>
                <span className="products-list-item__author">By {product.attributes.author}</span>
            </Row>
            <Row>
                <ProductRating ratings={product.ratings}/>
            </Row>
            <Row style={{flex: 1}}/>
            <Row className="bottom-selloptions">
                <ProductSellOptions sellOptions={product.sellOptions}/>
            </Row>
        </Col>
    </Row>;
}

