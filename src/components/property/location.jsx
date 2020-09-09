import React, { useState } from 'react';
import {
  Radio, Row, Col, Form, Input, Switch,
} from 'antd';
import { BankOutlined } from '@ant-design/icons';
import Helmet from 'react-helmet';
import Wrapper from '../wrapper';
import favicon from '../../assets/images/logo-mobile.png';

const Location = () => {
  const { TextArea } = Input;
  const [nav, setNav] = useState(false);
  const handleMenu = (e) => {
    if (e === 'open') {
      setNav(true);
    } else if (e === 'close') {
      setNav(false);
    } else if (e === 'toggle') {
      setNav(!nav);
    }
  };

  return (
    <Wrapper>
      <Helmet>
        <link rel="icon" href={favicon} />
        <title>
          Lodgly - Comprehensive Vacation Rental Property Management
        </title>
        <meta
          name="description"
          content="Grow your Vacation Rental with Lodgly"
        />
        <body className="location-page-view" />
      </Helmet>

      <div className="location">
        <Row>
          <Col span={24}>
            <div className="location-content">
              <Form>
                <div className="location-first-section">
                  <h3>Location</h3>
                  <Row>
                    <Col span={24}>
                      <Form.Item name="name">
                        <Input placeholder="Street, number, city, country" />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>

                <div className="toggle-box-section">
                  <h3>
                    Distances
                    {' '}
                    <Switch onClick={() => handleMenu('toggle')} />
                  </h3>
                  <p>Add distances to nearby transport options.</p>

                  <div className={`toggle-content ${nav ? 'show' : ''}`}>
                    <div className="location-distance">
                      <Row>
                        <Col span={24}>
                          <div className="location-radio">
                            <Radio>Kilometers</Radio>
                            <Radio>Miles</Radio>
                          </div>
                        </Col>

                        <Col span={12}>
                          <div className="distance-box">
                            <div className="distance-icon">
                              <BankOutlined />
                              {' '}
                              Bus
                            </div>
                            <div className="distance-input">
                              <Input placeholder="km" />
                            </div>
                          </div>

                          <div className="distance-box">
                            <div className="distance-icon">
                              <BankOutlined />
                              {' '}
                              Train
                            </div>
                            <div className="distance-input">
                              <Input placeholder="km" />
                            </div>
                          </div>

                          <div className="distance-box">
                            <div className="distance-icon">
                              <BankOutlined />
                              {' '}
                              Underground
                            </div>
                            <div className="distance-input">
                              <Input placeholder="km" />
                            </div>
                          </div>
                        </Col>

                        <Col span={12}>
                          <div className="distance-box">
                            <div className="distance-icon">
                              <BankOutlined />
                              {' '}
                              Motorway
                            </div>
                            <div className="distance-input">
                              <Input placeholder="km" />
                            </div>
                          </div>

                          <div className="distance-box">
                            <div className="distance-icon">
                              <BankOutlined />
                              {' '}
                              Airport
                            </div>
                            <div className="distance-input">
                              <Input placeholder="km" />
                            </div>
                          </div>

                          <div className="distance-box">
                            <div className="distance-icon">
                              <BankOutlined />
                              {' '}
                              Port
                            </div>
                            <div className="distance-input">
                              <Input placeholder="km" />
                            </div>
                          </div>
                        </Col>

                        <Col span={24}>
                          <p>
                            If the distance from your rental is less than 1km
                            (e.g. 200m), then enter the distance in decimal
                            numbers (e.g. 0.2).
                          </p>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>

                <div className="toggle-box-section">
                  <h3>
                    Directions
                    {' '}
                    <Switch onClick={() => handleMenu('toggle')} />
                  </h3>
                  <p>Explain how guests can reach your rental.</p>

                  <div className={`toggle-content ${nav ? 'show' : ''}`}>
                    <Row>
                      <Col span={24}>
                        <Form.Item name="description">
                          <TextArea placeholder="Description" rows={4} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </Wrapper>
  );
};

export default Location;
