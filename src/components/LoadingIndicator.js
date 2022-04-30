import { useContext } from "react"
import { LoadingContext } from "../contexts"

export const LoadingIndicator = () => {
	const { loadingRequests } = useContext(
		LoadingContext,
	)

    if (loadingRequests) {
        return <p style={{position: "absolute", top: '50%', left: '50%'}}>Loading..</p>
    }

    return null
}