import * as React from 'react';
import Title from 'antd/es/typography/Title';
import { TreeSelect } from 'antd';

import tagsSample from '../../../../../mock/tags-sample.json';

import { unflatten } from './utils';

const tagsTree = unflatten(tagsSample);

const Tags = ({ value, setValue }) => (
  <>
    <Title level={5}>Tags</Title>
    <TreeSelect
      style={{ width: '100%' }}
      showSearch
      treeDefaultExpandAll
      value={value}
      onChange={setValue}
      treeData={tagsTree}
    />
  </>
);

export default Tags;
