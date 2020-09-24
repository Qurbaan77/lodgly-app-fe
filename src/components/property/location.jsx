import React, { useState, useEffect, useCallback } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import {
  Radio, Row, Col, Form, Input, Switch, Button,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { BankOutlined } from '@ant-design/icons';
import Helmet from 'react-helmet';
import { toast } from 'react-toastify';
import Wrapper from '../wrapper';
import { propertyInstance } from '../../axios/axiosconfig';
import favicon from '../../assets/images/logo-mobile.png';

const Location = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [latLng, setlatLng] = useState({});
  const [distance, setDistance] = useState(false);
  const [directions, setDirections] = useState(false);
  const [placeHolderValue, setPlaceHolderValue] = useState('km');

  const handleAddressChange = (address) => {
    setAddress(...address);
  };

  const handleAddressSelect = async (address) => {
    const geocodeAddress = await geocodeByAddress(address);
    const getLatLang = await getLatLng(geocodeAddress[0]);
    const addressComponent = geocodeAddress[0].address_components.reverse();
    const zip = addressComponent[0].long_name;
    const country = addressComponent[1].short_name;
    const state = addressComponent[2].long_name;
    const city = addressComponent[3].long_name;
    setlatLng(getLatLang);
    setCountry(country);
    setState(state);
    setCity(city);
    setZip(zip);
    form.setFieldsValue({
      location: address,
    });
  };

  const getData = useCallback(async () => {
    const response = await propertyInstance.post('/fetchUnittypeData', {
      unitTypeV2Id: localStorage.getItem('propertyV2Id'),
    });
    if (response.data.code === 200) {
      const data = response.data.unitTypeV2Data[0];
      form.setFieldsValue({
        location: data.address,
        distanceIn: data.distanceIn,
      });
      if (data.distance !== null && data.direction !== null) {
        setDistance(true);
        setDirections(true);
        form.setFieldsValue({
          direction: data.direction,
          bus: data.distance.bus,
          train: data.distance.train,
          underground: data.distance.underground,
          motorway: data.distance.motorway,
          airport: data.distance.airport,
          port: data.distance.port,
        });
      }
    }
  }, [form]);

  const onFinish = async (values) => {
    values.unitTypeV2Id = localStorage.getItem('propertyV2Id');
    values.country = country;
    values.latLng = latLng;
    values.state = state;
    values.city = city;
    values.zip = zip;
    const obj = {
      bus: values.bus,
      train: values.train,
      underground: values.underground,
      motorway: values.motorway,
      airport: values.airport,
      port: values.port,
    };
    values.distance = JSON.stringify(obj);
    const response = await propertyInstance.post('/updateLocation', values);
    if (response.data.code === 200) {
      getData();
      toast.success('Changes have been saved', {
        containerId: 'B',
        toastId: 'B',
      });
    }
  };

  useEffect(() => {
    getData();
  }, [getData]);

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
              <Form form={form} onFinish={onFinish}>
                <div className="location-first-section">
                  <h3>{t('location.heading1')}</h3>
                  <Row>
                    <Col span={24}>
                      <Form.Item
                        name="location"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter the location',
                            whitespace: true,
                          },
                        ]}
                      >
                        <PlacesAutocomplete
                          value={address}
                          onChange={handleAddressChange}
                          onSelect={handleAddressSelect}
                        >
                          {({
                            getInputProps,
                            suggestions,
                            getSuggestionItemProps,
                            loading,
                          }) => (
                            <div>
                              <Input
                                {...getInputProps({
                                  placeholder: t('strings.searchplaces'),
                                  className: 'location-search-input',
                                })}
                              />
                              <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map((suggestion) => {
                                  const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                  // inline style for demonstration purpose
                                  const style = suggestion.active
                                    ? {
                                      backgroundColor: '#fafafa',
                                      cursor: 'pointer',
                                    }
                                    : {
                                      backgroundColor: '#ffffff',
                                      cursor: 'pointer',
                                    };
                                  return (
                                    <div
                                      {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                      })}
                                    >
                                      <span>{suggestion.description}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </PlacesAutocomplete>
                      </Form.Item>
                    </Col>
                  </Row>
                </div>

                <div className="toggle-box-section">
                  <h3>
                    {t('location.heading2')}
                    <Switch checked={distance} onClick={() => setDistance(!distance)} />
                  </h3>
                  <p>{t('location.paragraph1')}</p>

                  <div className={`toggle-content ${distance ? 'show' : ''}`}>
                    <div className="location-distance">
                      <Row>
                        <Col span={24}>
                          <div className="location-radio">
                            <Form.Item name="distanceIn">
                              <Radio.Group name="radiogroup">
                                <Radio value="km" onClick={() => setPlaceHolderValue('km')}>Kilometers</Radio>
                                <Radio value="mi" onClick={() => setPlaceHolderValue('mi')}>Miles</Radio>
                              </Radio.Group>
                            </Form.Item>
                          </div>
                        </Col>

                        <Col span={12}>
                          <div className="distance-box">
                            <div className="distance-icon">
                              <BankOutlined />
                              {' '}
                              {t('location.paragraph2')}
                            </div>
                            <div className="distance-input">
                              <Form.Item name="bus">
                                <Input placeholder={placeHolderValue} />
                              </Form.Item>
                            </div>
                          </div>

                          <div className="distance-box">
                            <div className="distance-icon">
                              <BankOutlined />
                              {' '}
                              {t('location.paragraph3')}
                            </div>
                            <div className="distance-input">
                              <Form.Item name="train">
                                <Input placeholder={placeHolderValue} />
                              </Form.Item>
                            </div>
                          </div>

                          <div className="distance-box">
                            <div className="distance-icon">
                              <BankOutlined />
                              {' '}
                              {t('location.paragraph4')}
                            </div>
                            <div className="distance-input">
                              <Form.Item name="underground">
                                <Input placeholder={placeHolderValue} />
                              </Form.Item>

                            </div>
                          </div>
                        </Col>

                        <Col span={12}>
                          <div className="distance-box">
                            <div className="distance-icon">
                              <BankOutlined />
                              {' '}
                              {t('location.paragraph5')}
                            </div>
                            <div className="distance-input">
                              <Form.Item name="motorway">
                                <Input placeholder={placeHolderValue} />
                              </Form.Item>
                            </div>
                          </div>

                          <div className="distance-box">
                            <div className="distance-icon">
                              <BankOutlined />
                              {' '}
                              {t('location.paragraph6')}
                            </div>
                            <div className="distance-input">
                              <Form.Item name="airport">
                                <Input placeholder={placeHolderValue} />
                              </Form.Item>
                            </div>
                          </div>

                          <div className="distance-box">
                            <div className="distance-icon">
                              <BankOutlined />
                              {' '}
                              {t('location.paragraph7')}
                            </div>
                            <div className="distance-input">
                              <Form.Item name="port">
                                <Input placeholder={placeHolderValue} />
                              </Form.Item>
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
                    {t('location.heading3')}
                    <Switch checked={directions} onClick={() => setDirections(!directions)} />
                  </h3>
                  <p>{t('location.paragraph8')}</p>
                  <div className={`toggle-content ${directions ? 'show' : ''}`}>
                    <Row>
                      <Col span={24}>
                        <Form.Item name="direction">
                          <TextArea placeholder="Description" rows={4} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="toggle-box-button">
                  <Button type="primary" htmlType="submit" className="savebtn">
                    {t('location.button1')}
                  </Button>
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
