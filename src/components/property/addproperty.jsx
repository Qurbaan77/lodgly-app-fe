import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PlacesAutocomplete from 'react-places-autocomplete';
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
  Tooltip,
  Collapse,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { HomeOutlined, InboxOutlined } from '@ant-design/icons';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Wrapper from '../wrapper';
import { server } from '../../config/keys';
import { userInstance } from '../../axios/axiosconfig';
import Toaster from '../toaster/toaster';

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

const AddProperty = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [No, setNo] = useState(0);
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState(null);
  const history = useHistory();

  const isSubUser = localStorage.getItem('isSubUser') || false;
  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [{ propertiesWrite, userId }] = userCred || [{}];
  const canWrite = propertiesWrite;

  useEffect(() => {
    async function getData() {
      const response = await userInstance.post('/fetchProperty', {
        affiliateId: userId,
      });
      const data = response.data.propertiesData;
      if (response.data.code === 200) {
        setNo(data.length + 1);
      }
    }

    getData();
  }, [userId]);

  const close = () => {
    setNotifyType('');
  };

  const onFinish = async (values) => {
    values.propertyNo = No;
    values.affiliateId = userId;
    const response = await userInstance.post('/addProperty', values);
    const statusCode = response.data.code;
    const { msg } = response.data;
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
    await userInstance.post('/listing', listData);
  };

  const onChange1 = async (checkedValues1) => {
    const listData = {
      checkedValues1,
      No,
    };
    await userInstance.post('/listing', listData);
  };

  const onChange2 = async (checkedValues2) => {
    const listData = {
      checkedValues2,
      No,
    };
    await userInstance.post('/listing', listData);
  };

  const onChange3 = async (checkedValues3) => {
    const listData = {
      checkedValues3,
      No,
    };
    await userInstance.post('/listing', listData);
  };

  const props2 = {
    No,
    uersId: localStorage.getItem('userId'),
  };

  const props = {
    name: 'file',
    // action: `http://localhost:3001/users/propertyPicture${props2}`,
    action: `${server}/users/propertyPicture${props2}`,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
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
    form.setFieldsValue({
      address,
    });
  };

  const enableButton = <Button>{t('strings.save')}</Button>;
  const disabledButton = (
    <Tooltip title={t('addproperty.title6')} color="gold">
      <Button disabled="true">{t('strings.save')}</Button>
    </Tooltip>
  );

  const btn1 = isSubUser && canWrite ? enableButton : disabledButton;
  const btn2 = isSubUser ? btn1 : enableButton;

  return (
    <Wrapper>
      <div className="add-property">
        <Toaster notifyType={notifyType} notifyMsg={notifyMsg} close={close} />
        <div className="page-header">
          <h1>
            <HomeOutlined />
            {t('addproperty.heading')}
            {' '}
            {No}
          </h1>
        </div>

        <div className="panel-container">
          <Collapse defaultActiveKey={['1']} accordion>
            <Panel header={t('addproperty.title1')} key="1">
              <div className="main-info-form">
                <Form form={form} onFinish={onFinish}>
                  <Row gutter={[16, 0]}>
                    <Col span={24}>
                      <Form.Item
                        name="propertyName"
                        label={t('strings.name')}
                        rules={[
                          {
                            required: true,
                            message: 'Please enter property name',
                            whitespace: true,
                          },
                        ]}
                      >
                        <Input placeholder={t('addproperty.detail1')} />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item name="propertyType" label={t('addproperty.detail2')}>
                        <Select>
                          <Select.Option value="demo">
                            Holiday House
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item name="address" label={t('addproperty.detail3')}>
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
                      <Form.Item name="country" label={t('addproperty.detail5')}>
                        <CountryDropdown onChange={(val) => setCountry(val)} />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item name="state" label={t('addproperty.detail6')}>
                        <RegionDropdown country={country} />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item name="city" label={t('addproperty.detail7')}>
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item name="zip" label={t('addproperty.detail8')}>
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item name="website" label={t('addproperty.detail9')}>
                        <Input placeholder="www.mywebsite.com" />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item>
                        <Button htmlType="submit">{t('strings.save')}</Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Panel>

            <Panel header={t('addproperty.title2')} key="2">
              <div className="main-info-form">
                <Form form={form} name="property" onFinish={onFinish}>
                  <Row gutter={[16, 0]}>
                    <Col span={24}>
                      <Form.Item label={t('addproperty.detail2')}>
                        <Select>
                          <Select.Option value="demo">
                            Holiday House
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={8}>
                      <Form.Item name="bedrooms" label={t('addproperty.detail10')}>
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
                      <Form.Item name="fullBathroom" label={t('addproperty.detail11')}>
                        <Select>
                          <Select.Option value="1">1</Select.Option>
                          <Select.Option value="2">2</Select.Option>
                          <Select.Option value="3">3</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={8}>
                      <Form.Item name="halfBathroom" label={t('addproperty.detail12')}>
                        <Select>
                          <Select.Option value="1">1</Select.Option>
                          <Select.Option value="2">2</Select.Option>
                          <Select.Option value="3">3</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={8}>
                      <Form.Item name="sqfoot" label={t('addproperty.detail13')}>
                        <Select>
                          <Select.Option value="demo">Zadar</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item name="description" label={t('addproperty.detail14')}>
                        <Input.TextArea />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item>
                        <Tooltip
                          title={t('addproperty.title5')}
                          color="gold"
                        >
                          <Button htmlType="submit" disabled="true">
                            {t('strings.save')}
                          </Button>
                        </Tooltip>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Panel>

            <Panel header={t('addproperty.title3')} key="3">
              <div className="listing-info-form">
                <Form disabled>
                  <Row gutter={[16, 0]}>
                    <Col span={6}>
                      <Form.Item label={t('addproperty.detail15')}>
                        <Checkbox.Group
                          options={petOptions}
                          // defaultValue={['Pets Negotiable']}
                          onChange={onChange}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item label={t('addproperty.detail16')}>
                        <Checkbox.Group
                          options={featureOptions}
                          // defaultValue={['Furnished or available furnished']}
                          onChange={onChange1}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item label={t('addproperty.detail16')}>
                        <Checkbox.Group
                          options={featureOptions2}
                          // defaultValue={['Gym/Fitness Center']}
                          onChange={onChange2}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item label={t('addproperty.detail16')}>
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

            <Panel header={t('addproperty.title4')} key="4">
              <div className="main-info-form">
                <Form disabled>
                  <Row gutter={[16, 0]}>
                    <Col span={24}>
                      <Form.Item label={t('addproperty.detail17')}>
                        <Form.Item
                          name="dragger"
                          valuePropName="fileList"
                          getValueFromEvent={normFile}
                          noStyle
                        >
                          <Tooltip
                            title={t('addproperty.title5')}
                            color="gold"
                          >
                            <Upload.Dragger {...props} disabled>
                              <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                              </p>
                              <p className="ant-upload-text">
                                {t('addproperty.detail19')}
                              </p>
                              <p className="ant-upload-hint">{t('addproperty.detail20')}</p>
                            </Upload.Dragger>
                          </Tooltip>
                          <p>
                            {t('addproperty.detail21')}
                          </p>
                        </Form.Item>
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item label="Video Tour (Optional)">
                        <Input />
                        <p>{t('addproperty.detail22')}</p>
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item>{btn2}</Form.Item>
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
