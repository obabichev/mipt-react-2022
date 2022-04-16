import {
  Breadcrumb,
  Button,
  Carousel,
  Descriptions,
  Layout,
  Progress,
  Rate,
  Statistic,
} from 'antd';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import * as React from 'react';
import { useParams } from 'react-router-dom';

import productsSample from '../../../mock/products-sample';
import { calculateProductRating } from '../../../utils/calculateProductRating';

import Breadcrumbs from './components/Breadcrumbs';

import styles from './ProductPage.module.css';

const ProductPage = () => {
  const { usin } = useParams();

  const {
    images,
    title,
    description,
    attributes: { author, publisher, language, dimensions, paperback },
    ratings,
    sellOptions,
    tag,
  } = React.useMemo(
    () => productsSample.products.find((product) => product.usin === usin),
    [usin]
  );

  const rating = React.useMemo(
    () => calculateProductRating(ratings),
    [ratings]
  );

  return (
    <Layout>
      <Layout.Sider
        className={`${styles['block']} ${styles['block_left']}`}
        width={440}
        theme="light"
      >
        <div className={styles['carousel']}>
          <Carousel dots={{ className: styles['carousel__dots'] }} autoplay>
            {images.map((image, index) => (
              <div className={styles['carousel__slide']} key={index}>
                <img
                  src={image}
                  key={index}
                  width="300px"
                  height="400px"
                  alt=""
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className={styles['sell-options']}>
          {sellOptions.map(({ price, currency, type }) => (
            <Button className={styles['sell-option']} block size="large">
              <Statistic
                className={styles['sell-option__stat']}
                key={type}
                precision={2}
                title={type}
                value={`${price} ${currency}`}
              />
            </Button>
          ))}
        </div>
      </Layout.Sider>
      <Layout.Content className={styles['block']}>
        <Breadcrumb>
          <Breadcrumbs tag={tag} />
        </Breadcrumb>
        <Title className={styles['title']}>{title}</Title>
        <Text>{description}</Text>
        <Descriptions className={styles['description']} column={1}>
          <Descriptions.Item label="Author">{author}</Descriptions.Item>
          <Descriptions.Item label="Publisher">{publisher}</Descriptions.Item>
          <Descriptions.Item label="Language">{language}</Descriptions.Item>
          <Descriptions.Item label="Dimensions">{dimensions}</Descriptions.Item>
          <Descriptions.Item label="Paperback">{paperback}</Descriptions.Item>
        </Descriptions>
        <div className={styles['rating']}>
          <Rate value={rating.totalRating} allowHalf />
          <span className={styles['total-rates']}>
            {rating.totalRating.toPrecision(3)} ({rating.totalRates} rates)
          </span>
        </div>
        <div className={styles['stats']}>
          {ratings.map(({ rate, amount }) => (
            <div key={rate}>
              <div>{rate} stars</div>
              <Progress
                percent={Math.ceil((amount / rating.totalRates) * 100)}
              />
            </div>
          ))}
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default ProductPage;
