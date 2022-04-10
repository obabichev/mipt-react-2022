import { Breadcrumb } from 'antd';
import * as React from 'react';

import tagsSample from '../../../../../mock/tags-sample.json';

const Breadcrumbs = ({ tag }) => {
  const node = tagsSample.find(({ key }) => key === tag);

  if (!node.parent) {
    return <Breadcrumb.Item>{node.title}</Breadcrumb.Item>;
  }

  const nodeParent = tagsSample.find(({ key }) => key === node.parent);

  return (
    <>
      <Breadcrumb.Item>{node.title}</Breadcrumb.Item>
      <Breadcrumbs tag={nodeParent.key} />
    </>
  );
};

export default Breadcrumbs;
