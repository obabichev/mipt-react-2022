import { Button, Divider, Form, Input, Layout, Select, TreeSelect } from 'antd';
import Title from 'antd/es/typography/Title';
import * as React from 'react';

import SellOption from './components/SellOption';

import styles from './CreateProductPage.module.css';
import Attributes from './components/Attributes';
import Tags from './components/Tags';

const CreateProductPage = () => {
  const [sellOptions, setSellOptions] = React.useState([{}]);

  const onAddOneMoreOption = React.useCallback(() => {
    setSellOptions((sellOptions) => [...sellOptions, {}]);
  }, []);

  const onDeleteOption = (optionIndex) => {
    setSellOptions((sellOptions) =>
      sellOptions.filter((option, index) => optionIndex !== index)
    );
  };

  return (
    <Layout>
      <Layout.Content className={styles['form']}>
        <Title level={1}>Create new product</Title>

        <Form scrollToFirstError>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: 'Enter product title',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea maxLength={200} />
          </Form.Item>

          <Divider />
          <Attributes />

          <Divider />
          <Tags />

          <Divider />
          <Title level={5}>Sells options</Title>

          {sellOptions.map((option, index) => (
            <React.Fragment key={index}>
              <SellOption index={index + 1} />
              {sellOptions.length !== 1 && (
                <Button onClick={() => onDeleteOption(index)}>
                  Delete option
                </Button>
              )}
              {index !== sellOptions.length - 1 && <Divider />}
            </React.Fragment>
          ))}
          <div style={{ padding: '20px 0' }}>
            <Button onClick={onAddOneMoreOption}>Add one more option</Button>
          </div>
        </Form>
      </Layout.Content>
    </Layout>
  );
};

export default CreateProductPage;
