import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

const Contact = () => {
  return (
    <>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <h1 className='text-center'>Contact</h1>
          <Form>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='name'></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email'></Form.Control>
            </Form.Group>
            <Form.Group controlId='message'>
              <Form.Label>Message</Form.Label>
              <Form.Control as='textarea' rows={5} type='text'></Form.Control>
            </Form.Group>

            <Button className='my-2' type='submit' variant='primary'>
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Contact;
