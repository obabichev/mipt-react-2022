import Container from 'react-bootstrap/Container';

<<<<<<< HEAD
import {calcRating} from 'utils/rating'

import './ProductRating.css'


export const ProductRating = ({ratings}) => {
    const rating = calcRating(ratings);
    return <Container className="product-rating">
        {
            rating.votes === 0 ? <span>No rating yet</span> :  <span> <b>Rating: {rating.rating} </b> (average based on {rating.votes} votes)</span>
        }
=======
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
>>>>>>> hw1v1
    </Container>
}
