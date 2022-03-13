/*
Builds tag tree in memory with fake root vertex corresponding to null key
*/

export class TagsTree {
    constructor(tags) {
        let tagsTree = {};
        tagsTree[""] = {
            key: "",
            parent: "",
            title: "All",
            children: []
        };
        tags.forEach(tag => {
            let tagChildren = tagsTree[tag.key] || [];
            let parent = tag.parent ? tag.parent: "";
            tagsTree[tag.key] = {
                "key": tag.key,
                "parent": parent,
                "title": tag.title,
                "children": tagChildren
            };
            if (tagsTree[parent] === undefined) {
                tagsTree[parent] = {
                    children: []
                };
            }
            tagsTree[parent]["children"].push(tag.key);
        });
        this.tagsTree = tagsTree;
    }

    get(key) {
        if (!key) {
            key = "";
        }
        return this.tagsTree[key];
    }

    isChildTag = (parent, child) => {
        if (parent === "") {
            return true;
        }
    
        let tag = child;
        while (tag !== "") {
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
        if (!tag) {
            tag = "";
        }
        let parentTagsList = [];
        let rootTag = tag;
        while (rootTag !== "") {
            let tagNode = this.tagsTree[rootTag];
            parentTagsList.push(tagNode.key);
            rootTag = tagNode.parent;
        }
        parentTagsList.push("");
        parentTagsList = parentTagsList.reverse();
        return parentTagsList;
    }

}
