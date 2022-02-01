import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Image, Row } from 'react-bootstrap';
import movierent from '../assets/img/movie.png';
import ecommerce from '../assets/img/ecommerce.png';
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
    </Row>
  );
};

export default Projects;
