import axios from 'axios';
import  { apiPath } from '../utils.js';

export class DataModel {

    static getProduct = async (productUsin: string) => {
        const { data } = await axios.get(`${apiPath}/service-product/search/${productUsin}`);
        return data;
    };

    static getProductList = async (tag: string, text: string) => {
        const { data } = await axios.get(`${apiPath}/service-product/search?tag=${text}&text=${tag}`);
        return data;
    };

    static getTags = async () => {
        const { data } = await axios.get(`${apiPath}/service-product/tag`);
        return data;
    };

    static updateProduct = async (product) => {
        const { data } = await axios.put(`${apiPath}/service-boarding/boarding`, product);
        return data;
    };

    static createProduct = async (product) => {
        const { data } = await axios.post(`${apiPath}/service-boarding/boarding`, product);
        return data;
    };
}