import React from 'react';
import '../css/CryptoInfo.css';
import { useEffect } from 'react';
import { Image, ProgressBar, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cryptoList } from '../../../redux/action/cryptoActions';
import Loader from '../../../Components/Loader';
import Message from '../../../Components/Message';

const CryptoInfo = () => {
  const dispatch = useDispatch();

  const list = useSelector((state) => state.cryptoList);
  const { loading, error, cryptos } = list;

  useEffect(() => {
    dispatch(cryptoList());
  }, [dispatch]);

  const textColor = (value) => {
    if (value > 0) {
      return 'lightgreen';
    } else {
      return 'red';
    }
  };

  return (
    <Row className='text-center'>
      <h1 className='my-3'>Top Cryptocurrencies by Market Cap</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr class='text-center'>
              <th>RANK</th>
              <th>NAME</th>
              <th>CURRENT PRICE</th>
              <th>24H HIGHT</th>
              <th>24H LOW</th>
              <th>24H CHANGE</th>
              <th>MARKET CAP</th>
              <th>CIRCULATING SUPPLY</th>
            </tr>
          </thead>
          <tbody>
            {cryptos?.map((crypto) => (
              <tr key={crypto.market_cap_rank} class='text-end'>
                <th class='text-center'>{crypto.market_cap_rank}</th>
                <th class='text-start'>
                  <Link to={`/projects/cryptoinfo/${crypto.id}`}>
                    <Image
                      src={crypto.image}
                      alt={crypto.name}
                      style={{ height: '2em' }}
                      className='mx-2'
                    />
                    {crypto.name} {crypto.symbol.toUpperCase()}
                  </Link>
                </th>
                <th class='text-end'>
                  $
                  {crypto.current_price
                    .toFixed(8)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    .replace(/0{1,6}$/, '')}
                </th>
                <th class='text-end'>
                  $
                  {crypto.high_24h
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                </th>
                <th class='text-end'>
                  $
                  {crypto.low_24h
                    .toFixed(2)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                </th>
                <th
                  class='text-center'
                  style={{
                    color: textColor(crypto.price_change_percentage_24h),
                  }}
                >
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </th>
                <th class='text-center'>
                  $
                  {crypto.market_cap
                    .toFixed(1)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    .slice(0, -2)}
                </th>
                <th class='text-end'>
                  {crypto.circulating_supply
                    .toFixed(1)
                    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                    .slice(0, -2)}{' '}
                  {crypto.symbol.toUpperCase()}
                  {crypto.max_supply &&
                    crypto.max_supply !== crypto.circulating_supply && (
                      <ProgressBar
                        style={{ height: '0.5em' }}
                        variant='gray'
                        now={crypto.circulating_supply}
                        max={crypto.max_supply}
                      />
                    )}
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Row>
  );
};

export default CryptoInfo;
