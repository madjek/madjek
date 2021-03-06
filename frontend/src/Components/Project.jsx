import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Image, Row } from 'react-bootstrap';
import movierent from '../assets/img/movie.png';
import ecommerce from '../assets/img/ecommerce.png';
import crypto from '../assets/img/crypto.png';
import news from '../assets/img/news.png';
import Tada from 'react-reveal/Tada';

const Projects = () => {
  return (
    <Row className='projects mt-3'>
      <Col md={6}>
        <Tada>
          <Link to='/projects/movierent'>
            <Image src={movierent} alt='movierent' />
            <h3>Movie Rent</h3>
          </Link>
        </Tada>
      </Col>
      <Col className='my-3' md={6}>
        <Tada>
          <Link to='/projects/ecommerce'>
            <Image src={ecommerce} alt='ecommerce' />
            <h3>E-Commerce</h3>
          </Link>
        </Tada>
      </Col>
      <Col className='my-3' md={6}>
        <Tada>
          <Link to='/projects/cryptoinfo'>
            <Image src={crypto} alt='crypto' />
            <h3>Crypto Info</h3>
          </Link>
        </Tada>
      </Col>
      <Col className='my-3' md={6}>
        <Tada>
          <Link to='/projects/news'>
            <Image src={news} alt='news' />
            <h3>News</h3>
          </Link>
        </Tada>
      </Col>
    </Row>
  );
};

export default Projects;
