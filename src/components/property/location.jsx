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

  const handleAddressChange = (address) => {
    setAddress(...address);
  };

  const handleAddressSelect = async (address) => {
    const geocodeAddress = await geocodeByAddress(address);
    const getLatLang = await getLatLng(geocodeAddress[0]);
    const addressComponent = geocodeAddress[0].address_components.reverse();
    const zip = addressComponent[0].long_name;
    const country = addressComponent[1].long_name;
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
      if (response.data.unitTypeV2Data.length > 0) {
        form.setFieldsValue({
          location: data.address,
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
                  <h3>Location</h3>
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
                    Distances
                    <Switch checked={distance} onClick={() => setDistance(!distance)} />
                  </h3>
                  <p>Add distances to nearby transport options.</p>

                  <div className={`toggle-content ${distance ? 'show' : ''}`}>
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
                    <Switch checked={directions} onClick={() => setDirections(!directions)} />
                  </h3>
                  <p>Explain how guests can reach your rental.</p>

                  <div className={`toggle-content ${directions ? 'show' : ''}`}>
                    <Row>
                      <Col span={24}>
                        <Form.Item name="description">
                          <TextArea placeholder="Description" rows={4} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="toggle-box-button">
                  <Button type="primary" htmlType="submit" className="savebtn">
                    Save
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
