import { Card, Rate, Descriptions, Statistic } from 'antd';
import Title from 'antd/es/typography/Title';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { calculateProductRating } from '../../../../../utils/calculateProductRating';

import styles from './Product.module.css';

const Product = ({
  usin,
  title,
  images,
  ratings,
  attributes: { author },
  sellOptions,
}) => {
  const rating = React.useMemo(() => calculateProductRating(ratings), [ratings]);

  const navigate = useNavigate();

  const onProductClick = React.useCallback(() => {
    navigate(`/product/${usin}`);
  }, [usin]);

  return (
    <Card
      className={styles['product']}
      hoverable
      size="small"
      onClick={onProductClick}
    >
      <div
        className={styles['product__image']}
        style={{ backgroundImage: `url(${images[0]})` }}
      />
      <div>
        <Title level={3}>{title}</Title>
        <Rate value={rating.totalRating} allowHalf />
        <span className={styles['product__total-rates']}>
          {rating.totalRating.toPrecision(3)} ({rating.totalRates} ratings)
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
      </div>
    </Card>
  );
};

export default React.memo(Product);
