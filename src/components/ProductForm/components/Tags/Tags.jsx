import * as React from 'react';
import Title from 'antd/es/typography/Title';
import { TreeSelect } from 'antd';

import store from '../../../../../store';

const Tags = ({ value, setValue }) => (
  <>
    <Title level={5}>Tags</Title>
    <TreeSelect
      style={{ width: '100%' }}
      showSearch
      treeDefaultExpandAll
      value={value}
      onChange={setValue}
      treeData={store.tagsTree()}
    />
  </>
);

export default Tags;
