import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Button, Image, Row, Table } from 'react-bootstrap';
import Message from '../../../Components/Message';
import { useDispatch, useSelector } from 'react-redux';
import { createMovieOrder } from '../../../redux/action/movierentAction';

const Movie = (props) => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const movieDetails = useSelector((state) => state.movieDetails);
  const { movie } = movieDetails;
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
      setMessage('You should register or login to rent a movie');
    } else if (userInfo) {
      let data = {
        user: userInfo._id,
        movie: movieDetails.movie,
      };
      dispatch(createMovieOrder(data));
      setMessage('Movie added successfully');
      setTimeout(() => {
        history('/profile');
      }, 2500);
    }
  };

  return (
    <Row className='more d-flex justify-content-center text-center back'>
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
          <Table className='text-start mt-auto movInfTxt' borderless bsPrefix>
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
        </Row>
        <Row lg={3} xs={1} className='justify-content-center my-2'>
          <Button variant='dark' size='lg' onClick={placeOrderHandler}>
            Rent the movie
          </Button>
        </Row>
        {message && <Message>{message}</Message>}
      </Row>
    </Row>
  );
};

export default Movie;
