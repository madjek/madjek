import React from 'react';
import { Col, Row } from 'react-bootstrap';
import DevImg from '../Components/DevImg';
import Technology from '../Components/Technology';

const Home = () => {
  return (
    <Row className='mainpage d-flex justify-content-center text-center mt-5 gx-0'>
      <Row className='mb-5'>
        <Col>
          <Row className='my-lg-3 text-lg-start'>
            <h1 className='fw-bolder'>
              Hi, I'm Eugene.<span class='wave'>👋</span>
            </h1>
          </Row>
          <Row className='my-2 text-lg-start'>
            <h2>Beginer FullStack Developer</h2>
          </Row>
          <Row className='mb-3 text-lg-start'>
            {/* <h3>
                Successfully completed a <b>FullStack Web Development</b>{' '}
                bootcamp.
              </h3>
              <h3>
                I mainly work with the <b>MERN</b> stack.
              </h3> */}
            <h3 className='fst-italic lh-lg'>
              Very inspired to learn new things. With programming I have an
              unlimited opportunity to improve myself.
            </h3>
          </Row>
        </Col>
        <Col md={12} lg={6}>
          <DevImg />
        </Col>
      </Row>
      <Row className='mb-md-3'>
        <h3 className='fw-bold rainbow_text_animated'>
          Tools &amp; Technologies which I use
        </h3>
      </Row>
      <Row className='d-flex justify-content-center mb-5'>
        <Technology />
      </Row>
      <Row className='text-center mb-5'>
        <a href='/projects'>See My Projects</a>
        <a href='/contact'>Contact With Me</a>
      </Row>
    </Row>
  );
};

export default Home;
