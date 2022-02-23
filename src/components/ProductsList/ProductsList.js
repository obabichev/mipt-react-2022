import sample from "../../mock/products-sample.json";

import Container from 'react-bootstrap/Container';

import {ProductsListItem} from '../Common/ProductsListItem/ProductsListItem'


export const ProductsList = () => {
    return <Container className="products-list">
        {sample.products.map(product => 
            <Container key={product.usin}>
                <ProductsListItem product={product}/>
            </Container>
        )}
    </Container>
}