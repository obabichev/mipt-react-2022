
import {Space, Spin, Tree} from "antd";
import {findTagByParent} from "../utils";
import {useEffect, useState} from "react";
import {DataModel} from "./DataModel.tsx";


export const TagTree = () => {
    const [tags, setTags] = useState([])
    const [dataLoaded, setDataLoaded] = useState(false)
    useEffect(() =>{
        DataModel.getTags()
            .then(tags => {
                setTags(tags);
                setDataLoaded(true);
            })
            .catch(err => console.error(err))
    }, [])
    let tagsTree = {};

    tags.forEach(tag => {
        let tagChildren = tagsTree[tag.title] === undefined ? [] : tagsTree[tag.title]["children"];
        tagsTree[tag.key] = {
            "key": tag.key,
            "parent": tag.parent,
            "title": tag.title,
            "children": tagChildren
        };
        if (tagsTree[tag.parent] === undefined) {
            tagsTree[tag.parent] = {
                children: []
            };
        }
        tagsTree[tag.parent]["children"].push(tag.key);
    });

    let tagsList = []

    for (let i in tagsTree) {
        tagsList.push(tagsTree[i])
    }

    const wrapTag = (tag) => {
        return {
            "title": <div onClick={()=>{window.location='/products/'+tag.key;}}>{tag.title}</div>,
            "key": tag.key,
            "children": tagsTree[tag.key].children !== [] ? formAllChildren(tag.key) : []
        }
    }

    const formAllChildren = (tag) => {
        return tagsList.filter((cur_tag) => cur_tag.parent === tag).map(
            (cur_tag) => wrapTag(cur_tag));
    }


    const tree = formAllChildren(null);
    return <>
        {dataLoaded === true
            ? <Tree
                defaultExpandedKeys={[findTagByParent(null).key]}
                showLine={{ showLeafIcon: false }}
                treeData={tree}
            />
            : <Space style={{width: "100%"}} direction="vertical" align="center"> <Spin size="large" tip="Loading..." /> </Space>}
    </>;
};