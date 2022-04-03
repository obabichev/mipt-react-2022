import * as React from 'react';
import { Layout } from 'antd';

import productsSample from '../../../mock/products-sample';
import tagsSample from '../../../mock/tags-sample.json';

import Product from './components/Product';
import Tags from './components/Tags';

import styles from './ProductsListPage.module.css';

const ProductsListPage = () => (
  <Layout>
    <Layout.Sider
      className={styles['slider']}
      theme="light"
      collapsible={false}
      width={250}
    >
      <Tags tagsTree={tagsSample} />
    </Layout.Sider>
    <Layout.Content>
      {productsSample.products.map((product) => (
        <Product key={product.usin} {...product} />
      ))}
    </Layout.Content>
  </Layout>
);

export default ProductsListPage;
