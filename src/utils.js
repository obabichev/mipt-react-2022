export const countProductMetrics = (product) => {
    if (!product.ratings) {
        return [0, 0];
    }

    return product.ratings.reduce(([currentCount, currentSum], {rate, amount}) => {
        return [currentCount + amount, currentSum + rate * amount];
    }, [0, 0]);
}