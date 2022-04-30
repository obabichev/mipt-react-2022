import { AppRouter } from "./AppRouter"
import {ToastContainer} from 'react-toastify'
import { LoadingContext } from "../contexts"
import { useState } from "react"
import { LoadingIndicator } from "./LoadingIndicator"

const App = () => {
    const [loadingRequests, setLoadingRequests] = useState(0)

    const incrementLoadingRequest = () => setLoadingRequests(i => i + 1)
    const decrementLoadingRequest = () => setLoadingRequests(i => i - 1)
    return (
        <>
            <LoadingContext.Provider value={{incrementLoadingRequest, decrementLoadingRequest, loadingRequests}}>
                <LoadingIndicator />
                <ToastContainer/>
                <AppRouter />
            </LoadingContext.Provider>
        </>
    )
}

export default App