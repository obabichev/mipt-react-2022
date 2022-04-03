import productsSample from '../mock/products-sample.json';
import tagsSample from '../mock/tags-sample.json';
import unflatten from '../utils/unflattenTree';
import store from './index';

import uuid from 'react-uuid';
import sellOptions from '../components/ProductForm/components/SellOptions';

export default class Store {
  constructor() {
    if (!this.products()) {
      localStorage.setItem('products', JSON.stringify(productsSample.products));
    }

    if (!this.tags()) {
      localStorage.setItem('tags', JSON.stringify(tagsSample));
    }
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

  addProduct = (productData, onSuccess) => {
    if (!productData.usin) {
      productData.sellOptions = productData.sellOptions.map(() => ({
        ...sellOptions,
        currency: 'EUR',
      }));
      productData.usin = uuid();
      productData.ratings = [
        {
          rate: 5,
          amount: 0,
        },
        {
          rate: 4,
          amount: 0,
        },
        {
          rate: 3,
          amount: 0,
        },
        {
          rate: 2,
          amount: 0,
        },
        {
          rate: 1,
          amount: 0,
        },
      ];

      localStorage.setItem(
        'products',
        JSON.stringify([...this.products(), productData])
      );

      onSuccess(`/product/edit/${productData.usin}`);
    } else {
      const newProducts = this.products();

      const productIndex = newProducts.findIndex(
        ({ usin }) => usin === productData.usin
      );

      newProducts[productIndex] = {
        ...newProducts[productIndex],
        ...productData,
      };

      localStorage.setItem('products', JSON.stringify(newProducts));
      onSuccess(`/product/list`);
    }
  };

  getProductByUsin = (productUsin) => {
    return this.products().find(({ usin }) => usin === productUsin);
  };

  tagsTree = () => {
    return unflatten(tagsSample);
  };
}
