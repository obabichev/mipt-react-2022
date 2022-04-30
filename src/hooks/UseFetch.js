import axios from 'axios'
import { useContext, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { LoadingContext } from '../contexts'

export const useFetch = ({
	url,
	method,
	params,
	data,
	showLoading,
	notifyOnError,
	lazy,
	headers,
	responseType,
	disablePendingRequestCancellation,
}) => {
	const [isLoading, setIsLoading] = useState(false)
	const [rawError, setRawError] = useState()

	const [responseData, setResponseData] = useState()

	const [cancel, setCancel] = useState()

	const { incrementLoadingRequest, decrementLoadingRequest } = useContext(
		LoadingContext,
	)

	const showLoadingSpinner = useMemo(
		() => (showLoading === undefined ? true : showLoading),
		[showLoading],
	)

	const showError = useMemo(
		() => (notifyOnError === undefined ? true : notifyOnError),
		[notifyOnError],
	)

	const fetch = async (
		fetchInput,
	) => {
		try {
			if (!disablePendingRequestCancellation) {
				cancel && cancel()
			}

			setIsLoading(true)
			if (showLoadingSpinner) {
				incrementLoadingRequest()
			}

			const { data: responseData } = await axios({
				url: fetchInput?.url || url,
				method,
				params: {
					...params,
					...fetchInput?.additionalRequestParams,
				},
				data: fetchInput?.data,
				cancelToken: new axios.CancelToken((c) => {
					setCancel(() => c)
				}),
				headers: {
					...headers,
					...fetchInput?.headers,
				},
				responseType,
			})

			setResponseData(responseData)

			setIsLoading(false)
			if (showLoadingSpinner) {
				decrementLoadingRequest()
			}

			return responseData
		} catch (e) {
			!axios.isCancel(e) && setRawError(e)

			setIsLoading(false)
			if (showLoadingSpinner) {
				decrementLoadingRequest()
			}

			throw e
		}
	}

	useEffect(() => {
		return () => {
			if (!disablePendingRequestCancellation) {
				cancel && cancel()
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cancel])

	useEffect(() => {
		if (!lazy) {
			fetch({ data })
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params, url])

	useEffect(() => {
		if (rawError && showError) {
            console.log(rawError.message)
            toast(rawError.message, {
                type: 'error'
            })
		}
	}, [rawError])

	return {
		responseData,
		rawError,
		isLoading,
		fetch,
	}
}
