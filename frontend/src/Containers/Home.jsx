import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import DevImg from '../Components/DevImg';
import Technology from '../Components/Technology';
import Project from '../Components/Project';
import Fade from 'react-reveal/Fade';

const Home = () => {
  return (
    <Row className='mainpage d-flex justify-content-center text-center gx-0'>
      <Row id='main' className='full align-items-center'>
        <Row className='bg'></Row>
        <Col className='font my-3'>
          <Fade left cascade>
            <Row className='text-lg-start'>
              <h1 className='fw-bolder'>
                Hi, I'm Eugene <span class='wave'>👋</span>
              </h1>
            </Row>
            <Row className='my-lg-3 text-lg-start'>
              <h2>Beginer FullStack Developer</h2>
            </Row>
            <Row className='text-lg-start'>
              {/* <h3>
                Successfully completed a <b>FullStack Web Development</b>{' '}
                bootcamp.
                </h3>
                <h3>
                I mainly work with the <b>MERN</b> stack.
              </h3> */}
              <h3 className='fst-italic'>
                Very inspired to learn new things. With programming I have an
                unlimited opportunity to improve myself
              </h3>
            </Row>
          </Fade>
        </Col>
        <Col md={6} lg={6} className='mb-5 mb-md-0'>
          <Fade right duration={2000}>
            <DevImg />
          </Fade>
        </Col>
      </Row>
      <Row id='technologies' className='justify-content-center px-0 '>
        {/* <Row className='bg'></Row> */}
        <h3 className='fw-bold rainbow_text_animated mt-5'>
          Tools &amp; Technologies which I use
        </h3>
        <Row className='justify-content-center'>
          <Technology />
        </Row>
      </Row>
      <Row id='projects' className='justify-content-center'>
        <h3 className='fw-bold rainbow_text_animated mt-5'>My projects</h3>
        {/* <Row className='bg'></Row> */}
        <Project />
      </Row>
      <Row id='contacts' className='text-center mb-5'>
        {/* <a href='/projects'>See My Projects</a> */}
        <a href='/contact'>Contact With Me</a>
      </Row>
    </Row>
  );
};

export default Home;
