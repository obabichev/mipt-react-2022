import Container from 'react-bootstrap/Container';
import {useState} from "react";

import {ProductsListItem} from 'components/Common/ProductsListItem/ProductsListItem'
import {TagsTree} from 'utils/tag-tree'
import {ProductList} from 'utils/product-list'
import {ProductsSearch} from 'components/ProductsSearch/ProductsSearch'

import './ProductsList.css'


export const ProductsList = ({tag}) => {
    const tagsTree = new TagsTree();
    let productList = new ProductList();

    const [query, setQuery] = useState("");

    return <Container className="products-list">
        <ProductsSearch query={query} handler={setQuery}/>
        {
            productList.get()
            .filter(product=>tagsTree.isChildTag(tag, product.tag))
            .filter(product=>(product.title.toLowerCase().includes(query.toLowerCase()) 
            || product.description.toLowerCase().includes(query.toLowerCase())))
            .map(product => 
            <Container key={product.usin}>
                <ProductsListItem product={product}/>
            </Container>
            )
        }
    </Container>
}
