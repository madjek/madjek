import React, { useEffect, useState } from 'react';
import {
  Button,
  Dropdown,
  DropdownButton,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const history = useNavigate();

  const [query, setQuery] = useState('World');
  const [language, setLanguage] = useState('en');
  const [active, setActive] = useState('World');

  const languageHandler = (e) => {
    setLanguage(e);
  };
  const categoryHandler = (e) => {
    setQuery(e);
    setActive(e);
  };

  const inputQuery = (e) => {
    setQuery(e.target.value);
  };

  const Search = () => {
    history(`/projects/news/search/${query}?lang=${language}`);
  };

  useEffect(() => {}, [query, language]);

  return (
    <InputGroup className='mb-3'>
      <DropdownButton
        variant='outline-secondary'
        title='Category'
        onSelect={categoryHandler}
        defaultActiveKey={active}
      >
        <Dropdown.Item eventKey='News' active={active === 'News'}>
          News
        </Dropdown.Item>
        <Dropdown.Item eventKey='Sport' active={active === 'Sport'}>
          Sport
        </Dropdown.Item>
        <Dropdown.Item eventKey='Tech' active={active === 'Tech'}>
          Tech
        </Dropdown.Item>
        <Dropdown.Item eventKey='World' active={active === 'World'}>
          World
        </Dropdown.Item>
        <Dropdown.Item eventKey='Finance' active={active === 'Finance'}>
          Finance
        </Dropdown.Item>
        <Dropdown.Item eventKey='Politics' active={active === 'Politics'}>
          Politics
        </Dropdown.Item>
        <Dropdown.Item eventKey='Business' active={active === 'Business'}>
          Business
        </Dropdown.Item>
        <Dropdown.Item eventKey='Economics' active={active === 'Economics'}>
          Economics
        </Dropdown.Item>
        <Dropdown.Item
          eventKey='Entertainment'
          active={active === 'Entertainment'}
        >
          Entertainment
        </Dropdown.Item>
        <Dropdown.Item eventKey='Beauty' active={active === 'Beauty'}>
          Beauty
        </Dropdown.Item>
        <Dropdown.Item eventKey='Gaming' active={active === 'Gaming'}>
          Gaming
        </Dropdown.Item>
      </DropdownButton>
      <FormControl
        aria-label='Text input with dropdown button'
        value={query}
        onChange={(e) => inputQuery(e)}
      />
      <Button variant='outline-secondary' onClick={Search}>
        Search
      </Button>
      <DropdownButton
        variant='outline-secondary'
        title={<i className='fas fa-globe'></i>}
        onSelect={languageHandler}
      >
        <Dropdown.Item eventKey='en' active={language === 'en'}>
          English
        </Dropdown.Item>
        <Dropdown.Item eventKey='es' active={language === 'es'}>
          Spanish{' '}
        </Dropdown.Item>
        <Dropdown.Item eventKey='fr' active={language === 'fr'}>
          French{' '}
        </Dropdown.Item>
        <Dropdown.Item eventKey='ru' active={language === 'ru'}>
          Russian{' '}
        </Dropdown.Item>
        <Dropdown.Item eventKey='de' active={language === 'de'}>
          German
        </Dropdown.Item>
      </DropdownButton>
    </InputGroup>
  );
};

export default SearchBar;
