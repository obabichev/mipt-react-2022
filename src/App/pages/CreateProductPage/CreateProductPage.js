import { Divider, Form, Input, Layout } from 'antd';
import Title from 'antd/es/typography/Title';
import * as React from 'react';
import { useFormik } from 'formik';

import productsSample from '../../../mock/products-sample.json';

import Attributes from './components/Attributes';
import Tags from './components/Tags';
import SellOptions from './components/SellOptions';
import Images from './components/Images';

import styles from './CreateProductPage.module.css';

const attributes = productsSample.products
  .map((product) => {
    for (const attribute in product.attributes) {
      product.attributes[attribute] = '';
    }

    return product;
  })
  .reduce((acc, { attributes }) => ({ ...acc, ...attributes }), {});

const CreateProductPage = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      attributes,
      images: [''],
      sellOptions: [{}],
      tag: '',
    },
    // validationSchema: {},
    onSubmit: () => {},
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
        </Form>
      </Layout.Content>
    </Layout>
  );
};

export default CreateProductPage;
