import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import FormContainer from '../Components/FormContainer';
import { register } from '../redux/action/userAction';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const history = useNavigate();
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, success, error } = userRegister;

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords are not the same');
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setMessage('Wrong email');
    } else {
      dispatch(register(name, email, password));
    }
  };

  if (message) {
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  }
  if (success) {
    userRegister.success = false;
    setTimeout(() => {
      history('/login');
    }, 2000);
  }

  return (
    <FormContainer>
      <h1 className='text-center mt-5'>Sign up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-3' controlId='name'>
          <Form.Control
            required
            minlength='2'
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

        <Form.Group className='my-3' controlId='password'>
          <Form.Control
            required
            minlength='8'
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-3' controlId='confirmPassword'>
          <Form.Control
            required
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Sign up
        </Button>
      </Form>

      <Row className='mt-3'>
        <Col>
          Do you have an account? <Link to={'/login'}>Log in</Link>
        </Col>
      </Row>
      {message && <Message>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {success && (
        <Message variant='success'>Registration completed successfully</Message>
      )}
      {loading && <Loader />}
    </FormContainer>
  );
};

export default Register;
