import React from 'react';
import { Col, Image, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import aws from '../assets/icons/amazon_aws-icon.svg';
import bootstrap from '../assets/icons/bootstrap-icon.svg';
import css from '../assets/icons/css-icon.svg';
import express from '../assets/icons/expressjs-icon.svg';
import heroku from '../assets/icons/heroku-icon.svg';
import html from '../assets/icons/html5-icon.svg';
import javascript from '../assets/icons/javascript-icon.svg';
import jquery from '../assets/icons/jquery-icon.svg';
import json from '../assets/icons/json-icon.svg';
import laravel from '../assets/icons/laravel-icon.svg';
import mongo from '../assets/icons/mongodb-icon.svg';
import mysql from '../assets/icons/mysql-icon.svg';
import node from '../assets/icons/nodejs-icon.svg';
import php from '../assets/icons/php-icon.svg';
import react from '../assets/icons/reactjs-icon.svg';
import redux from '../assets/icons/redux-icon.svg';
import symfony from '../assets/icons/symfony-icon.svg';
import vscode from '../assets/icons/visualstudio_code-icon.svg';

const Technology = () => {
  return (
    <>
      <Row className='d-flex justify-content-center tech'>
        <Row className='my-2'>
          <Col sm={12} md={3} className='text-sm-center text-md-start'>
            <h4>Languages:</h4>
          </Col>
          <Col className='text-md-start'>
            <OverlayTrigger overlay={<Tooltip>JavaScript</Tooltip>}>
              <Image src={javascript} alt='javascript' />
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>PHP</Tooltip>}>
              <Image src={php} alt='php' />
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>HTML</Tooltip>}>
              <Image src={html} alt='html' />
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>CSS</Tooltip>}>
              <Image src={css} alt='css' />
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>JSON</Tooltip>}>
              <Image src={json} alt='json' />
            </OverlayTrigger>
          </Col>
        </Row>
        <Row className='my-3'>
          <Col sm={12} md={3} className='text-sm-center text-md-start'>
            <h4>Frameworks:</h4>
          </Col>
          <Col className='text-md-start'>
            <OverlayTrigger overlay={<Tooltip>Node</Tooltip>}>
              <Image src={node} alt='node' />
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Express</Tooltip>}>
              <Image src={express} alt='express' />
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>React</Tooltip>}>
              <Image src={react} alt='react' />
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Redux</Tooltip>}>
              <Image src={redux} alt='redux' />
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Laravel</Tooltip>}>
              <Image src={laravel} alt='laravel' />
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Sympfony</Tooltip>}>
              <Image src={symfony} alt='symfony' />
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Jquery</Tooltip>}>
              <Image src={jquery} alt='jquery' />
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Bootstrap</Tooltip>}>
              <Image src={bootstrap} alt='bootstrap' />
            </OverlayTrigger>
          </Col>
        </Row>
        <Row className='my-3'>
          <Col sm={12} md={3} className='text-sm-center text-md-start'>
            <h4>Databases:</h4>
          </Col>
          <Col className='text-md-start'>
            <OverlayTrigger overlay={<Tooltip>MongoDB</Tooltip>}>
              <Image src={mongo} alt='mongo' />
            </OverlayTrigger>

            <OverlayTrigger overlay={<Tooltip>MYSQL</Tooltip>}>
              <Image src={mysql} alt='mysql' />
            </OverlayTrigger>
          </Col>
        </Row>
        <Row className='my-3'>
          <Col sm={12} md={3} className='text-sm-center text-md-start'>
            <h4>Cloud Infra-Architecture:</h4>
          </Col>
          <Col className='text-md-start'>
            <OverlayTrigger overlay={<Tooltip>AWS</Tooltip>}>
              <Image src={aws} alt='aws' />
            </OverlayTrigger>

            <OverlayTrigger overlay={<Tooltip>Heroku</Tooltip>}>
              <Image src={heroku} alt='heroku' />
            </OverlayTrigger>
          </Col>
        </Row>
        <Row className='my-3'>
          <Col sm={12} md={3} className='text-sm-center text-md-start'>
            <h4>Working in:</h4>
          </Col>
          <Col className='text-md-start'>
            <OverlayTrigger overlay={<Tooltip>VSCode</Tooltip>}>
              <Image src={vscode} alt='vscode' />
            </OverlayTrigger>
          </Col>
        </Row>
      </Row>
    </>
  );
};

export default Technology;
