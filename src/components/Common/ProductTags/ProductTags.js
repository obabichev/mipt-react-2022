import { Container } from 'react-bootstrap';
import {Link} from "react-router-dom";
import {TagsTree} from 'utils/tag-tree'

import tags from "mock/tags-sample.json";
import './ProductTags.css'

const TagList = (props) => {
    const rootTag = props.tagsTree.get(props.rootTag);  
    return <li className="product-tags__item">
        <Link to={"/products/" + rootTag.key} className="products-tags__link">{rootTag.title}</Link>
            {
                rootTag.children && <ul className="product-tags__list"> {rootTag.children.map(child => <TagList rootTag={child} tagsTree={props.tagsTree}/>)} </ul>
            }
    </li>
}

const TagParents = (props) => {
    let parentTagsList = props.tagsTree.tagParentsList(props.tag);
    return <ul className="products-tags__list">
        {
            parentTagsList.map(tag => {
                let tagNode = props.tagsTree.get(tag);
                return <li className="product-tags__item"><Link to={"/products/" + tagNode.key} className="products-tags__link">{tagNode.title}</Link></li>
            })
        }
    </ul>
}

export const ProductTags = ({tag}) => {
    let tagsTree = new TagsTree(tags);
    return <Container className="product-tags">
        <h2 className="products-tags__heading">Tags</h2>
        <TagParents tag={tag} tagsTree={tagsTree}/>
        {tagsTree.get(tag).children.map(child => <ul className="product-tags__list"><TagList rootTag={child} tagsTree={tagsTree}/></ul>)}
    </Container>
}
