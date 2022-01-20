import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './Containers/Home';
import Header from './Components/Header';
import Projects from './Containers/Projects';
import Contact from './Containers/Contact';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />{' '}
            <Route path='/projects' element={<Projects />} />{' '}
            <Route path='/contact' element={<Contact />} />{' '}
          </Routes>{' '}
        </Container>{' '}
      </main>{' '}
    </BrowserRouter>
  );
}

export default App;
