import config from "./config";

export const getFindProductPath = (tag, text) => `${config.apiPath}/service-product/search?tag=${tag || ''}&text=${text || ''}`

export const getProductDetailsPath = (usin) => `${config.apiPath}/service-product/search/${usin}`

export const createProductPath = `${config.apiPath}/service-boarding/boarding`

export const editProductPath = `${config.apiPath}/service-boarding/boarding`

export const tagsPath = `${config.apiPath}/service-product/tag`
