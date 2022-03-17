import {useState} from "react";
import { Typography } from "antd";
const { Text } = Typography;

export const ProductsSearch = () => {
    const [text, setText] = useState("")

    const handleOnChange = (event) => {
        setText(event.target.value.toUpperCase())
    }

    return <div style={{border: "solid 1px green", margin: 10, height: 42 }}>
        <Text type="warning">Someday search will be here</Text>
        <input style={{ height: 30, position: "absolute", margin: 5}} value={text} onChange={handleOnChange}/>
        <b>{text}</b>
    </div>
}