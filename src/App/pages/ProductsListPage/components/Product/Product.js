import * as React from 'react';
import { Card, Rate, Image, Descriptions, Statistic } from 'antd';
import Title from 'antd/es/typography/Title';

import { getRating } from './utils';
import styles from './Product.module.css';

const Product = ({
  title,
  images,
  ratings,
  attributes: { author },
  sellOptions,
}) => {
  const [rating] = React.useState(getRating(ratings));

  return (
    <Card
      className={styles['product']}
      bodyStyle={{ marginLeft: '20px' }}
      hoverable
      size="small"
      cover={<Image src={images[0]} alt={title} height={220} width={165} />}
    >
      <Title level={3}>{title}</Title>
      <Rate value={rating.totalRating} allowHalf />
      <span className={styles['product__total-rates']}>
        {rating.totalRates}
      </span>
      <Descriptions className={styles['product__description']}>
        <Descriptions.Item label="Author">{author}</Descriptions.Item>
      </Descriptions>
      <div className={styles['sell-options']}>
        {sellOptions.map(({ price, currency, type }) => (
          <div key={type} className={styles['sell-options__item']}>
            <Statistic
              key={type}
              precision={2}
              title={type}
              value={`${price} ${currency}`}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default React.memo(Product);
