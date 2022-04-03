import { Select, Divider, Input, Typography, Space, Form } from 'antd';
import * as React from 'react';
import { PlusOutlined } from '@ant-design/icons';

import productsSample from '../../../../../mock/products-sample.json';

const initialOptionsTypes = Object.keys(
  productsSample.products.reduce((acc, product) => {
    const options = product.sellOptions
      .map(({ type }) => type)
      .reduce((acc, optionType) => ({ ...acc, [optionType]: true }), acc);

    return { ...acc, ...options };
  }, {})
);

const SellOption = ({ index }) => {
  const [options, setOptions] = React.useState(initialOptionsTypes);
  const [selectedOption, setSelectedOption] = React.useState('');

  const onSelectOption = (event) => {
    setSelectedOption(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();

    if (!selectedOption) {
      return;
    }
    setOptions([...options, selectedOption]);
    setSelectedOption('');
  };

  return (
    <>
      <Form.Item name={`type-${index}`} label="Type">
        <Select
          style={{ width: 300 }}
          placeholder="Choose sell option"
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider style={{ margin: '12px 0' }} />
              <Space align="center" style={{ padding: '0 12px 4px' }}>
                <Input
                  placeholder="Please enter item"
                  value={selectedOption}
                  onChange={onSelectOption}
                />
                <Typography.Link
                  onClick={addItem}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <PlusOutlined /> Add item
                </Typography.Link>
              </Space>
            </>
          )}
        >
          {options.map((option) => (
            <Select.Option key={option}>{option}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name={`price-${index}`} label="Price">
        <Input suffix={<span>EUR</span>} />
      </Form.Item>
    </>
  );
};

export default SellOption;
