import { Select, Divider, Input, Typography, Space, Form, Row } from 'antd';
import * as React from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import store from '../../../../../../../store';

const SellOption = ({ value, setValue }) => {
  const [options, setOptions] = React.useState(store.productSellOptionsTypes());
  const [newOption, setNewOption] = React.useState('');

  const onAddOption = () => {
    if (!newOption) {
      return;
    }

    setOptions([...options, newOption]);
    setNewOption('');
  };

  const onRemoveOption = (event, deletedOption) => {
    event.stopPropagation();
    setOptions(options.filter((option) => option !== deletedOption));
  };

  const onSelectChange = (valueType) => {
    setValue({ type: valueType, price: value[valueType]?.price || '' });
  };

  const onInputChange = (event) => {
    setValue({ type: value.type, price: event.target.value });
  };

  return (
    <>
      <Row>
        <Select
          style={{ width: 300 }}
          onChange={onSelectChange}
          placeholder="Choose sell option"
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider style={{ margin: '12px 0' }} />
              <Space align="center" style={{ padding: '0 12px 4px' }}>
                <Input
                  placeholder="Enter option type"
                  value={newOption}
                  onChange={(event) => setNewOption(event.target.value)}
                />
                <Typography.Link
                  onClick={onAddOption}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <PlusOutlined /> Add item
                </Typography.Link>
              </Space>
            </>
          )}
        >
          {options.map((option) => (
            <Select.Option key={option} style={{ position: 'relative' }}>
              {option}
              <DeleteOutlined
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translate(0, -50%)',
                }}
                onClick={(event) => onRemoveOption(event, option)}
              />
            </Select.Option>
          ))}
        </Select>
      </Row>
      <Row style={{ marginTop: '20px' }}>
        <Input
          value={value.price}
          onChange={onInputChange}
          suffix={<span>EUR</span>}
          style={{ width: 300 }}
        />
      </Row>
    </>
  );
};

export default SellOption;
