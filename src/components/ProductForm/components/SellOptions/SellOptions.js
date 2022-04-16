import * as React from 'react';
import { Button, Col } from 'antd';
import Title from 'antd/es/typography/Title';

import SellOption from './components/SellOption';

const SellOptions = ({ values, setValues }) => {
  const onAddOneMoreOption = () => {
    setValues([...values, { type: '', price: '' }]);
  };

  const onDeleteOption = (optionIndex) => {
    setValues(values.filter((option, index) => optionIndex !== index));
  };

  const onFillOption = (index, value) => {
    const newValues = [...values];

    if (newValues[index]) {
      newValues[index] = value;
    } else {
      newValues.push(value);
    }

    setValues(newValues);
  };

  const onlyOneOption = values.length !== 1;

  return (
    <>
      <Title level={5}>Sells options</Title>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {values.map((value, index) => (
          <Col key={index} span={4} style={{ margin: '20px 0' }}>
            <SellOption
              value={value}
              setValue={(value) => onFillOption(index, value)}
            />
            {onlyOneOption && (
              <Button
                block
                style={{ marginTop: '20px' }}
                onClick={() => onDeleteOption(index)}
              >
                Delete option
              </Button>
            )}
          </Col>
        ))}
      </div>

      <div style={{ margin: '12px 0 20px', height: '100px' }}>
        <Button onClick={onAddOneMoreOption}>Add one more option</Button>
      </div>
    </>
  );
};

export default SellOptions;
