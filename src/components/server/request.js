import {useEffect, useState} from 'react';

export const getRequest = (url) => fetch(url)
    .then(response => {
        if (response.status < 200 || response.status >= 400) {
            throw Error("Response failed")
        }
        return response.json()
    })


export const getProduct = (id) => getRequest(`/api/service-product/search/${id}`)
export const getProducts = (query) => getRequest(`/api/service-product/search?text=${query}`)
export const  updateProduct = (json_value, usin) =>
    fetch('/api/service-boarding/boarding', 
        {
            method: usin === undefined ? "POST" : "PUT", 
            body: JSON.stringify(json_value),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            return response.json();
        })

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