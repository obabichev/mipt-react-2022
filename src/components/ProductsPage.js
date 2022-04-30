import { useEffect, useMemo } from 'react';
import { ProductsSearch } from "./ProductsSearch";
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useFetch } from '../hooks/UseFetch';
import { getFindProductPath } from '../apiPaths';
import { toast } from 'react-toastify';

export const ProductsPage = () => {
    const { fetch, responseData: products } = useFetch({
        url: getFindProductPath(),
        lazy: true,
    })

    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const handleSearchChange = (event) => {
        const inputString = event.target.value

        setSearchParams({...Object.fromEntries(searchParams), search: inputString})
    }
    const handleTagChange = (event) => {
        const tag = event.target.value
        setSearchParams({...Object.fromEntries(searchParams), tag: tag == 0 ? '' : tag})
    }
    const handleProductClick = (usin) => {
        navigate(`/products/${usin}`)
    }

    const handleNewProductButtonClick = () => {
        navigate('/products/new')
    }

    const search = useMemo(() => {
        return searchParams.get("search") || ''
    }, [searchParams])

    
    const tag = useMemo(() => {
        const tag = searchParams.get("tag")
        if (tag === 0) {
            return ''
        }

        return tag
    }, [searchParams])

    useEffect(() => {
        fetch({url: getFindProductPath(tag, search)})
    }, [search, tag])

    return <div>
        <ProductsSearch search={search} onSearchChange={handleSearchChange} onTagChange={handleTagChange} />
        <button type="button" onClick={handleNewProductButtonClick}>New product</button>
        {products && products.map(({ title, usin }) =>
            <div
                key={usin}
                onClick={() => handleProductClick(usin)}
            >
                {title}
            </div>
        )}
    </div>;
}