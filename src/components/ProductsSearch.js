import React, {useEffect, useState} from "react";
import { Typography, List, Avatar} from "antd";
import {DataModel} from "./DataModel.tsx";

const { Text } = Typography;

export const ProductsSearch = () => {
    //const [productList, setProductList ]= useLocalStorage()

    const [text, setText] = useState("")
    const [listVisible, setListVisible] = useState(false)
    const [productList, setProductList] = useState([])
    useEffect(() =>{
        DataModel.getProductList('', text)
            .then(products => {
                setProductList(products);
            })
            .catch(err => console.error(err))
    }, [text])

    console.log(text !== "")
    if (listVisible !== (text !== "")) {
        setListVisible(text !== "")
    }

    const handleOnChange = (event) => {
        setText(event.target.value.toLowerCase())
    }

    return <div style={{ height: "inherit"}}>
        <input placeholder="Search for product here" style={{ height: 30, margin: 5, width: 500}} value={text} onChange={handleOnChange}/>
        {listVisible && <List
            style={{width: 500,
                border: "solid 1px gray",
                marginLeft: '5px',
                position: "relative",
                marginTop: '-17px',
                zIndex: '100',
                backgroundColor: 'white'}
        }
            itemLayout="horizontal"
            dataSource={productList}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar src={item.images[0]} />}
                        title={<a href={'/product/'+item.usin}>{item.title}</a>}
                        description= {<Text>by {item.attributes.author}</Text>}
                    />
                </List.Item>
            )}
        />}
    </div>
}