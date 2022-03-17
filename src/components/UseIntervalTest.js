import {useCallback, useEffect, useState} from "react";

const useInterval = (period, action) => {
    useEffect(() => {
        console.log('[obabichev] useEffect was called');
        const id = setInterval(() => {
            // console.log(`[obabichev] setInterval callback was called value=${value}`);
            action()
        }, period)
        return () => clearInterval(id)
    }, [action, period])
}

export const UseIntervalTest = () => {
    const [value, setValue] = useState(0)

    const [moveUp, setMoveUp] = useState(true)
    const [period, setPeriod] = useState(1000)

    const intervalCallback = useCallback(
        () => setValue(prev => moveUp ? prev + 1 : prev - 1),
        [moveUp])

    useInterval(period, intervalCallback)

    const onChangeInterval = event => {
        setPeriod(Number.parseInt(event.target.value) || 1000)
    }

    const [a, setA] = useState(true)

    return <div>
        <div>{value}</div>
        <button onClick={() => setMoveUp(prev => !prev)}>{moveUp ? "UP" : "DOWN"}</button>
        <input value={period} onChange={onChangeInterval}/>
        <button onClick={() => setA(!a)}>Rerender</button>
    </div>
}