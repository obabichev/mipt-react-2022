import React, {useState} from "react";
import {Input} from "antd";

export const ProductsSearch = () => {
    const [text, setText] = useState("")

    const handleOnChange = (event) => {
        console.log(event.target.value)
        setText(event.target.value)
    }

    return <span style={{padding: 10}}>
        <Input value={text} onChange={handleOnChange}
                  placeholder="Search"
                  style={{width: 300, height: 40, marginLeft: 60}}/>
        {text}
    </span>

}