import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  FormControl,
  Image,
  InputGroup,
  Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../../../Components/Loader';
import Message from '../../../Components/Message';
import {
  addCoinPortfolio,
  dayChart,
  getCryptoDetails,
  monthChart,
  weekChart,
} from '../../../redux/action/cryptoActions';
import { ADD_COIN_PORTFOLIO_RESET } from '../../../redux/constants/crypto';
import CoinChart from '../Components/CoinChart';

const CryptoDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user;
  const cryptoDetails = useSelector((state) => state.cryptoDetails);
  const { loading, error, crypto } = cryptoDetails;
  const cryptoCharts = useSelector((state) => state.cryptoCharts);
  const { day, week, month } = cryptoCharts;
  const addCoin = useSelector((state) => state.addCoin);
  const { success, error: erroraddCoin } = addCoin;
  const [message, setMessage] = useState(null);
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const volume = price * qty;

  useEffect(() => {
    dispatch(getCryptoDetails(id));
    dispatch(dayChart(id));
    dispatch(weekChart(id));
    dispatch(monthChart(id));
  }, [dispatch, id]);

  const textColor = (value) => {
    if (value > 0) {
      return 'lightgreen';
    } else {
      return 'red';
    }
  };

  const RenderHTML = () => {
    const htmlPart = crypto?.description.en;
    return <div dangerouslySetInnerHTML={{ __html: htmlPart }} />;
  };

  const addCoinHandler = () => {
    if (!userInfo) {
      setMessage('You should login to add coin');
    } else if (volume === 0) {
      setMessage('You should add purchase data');
    } else {
      let data = {
        user: userInfo._id,
        id: crypto?.id,
        rank: crypto?.market_cap_rank,
        symbol: crypto?.symbol.toUpperCase(),
        price: price,
        currentPrice: crypto?.market_data.current_price.usd,
        qty: qty,
        volume: volume,
      };
      dispatch(addCoinPortfolio(data));
    }
  };

  if (message) {
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  }
  if (success) {
    setTimeout(() => {
      dispatch({ type: ADD_COIN_PORTFOLIO_RESET });
    }, 2000);
  }

  return (
    <Row className='justify-content-center'>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row className='justify-content-center my-3'>
          <Col className='d-block fs-1'>
            <Row>
              <Col xs={5}>
                <Image
                  src={crypto?.image.large}
                  alt={crypto?.name}
                  style={{ height: '1.5em' }}
                  className='mx-2'
                />
                {crypto?.symbol.toUpperCase()}
              </Col>
              <Col>
                <a
                  href={crypto?.links.homepage[0]}
                  className='text-decoration-none text-white'
                >
                  {crypto?.name}
                </a>
              </Col>
            </Row>
          </Col>
          <Col className='fs-1'>
            <Row>
              <Col>
                $
                {crypto?.market_data.current_price.usd
                  .toFixed(8)
                  .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                  .replace(/0{1,6}$/, '')}
              </Col>
              <Col
                style={{
                  color: textColor(
                    crypto?.market_data.price_change_percentage_24h
                  ),
                }}
              >
                {crypto?.market_data.price_change_percentage_24h.toFixed(2)}%
              </Col>
            </Row>
          </Col>
          <Row className='justify-content-center text-center my-3'>
            <Row>
              <h1>Charts</h1>
            </Row>
            <Col md={4}>
              Daily
              <CoinChart priceChart={day} period='day' />
            </Col>
            <Col md={4}>
              Wekly <CoinChart priceChart={week} period='week' />
            </Col>
            <Col md={4}>
              Monthly
              <CoinChart priceChart={month} period='month' />
            </Col>
          </Row>
          <Row className='justify-content-center text-center my-3'>
            <h1>Track Investments</h1>
            <Card className='px-4' bg='dark'>
              <Row className='align-items-end mt-2 mb-3'>
                <Col md={3}>
                  <Form.Label className='mt-md-0 mb-0'>
                    PURCHASE PRICE
                  </Form.Label>
                  <InputGroup className='bg-dark'>
                    <InputGroup.Text>$</InputGroup.Text>
                    <FormControl
                      type='number'
                      aria-label='Purchase price'
                      value={price}
                      step='0.01'
                      min='0'
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </InputGroup>
                </Col>
                <Col md={3}>
                  <Form.Label className='mt-md-0 mb-0 mt-2'>
                    QUANTITY
                  </Form.Label>
                  <InputGroup className='bg-dark'>
                    <FormControl
                      type='number'
                      aria-label='Quantity'
                      value={qty}
                      step='0.01'
                      min='0'
                      onChange={(e) => setQty(e.target.value)}
                      required
                    />
                  </InputGroup>
                </Col>
                <Col md={4}>
                  <Form.Label className='mt-md-0 mb-0 mt-2'>VOLUME</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>$</InputGroup.Text>
                    <FormControl
                      readOnly
                      aria-label='Volume'
                      value={volume
                        .toFixed(8)
                        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                        .replace(/0{1,6}$/, '')}
                    />
                  </InputGroup>
                </Col>
                <Col md={2} className='d-grid'>
                  <Button
                    type='button'
                    className='btn-block mt-4'
                    onClick={addCoinHandler}
                  >
                    Add
                  </Button>
                </Col>
              </Row>
              {message && <Message>{message}</Message>}
              {success && (
                <Message variant='success'>Coin added successfully</Message>
              )}
              {erroraddCoin && (
                <Message variant='danger'>{erroraddCoin}</Message>
              )}
            </Card>
          </Row>
          {crypto?.description.en && (
            <Row className='my-3'>
              <h1 className='text-center'>What Is {crypto?.name}?</h1>
              <Row>{RenderHTML(crypto?.description.en)}</Row>
            </Row>
          )}
        </Row>
      )}
    </Row>
  );
};

export default CryptoDetails;
