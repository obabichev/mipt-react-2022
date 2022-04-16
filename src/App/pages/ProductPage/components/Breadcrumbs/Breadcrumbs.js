import { Breadcrumb } from 'antd';
import * as React from 'react';

import store from '../../../../../store';

const Breadcrumbs = ({ tag }) => {
  const node = store.tags().find(({ key }) => key === tag);

  if (!node.parent) {
    return <Breadcrumb.Item>{node.title}</Breadcrumb.Item>;
  }

  const nodeParent = store.tags().find(({ key }) => key === node.parent);

  return (
    <>
      <Breadcrumb.Item>{node.title}</Breadcrumb.Item>
      <Breadcrumbs tag={nodeParent.key} />
    </>
  );
};

export default Breadcrumbs;
