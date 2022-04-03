import {useState} from "react";

export const ProductsSearch = ({handleTextToParent}) => {
    const [text, setText] = useState("")

    const handleOnChange = (event) => {
        setText(event.target.value)
        handleTextToParent(event.target.value)
    }

    return <div style={{border: "solid 1px green", padding: 10, margin: 10}}>
        <input value={text} onChange={handleOnChange}/>
    </div>
}