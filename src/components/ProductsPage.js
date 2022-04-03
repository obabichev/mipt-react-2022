import { useMemo } from 'react';
import { ProductsSearch } from "./ProductsSearch";
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useProducts } from '../hooks/UseProducts';

export const ProductsPage = () => {
    const { products } = useProducts()

    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()

    const handleSearchChange = (event) => {
        const inputString = event.target.value

        setSearchParams({search: inputString})
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

    const filteredProducts = useMemo(() => {
        return search
        ? products.filter(({title, description}) => {
            const titleLowerCase = title.toLowerCase()
            const descriptionLowerCase = description.toLowerCase()
            const searchLowerCase = search.toLowerCase()
            return titleLowerCase.includes(searchLowerCase) || descriptionLowerCase.includes(searchLowerCase)
        })
        : products
    },
    [search, products])

    return <div>
        <ProductsSearch search={search} onChange={handleSearchChange} />
        <button type="button" onClick={handleNewProductButtonClick}>New product</button>
        {filteredProducts.map(({ title, usin }) =>
            <div
                key={usin}
                onClick={() => handleProductClick(usin)}
            >
                {title}
            </div>
        )}
    </div>;
}