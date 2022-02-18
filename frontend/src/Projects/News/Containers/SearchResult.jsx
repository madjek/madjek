import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import Loader from '../../../Components/Loader';
import Message from '../../../Components/Message';
import { searchNews } from '../../../redux/action/newsActions';
import ArticleCard from '../Components/ArticleCard';

const SearchResult = () => {
  const searchResult = useSelector((state) => state.searchResult);
  const { loading, error, news } = searchResult;

  const dispatch = useDispatch();
  const location = useLocation().search;
  const { query } = useParams();
  const lang = new URLSearchParams(location).get('lang');

  useEffect(() => {
    if (query) {
      dispatch(searchNews(query, lang));
    }
  }, [dispatch, query, lang]);

  return (
    <>
      <Link className='btn btn-light mt-3' to='/projects/news'>
        Go Back
      </Link>
      <Row>
        <Col>
          <h1 className='mt-4'>Searching results by {query}</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <>
              <Row>
                {news ? (
                  news.map((article) => (
                    <ArticleCard key={article._id} article={article} />
                  ))
                ) : (
                  <Col className='fs-4'>No results...</Col>
                )}
              </Row>
              {/* <Paginate pages={pages} page={page} /> */}
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default SearchResult;
