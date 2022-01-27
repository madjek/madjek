import React from 'react';
import { Image } from 'react-bootstrap';
import coin from '../assets/img/coin.png';

const MovieCoin = ({ children }) => {
  return (
    <>
      {children}
      <Image alt='Movie coin' className='coin mx-1' src={coin} />
    </>
  );
};

export default MovieCoin;
