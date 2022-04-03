import {React, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {ProductsSearch} from "./ProductsSearch";
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import {ProductsData} from "./storage/ProductsData.js"

export const ProductsPage = () => {
    const navigate = useNavigate()
    const productsData = new ProductsData();

    const [searchText, setSearchText] = useState("")
    const handleTextToParent = (text) => {
        setSearchText(text)
    }

    let filteredProducts = productsData.get().filter(product => product.title.toLowerCase().includes(searchText.toLowerCase()) ||
                                                  product.description.toLowerCase().includes(searchText.toLowerCase()))
    return <div>
        <ProductsSearch handleTextToParent={handleTextToParent}/>
        <ListGroup>
            {filteredProducts.map(product => <ListGroup.Item key={product.usin} onClick={() => navigate(`/product/${product.usin}`)}>
                {product.title}
            </ListGroup.Item>)}
        </ListGroup>
        <Button style={{width: "15%", marginTop: "1%"}}variant="outline-dark" size="med" onClick={() => navigate("/create_product")}>Create product</Button>
    </div>;
}