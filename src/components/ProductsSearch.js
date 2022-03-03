import {useState} from "react";

export const ProductsSearch = () => {
    const [text, setText] = useState("")

    const handleOnChange = (event) => {
        setText(event.target.value.toUpperCase())
    }

    return <div style={{border: "solid 1px green", padding: 10, margin: 10}}>
        <input value={text} onChange={handleOnChange}/>
        <b>{text}</b>
    </div>
}