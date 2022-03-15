import { useEffect, useState } from 'react';
import sample from "../mock/products-sample.json";
import { ProductsSearch } from "./ProductsSearch";
import { useNavigate } from 'react-router-dom'

export const ProductsPage = () => {
    const [search, setSearch] = useState('')
    const [products, setProducts] = useState([])

    const navigate = useNavigate()

    const handleSearchChange = (event) => setSearch(event.target.value)
    const handleProductClick = (usin) => navigate(`/product/${usin}`)

    useEffect(() => {
        if (!search) {
            setProducts(sample.products)
            return
        }

        setProducts(products =>
            products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()))
        )
    }, [search])

    return <div>
        <ProductsSearch search={search} onChange={handleSearchChange} />
        {products.map(({ title, usin }) =>
            <div
                key={usin}
                onClick={() => handleProductClick(usin)}
            >
                {title}
            </div>
        )}
    </div>;
}