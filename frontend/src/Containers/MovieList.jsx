import React, { useEffect } from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { useNavigate } from 'react-router-dom';
import { movieList } from '../redux/action/movierentAction';
import moment from 'moment';

const MovieList = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const list = useSelector((state) => state.movieList);
  const { loading, error, movies } = list;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(movieList());
    } else {
      history('/login');
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>movies</h1>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th className='text-center'>VOTE</th>
                <th className='text-center'>RELEASE DATE</th>
                <th className='text-center'>AVAILABLE</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie._id}</td>
                  <td>{movie.title}</td>
                  <td className='text-center'>{movie.vote_average}</td>
                  <td className='text-center'>
                    {moment(movie.release_date).format('DD-MM-YYYY')}
                  </td>
                  <td className='text-center'>
                    {movie.available ? (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default MovieList;
