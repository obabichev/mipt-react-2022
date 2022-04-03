import { Button, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import * as React from 'react';

const Images = ({ values, setValues }) => {
  const onAddOneMoreImage = () => {
    setValues([...values, '']);
  };

  const onDeleteImage = (imageValue) => {
    setValues(values.filter((value) => value !== imageValue));
  };

  const onInputChange = (value, imageIndex) => {
    const newValues = [...values];
    newValues[imageIndex] = value;
    setValues(newValues);
  };

  const onlyOneImage = values.length !== 1;

  return (
    <>
      <Title level={5}>Images</Title>
      {values.map((imageValue, index) => (
        <React.Fragment key={index}>
          <Input
            name={`image-${index + 1}`}
            value={imageValue}
            placeholder="image URL"
            onChange={(event) => {
              onInputChange(event.target.value, index);
            }}
          />
          {onlyOneImage && (
            <Button
              style={{ margin: '12px 0' }}
              onClick={() => onDeleteImage(imageValue)}
            >
              <DeleteOutlined />
              Delete
            </Button>
          )}
        </React.Fragment>
      ))}
      <Button style={{ margin: '12px 0' }} block onClick={onAddOneMoreImage}>
        Add one more image
      </Button>
    </>
  );
};

export default Images;
