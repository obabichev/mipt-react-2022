import React, {useCallback, useEffect, useState} from 'react';


const wait = (result, timeout = 1000) => new Promise(
    (resolve, reject) => setTimeout(() => resolve(result), timeout)
);

export const getRequest = (url) => fetch(url)
    .then(response => {
        if (response.status < 200 || response.status >= 300) {
            throw Error("Response failed")
        }
        return response.json()
    })
    //.then(data => wait(data, 2000))


export const getTags = () => getRequest("/api/service-product/tag")
export const getProduct = (id) => getRequest(`https://ultimate-ecommerce.v-query.com/api/service-product/search/${id}`)

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
                console.log('Data=' + data)
                setValue(data)
            })
            .catch(err => {
                setError(err);
            })
            .finally(() => {
                setLoading(false)
            })
    }, [fn])

    console.log('Arslan has value=' + value)

    return {loading, error, data: value}
}