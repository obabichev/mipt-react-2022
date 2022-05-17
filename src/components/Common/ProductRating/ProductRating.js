import Container from 'react-bootstrap/Container';

import {calcRating} from 'utils/rating'

import './ProductRating.css'


export const ProductRating = ({ratings}) => {
    const rating = calcRating(ratings);
    return <Container className="product-rating">
        {
            rating.votes === 0 ? <span>No rating yet</span> :  <span> <b>Rating: {rating.rating} </b> (average based on {rating.votes} votes)</span>
        }
    </Container>
}
