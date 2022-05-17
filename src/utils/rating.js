export const calcRating = (ratings) => {
    const ratings_agg = ratings.reduce((a, b) => (
        {
            sum: a.sum + b.rate * b.amount, 
            amount: a.amount + b.amount
        }
    ),
    {
        sum: 0,
        amount: 0
    }    
    );
    return {
        "rating": ratings_agg.amount === 0 ? 0 : (ratings_agg.sum / ratings_agg.amount).toFixed(2),
        "votes": ratings_agg.amount
    }
}
