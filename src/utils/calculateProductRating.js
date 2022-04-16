export const calculateProductRating = (ratings) => {
  const totalRates = ratings.reduce((acc, { amount }) => acc + amount, 0);

  return {
    totalRating: !totalRates
      ? 0
      : ratings.reduce((acc, { rate, amount }) => acc + rate * amount, 0) /
        totalRates,
    totalRates,
  };
};
