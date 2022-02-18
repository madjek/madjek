import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';

const Article = () => {
  const history = useNavigate();

  const [article, setArticle] = useState(
    JSON.parse(localStorage.getItem('chosenArticle'))
  );

  return (
    <>
      <Button className='btn-light my-3' onClick={() => history(-2)}>
        Go Back
      </Button>
      <Row className='mb-3'>
        <Col xs={12} className='fs-1'>
          {article.title}
        </Col>
        <Row>
          <Col xs={12} className='my-3'>
            <Button className='me-3' variant='outline-info'>
              {article.topic}
            </Button>
            {article.author}
            <i className='fas fa-calendar-alt ms-3'></i>{' '}
            {moment(article.publishedAt).format('MMMM DD, YYYY')}
          </Col>
          {/* <Col xs={12}>
            <ButtonToolbar aria-label='Toolbar with button groups'>
              <ButtonGroup aria-label='First group'>
                <Button variant='' disabled className='opacity-100'>
                  Share <i className='fas fa-share-alt mx-2'></i>
                </Button>
              </ButtonGroup>
              <ButtonGroup className='me-2' aria-label='Second group'>
                <Button variant='' size='lg'>
                  <i class='fab fa-facebook-square '></i>
                </Button>{' '}
                <Button variant='' size='lg'>
                  <i className='fab fa-twitter-square'></i>
                </Button>{' '}
                <Button variant='' size='lg'>
                  <i className='fab fa-linkedin'></i>
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
          </Col> */}
        </Row>
        {article.media === null ? (
          <Image
            className='singleArticleImg'
            src='https://picsum.photos/2000'
            alt={article.topic}
          />
        ) : (
          <Image
            className='singleArticleImg'
            src={article.media}
            alt={article.topic}
          />
        )}
        <Col>
          <Card bg='dark'>
            <Card.Body>
              <Card.Text className='fs-3'> {article.summary}</Card.Text>
            </Card.Body>
          </Card>
          <Row className='justify-content-center'>
            <Col xs={6} lg={4}>
              <Row>
                <Button
                  size='lg'
                  className='my-3'
                  onClick={() => {
                    window.location = `${article.link}`;
                  }}
                >
                  More information
                </Button>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Article;
