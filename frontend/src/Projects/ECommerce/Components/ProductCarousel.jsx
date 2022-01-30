import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../Components/Loader';
import Message from '../../../Components/Message';
import { listTopProducts } from '../../../redux/action/ecommerceActions';

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel variant='dark' pause='hover' className='bg-white'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/projects/ecommerce/product/${product._id}`}>
            <Image
              className='my-5 pt-5'
              src={product.image}
              alt={product.name}
              fluid
            />
            <Carousel.Caption className='carousel-caption'>
              <h2
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                }}
              >
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
