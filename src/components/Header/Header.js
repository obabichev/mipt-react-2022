import { Layout } from 'antd';
import * as React from 'react';
import { AmazonOutlined } from '@ant-design/icons';

import styles from './Header.module.css';

const Header = () => (
  <Layout.Header>
    <div className={styles['logo']}>
      <AmazonOutlined />
      <span className={styles['logo__text']}>mazon</span>
    </div>
  </Layout.Header>
);

export default Header;
