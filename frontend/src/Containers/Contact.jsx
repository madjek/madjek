import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import FormContainer from '../Components/FormContainer';
import Message from '../Components/Message';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [communication, setCommunication] = useState('');
  const [message, setMessage] = useState(null);
  return (
    <FormContainer>
      <h1 className='text-center mt-5'>Contact</h1>
      <Form>
        <Form.Group className='my-3' controlId='name'>
          <Form.Control
            required
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-3' controlId='email'>
          <Form.Control
            required
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-3' controlId='message'>
          <Form.Control
            as='textarea'
            rows={5}
            required
            type='text'
            placeholder='Enter message'
            value={communication}
            onChange={(e) => setCommunication(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button className='my-2' type='submit' variant='primary'>
          Send
        </Button>
      </Form>
      {message && <Message>{message}</Message>}
    </FormContainer>
  );
};

export default Contact;
