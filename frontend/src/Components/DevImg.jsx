import React from 'react';
import { Image, Row } from 'react-bootstrap';
import developer from '../assets/img/developer.svg';
import gear from '../assets/img/dev-gear.svg';

const DevImg = () => {
  return (
    <Row className='dev'>
      <Image className='devimg' src={developer} alt='developer' />
      <Image className='gear1' src={gear} alt='gear' />
      <Image className='gear2' src={gear} alt='gear' />
    </Row>
  );
};

export default DevImg;
