import * as React from 'react';

import Product from './components/Product';

import sample from '../../../mock/products-sample';

const ProductsListPage = () => (
  <div>
    {sample.products.map((product) => (
      <Product key={product.usin} {...product} />
    ))}
  </div>
);

export default ProductsListPage;
