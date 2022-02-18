import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import '../css/News.css';
import Loader from '../../../Components/Loader';
import Message from '../../../Components/Message';
import { listNews } from '../../../redux/action/newsActions';
import ArticleCard from '../Components/ArticleCard';
import axios from 'axios';
import { useState } from 'react';
import SearchBar from '../Components/SearchBar';

const News = () => {
  const dispatch = useDispatch();

  const newsList = useSelector((state) => state.newsList);
  const { loading, error, news } = newsList;
  const [city, setCity] = useState('New York');
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const userLocation = async () => {
      const ipInfo = await axios.get(
        `https://api.ipregistry.co/?key=${process.env.REACT_APP_IPREGISTRY_KEY}`
      );
      let city = ipInfo.data.location.city;
      let lang = ipInfo.data.location.country.code;
      setCity(city);
      setLang(lang);

      dispatch(listNews(city, lang));
    };
    userLocation();
  }, [dispatch]);

  return (
    <>
      <SearchBar lang={lang} />
      <Row>
        <Col>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <>
              <h1 className='mt-4'>Latest News in {city}</h1>
              <Row>
                {news.map((article) => (
                  <ArticleCard key={article._id} article={article} />
                ))}
              </Row>
              {/* <Paginate pages={pages} page={page} /> */}
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default News;
