import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import '../css/News.css';
import Loader from '../../../Components/Loader';
import Message from '../../../Components/Message';
import { listNews } from '../../../redux/action/newsActions';
import ArticleCard from '../Components/ArticleCard';
import axios from 'axios';
import { useState } from 'react';

const News = () => {
  const dispatch = useDispatch();

  const newsList = useSelector((state) => state.newsList);
  const { loading, error, news } = newsList;
  const [city, setCity] = useState('');

  useEffect(() => {
    const userLocation = async () => {
      const ipInfo = await axios.get(
        `https://api.ipregistry.co/?key=${process.env.REACT_APP_IPREGISTRY_KEY}`
      );
      const city = ipInfo.data.location.city;
      const lang = ipInfo.data.location.country.code;

      setCity(city);
      dispatch(listNews(city, lang));
    };
    userLocation();
  }, [dispatch]);

  return (
    <>
      <Row>
        <Col>
          <h1 className='mt-4'>Latest News in {city}</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <>
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
