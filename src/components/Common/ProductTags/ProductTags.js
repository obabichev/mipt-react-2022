import React, {useCallback} from 'react';


import { Container } from 'react-bootstrap';
import {Link} from "react-router-dom";
import {TagsTree} from 'utils/tag-tree'
import {useLoading, getTags} from 'utils/loader'

import './ProductTags.css'

export const ProductTags = ({tag}) => {
    const TagList = (props) => {
        const rootTag = tagsTree.get(props.rootTag);        
        return <li className="product-tags__item">
            <Link to={"/products/" + rootTag.key} className="products-tags__link">{rootTag.title}</Link>
                {
                    rootTag.children.length === 0 ? "" : <ul className="product-tags__list"> {rootTag.children.map(child => <TagList rootTag={child}/>)} </ul>
                }
        </li>
    }

    const TagParents = (props) => {
        let parentTagsList = tagsTree.tagParentsList(props.tag);
        return <ul className="products-tags__list">
            {
                parentTagsList.map(tag => {
                    let tagNode = tagsTree.get(tag);
                    return <li className="product-tags__item"><Link to={"/products/" + tagNode.key} className="products-tags__link">{tagNode.title}</Link></li>
                })
            }
        </ul>
    }

    const getProductTags = useCallback(
        () => getTags(),
        [])
    const myTags = useLoading(getProductTags);
    if (myTags.error){
        return <span>Error loading tags</span>
    }
    if (!myTags.data || myTags.loading) {
        return <span>Loading tags</span>
    }

    let tagsTree = new TagsTree(myTags.data);
    let mainTag = tag === undefined ? null : tag;

    return <Container className="product-tags">
        <h2 className="products-tags__heading">Tags</h2>
        <TagParents tag={mainTag}/>
        {tagsTree.get(mainTag).children.map(child => <ul className="product-tags__list"><TagList rootTag={child}/></ul>)}
    </Container>
}
