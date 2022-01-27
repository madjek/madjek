import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { getUserDetails, updateUserProfile } from '../redux/action/userAction';
import { Link, useNavigate } from 'react-router-dom';
import { USER_UPDATE_PROFILE_RESET } from '../redux/types';
import { listMyMovies, returnMovie } from '../redux/action/movierentAction';
import moment from 'moment';
import MovieCoin from '../Projects/MovieRent/Components/MovieCoin';

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

  const movieCredits = useSelector((state) => state.movieCredits);
  const { credits } = movieCredits;

  const retMovie = useSelector((state) => state.returnMovie);
  const { success: returnSuccess } = retMovie;

  useEffect(() => {
    if (!userInfo) {
      history('/login');
    } else if (!user || !user.name || success) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(getUserDetails('profile'));
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
    dispatch(listMyMovies());
  }, [dispatch, history, userInfo, user, success, returnSuccess]);

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

  const returnHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(returnMovie(id));
    }
  };

  return (
    <Row className='text-center mt-5 mx-0'>
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
        <Row className='my-3'>
          <h5>
            My movie credits:
            <MovieCoin> {credits}</MovieCoin>
          </h5>
          <Row>
            <Col className='fw-light'>
              Do you need{' '}
              <Link to={'/projects/movierent/buycredits'}>credits</Link>?
            </Col>
          </Row>
        </Row>
      </Col>

      <Col md={9} className='px-3'>
        <Row className='mt-3 mt-sm-0'>
          <h2>My movies</h2>
        </Row>
        {loadingList ? (
          <Loader />
        ) : errorList ? (
          <Message variant='danger'>{errorList}</Message>
        ) : (
          <Row>
            {movies.map((movie) => (
              <Col md={4} key={movie._id}>
                <Row className='movieCard m-0'>
                  <Image
                    alt={movie.movie_id}
                    className='poster m-0 p-0'
                    src={`${movie.poster_path}`}
                    onClick={() => {
                      window.location = `https://www.youtube.com/results?search_query=${movie.title}+Full+Movie`;
                    }}
                  />
                  <Button
                    className='delBtn px-0'
                    onClick={() => returnHandler(movie._id)}
                  >
                    Return the movie:<MovieCoin> +1</MovieCoin>
                  </Button>
                </Row>
                <Row className='justify-content-center mt-1 fw-bold gx-0'>
                  {movie.title}
                </Row>
                <Row className='justify-content-center mb-3 gx-0'>
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
