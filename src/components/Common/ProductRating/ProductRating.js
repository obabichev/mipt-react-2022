import Container from 'react-bootstrap/Container';

import './ProductRating.css'


export const ProductRating = (props) => {
    let ratings_agg = props.ratings.reduce((a, b) => (
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
    let avg_rating = (ratings_agg.sum / ratings_agg.amount).toFixed(2);
    return <Container className="product-rating">
        <span> <b>Rating: {avg_rating} </b> (average based on {ratings_agg.amount} votes)</span>
    </Container>
}
