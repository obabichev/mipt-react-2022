import {useState} from "react";
import sample from "./mock/products-sample.json";
import tags from "./mock/tags-sample.json";
import tagSample from "./mock/tags-sample.json";

const emptyProduct = {
    title: "",
    description: "",
    images: [],
    tag: "books",
    attributes:{
        "isbn-10": "",
        "author": "",
        "publisher": "",
        "paperback": "",
        "language": "",
        "isbn-13": "",
        "dimensions": ""
    },
    sellOptions: [
        {
            "price": 0,
            "currency": "EUR",
            "type": "Paperback"
        }
    ],
    ratings:[]
}


const apiPath = 'https://ultimate-ecommerce.v-query.com/api';
export { apiPath, emptyProduct };

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