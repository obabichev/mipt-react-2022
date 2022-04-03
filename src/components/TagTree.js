import tags from "../mock/tags-sample.json";
import {Tree} from "antd";
import {findTagByParent} from "../utils";


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

console.log(tagsList)

const wrapTag = (tag) => {
    console.log(tag.parent + " brought us to " + tag.title)
    console.log(tag)
    return {
        "title": tag.title,
        "key": tag.key,
        "children": tagsTree[tag.key].children !== [] ? formAllChildren(tag.key) : []
    }
}

const formAllChildren = (tag) => {
    console.log("trying " + tag)
    console.log(tag)
    return tagsList.filter((cur_tag) => cur_tag.parent === tag).map(
        (cur_tag) => wrapTag(cur_tag));
}

export const TagTree = () => {
    const tree = formAllChildren(null);
    return <Tree
        defaultExpandedKeys={[findTagByParent(null).key]}
        showLine={{ showLeafIcon: false }}
        treeData={tree}
    />;
};