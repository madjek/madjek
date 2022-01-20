import React from 'react';
import { Row } from 'react-bootstrap';

const Home = () => {
  return (
    <>
      <Row className='align-items-center text-center'>
        <Row className='mb-5'>
          <h1>Hi, I'm Eugene.</h1>
          <h2>FullStack Developer</h2>
        </Row>
        <Row className='mb-5'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui
            laborum quasi, incidunt dolore iste nostrum cupiditate voluptas?
            Laborum, voluptas natus?
          </p>
        </Row>
        <Row className='mb-5'>
          <h3>Skills &amp; Technologies</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi sit
            ipsa delectus eum quo voluptas aspernatur accusantium distinctio
            possimus est.
          </p>
        </Row>
        <Row className='text-center mb-5'>
          <a href='/contact'>Contact With Me</a>
          <a href='/projects'>See My Projects</a>
        </Row>
      </Row>
    </>
  );
};

export default Home;
