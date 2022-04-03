import productsSample from '../../../mock/products-sample.json';

export const searchProduct = (searchValue) => {
  if (!searchValue) {
    return productsSample.products;
  }

  const value = searchValue.toLowerCase();

  return productsSample.products.filter(
    ({ title, attributes: { author }, description }) =>
      title.toLowerCase().includes(value) ||
      author.toLowerCase().includes(value) ||
      description.toLowerCase().includes(value)
  );
};
