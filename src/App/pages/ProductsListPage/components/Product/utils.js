export const getRating = (ratings) => {
  const totalRates = ratings.reduce((acc, { amount }) => acc + amount, 0);

  return {
    totalRating:
      ratings.reduce((acc, { rate, amount }) => acc + rate * amount, 0) /
      totalRates,
    totalRates,
  };
};
