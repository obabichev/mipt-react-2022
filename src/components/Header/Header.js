import { Layout } from 'antd';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { AmazonOutlined } from '@ant-design/icons';

import styles from './Header.module.css';

const Header = () => {
  const navigate = useNavigate();

  const onLogoClick = React.useCallback(() => {
    navigate('/product/list');
  }, []);

  return (
    <Layout.Header>
      <div className={styles['logo']} onClick={onLogoClick}>
        <AmazonOutlined />
        <span className={styles['logo__text']}>mazon</span>
      </div>
    </Layout.Header>
  );
};

export default Header;
