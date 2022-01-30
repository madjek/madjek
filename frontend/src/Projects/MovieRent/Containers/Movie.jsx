import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Button, Image, Row, Table } from 'react-bootstrap';
import Message from '../../../Components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { createMovieOrder } from '../../../redux/action/movierentAction';
import MovieCoin from '../Components/MovieCoin';

const Movie = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const movieDetails = useSelector((state) => state.movieDetails);
  const { movie } = movieDetails;
  const movieOrderCreate = useSelector((state) => state.movieOrderCreate);
  const { error, success } = movieOrderCreate;
  const user = useSelector((state) => state.userLogin);
  const { userInfo } = user;

  const [message, setMessage] = useState(null);
  if (message) {
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  }

  const placeOrderHandler = () => {
    if (!userInfo) {
      setMessage('You should login to rent a movie');
    } else if (userInfo.movieCredits === 0) {
      setMessage(
        `You you should top up your credits. You have ${userInfo.movieCredits}`
      );
    } else if (userInfo.movieCredits >= 2) {
      let data = {
        user: userInfo._id,
        movie: movieDetails.movie,
        credits: -2,
      };
      dispatch(createMovieOrder(data));
    }
  };

  if (success) {
    movieOrderCreate.success = false;
    setTimeout(() => {
      history('/profile');
    }, 1500);
  }

  if (error) {
    setTimeout(() => {
      movieOrderCreate.error = null;
    }, 1);
  }

  return (
    <Row className='more d-flex justify-content-center text-center back mb-3'>
      <Row className='justify-content-center p-0 movie'>
        <Image
          alt={movie.id}
          className='p-0 movie_img'
          src={`${movie.backdrop_path}`}
        />
        <Row className='title'>
          <h1>{movie.title}</h1>
        </Row>
        <Row className='text-start movieInfo'>
          <Table
            className=' mt-auto movInfTxt table-desktop'
            borderless
            bsPrefix
          >
            <tbody>
              <tr>
                <td className='fw-bold text-nowrap pe-2'>Vote average:</td>
                <td>{movie.vote_average}</td>
              </tr>
              <tr>
                <td className='fw-bold'>Release date:</td>
                <td>{moment(movie.release_date).format('MMMM DD YYYY')}</td>
              </tr>
              <tr>
                <td className='fw-bold'>Genres:</td>
                <td>{movie.genres.join(', ')}</td>
              </tr>
              <tr>
                <td className='fw-bold'>Overview:</td>
                <td>{movie.overview}</td>
              </tr>
            </tbody>
          </Table>
          <Row className='mt-auto movInfTxt table-mobile' borderless bsPrefix>
            <Row className='d-block'>
              <b className='p-0'>Vote average: </b>
              {movie.vote_average}
            </Row>
            <Row className='d-block'>
              <b className='p-0'>Release date: </b>{' '}
              {moment(movie.release_date).format('MMMM DD YYYY')}
            </Row>
            <Row className='d-block'>
              <b className='p-0'>Genres: </b> {movie.genres.join(', ')}
            </Row>
            <Row className='d-block'>
              <b className='p-0'>Overview: </b> {movie.overview}
            </Row>
          </Row>
        </Row>
        <Row lg={3} xs={1} className='justify-content-center my-3'>
          <Button
            variant='dark'
            size='lg'
            className='px-1'
            onClick={placeOrderHandler}
          >
            Rent the movie
            {userInfo && <MovieCoin>: -2</MovieCoin>}
          </Button>
        </Row>
        {message && <Message>{message}</Message>}
        {success && (
          <Message variant='success'>Movie added successfully</Message>
        )}
        {error && <Message variant='danger'>{error}</Message>}
      </Row>
    </Row>
  );
};

export default Movie;
