import React, { useState, useEffect } from 'react';
import {
  Form,
  Button,
  Row,
  Col,
  Image,
  Table,
  Accordion,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { getUserDetails, updateUserProfile } from '../redux/action/userAction';
import { Link, useNavigate } from 'react-router-dom';
import { USER_UPDATE_PROFILE_RESET } from '../redux/constants/user';
import { listMyMovies, returnMovie } from '../redux/action/movierentAction';
import moment from 'moment';
import MovieCoin from '../Projects/MovieRent/Components/MovieCoin';
import { listMyOrders } from '../redux/action/ecommerceActions';
import {
  deleteCoinPortfolio,
  listMyCoins,
} from '../redux/action/cryptoActions';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [volume, setVolume] = useState(0);
  const [current, setCurrent] = useState(0);

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

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  const coinListMy = useSelector((state) => state.coinListMy);
  const { loading: loadingCoins, error: errorCoins, coins } = coinListMy;

  const coinDelete = useSelector((state) => state.coinPortfolioDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = coinDelete;

  useEffect(() => {
    if (!userInfo) {
      history('/login');
    } else if (!user || success) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(getUserDetails('profile'));
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
    dispatch(listMyMovies());
    dispatch(listMyOrders());
    dispatch(listMyCoins());
    setVolume(0);
    setCurrent(0);
  }, [
    dispatch,
    history,
    userInfo,
    user,
    success,
    returnSuccess,
    successDelete,
  ]);

  useEffect(() => {
    if (coins) {
      total();
    }
  }, [coins]);

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

  const textColor = (value) => {
    if (value > 0) {
      return 'lightgreen';
    } else {
      return 'red';
    }
  };

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteCoinPortfolio(id));
    }
  };

  const total = () => {
    coins?.map(
      (coin) => (
        setVolume((volume) => volume + coin?.volume),
        setCurrent((current) => current + coin?.currentPrice * coin?.qty)
      )
    );
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
        <Accordion>
          <Accordion.Item className='bg-dark' eventKey='0'>
            <Accordion.Header>
              <h2 className='ms-auto'>My Movies</h2>
            </Accordion.Header>
            <Accordion.Body>
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
                        Odrer date:{' '}
                        {moment(movie.createdAt).format('MMMM DD YYYY')}
                      </Row>
                    </Col>
                  ))}
                </Row>
              )}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item className='bg-dark' eventKey='1'>
            <Accordion.Header>
              <h2 className='ms-auto'>My Orders</h2>
            </Accordion.Header>
            <Accordion.Body>
              {loadingOrders ? (
                <Loader />
              ) : errorOrders ? (
                <Message variant='danger'>{errorOrders}</Message>
              ) : (
                <Table striped bordered hover responsive className='table-sm'>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                      <th>PAID</th>
                      <th>DELIVERED</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{moment(order.createdAt).format('MM-DD-YYYY')}</td>
                        <td>{order.totalPrice}</td>
                        <td>
                          {order.isPaid ? (
                            moment(order.paidAt).format('MM-DD-YYYY')
                          ) : (
                            <i
                              className='fas fa-times'
                              style={{ color: 'red' }}
                            ></i>
                          )}
                        </td>
                        <td>
                          {order.isDelivered ? (
                            moment(order.deliveredAt).format('MM-DD-YYYY')
                          ) : (
                            <i
                              className='fas fa-times'
                              style={{ color: 'red' }}
                            ></i>
                          )}
                        </td>
                        <td>
                          <Link to={`/projects/ecommerce/order/${order._id}`}>
                            <Button className='btn-sm' variant='light'>
                              Details
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item className='bg-dark' eventKey='2'>
            <Accordion.Header>
              <h2 className='ms-auto'>My Coins</h2>
            </Accordion.Header>
            <Accordion.Body>
              {loadingCoins || loadingDelete ? (
                <Loader />
              ) : errorCoins || errorDelete ? (
                <Message variant='danger'>{errorCoins}</Message>
              ) : (
                <>
                  <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                      <tr className='text-center'>
                        <th>COIN</th>
                        <th bg='light'>CURRENT PRICE</th>
                        <th>PURCHASE PRICE</th>
                        <th>QUANTITY</th>
                        <th>VOLUME</th>
                        <th>CURRENT VALUE</th>
                        <th>PROFIT</th>
                        <th>PERCENT</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {coins?.map((coin) => (
                        <tr key={coin?._id}>
                          <td>{coin?.symbol}</td>
                          <td
                            style={{
                              color: textColor(
                                coin?.currentPrice - coin?.price
                              ),
                            }}
                          >
                            ${coin?.currentPrice}
                          </td>
                          <td>${coin?.price}</td>
                          <td>{coin?.qty}</td>
                          <td>${coin?.volume}</td>
                          <td>
                            $
                            {(coin?.currentPrice * coin?.qty)
                              .toFixed(8)
                              .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                              .replace(/0{1,6}$/, '')}
                          </td>
                          <td
                            style={{
                              color: textColor(
                                coin?.currentPrice * coin?.qty - coin?.volume
                              ),
                            }}
                          >
                            $
                            {(coin?.currentPrice * coin?.qty - coin?.volume)
                              .toFixed(8)
                              .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                              .replace(/0{1,6}$/, '')}
                          </td>
                          <td
                            style={{
                              color: textColor(
                                ((coin?.currentPrice * coin?.qty) /
                                  coin?.volume -
                                  1) *
                                  100
                              ),
                            }}
                          >
                            {(
                              ((coin?.currentPrice * coin?.qty) / coin?.volume -
                                1) *
                              100
                            ).toFixed(2)}
                            %
                          </td>
                          <td>
                            <Button
                              variant='danger'
                              className='btn-sm'
                              onClick={() => deleteHandler(coin._id)}
                            >
                              <i className='fas fa-trash'></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Table striped bordered hover responsive>
                    <tbody>
                      <tr>
                        <td>Portfolio initial value</td>
                        <td>Portfolio current value</td>
                        <td>Portfolio profit</td>
                        <td>Percent</td>
                      </tr>
                      <tr className='fw-bold'>
                        <td>
                          $
                          {volume
                            .toFixed(8)
                            .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                            .replace(/0{1,6}$/, '')}
                        </td>
                        <td
                          style={{
                            color: textColor(current - volume),
                          }}
                        >
                          $
                          {current
                            .toFixed(8)
                            .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                            .replace(/0{1,6}$/, '')}
                        </td>
                        <td
                          style={{
                            color: textColor(current - volume),
                          }}
                        >
                          $
                          {(current - volume)
                            .toFixed(8)
                            .replace(/\d(?=(\d{3})+\.)/g, '$&,')
                            .replace(/0{1,6}$/, '')}
                        </td>
                        <td
                          style={{
                            color: textColor(current - volume),
                          }}
                        >
                          {((current / volume - 1) * 100).toFixed(2)}%
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>
    </Row>
  );
};

export default Profile;
