import React, { useEffect, useState, useCallback } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Helmet from 'react-helmet';
import './property.css';
import {
  Form,
  Select,
  Input,
  Button,
  Upload,
  Checkbox,
  Row,
  Col,
  message,
  Collapse,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { HomeOutlined, InboxOutlined } from '@ant-design/icons';
import Wrapper from '../wrapper';
import Toaster from '../toaster/toaster';
import { userInstance } from '../../axios/axiosconfig';
import { server } from '../../config/keys';
import favicon from '../../assets/images/logo-mobile.png';
import UserLock from '../userlock/userlock';

const { Panel } = Collapse;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const petOptions = [
  'Pets Negotiable',
  'Cats OK',
  'Dogs OK',
  'No Pets',
  'Don’t specify',
];
const featureOptions = [
  'Furnished or available furnished',
  'Washer/Dryer',
  'Parking',
];

const featureOptions2 = [
  'Gym/Fitness Center',
  'Air Conditioning',
  'Hardwood Floors',
  'Fireplace',
  'Dishwasher',
  'Storage',
  'Walk-In Closet',
  'Pool',
  'Hot Tub',
];
const featureOptions3 = [
  'Outdoor Space',
  'Shared Yard',
  'Private Yard',
  'Patio',
  'Balcony',
  'Garden',
  'Wheelchair accessible',
];

const Property = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [currentProperty, setCurrentProperty] = useState([]);
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();
  const [petPolicy, setPetPolicy] = useState([]);
  const [feature1, setFeature1] = useState([]);
  const [feature2, setFeature2] = useState([]);
  const [feature3, setFeature3] = useState([]);
  const [id, setId] = useState([]);
  const organizationid = localStorage.getItem('organizationid');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState(null);
  const [subscribed, setSubscribed] = useState();
  const [onTrial, setOnTrial] = useState(true);
  const [daysLeft, setDaysLeft] = useState();

  // const isSubUser = localStorage.getItem('isSubUser') || false;
  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [{ userId }] = userCred || [{}];
  // const canWrite = propertiesWrite;

  const close = () => {
    setNotifyType('');
  };

  const getData = useCallback(async () => {
    const res = await userInstance.get('/getUserSubscriptionStatus');
    if (res.data.code === 200) {
      const [{
        days, isOnTrial, isSubscribed,
      }] = res.data.userSubsDetails;
      setDaysLeft(parseInt(days, 10));
      setSubscribed(JSON.parse(isSubscribed));
      setOnTrial(JSON.parse(isOnTrial));
    }
    // setId(localStorage.getItem('userId'));
    const response = await userInstance.post('/fetchProperty', {
      affiliateId: userId,
    });
    const data = response.data.propertiesData;
    if (response.data.code === 200) {
      const curProperty = data.filter(
        (el) => el.id === parseInt(localStorage.getItem('propertyId'), 10),
      );
      setCurrentProperty(curProperty);
      setId(curProperty[0].id);
      setPetPolicy(curProperty[0].petPolicy);
      setFeature1(curProperty[0].feature1);
      setFeature2(curProperty[0].feature2);
      setFeature3(curProperty[0].feature3);
    }
  }, [userId]);

  const onFinish = async (values) => {
    values.propertyNo = currentProperty[0].propertyNo;
    values.affiliateId = userId;
    const response = await userInstance.post('/addProperty', values);
    const statusCode = response.data.code;
    const { msg } = response.data;
    if (statusCode === 200) {
      setNotifyType('success');
      setNotifyMsg(msg);
      getData();
    } else {
      setNotifyType('error');
      setNotifyMsg(msg);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    form.resetFields();
  };

  const onChange = async (checkedValues) => {
    const listData = {
      checkedValues,
      No: currentProperty[0].propertyNo,
    };
    await userInstance.post('/listing', listData);
  };

  const onChange1 = async (checkedValues1) => {
    const listData = {
      checkedValues1,
      No: currentProperty[0].propertyNo,
    };
    await userInstance.post('/listing', listData);
  };

  const onChange2 = async (checkedValues2) => {
    const listData = {
      checkedValues2,
      No: currentProperty[0].propertyNo,
    };
    await userInstance.post('/listing', listData);
  };

  const onChange3 = async (checkedValues3) => {
    const listData = {
      checkedValues3,
      No: currentProperty[0].propertyNo,
    };
    await userInstance.post('/listing', listData);
  };

  const handleAddressChange = (address) => {
    setAddress(...address);
  };

  const handleAddressSelect = (address) => {
    form.setFieldsValue({
      address,
    });
  };

  const props = {
    name: 'file',
    multiple: false,
    // action: `http://localhost:3001/users/propertyPicture/${id}`,
    // action: `${server}/users/propertyPicture/${id}`,
    action: `${server}/users/propertyPicture?propertyid=${id}&organizationid=${organizationid}`,
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  useEffect(() => {
    getData();
  }, [getData]);

  // const enableButton = <Button>Save</Button>;
  // const disableButton = (
  //   <Tooltip title="You are not authorize to save New Property" color="gold">
  //     <Button disabled="true">Save</Button>
  //   </Tooltip>
  // );
  // const btn1 = isSubUser && canWrite ? enableButton : disableButton;
  // const btn2 = isSubUser ? btn1 : enableButton;

  const hasAccess = onTrial && daysLeft !== 0 ? 1 : subscribed;
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
        <body className="detail-page-view" />
      </Helmet>
      {
        hasAccess
          ? (
            <>
              <div className="add-property">
                <Toaster notifyType={notifyType} notifyMsg={notifyMsg} close={close} />
                {currentProperty.map((el) => {
                  form.setFieldsValue({
                    propertyName: el.propertyName,
                    propertyType: el.propertyType,
                    address: el.address,
                    country: el.country,
                    state: el.state,
                    city: el.city,
                    zip: el.zip,
                    website: el.website,

                    bedrooms: el.bedrooms,
                    fullBathroom: el.fullBathroom,
                    halfBathroom: el.halfBathroom,
                    sqfoot: el.sqfoot,
                    description: el.description,
                  });
                  return (
                    <div className="page-header">
                      <h1>
                        <HomeOutlined />
                        {' '}
                        {t('strings.property')}
                        <span>&nbsp;</span>
                        {el.propertyNo}
                      </h1>
                    </div>
                  );
                })}

                <div className="panel-container">
                  <Collapse defaultActiveKey={['1']} accordion>
                    <Panel header={t('property.heading4')} key="1">
                      <div className="main-info-form">
                        <Form form={form} onFinish={onFinish}>
                          <Row gutter={[16, 0]}>
                            <Col span={24}>
                              <Form.Item name="propertyName" label="Name">
                                <Input placeholder={t('property.heading3')} />
                              </Form.Item>
                            </Col>

                            <Col span={24}>
                              <Form.Item
                                name="propertyType"
                                label={t('property.heading2')}
                              >
                                <Select>
                                  <Select.Option value="Holiday House">Holiday House</Select.Option>
                                  <Select.Option value="Holiday Apartment">Holiday Apartment</Select.Option>
                                  <Select.Option value="Bed and Breakfast">Bed and Breakfast</Select.Option>
                                  <Select.Option value="Boat House">Boat House</Select.Option>
                                  <Select.Option value="Bungalow">Bungalow</Select.Option>
                                  <Select.Option value="Cabin">Cabin</Select.Option>
                                  <Select.Option value="Agritourism">Agritourism</Select.Option>
                                  <Select.Option value="Mobile House">Mobile House</Select.Option>
                                  <Select.Option value="Villa">Villa</Select.Option>
                                  <Select.Option value="Room">Room</Select.Option>
                                  <Select.Option value="Hotel">Hotel</Select.Option>
                                  <Select.Option value="Camping">Camping</Select.Option>
                                  <Select.Option value="Student Housing">Student Housing</Select.Option>
                                  <Select.Option value="Resort">Resort</Select.Option>
                                  <Select.Option value="Inn">Inn</Select.Option>
                                  <Select.Option value="Hostel">Hostel</Select.Option>
                                  <Select.Option value="Motel">Motel</Select.Option>
                                  <Select.Option value="Hospital">Hospital</Select.Option>
                                  <Select.Option value="Pousada">Pousada</Select.Option>
                                </Select>
                              </Form.Item>
                            </Col>

                            <Col span={24}>
                              <Form.Item name="address" label={t('strings.address')}>
                                {/* <Input placeholder='4901 St Anthony Eye' /> */}
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
                                          placeholder: 'Search Places ...',
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

                            <Col span={12}>
                              <Form.Item name="country" label={t('strings.country')}>
                                <CountryDropdown onChange={(val) => setCountry(val)} />
                              </Form.Item>
                            </Col>

                            <Col span={12}>
                              <Form.Item name="state" label={t('strings.state')}>
                                <RegionDropdown country={country} />
                              </Form.Item>
                            </Col>

                            <Col span={12}>
                              <Form.Item name="city" label={t('strings.city')}>
                                <Input />
                              </Form.Item>
                            </Col>

                            <Col span={12}>
                              <Form.Item name="zip" label={t('strings.zip')}>
                                <Select>
                                  <Select.Option value="demo">
                                    {t('strings.choose')}
                                  </Select.Option>
                                </Select>
                              </Form.Item>
                            </Col>

                            <Col span={24}>
                              <Form.Item name="website" label={t('strings.website')}>
                                <Input placeholder="www.mywebsite.com" />
                              </Form.Item>
                            </Col>

                            <Col span={24}>
                              <Form.Item>
                                <Button htmlType="submit">{t('strings.update')}</Button>
                              </Form.Item>
                            </Col>
                          </Row>
                        </Form>
                      </div>
                    </Panel>

                    <Panel header={t('property.heading5')} key="2">
                      <div className="main-info-form">
                        <Form form={form} onFinish={onFinish}>
                          <Row gutter={[16, 0]}>
                            <Col span={24}>
                              <Form.Item
                                name="propertyType"
                                label={t('property.heading2')}
                              >
                                <Input />
                              </Form.Item>
                            </Col>

                            <Col span={8}>
                              <Form.Item name="bedrooms" label={t('property.label1')}>
                                <Select>
                                  <Select.Option value="1">1</Select.Option>
                                  <Select.Option value="2">2</Select.Option>
                                  <Select.Option value="3">3</Select.Option>
                                  <Select.Option value="4">4</Select.Option>
                                  <Select.Option value="5">5</Select.Option>
                                </Select>
                              </Form.Item>
                            </Col>

                            <Col span={8}>
                              <Form.Item
                                name="fullBathroom"
                                label={t('property.label2')}
                              >
                                <Select>
                                  <Select.Option value="1">1</Select.Option>
                                  <Select.Option value="2">2</Select.Option>
                                  <Select.Option value="3">3</Select.Option>
                                </Select>
                              </Form.Item>
                            </Col>

                            <Col span={8}>
                              <Form.Item
                                name="halfBathroom"
                                label={t('property.label3')}
                              >
                                <Select>
                                  <Select.Option value="1">1</Select.Option>
                                  <Select.Option value="2">2</Select.Option>
                                  <Select.Option value="3">3</Select.Option>
                                </Select>
                              </Form.Item>
                            </Col>

                            <Col span={8}>
                              <Form.Item name="sqfoot" label={t('property.label4')}>
                                <Input />
                              </Form.Item>
                            </Col>

                            <Col span={24}>
                              <Form.Item
                                name="description"
                                label={t('property.label5')}
                              >
                                <Input.TextArea />
                              </Form.Item>
                            </Col>

                            <Col span={24}>
                              <Form.Item>
                                <Button htmlType="submit">{t('strings.update')}</Button>
                              </Form.Item>
                            </Col>
                          </Row>
                        </Form>
                      </div>
                    </Panel>

                    <Panel header={t('property.heading6')} key="3">
                      <div className="listing-info-form">
                        <Form>
                          <Row gutter={[16, 0]}>
                            <Col span={6}>
                              <Form.Item label={t('property.label6')}>
                                <Checkbox.Group
                                  options={petOptions}
                                  defaultValue={petPolicy}
                                  onChange={onChange}
                                />
                              </Form.Item>
                            </Col>

                            <Col span={6}>
                              <Form.Item label={t('property.label7')}>
                                <Checkbox.Group
                                  options={featureOptions}
                                  defaultValue={feature1}
                                  onChange={onChange1}
                                />
                              </Form.Item>
                            </Col>

                            <Col span={6}>
                              <Form.Item label={t('property.label7')}>
                                <Checkbox.Group
                                  options={featureOptions2}
                                  defaultValue={feature2}
                                  onChange={onChange2}
                                />
                              </Form.Item>
                            </Col>

                            <Col span={6}>
                              <Form.Item label={t('property.label7')}>
                                <Checkbox.Group
                                  options={featureOptions3}
                                  defaultValue={feature3}
                                  onChange={onChange3}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Form>
                      </div>
                    </Panel>

                    <Panel header={t('property.heading7')} key="4">
                      <div className="main-info-form">
                        <Form>
                          <Row gutter={[16, 0]}>
                            <Col span={24}>
                              <Form.Item label={t('property.para1')}>
                                <Form.Item
                                  name="dragger"
                                  valuePropName="fileList"
                                  getValueFromEvent={normFile}
                                  noStyle
                                >
                                  <Upload.Dragger {...props}>
                                    <p className="ant-upload-drag-icon">
                                      <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">
                                      {t('property.para2')}
                                    </p>
                                    <p className="ant-upload-hint">
                                      {t('property.label9')}
                                    </p>
                                  </Upload.Dragger>
                                  <p>{t('property.para3')}</p>
                                </Form.Item>
                              </Form.Item>
                            </Col>

                            <Col span={24}>
                              <Form.Item label={t('property.para3')}>
                                <Input />
                                <p>
                                  {' '}
                                  {t('property.para4')}
                                </p>
                              </Form.Item>
                            </Col>

                            {/* <Col span={24}>
                              <Form.Item>{btn2}</Form.Item>
                            </Col> */}
                          </Row>
                        </Form>
                      </div>
                    </Panel>
                  </Collapse>
                </div>
              </div>
            </>
          )
          : <UserLock />
      }
    </Wrapper>
  );
};

export default Property;
