import tags from "mock/tags-sample.json";

/*
Builds tag tree in memory with fake root vertex corresponding to null key
*/

export class TagsTree {
    constructor() {
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
        tagsTree[null].key = "";
        tagsTree[null].parent = null;
        tagsTree[null].title = "All";
        this.tagsTree = tagsTree;
    }

    get(key) {
        return this.tagsTree[key];
    }

    isChildTag = (parent, child) => {
        if (parent == null) {
            return true;
        }
    
        let tag = child;
        while (tag != null) {
            let tagNode = this.tagsTree[tag];
            if (tagNode.key === parent) {
                return true;
            } else {
                tag = tagNode.parent;
            }
        }
        return false;
    }

    tagParentsList = (tag) => {
        let parentTagsList = [];
        let rootTag = tag;
        while (rootTag != null) {
            let tagNode = this.tagsTree[rootTag];
            parentTagsList.push(tagNode.key);
            rootTag = tagNode.parent;
        }
        parentTagsList.push(null);
        parentTagsList = parentTagsList.reverse();
        return parentTagsList;
    }

}
