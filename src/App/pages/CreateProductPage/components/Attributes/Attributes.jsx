import Title from 'antd/es/typography/Title';
import * as React from 'react';

import productsSample from '../../../../../mock/products-sample.json';
import { Form, Input } from 'antd';

const attributes = Object.keys(
  productsSample.products.reduce(
    (acc, { attributes }) => ({ ...acc, ...attributes }),
    {}
  )
).map((attribute) => ({
  name: attribute,
  label: `${attribute.charAt(0).toUpperCase()}${attribute.slice(1)}`,
}));

const Attributes = () => (
  <>
    <Title level={5}>Product attributes</Title>
    {attributes.map(({ name, label }) => (
      <Form.Item name={name} label={label} key={label}>
        <Input />
      </Form.Item>
    ))}
  </>
);

export default Attributes;
