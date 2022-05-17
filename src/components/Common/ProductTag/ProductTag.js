import React, {useCallback} from 'react';

import {TagsTree} from 'utils/tag-tree'
import {Link} from "react-router-dom";

import {useLoading, getTags} from 'utils/loader'

import './ProductTag.css'


export const ProductTag = ({tag}) => {
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

    const tagsTree = new TagsTree(myTags.data);
    const parentTagsList = tagsTree.tagParentsList(tag);
    return <span>
        {
            parentTagsList.map((tag, index) => {
                const tagNode = tagsTree.get(tag);
                const separator = (index  + 1 === parentTagsList.length) ? "" : " > ";
                return <span><Link to={"/products/" + tagNode.key} className="product-tag__link">{tagNode.title}</Link>{separator}</span>
            })
        }
    </span>
}