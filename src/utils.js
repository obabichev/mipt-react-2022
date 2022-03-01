export const countProductMetrics = (product) => {
    return product.ratings.reduce(([currentCount, currentSum], {rate, amount}) => {
        return [currentCount + amount, currentSum + rate * amount];
    }, [0, 0]);
}