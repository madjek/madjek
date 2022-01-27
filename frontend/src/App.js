import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './Containers/Home';
import Header from './Components/Header';
import Projects from './Containers/Projects';
import Contact from './Containers/Contact';

import Register from './Containers/Register';
import Login from './Containers/Login';
import Profile from './Containers/Profile';

import MovieRent from './Projects/MovieRent/Containers/MovieRent';
import Movie from './Projects/MovieRent/Containers/Movie';
import BuyCredits from './Projects/MovieRent/Containers/BuyCredits';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />

            <Route path='/projects/movierent' element={<MovieRent />} />
            <Route path='/projects/movierent/movie' element={<Movie />} />
            <Route
              path='/projects/movierent/buycredits'
              element={<BuyCredits />}
            />
          </Routes>
        </Container>
      </main>
    </BrowserRouter>
  );
}

export default App;
