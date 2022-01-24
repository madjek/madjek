import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Button, Image, Row, Table } from 'react-bootstrap';
import Message from '../../../Components/Message';

const Movie = (props) => {
  const history = useNavigate();

  const [movie, setMovie] = useState(
    JSON.parse(localStorage.getItem('chosenMovie'))
  );
  const [message, setMessage] = useState(null);

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
          <Table className='text-start mt-auto movInfTxt' borderless>
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
          </Table>
        </Row>
      </Row>
      <Row xs={2} className='justify-content-center my-2'>
        <Button variant='dark' size='lg'>
          Rent the movie
        </Button>
      </Row>
      {message && <Message>{message}</Message>}
    </Row>
  );
};

export default Movie;
