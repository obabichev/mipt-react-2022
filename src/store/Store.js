import productsSample from '../mock/products-sample.json';
import tagsSample from '../mock/tags-sample.json';
import unflatten from '../utils/unflattenTree';
import store from './index';

export default class Store {
  constructor() {
    localStorage.setItem('products', JSON.stringify(productsSample.products));
    localStorage.setItem('tags', JSON.stringify(tagsSample));
  }

  tags = () => {
    return JSON.parse(localStorage.getItem('tags'));
  };

  products = () => {
    return JSON.parse(localStorage.getItem('products'));
  };

  productAttributes = () => {
    return this.products()
      .map((product) => {
        for (const attribute in product.attributes) {
          product.attributes[attribute] = '';
        }

        return product;
      })
      .reduce((acc, { attributes }) => ({ ...acc, ...attributes }), {});
  };

  productSellOptionsTypes = () => {
    return Object.keys(
      this.products().reduce((acc, product) => {
        const options = product.sellOptions
          .map(({ type }) => type)
          .reduce((acc, optionType) => ({ ...acc, [optionType]: true }), acc);

        return { ...acc, ...options };
      }, {})
    );
  };

  searchProduct = (product) => {
    if (!product) {
      return store.products();
    }

    const value = product.toLowerCase();

    return store
      .products()
      .filter(
        ({ title, attributes: { author }, description }) =>
          title.toLowerCase().includes(value) ||
          author.toLowerCase().includes(value) ||
          description.toLowerCase().includes(value)
      );
  };

  tagsTree = () => {
    return unflatten(tagsSample);
  };
}
