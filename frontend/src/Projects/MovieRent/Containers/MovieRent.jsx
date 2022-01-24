import React, { useState, useEffect } from 'react';
import axios from 'axios';
import loader from '../assets/img/loader.svg';
import { useNavigate } from 'react-router-dom';
import { Col, FormControl, Image, InputGroup, Row } from 'react-bootstrap';
import '../css/MovieRent.css';

const MovieRent = () => {
  let history = useNavigate();

  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setTimeout(() => {
      showMovies();
    }, 100);
  }, []);

  const showMovies = async () => {
    let res = await axios.get('https://dvd-rent.herokuapp.com/movies');
    setMovies(res.data);
  };

  const chosenMovie = (chosenMovie) => {
    localStorage.setItem('chosenMovie', JSON.stringify(chosenMovie));

    history('/projects/movierent/movie');
  };

  if (movies[1]?.title) {
    return (
      <Row className='d-flex justify-content-center text-center back'>
        <Row className='searchBar'>
          <InputGroup size='sm' className='mb-3'>
            <FormControl
              placeholder='Enter Movie Title'
              onChange={(e) => setQuery(e.target.value)}
            />
          </InputGroup>
        </Row>
        <Row className='displayMovies'>
          {movies
            .filter((mov) => {
              if (query === '') {
                return mov;
              } else if (
                mov.title.toLowerCase().includes(query.toLowerCase())
              ) {
                return mov;
              }
            })
            .map((movie) => {
              return (
                <Col key={movie._id}>
                  <Image
                    alt={movie.id}
                    className='poster'
                    onClick={() => chosenMovie(movie)}
                    src={`${movie.poster_path}`}
                  />
                </Col>
              );
            })}
        </Row>
      </Row>
    );
  } else {
    return (
      <Row className='load back'>
        <Image className='loader' alt='loader' src={loader} />
      </Row>
    );
  }
};

export default MovieRent;
