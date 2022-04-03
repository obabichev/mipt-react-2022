import { Button, Divider, Form, Input, Layout } from 'antd';
import Title from 'antd/es/typography/Title';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import store from '../../store';

import Attributes from './components/Attributes';
import Tags from './components/Tags';
import SellOptions from './components/SellOptions';
import Images from './components/Images';

import styles from './ProductForm.module.css';

const ProductForm = ({ productData }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: productData || {
      title: '',
      description: '',
      attributes: store.productAttributes(),
      images: [''],
      sellOptions: [{}],
      tag: '',
    },
    onSubmit: (values) => {
      store.addProduct(values, () => navigate('/list'));
    },
  });

  return (
    <Layout>
      <Layout.Content className={styles['form']}>
        <Title level={1}>Create new product</Title>

        <Form onSubmit={formik.handleSubmit}>
          <Input
            name="title"
            placeholder="title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />

          <Input.TextArea
            name="description"
            placeholder="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />

          <Divider />
          <Images
            values={formik.values.images}
            setValues={(values) => formik.setFieldValue('images', values)}
          />

          <Divider />
          <Attributes
            values={formik.values.attributes}
            setValues={(values) => formik.setFieldValue('attributes', values)}
          />

          <Divider />
          <Tags
            value={formik.values.tag}
            setValue={(value) => formik.setFieldValue('tag', value)}
          />

          <Divider />
          <SellOptions
            values={formik.values.sellOptions}
            setValues={(values) => formik.setFieldValue('sellOptions', values)}
          />

          <Button type="primary" onClick={formik.handleSubmit}>
            {!productData ? 'Add product' : 'Edit product'}
          </Button>
        </Form>
      </Layout.Content>
    </Layout>
  );
};

export default ProductForm;
