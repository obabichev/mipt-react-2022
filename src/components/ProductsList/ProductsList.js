import sample from "mock/products-sample.json";

import Container from 'react-bootstrap/Container';

import {ProductsListItem} from 'components/Common/ProductsListItem/ProductsListItem'
import {TagsTree} from 'utils/tag-tree'

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