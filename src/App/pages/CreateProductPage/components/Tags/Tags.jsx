import * as React from 'react';
import Title from 'antd/es/typography/Title';
import { Form, TreeSelect } from 'antd';

import tagsSample from '../../../../../mock/tags-sample.json';

import { unflatten } from './utils';

const tagsTree = unflatten(tagsSample);

const Tags = () => (
  <>
    <Title level={5}>Tags</Title>
    <Form.Item name="tag" label="Tag">
      <TreeSelect showSearch treeDefaultExpandAll treeData={tagsTree} />
    </Form.Item>
  </>
);

export default Tags;
