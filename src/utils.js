import {useState} from "react";
import sample from "./mock/products-sample.json";
import tags from "./mock/tags-sample.json";
import tagSample from "./mock/tags-sample.json";

export function findTagByParent(parent) {
    return tags.find(t => t.parent === parent)
}

export function findTag(tag) {
    return tagSample.find(t => t.key === tag)
}

export const useLocalStorage = () => {
    const [value, setValue] = useState(() => JSON.parse(localStorage.getItem("productList")) || sample.products);
    const _setValue = (products) => {
        localStorage.setItem("productList", JSON.stringify(products))
        setValue(products);
    }
    return [value, _setValue]
}