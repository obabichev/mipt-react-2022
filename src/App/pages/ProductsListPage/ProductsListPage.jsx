import { Input, Layout } from 'antd';
import * as React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import tagsSample from '../../../mock/tags-sample.json';

import Product from './components/Product';
import Tags from './components/Tags';

import styles from './ProductsListPage.module.css';
import { searchProduct } from './utils';

const ProductsListPage = () => {
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = React.useState(
    searchParams.get('search') || null
  );

  const [products, setProducts] = React.useState(searchProduct(searchValue));

  const onSearchProduct = React.useCallback((searchValue) => {
    setSearchValue(searchValue || null);
    setProducts(searchProduct(searchValue));
  }, []);

  const navigate = useNavigate();

  React.useEffect(() => {
    navigate({
      path: '/',
      search: !searchValue ? '' : `?search=${searchValue}`,
    });
  }, [searchValue]);

  return (
    <Layout>
      <Layout.Sider
        className={styles['slider']}
        theme="light"
        collapsible={false}
        width={250}
      >
        <Tags tagsTree={tagsSample} />
      </Layout.Sider>
      <Layout.Content className={styles['content']}>
        <Input.Search
          style={{
            display: 'block',
            margin: '12px 0',
          }}
          size="large"
          placeholder="Search here"
          enterButton
          defaultValue={searchValue}
          onSearch={onSearchProduct}
        />
        {products.map((product) => (
          <Product key={product.usin} {...product} />
        ))}
      </Layout.Content>
    </Layout>
  );
};

export default ProductsListPage;
