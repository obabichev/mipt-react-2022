import Container from 'react-bootstrap/Container';
import {useCallback, useState} from "react";

import {ProductsListItem} from 'components/Common/ProductsListItem/ProductsListItem'
import {ProductsSearch} from 'components/ProductsSearch/ProductsSearch'

import tags from "mock/tags-sample.json";
import './ProductsList.css'
import { useLoading, getProducts } from 'utils/loader';

import Container from 'react-bootstrap/Container';

export const ProductsList = ({tag}) => {
    if (tag == null) {
        tag = "";
    }
    const tagsTree = new TagsTree(tags);
    let productList = new ProductList();

    const [query, setQuery] = useState("");
    const getMatchingProducts = useCallback(
        () => getProducts(query, tag),
        [query, tag]
    )
    const productsResponse = useLoading(getMatchingProducts);

import './ProductsList.css'


export const ProductsList = ({tag}) => {
    const tagsTree = new TagsTree();
    return <Container className="products-list">
        {sample.products.map(product => 
            {
                if (tagsTree.isChildTag(tag, product.tag)) {
                    return <Container key={product.usin}>
                        <ProductsListItem product={product}/>
                    </Container>
                } else {
                    return "";
                }
            }
        )}
    </Container>
}
