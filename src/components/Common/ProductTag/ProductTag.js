import React, {useCallback} from 'react';

import {TagsTree} from 'utils/tag-tree'
import {Link} from "react-router-dom";

import tags from "mock/tags-sample.json";
import './ProductTag.css'


export const ProductTag = ({tag}) => {
    const tagsTree = new TagsTree(tags);
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