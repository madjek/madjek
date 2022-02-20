import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import gmail from '../assets/icons/gmail.svg';
import phone from '../assets/icons/phone.svg';
import linkedin from '../assets/icons/linkedin.svg';
import github from '../assets/icons/github.svg';
import HeadShake from 'react-reveal/HeadShake';

const Contact = () => {
  return (
    <Row className='contacts mt-3 fs-5'>
      <Col xs={12} md={3} className='my-2'>
        <HeadShake>
          <Col>
            <a
              className='text-decoration-none text-white pe-auto'
              href='mailto:yevhenii.madzhar@gmail.com'
              target='_blank'
              rel='noreferrer'
            >
              <Col>
                <Image src={gmail} alt='gmail' />
              </Col>
            </a>
            <Col class='user-select-all'>yevhenii.madzhar@gmail.com</Col>
          </Col>
        </HeadShake>
      </Col>
      <Col xs={12} md={3} className='my-2'>
        <HeadShake>
          <Col>
            <a
              className='text-decoration-none text-white pe-auto'
              href='https://linkedin.com/in/yevhenii-madzhar'
              target='_blank'
              rel='noreferrer'
            >
              <Col>
                <Image src={linkedin} alt='linkedin' />
              </Col>
            </a>
            <Col class='user-select-all'>linkedin.com/in/yevhenii-madzhar</Col>
          </Col>
        </HeadShake>
      </Col>
      <Col xs={12} md={3} className='my-2'>
        <HeadShake>
          <Col>
            <a
              className='text-decoration-none text-white pe-auto'
              href='https://github.com/madjek'
              target='_blank'
              rel='noreferrer'
            >
              <Col>
                <Image
                  style={{ filter: 'invert()' }}
                  src={github}
                  alt='github'
                />
              </Col>
            </a>
            <Col class='user-select-all'>github.com/madjek</Col>
          </Col>
        </HeadShake>
      </Col>
      <Col xs={12} md={3} className='my-2'>
        <HeadShake>
          <Col>
            <a
              className='text-decoration-none text-white pe-auto'
              href='tel:+34642773506'
              target='_blank'
              rel='noreferrer'
            >
              <Col>
                <Image style={{ filter: 'invert()' }} src={phone} alt='phone' />
              </Col>
            </a>
            <Col class='user-select-all'>+34642773506</Col>
          </Col>
        </HeadShake>
      </Col>
    </Row>
  );
};

export default Contact;
