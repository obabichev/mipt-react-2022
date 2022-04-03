import Title from 'antd/es/typography/Title';
import * as React from 'react';

import { Input } from 'antd';

const Attributes = ({ values, setValues }) => {
  const onChange = (event, key) => {
    setValues({ ...values, [key]: event.target.value });
  };

  return (
    <>
      <Title level={5}>Product attributes</Title>
      {Object.entries(values).map(([key, value]) => (
        <Input
          key={key}
          name={key}
          value={value}
          onChange={(event) => onChange(event, key)}
          placeholder={key}
        />
      ))}
    </>
  );
};

export default Attributes;
