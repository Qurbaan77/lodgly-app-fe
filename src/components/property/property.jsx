import React, { useEffect, useState, useRef } from 'react';
import './property.css';
import {
  Form,
  Select,
  Input,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
  Tooltip
} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  PlusOutlined,
  SearchOutlined,
  VerticalAlignMiddleOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import Wrapper from '../wrapper';
import property1 from '../../assets/images/property-1.png';
import property2 from '../../assets/images/property-2.png';
import property3 from '../../assets/images/property-3.png';
import { Collapse } from 'antd';
import Toaster from '../toaster/toaster';
import { isEqual } from 'lodash';
import { InboxOutlined } from '@ant-design/icons';
import { userInstance } from '../../axios/axiosconfig';
import queryString from 'query-string';

const { Panel } = Collapse;

const normFile = (e) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

function onChange(checkedValues) {}

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
  const [form] = Form.useForm();
  const [currentProperty, setCurrentProperty] = useState([]);
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();
  const [petPolicy, setPetPolicy] = useState([]);
  const [feature1, setFeature1] = useState([]);
  const [feature2, setFeature2] = useState([]);
  const [feature3, setFeature3] = useState([]);
  
  const isSubUser = localStorage.getItem('isSubUser') || false;
  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  console.log(userCred);
  const  [{ propertiesWrite, userId }] = userCred ? userCred : [{}];
  const canWrite = propertiesWrite;
  useEffect(() => {
      getData();
  }, []);

  const close = () => {
    setNotifyType('');
  };

  const getData = async () => {
    const response = await userInstance.post('/fetchProperty', { affiliateId: userId });
    const data = response.data.propertiesData;
    if (response.data.code === 200) {
      const parsed = queryString.parse(window.location.search);
      const curProperty = data.filter(
        (el) => el.id == localStorage.getItem('propertyId'),
      );
      setCurrentProperty(curProperty);
      setPetPolicy(curProperty[0].petPolicy);
      setFeature1(curProperty[0].feature1);
      setFeature2(curProperty[0].feature2);
      setFeature3(curProperty[0].feature3);
    }
  }

  const onFinish = async (values) => {
    values.propertyNo = currentProperty[0].propertyNo;
    values.affiliateId = userId;
    const response = await userInstance.post('/addProperty', values);
    const statusCode = response.data.code;
    const msg = response.data.msg;
    if (statusCode === 200) {
      setNotifyType('success');
      setNotifyMsg(msg);
      getData();
    } else {
      setNotifyType('error');
      setNotifyMsg(msg);
    }
    form.resetFields();
  }

  const onChange = async (checkedValues) => {
    const listData = {
      checkedValues,
      No: currentProperty[0].propertyNo,
    }
    const response = await userInstance.post('/listing', listData);
  };

  const onChange1 = async (checkedValues1) => {
    const listData = {
      checkedValues1,
      No: currentProperty[0].propertyNo,
    }
    const response = await userInstance.post('/listing', listData);
  };

  const onChange2 = async (checkedValues2) => {
    const listData = {
      checkedValues2,
      No: currentProperty[0].propertyNo,
    }
    const response = await userInstance.post('/listing', listData);
  };

  const onChange3 = async (checkedValues3) => {
    const listData = {
      checkedValues3,
      No: currentProperty[0].propertyNo,
    }
    const response = await userInstance.post('/listing', listData);
  };


  return (
    <Wrapper>
      <div className="add-property">
      <Toaster notifyType={notifyType} notifyMsg={notifyMsg} close={close} />
        {currentProperty.map((el, i) => {
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
            })  
          return (
            <div className="page-header">
              <h1>
                <HomeOutlined /> Property {el.propertyNo}
              </h1>
            </div>
          );
        })}

        <div className="panel-container">
          <Collapse defaultActiveKey={['1']} accordion>
            <Panel header="Main Information" key="1">
              <div className="main-info-form">
                <Form form={form} onFinish={onFinish}>
                  <Row gutter={[16, 0]}>
                    <Col span={24}>
                      <Form.Item name="propertyName" label="Name">
                        <Input placeholder="My Demo Property" />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item name="propertyType" label="Property Type">
                        <Select>
                          <Select.Option value="demo">
                            Holiday House
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item name="address" label="Address">
                        <Input placeholder="4901 St Anthony Eye" />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item name="country" label="Country">
                        <Select>
                          <Select.Option value="demo">Croatia</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item name="state" label="State">
                        <Select>
                          <Select.Option value="demo">Choose</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item name="city" label="City">
                        <Select>
                          <Select.Option value="demo">Zadar</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item name="zip" label="Zip">
                        <Select>
                          <Select.Option value="demo">Choose</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item name="website" label="Website">
                        <Input placeholder="www.mywebsite.com" />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item>
                      <Button htmlType="submit">Update</Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Panel>

            <Panel header="Details" key="2">
              <div className="main-info-form">
                <Form form={form} onFinish={onFinish}>
                  <Row gutter={[16, 0]}>
                    <Col span={24}>
                      <Form.Item name="propertyType" label="Property Type">
                        <Select>
                          <Select.Option value="demo">
                            Holiday House
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={8}>
                      <Form.Item name="bedrooms" label="Bedrooms">
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
                      <Form.Item name="fullBathroom" label="Full Bathrooms">
                        <Select>
                        <Select.Option value="1">1</Select.Option>
                          <Select.Option value="2">2</Select.Option>
                          <Select.Option value="3">3</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={8}>
                      <Form.Item name="halfBathroom" label="Half Bathrooms">
                        <Select>
                          <Select.Option value="1">1</Select.Option>
                          <Select.Option value="2">2</Select.Option>
                          <Select.Option value="3">3</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={8}>
                      <Form.Item name="sqfoot" label="SQ Footage">
                        <Select>
                          <Select.Option value="demo">Zadar</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item name="description" label="Description">
                        <Input.TextArea />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item>
                      <Button htmlType="submit">Update</Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Panel>

            <Panel header="Listing" key="3">
              <div className="listing-info-form">
                <Form >
                  <Row gutter={[16, 0]}>
                    <Col span={6}>
                      <Form.Item label="Pet Policy">
                        <Checkbox.Group
                          options={petOptions}
                          defaultValue={petPolicy}
                          onChange={onChange}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item label="Features and Amenities">
                        <Checkbox.Group
                          options={featureOptions}
                          defaultValue={feature1}
                          onChange={onChange1}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item label="Features and Amenities">
                        <Checkbox.Group
                          options={featureOptions2}
                          defaultValue={feature2}
                          onChange={onChange2}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item label="Features and Amenities">
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

            <Panel header="Photo" key="4">
              <div className="main-info-form">
                <Form>
                  <Row gutter={[16, 0]}>
                    <Col span={24}>
                      <Form.Item label="Show off your place">
                        <Form.Item
                          name="dragger"
                          valuePropName="fileList"
                          getValueFromEvent={normFile}
                          noStyle
                        >
                          <Upload.Dragger name="files" action="/upload.do">
                            <p className="ant-upload-drag-icon">
                              <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                              Drop photos here or
                            </p>
                            <p className="ant-upload-hint">CHOOSE FILE</p>
                          </Upload.Dragger>
                          <p>
                            At least 1 photo is required. Max file size is 30MB
                            per image. JPG, PNG, or GIF formats only.
                          </p>
                        </Form.Item>
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item label="Video Tour (Optional)">
                        <Input />
                        <p>YouTube videos only. Paste your link here</p>
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item>
                      {
                        isSubUser ? canWrite ? 
                        <Button>Save</Button> : 
                        <Tooltip title='You are not authorize to save New Property' color='gold'>
                        <Button disabled='true'>Save</Button> 
                        </Tooltip> : 
                        <Button>Save</Button>
                      }
                        
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Panel>
          </Collapse>
        </div>
      </div>
    </Wrapper>
  );
};

export default Property;
