import React, {useCallback, useEffect, useState} from 'react';
import {useQuery} from "react-query";

const wait = (result, timeout = 1000) => new Promise(
    (resolve, reject) => setTimeout(() => resolve(result), timeout)
);

const getRequest = (url) => fetch(url)
    .then(response => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Response failed")
        }
        return response.json()
    })
    .then(data => wait(data, 2000))


const getTags = () => getRequest("/api/service-product/tag")
const getProduct = (id) => getRequest(`/api/service-product/search/${id}`)

const useLoading = (fn) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [value, setValue] = useState(null)

    useEffect(() => {
        setLoading(true);
        setValue(null);
        setError(null);
        fn()
            .then(data => {
                setValue(data)
            })
            .catch(err => {
                setError(err);
            })
            .finally(() => {
                setLoading(false)
            })
    }, [fn])

    return {loading, error, data: value}
}

const PRODUCTS = [
    'a32eeabe-9923-43ad-9168-131243eab302',
    'f2f5e7ea-edf8-42c2-96bb-d31d81e67092'
]


export const TestServerApi = () => {
    const tagsRequest = useLoading(getTags)
    const [productIndex, setProductIndex] = useState(0)

    const getCurrentProduct = useCallback(
        () => getProduct(PRODUCTS[productIndex]),
        [productIndex])

    const productRequest = useLoading(getCurrentProduct)

    const productQuery = useQuery({
        queryFn: getCurrentProduct,
        queryKey: ["product", productIndex]
    })

    return <div>
        {tagsRequest.loading && <div>Loading..........</div>}
        {tagsRequest.error && <div>{tagsRequest.error.message}</div>}
        <ul>
            {tagsRequest.data && tagsRequest.data.map(tag => (
                <li key={tag.key}>{tag.title}</li>
            ))}
        </ul>

        <div>Product: {productIndex}</div>
        {productRequest.loading && <div>Loading product..........</div>}
        {productRequest.error && <div>{productRequest.error.message}</div>}
        {productRequest.data && <div>
            <div>{productRequest.data.title}</div>
            <img height={300} src={productRequest.data.images[0]}/>
        </div>}
        <button onClick={() => setProductIndex((productIndex + 1) % PRODUCTS.length)}>Next</button>


        <h2>Product query</h2>
        <div>Product: {productIndex}</div>
        {productQuery.isLoading && <div>Loading product..........</div>}
        {productQuery.error && <div>{productQuery.error}</div>}
        {productQuery.data && <div>
            <div>{productQuery.data.title}</div>
            <img height={300} src={productQuery.data.images[0]}/>
        </div>}
        <button onClick={() => setProductIndex((productIndex + 1) % PRODUCTS.length)}>Next</button>
    </div>
}