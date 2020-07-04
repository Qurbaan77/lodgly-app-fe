import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
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
  message,
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
import { InboxOutlined } from '@ant-design/icons';
import { userInstance } from '../../axios/axiosconfig';
import Toaster from '../toaster/toaster';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const normFile = (e) => {
  console.log('Upload event:', e);
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

const AddProperty = () => {
  const [form] = Form.useForm();
  const [No, setNo] = useState(0);
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();
  const [address, setAddress] = useState('');
  const history = useHistory();

  const isSubUser = localStorage.getItem('isSubUser') || false;
  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  console.log(userCred);
  const  [{ propertiesWrite, userId }] = userCred ? userCred : [{}];
  const canWrite = propertiesWrite;

  useEffect(() => {
    async function getData() {
      const response = await userInstance.post('/fetchProperty', { affiliateId: userId });
      const data = response.data.propertiesData;
      if (response.data.code === 200) {
        setNo(data.length + 1);
      }
    }

    getData();
  }, []);

  const close = () => {
    setNotifyType('');
  };

  const onFinish = async (values) => {
    console.log('Values', values)
    values.propertyNo = No;
    values.affiliateId = userId;
    const response = await userInstance.post('/addProperty', values);
    const statusCode = response.data.code;
    const msg = response.data.msg;
    if (statusCode === 200) {
      setNotifyType('success');
      setNotifyMsg(msg);
      history.push('/propertylist');
    } else {
      setNotifyType('error');
      setNotifyMsg(msg);
    }
    form.resetFields();
  };

  const onChange = async (checkedValues) => {
    const listData = {
      checkedValues,
      No,
    };
    const response = await userInstance.post('/listing', listData);
  };

  const onChange1 = async (checkedValues1) => {
    const listData = {
      checkedValues1,
      No,
    };
    const response = await userInstance.post('/listing', listData);
  };

  const onChange2 = async (checkedValues2) => {
    const listData = {
      checkedValues2,
      No,
    };
    const response = await userInstance.post('/listing', listData);
  };

  const onChange3 = async (checkedValues3) => {
    const listData = {
      checkedValues3,
      No,
    };
    const response = await userInstance.post('/listing', listData);
  };

  const props = {
    name: 'file',
    action: 'http://localhost:3001/users/photo',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleAddressChange = (address) => {
    setAddress(...address);
  };

  const handleAddressSelect = (address) => {
    console.log('handleAddressSelect', address)
    form.setFieldsValue({
      address: address
    })
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log('Success', latLng))
      .catch((error) => console.error('Error', error));
  };

  return (
    <Wrapper>
      <div className='add-property'>
        <Toaster notifyType={notifyType} notifyMsg={notifyMsg} close={close} />
        <div className='page-header'>
          <h1>
            <HomeOutlined /> Property {No}
          </h1>
        </div>

        <div className='panel-container'>
          <Collapse defaultActiveKey={['1']} accordion>
            <Panel header='Main Information' key='1'>
              <div className='main-info-form'>
                <Form form={form} onFinish={onFinish}>
                  <Row gutter={[16, 0]}>
                    <Col span={24}>
                      <Form.Item name='propertyName' label='Name'
                      rules={[
                        {
                          required: true,
                          message: 'Please enter property name',
                          whitespace: true,
                        },
                      ]}
                      >
                        <Input 
                        placeholder='My Demo Property'
                        />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item name='propertyType' label='Property Type'>
                        <Select>
                          <Select.Option value='demo'>
                            Holiday House
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item name='address' label='Address'>
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
                              <div className='autocomplete-dropdown-container'>
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
                      <Form.Item name='country' label='Country'>
                        <Select>
                          <Select.Option value='demo'>Croatia</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item name='state' label='State'>
                        <Select>
                          <Select.Option value='demo'>Choose</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item name='city' label='City'>
                        <Select>
                          <Select.Option value='demo'>Zadar</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item name='zip' label='Zip'>
                        <Select>
                          <Select.Option value='demo'>Choose</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item name='website' label='Website'>
                        <Input placeholder='www.mywebsite.com' />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item>
                        <Button htmlType='submit'>Save</Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Panel>

            <Panel header='Details' key='2'>
              <div className='main-info-form'>
                <Form form={form} name='property' onFinish={onFinish}>
                  <Row gutter={[16, 0]}>
                    <Col span={24}>
                      <Form.Item label='Property Type'>
                        <Select>
                          <Select.Option value='demo'>
                            Holiday House
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={8}>
                      <Form.Item name='bedrooms' label='Bedrooms'>
                        <Select>
                          <Select.Option value='1'>1</Select.Option>
                          <Select.Option value='2'>2</Select.Option>
                          <Select.Option value='3'>3</Select.Option>
                          <Select.Option value='4'>4</Select.Option>
                          <Select.Option value='5'>5</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={8}>
                      <Form.Item name='fullBathroom' label='Full Bathrooms'>
                        <Select>
                          <Select.Option value='1'>1</Select.Option>
                          <Select.Option value='2'>2</Select.Option>
                          <Select.Option value='3'>3</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={8}>
                      <Form.Item name='halfBathroom' label='Half Bathrooms'>
                        <Select>
                          <Select.Option value='1'>1</Select.Option>
                          <Select.Option value='2'>2</Select.Option>
                          <Select.Option value='3'>3</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={8}>
                      <Form.Item name='sqfoot' label='SQ Footage'>
                        <Select>
                          <Select.Option value='demo'>Zadar</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item name='description' label='Description'>
                        <Input.TextArea />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item>
                        <Button htmlType='submit'>Save</Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Panel>

            <Panel header='Listing' key='3'>
              <div className='listing-info-form'>
                <Form>
                  <Row gutter={[16, 0]}>
                    <Col span={6}>
                      <Form.Item label='Pet Policy'>
                        <Checkbox.Group
                          options={petOptions}
                          // defaultValue={['Pets Negotiable']}
                          onChange={onChange}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item label='Features and Amenities'>
                        <Checkbox.Group
                          options={featureOptions}
                          // defaultValue={['Furnished or available furnished']}
                          onChange={onChange1}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item label='Features and Amenities'>
                        <Checkbox.Group
                          options={featureOptions2}
                          // defaultValue={['Gym/Fitness Center']}
                          onChange={onChange2}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item label='Features and Amenities'>
                        <Checkbox.Group
                          options={featureOptions3}
                          // defaultValue={['Outdoor Space']}
                          onChange={onChange3}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Panel>

            <Panel header='Photo' key='4'>
              <div className='main-info-form'>
                <Form>
                  <Row gutter={[16, 0]}>
                    <Col span={24}>
                      <Form.Item label='Show off your place'>
                        <Form.Item
                          name='dragger'
                          valuePropName='fileList'
                          getValueFromEvent={normFile}
                          noStyle
                        >
                          <Upload.Dragger {...props}>
                            <p className='ant-upload-drag-icon'>
                              <InboxOutlined />
                            </p>
                            <p className='ant-upload-text'>
                              Drop photos here or
                            </p>
                            <p className='ant-upload-hint'>CHOOSE FILE</p>
                          </Upload.Dragger>
                          <p>
                            At least 1 photo is required. Max file size is 30MB
                            per image. JPG, PNG, or GIF formats only.
                          </p>
                        </Form.Item>
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item label='Video Tour (Optional)'>
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

export default AddProperty;
