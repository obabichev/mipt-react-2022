import {useState} from "react";

const LOCAL_STORAGE_KEY = "LocalStorageTest::value_key"


const lsManager = {
    getValue: () => Number.parseInt(localStorage.getItem(LOCAL_STORAGE_KEY)) || 0,
    setItem: (value) => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value))
}

const useLocalStorage = () => {
    const [value, setValue] = useState(lsManager.getValue)

    const _setValue = (newValue) => {
        lsManager.setItem(newValue)
        setValue(newValue)
    }

    return [value, _setValue]
}

export const LocalStorageTest = () => {
    const [value, setValue] = useLocalStorage()

    const onClick = () => {
        setValue(value + 1)
    }

    return <div>
        <button onClick={onClick}>{value}</button>
    </div>
}