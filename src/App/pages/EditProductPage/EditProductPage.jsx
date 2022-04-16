import * as React from 'react';
import { Navigate, useParams } from 'react-router-dom';

import ProductForm from '../../../components/ProductForm';
import store from '../../../store';

const EditProductPage = () => {
  const { usin } = useParams();

  const product = store.getProductByUsin(usin);
  console.log(product);

  if (!product) {
    return <Navigate to="/product/create" replace />;
  }

  return <ProductForm productData={store.getProductByUsin(usin)} />;
};

export default EditProductPage;
