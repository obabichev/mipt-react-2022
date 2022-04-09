import Container from 'react-bootstrap/Container';
import {useCallback, useState} from "react";

import {ProductsListItem} from 'components/Common/ProductsListItem/ProductsListItem'
import {ProductsSearch} from 'components/ProductsSearch/ProductsSearch'

import './ProductsList.css'
import { useLoading, getProducts } from 'utils/loader';

import Container from 'react-bootstrap/Container';

export const ProductsList = ({tag}) => {
    const [query, setQuery] = useState("");
    const getMatchingProducts = useCallback(
        () => getProducts(query, tag),
        [query, tag]
    )
    const productsResponse = useLoading(getMatchingProducts);

import './ProductsList.css'


export const ProductsList = ({tag}) => {
    const tagsTree = new TagsTree();
    let productList = new ProductList();

    const [query, setQuery] = useState("");

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