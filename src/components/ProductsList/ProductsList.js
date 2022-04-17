import Container from 'react-bootstrap/Container';
import {useCallback, useState} from "react";

import {ProductsListItem} from 'components/Common/ProductsListItem/ProductsListItem'
import {ProductsSearch} from 'components/ProductsSearch/ProductsSearch'

import './ProductsList.css'
import { useLoading, getProducts } from 'utils/loader';


export const ProductsList = ({tag}) => {
    const [query, setQuery] = useState("");
    const getMatchingProducts = useCallback(
        () => getProducts(query, tag),
        [query, tag]
    )
    const productsResponse = useLoading(getMatchingProducts);


    return <Container className="products-list">
        
        <ProductsSearch query={query} handler={setQuery}/>
        {productsResponse.loading && <div>Loading products list</div>}
        {productsResponse.error && <div>Error loading products: {productsResponse.error.message}</div>}
        {   productsResponse.data &&
            productsResponse.data
            .map(product => 
            <Container key={product.usin}>
                <ProductsListItem product={product}/>
            </Container>
            )
        }
    </Container>
}