import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import '../css/Ecommerce.css';
import Product from '../Components/Product';
import Message from '../../../Components/Message';
import Loader from '../../../Components/Loader';
import Paginate from '../../../Components/Paginate';
import ProductCarousel from '../Components/ProductCarousel';
import { listProducts } from '../../../redux/action/ecommerceActions';
const ECommerce = () => {
  const pageNumber = 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(pageNumber));
  }, [dispatch, pageNumber]);

  return (
    <>
      <ProductCarousel />
      <h1 className='mt-4'>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} />
        </>
      )}
    </>
  );
};

export default ECommerce;
