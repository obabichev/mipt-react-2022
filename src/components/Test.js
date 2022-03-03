import {useState} from "react";

const Counter = ({flag}) => {
    const [value, setValue] = useState(0)

    const handleClick = () => {
        setTimeout(() => {

            setValue(oldValue => oldValue + 1);
        }, 3000)
    }

    return <div style={{display: flag ? "none" : "block"}}>
        <button onClick={handleClick}>{value}</button>
    </div>
}

export const Test = () => {
    const [flag, setFlag] = useState(true)

    return <div>
        <button onClick={() => setFlag(!flag)}>trigger</button>
        <Counter/>
        <Counter flag={flag}/>
        <Counter flag={flag}/>
    </div>
}