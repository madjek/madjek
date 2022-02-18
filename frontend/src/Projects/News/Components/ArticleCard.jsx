import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Col } from 'react-bootstrap';
import moment from 'moment';

const ArticleCard = ({ article }) => {
  const history = useNavigate();

  const chosenArticle = (chosenArticle) => {
    localStorage.setItem('chosenArticle', JSON.stringify(chosenArticle));
    history('/projects/news/article');
  };

  return (
    <>
      <Col sm={12} md={6} lg={4} xl={3}>
        <Card bg='white' className='my-3 p-3 rounded text-black articleCard'>
          <Link to={'/projects/news/article'}>
            {article.media !== null ? (
              <Card.Img
                className='articleImg'
                src={article.media}
                alt={article.topic}
                variant='top'
                onClick={() => chosenArticle(article)}
              />
            ) : (
              <Card.Img
                className='articleImg'
                src='https://picsum.photos/200'
                alt={article.topic}
                variant='top'
                onClick={() => chosenArticle(article)}
              />
            )}
          </Link>

          <Card.Body className='position-absolute bottom-0 start-0 px-3'>
            <Link
              to={'/projects/news/article'}
              className='text-decoration-none'
            >
              <Card.Title className='textO'>
                <strong onClick={() => chosenArticle(article)}>
                  {article.title}
                </strong>
              </Card.Title>
            </Link>
            <Card.Text className='mb-0'>
              <Button
                className='topicBtn me-3'
                variant='outline-info'
                size='sm'
              >
                {article.topic}
              </Button>
              <i className='fas fa-calendar-alt'></i>{' '}
              {moment(article.publishedAt).format('MMMM DD, YYYY')}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default ArticleCard;
