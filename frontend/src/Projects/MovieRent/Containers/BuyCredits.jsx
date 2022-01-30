import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../Components/Loader';
import Message from '../../../Components/Message';
import { buyCredits } from '../../../redux/action/movierentAction';
import MovieCoin from '../Components/MovieCoin';

const BuyCredits = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [amount, setAmount] = useState(1);
  const [total, setTotal] = useState(amount);
  const movieCredits = useSelector((state) => state.movieCredits);
  const { success, error } = movieCredits;

  const history = useNavigate();
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      history('/login');
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    addPayPalScript();
  }, [dispatch, history, userInfo]);

  useEffect(() => {
    setTotal(2 * amount);
  }, [amount]);

  const successPaymentHandler = () => {
    dispatch(buyCredits(amount));
  };

  if (success) {
    setTimeout(() => {
      history('/profile');
    }, 2000);
  }

  if (error) {
    setTimeout(() => {
      movieCredits.error = null;
    }, 1);
  }

  return (
    <Row className='justify-content-md-center mt-5'>
      <Col md={6}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Col className='text-center fs-1'>Buy Credits</Col>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row className='fs-4'>
                <Col xs={4}>Price:</Col>
                <Col>
                  <MovieCoin> 1</MovieCoin> = $2
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row className='fs-4'>
                <Col xs={4}>Amount: </Col>
                <Col xs={3}>
                  <Form.Control
                    type='number'
                    size='sm'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  ></Form.Control>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row className='fs-4'>
                <Col xs={4}>Total:</Col>
                <Col>${total}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              {!sdkReady ? (
                <Loader />
              ) : (
                <PayPalButton
                  amount={total}
                  onSuccess={successPaymentHandler}
                />
              )}
            </ListGroup.Item>
          </ListGroup>
        </Card>
        <Col className='text-center'>
          {success && (
            <Message variant='success'>Credits successfully purchased</Message>
          )}
          {error && <Message variant='danger'>{error}</Message>}
        </Col>
      </Col>
    </Row>
  );
};

export default BuyCredits;
