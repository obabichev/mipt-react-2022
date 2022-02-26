import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './ProductSellOptions.css'


export const ProductSellOptions = ({sellOptions}) => {
    return <Container className="product-sell-options">
        <Row>
        {
            sellOptions.map(sellOption =>
                <Col md="auto" className="product-sell-option">
                    <Button>
                    <Row>
                        <span className="product-sell-option__type">
                            {sellOption.type}
                        </span>
                    </Row>
                    <Row>
                        <span className="product-sell-option__price">
                            {sellOption.price} {sellOption.currency}
                        </span>
                    </Row>
                    </Button>
                </Col>
            )
        }
        </Row>
    </Container>;
}
