import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Product = ({ product }) => {
  return (
    <div data-aos="fade-up" data-aos-duration="3000">
      <style>
        {`
          .card {
            overflow: hidden;
            transition: height 0.3s ease, box-shadow 0.3s ease;
            border: 1px solid rgba(0, 0, 0, 0.125); /* Add a border to maintain layout when card expands */
            position: relative; /* Set position to relative */
          }

          .card:hover {
            height: auto; /* Set height to auto to expand the card */
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Add a box-shadow to highlight the card */
          }

          .card-body {
            position: relative; /* Set position to relative for containing absolute positioned elements */
            margin-bottom: 40px; /* Add margin to the bottom of the card body */
          }

          .card-button-container {
            position: absolute;
            bottom: 20px; /* Adjust the position of the button */
            left: 50%;
            transform: translateX(-50%);
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .card:hover .card-button-container {
            opacity: 1;
          }

          .card-button {
            width: 150px; /* Set a fixed width for the button */
            margin: 5px;
          }
        `}
      </style>
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
