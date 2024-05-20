import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Product = ({ product }) => {
  return (
    <div data-aos="fade-up" data-aos-duration="3000">
      
      <Card className='my-3 p-3 rounded'>
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant='top' />
        </Link>

        <Card.Body>
  <Link to={`/product/${product._id}`}>
    <Card.Title as='div' className='product-title'>
      <strong>{product.name}</strong>
    </Card.Title>
  </Link>

  <Card.Text as='div'>
    <Rating
      value={product.rating}
      text={`${product.numReviews} reviews`}
    />
  </Card.Text>

  <Card.Text as='h3' style={{ marginBottom: '10px' }}>
    ${product.price}
  </Card.Text>

  {/* Button appears on hover */}
  <div className='card-button-container'>
    <Button
      variant='primary'
      className='card-button'
    >
      View Details
    </Button>
  </div>
</Card.Body>

      </Card>
    </div>
  );
};

export default Product;
