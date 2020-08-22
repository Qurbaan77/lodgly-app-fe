import React, { useEffect, useState, useCallback } from 'react';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import './profile.css';
import { toast } from 'react-toastify';
import {
  Form,
  Select,
  Input,
  Button,
  Upload,
  Row,
  Col,
  message,
  Collapse,
  Menu,
  Dropdown,
} from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import Wrapper from '../wrapper';
import { userInstance } from '../../axios/axiosconfig';
import UserLock from '../userlock/userlock';
import favicon from '../../assets/images/logo-mobile.png';
import { server } from '../../config/keys';

const { Panel } = Collapse;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const Profile = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = useCallback(
    (event) => {
      i18n.changeLanguage(event);
    },
    [i18n],
  );
  const [form1] = Form.useForm();
  const [form3] = Form.useForm();
  const [form4] = Form.useForm();
  const userId = localStorage.getItem('userId');
  const organizationid = localStorage.getItem('organizationid');
  const [img, setImg] = useState('');
  const [userName, setUserName] = useState('');
  const [subscribed, setSubscribed] = useState();
  const [onTrial, setOnTrial] = useState(true);
  const [daysLeft, setDaysLeft] = useState();
  const [country, setCountry] = useState(null);

  const getUserInfo = useCallback(async () => {
    const response0 = await userInstance.get('/getUserSubscriptionStatus');
    if (response0.data.code === 200) {
      const [
        { days, isOnTrial, isSubscribed },
      ] = response0.data.userSubsDetails;
      setDaysLeft(parseInt(days, 10));
      setSubscribed(JSON.parse(isSubscribed));
      setOnTrial(JSON.parse(isOnTrial));
    }
    const response = await userInstance.post('/getuserData');
    const body = response.data.userData;
    if (body.length > 0) {
      if (body[0].image !== null) {
        setImg(body[0].image);
      }
      if (body[0].fullname !== null) {
        setUserName(body[0].fullname);
      }
      form1.setFieldsValue({
        fullname: body[0].fullname,
        address: body[0].address,
        email: body[0].email,
        phone: body[0].phone,
      });
    }
  }, [form1]);

  const getCompanyInfo = useCallback(async () => {
    const companyName = window.location.hostname.split('.');
    const payload = {
      company: companyName[0],
    };
    const response = await userInstance.post('/getCompanyData', payload);
    const body = response.data.companyData;
    if (body.length > 0) {
      form4.setFieldsValue({
        name: body[0].name,
        address: body[0].address,
        country: body[0].country,
        state: body[0].state,
        city: body[0].city,
        zip: body[0].zip,
        vatId: body[0].vatId,
      });
    }
  }, [form4]);

  const personalInfoFinish = async (values) => {
    const response = await userInstance.post('/updatePersonalInfo', values);
    const statusCode = response.data.code;
    if (statusCode === 200) {
      toast.success('Profile Updated Successfully', { containerId: 'B' });
      getUserInfo();
    } else {
      toast.error('server error please try again', { containerId: 'B' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    form1.resetFields();
  };

  const companyFinsh = async (values) => {
    const response = await userInstance.post('/updateOrganisation', values);
    const statusCode = response.data.code;
    if (statusCode === 200) {
      toast.success('Company Data Saved Successfully', { containerId: 'B' });
    } else {
      toast.error('server error please try again', { containerId: 'B' });
    }
    getCompanyInfo();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    form4.resetFields();
  };

  const passwordFininsh = async (values) => {
    const response = await userInstance.post('/changePassword', values);
    const statusCode = response.data.code;
    if (statusCode === 200) {
      toast.success('Password changed successfully', { containerId: 'B' });
    } else {
      toast.error('server error please try again', { containerId: 'B' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    form3.resetFields();
  };

  const props = {
    name: 'file',
    multiple: false,
    // action: `http://localhost:8080/users/photo/${userId}`,
    action: `${server}/users/photo?userid=${userId}&organizationid=${organizationid}`,
    onChange(info) {
      // if (info.file.status !== 'uploading') {
      // console.log(info.file, info.fileList);
      // }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} {t('billingprofile.label26')}`);
        getUserInfo();
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name}  {t('billingprofile.label27')}`);
      }
    },
  };

  useEffect(() => {
    getUserInfo();
    getCompanyInfo();
  }, [getUserInfo, getCompanyInfo]);

  const english = useCallback(() => {
    changeLanguage('en');
  }, [changeLanguage]);

  const polish = useCallback(() => {
    changeLanguage('pl');
  }, [changeLanguage]);
  const language = (
    <Menu>
      <Menu.Item key="1" onClick={english}>
        English
      </Menu.Item>
      <Menu.Item key="2" onClick={polish}>
        Polish
      </Menu.Item>
    </Menu>
  );

  const hasAccess = onTrial && daysLeft !== 0 ? 1 : subscribed;
  return (
    <Wrapper img={img} name={userName} getUserInfo={getUserInfo}>
      <Helmet>
        <link rel="icon" href={favicon} />
        <title>
          Lodgly - Comprehensive Vacation Rental Property Management
        </title>
        <meta
          name="description"
          content="Grow your Vacation Rental with Lodgly"
        />
      </Helmet>
      {hasAccess ? (
        <div className="personal-information">
          <div className="page-header">
            <h1>
              <UserOutlined />
              {' '}
              {t('billingprofile.heading1')}
            </h1>
          </div>
          <div className="profile-container">
            <Row gutter={[16, 0]}>
              <Col span={12}>
                <Collapse defaultActiveKey={['1']} accordion>
                  <Panel header="Details" key="1">
                    <div className="main-info-form">
                      <h4>{t('billingprofile.label1')}</h4>
                      <p>{t('billingprofile.label2')}</p>
                      <Form
                        form={form1}
                        name="basic"
                        onFinish={personalInfoFinish}
                      >
                        <Row gutter={[16, 0]}>
                          <Col span={12}>
                            <Form.Item>
                              <Form.Item
                                name="dragger"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                noStyle
                              >
                                <Upload.Dragger {...props}>
                                  <p className="ant-upload-drag-icon">
                                    <UserOutlined />
                                  </p>
                                  {/* <div className="user-pic-success">
                                    <img src={user} alt="" />
                                  </div> */}
                                  <p className="ant-upload-text">
                                    {t('billingprofile.label3')}
                                  </p>
                                  <p className="ant-upload-hint">
                                    {t('billingprofile.label4')}
                                  </p>
                                </Upload.Dragger>
                              </Form.Item>
                            </Form.Item>
                          </Col>

                          <Col span={12}>
                            <Form.Item
                              label={t('billingprofile.label5')}
                              name="fullname"
                              rules={[
                                {
                                  required: true,
                                  message: t('billingprofile.label6'),
                                },
                              ]}
                            >
                              <Input placeholder="" />
                            </Form.Item>
                            <Form.Item
                              label={t('strings.email')}
                              name="email"
                              rules={[
                                {
                                  type: 'email',
                                  required: true,
                                  message: t('billingprofile.label24'),
                                },
                              ]}
                            >
                              <Input placeholder="" />
                            </Form.Item>

                            {/* <Form.Item
                              label={t('billingprofile.label7')}
                              name="lname"
                              rules={[
                                {
                                  required: true,
                                  message: t('billingprofile.label8'),
                                },
                              ]}
                            >
                              <Input placeholder="" />
                            </Form.Item> */}
                          </Col>

                          <Col span={24}>
                            <Form.Item
                              label={t('strings.address')}
                              name="address"
                            >
                              <Input placeholder="" />
                            </Form.Item>
                          </Col>

                          {/* <Col span={12}>
                            <Form.Item label={t('strings.email')} name="email">
                              <Input placeholder="" />
                            </Form.Item>
                          </Col> */}

                          <Col span={24}>
                            <Form.Item label={t('strings.phone')} name="phone">
                              <Input />
                            </Form.Item>
                          </Col>

                          <Col span={12}>
                            <Form.Item>
                              <Button type="primary" htmlType="submit">
                                {t('strings.save')}
                              </Button>
                            </Form.Item>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                  </Panel>
                </Collapse>

                <Collapse defaultActiveKey={['2']} accordion>
                  <Panel header="Application Settings" key="2">
                    <div className="main-info-form">
                      <h4>{t('billingprofile.label9')}</h4>
                      <p>{t('billingprofile.label2')}</p>

                      <Row gutter={[16, 0]}>
                        <Col span={12}>
                          <Form.Item
                            className="lang-box"
                            label={t('billingprofile.label10')}
                          >
                            <Dropdown
                              overlay={language}
                              overlayClassName="language-dropdown"
                            >
                              <Button>
                                {localStorage.getItem('i18nextLng') === 'pl'
                                  ? 'PL'
                                  : 'EN'}
                                {' '}
                                <DownOutlined />
                              </Button>
                            </Dropdown>
                          </Form.Item>
                        </Col>

                        <Col span={12}>
                          <Form.Item label={t('billingprofile.label11')}>
                            <Select>
                              <Select.Option value="demo">
                                Europe/Vienna
                              </Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>

                        <Col span={24}>
                          <Form.Item>
                            <Button>{t('strings.save')}</Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                  </Panel>
                </Collapse>

                <Collapse defaultActiveKey={['3']} accordion>
                  <Panel header="Password Change" key="3">
                    <div className="main-info-form">
                      <h4>{t('billingprofile.label12')}</h4>
                      <p>{t('billingprofile.label2')}</p>

                      <Form form={form3} onFinish={passwordFininsh}>
                        <Row gutter={[16, 0]}>
                          <Col span={24}>
                            <Form.Item
                              name="oldPassword"
                              label={t('billingprofile.label13')}
                              rules={[
                                {
                                  required: true,
                                  message: t('billingprofile.label14'),
                                },
                              ]}
                            >
                              <Input.Password placeholder="" />
                            </Form.Item>
                          </Col>

                          <Col span={24}>
                            <Form.Item
                              name="newPassword"
                              label={t('billingprofile.label15')}
                              rules={[
                                {
                                  required: true,
                                  message: t('billingprofile.label16'),
                                },
                              ]}
                            >
                              <Input.Password placeholder="" />
                            </Form.Item>
                          </Col>

                          <Col span={24}>
                            <Form.Item
                              name="confirm"
                              label={t('billingprofile.label17')}
                              dependencies={['newPassword']}
                              hasFeedback
                              rules={[
                                {
                                  required: true,
                                  message: t('billingprofile.label18'),
                                },
                                ({ getFieldValue }) => ({
                                  validator(rule, value) {
                                    if (
                                      !value
                                      || getFieldValue('newPassword') === value
                                    ) {
                                      return Promise.resolve();
                                    }

                                    return Promise.reject(
                                      new Error(
                                        'Password and confirm password are not match!',
                                      ),
                                    );
                                  },
                                }),
                              ]}
                            >
                              <Input.Password placeholder="" />
                            </Form.Item>
                          </Col>

                          <Col span={24}>
                            <Form.Item>
                              <Button type="primary" htmlType="submit">
                                {t('billingprofile.label19')}
                              </Button>
                            </Form.Item>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                  </Panel>
                </Collapse>
              </Col>

              <Col span={12}>
                <Collapse defaultActiveKey={['4']} accordion>
                  <Panel header="Company Data" key="4">
                    <div className="main-info-form">
                      <h4>
                        {' '}
                        {t('billingprofile.label20')}
                      </h4>
                      <p>
                        {' '}
                        {t('billingprofile.label23')}
                      </p>

                      <Form form={form4} onFinish={companyFinsh}>
                        <Row gutter={[16, 0]}>
                          <Col span={24}>
                            <Form.Item
                              name="name"
                              label={t('strings.name')}
                              rules={[
                                {
                                  required: true,
                                  message: t('billingprofile.label21'),
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                          </Col>

                          <Col span={24}>
                            <Form.Item
                              name="address"
                              label={t('strings.address')}
                            >
                              <Input placeholder="4901 St Anthony Eye" />
                            </Form.Item>
                          </Col>

                          <Col span={12}>
                            <Form.Item name="country" label="Country">
                              <CountryDropdown
                                onChange={(val) => setCountry(val)}
                              />
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
                              <Input />
                            </Form.Item>
                          </Col>

                          <Col span={24}>
                            <Form.Item name="zip" label="Vat ID">
                              <Input />
                            </Form.Item>
                          </Col>

                          <Col span={24}>
                            <Form.Item>
                              <Button type="primary" htmlType="submit">
                                {t('strings.save')}
                              </Button>
                            </Form.Item>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                  </Panel>
                </Collapse>
              </Col>
            </Row>
          </div>
        </div>
      ) : (
        <UserLock />
      )}
    </Wrapper>
  );
};

export default Profile;
