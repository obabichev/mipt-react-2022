import {useEffect, useState} from 'react';

export const getRequest = (url) => fetch(url)
    .then(response => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Response failed")
        }
        return response.json()
    })


export const getTags = () => getRequest("/api/service-product/tag")
export const getProduct = (id) => getRequest(`/api/service-product/search/${id}`)
export const getProducts = (query, tag) => {
    if (query !== '') {
        return getRequest(`/api/service-product/search?text=${query}&tag=${tag}`);
    } else {
        return getRequest(`/api/service-product/search?text=${tag}&tag=${query}`);
    }
}

export const useLoading = (fn) => {
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