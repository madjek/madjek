import React, { useEffect } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../../../Components/Loader';
import Message from '../../../Components/Message';
import {
  dayChart,
  getCryptoDetails,
  monthChart,
  weekChart,
} from '../../../redux/action/cryptoActions';
import CoinChart from '../Components/CoinChart';

const CryptoDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const cryptoDetails = useSelector((state) => state.cryptoDetails);
  const { loading, error, crypto } = cryptoDetails;
  const cryptoCharts = useSelector((state) => state.cryptoCharts);
  const { day, week, month } = cryptoCharts;

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

  return (
    <Row className='justify-content-center'>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row className=' my-3'>
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
