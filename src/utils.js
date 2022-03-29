import {useState} from "react";
import sample from "./mock/products-sample.json";

export const countProductMetrics = (product) => {
    if (!product.ratings) {
        return [0, 0];
    }

    return product.ratings.reduce(([currentCount, currentSum], {rate, amount}) => {
        return [currentCount + amount, currentSum + rate * amount];
    }, [0, 0]);
}

const LOCAL_STORAGE_KEY = "products"

const lsManager = {
    getValue: () => JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || sample.products,
    setItem: (value) => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value))
}

export const useLocalStorage = () => {
    const [value, setValue] = useState(lsManager.getValue);

    const _setValue = (newValue) => {
        lsManager.setItem(newValue);
        setValue(newValue);
    }

    return [value, _setValue]
}
