import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { getUserDetails, updateUserProfile } from '../redux/action/userAction';
import { useNavigate } from 'react-router-dom';
import { USER_UPDATE_PROFILE_RESET } from '../redux/types';
import { listMyMovies } from '../redux/action/movierentAction';
import moment from 'moment';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const history = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const movieListMy = useSelector((state) => state.movieListMy);
  const { loading: loadingList, error: errorList, movies } = movieListMy;

  useEffect(() => {
    if (!userInfo) {
      history('/login');
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
    dispatch(listMyMovies());
    // console.log(listMyMovies());
  }, [dispatch, history, userInfo, user, success]);

  if (message) {
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  }

  if (success) {
    setTimeout(() => {
      setMessage('Profile updated');
    }, 1);
  }

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
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  console.log(movies);
  return (
    <Row className='text-center mt-5'>
      <Col md={3}>
        <h2>User profile</h2>
        {message && <Message>{message}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className='my-3' controlId='name'>
              <Form.Control
                required
                minLength='2'
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
                minLength='8'
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-3' controlId='confirmPassword'>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </Col>

      <Col md={9} className='px-3'>
        <Row className='mt-5 mt-sm-0'>
          <h2>My movies</h2>
        </Row>
        {loadingList ? (
          <Loader />
        ) : errorList ? (
          <Message variant='danger'>{errorList}</Message>
        ) : (
          <Row>
            {movies.map((movie) => (
              <Col md={4} className='px-0' key={movie._id}>
                <Row className='movieCard my-0'>
                  <Image
                    alt={movie.movie_id}
                    className='poster m-0 p-0'
                    src={`${movie.poster_path}`}
                  />
                  <Button
                    className='delBtn'
                    // onClick={() => DeleteOrder(movie._id)}
                  >
                    Return the movie
                  </Button>
                </Row>
                <Row className='justify-content-center mt-1 fw-bold'>
                  {movie.title}
                </Row>
                <Row className='justify-content-center mb-3'>
                  Odrer date: {moment(movie.createdAt).format('MMMM DD YYYY')}
                </Row>
              </Col>
            ))}
          </Row>
        )}
      </Col>
    </Row>
  );
};

export default Profile;
