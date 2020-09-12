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
  Collapse,
  Menu,
  Dropdown,
} from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import Wrapper from '../wrapper';
import { userInstance } from '../../axios/axiosconfig';
import UserLock from '../userlock/userlock';
import favicon from '../../assets/images/logo-mobile.png';
// import arrow from '../../assets/images/select-arrow.png';
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
  const [form2] = Form.useForm();
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
  // const [image, setImage] = useState('');

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
    // console.log(response);
    const body = response.data.userData;
    if (body.length > 0) {
      if (body[0].image !== null) {
        setImg(body[0].image);
      } else {
        setImg('');
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
      form2.setFieldsValue({
        timezone: body[0].timeZone,
      });
    }
  }, [form1, form2]);

  const getCompanyInfo = useCallback(async () => {
    const companyName = window.location.hostname.split('.');
    const payload = {
      company: companyName[0],
    };
    const response = await userInstance.post('/getCompanyData', payload);
    const body = response.data.companyData;
    if (body.length > 0) {
      form1.setFieldsValue({
        subdomain: body[0].name,
      });

      form4.setFieldsValue({
        companyName: body[0].companyName,
        address: body[0].address,
        country: body[0].country,
        state: body[0].state,
        city: body[0].city,
        zip: body[0].zip,
        vatId: body[0].vatId,
      });
    }
  }, [form4, form1]);

  const personalInfoFinish = async (values) => {
    const copyValues = values;
    copyValues.address = values.address.trim();
    copyValues.fullname = values.fullname.trim();
    copyValues.email = values.email.trim();
    copyValues.phone = values.phone.trim();
    const companyName = window.location.hostname.split('.');
    copyValues.name = companyName[0];
    const response = await userInstance.post('/updatePersonalInfo', copyValues);
    const statusCode = response.data.code;
    if (statusCode === 200) {
      toast.success('Profile Updated Successfully', { containerId: 'B' });
      getUserInfo();
    } else {
      toast.error('server error please try again', { containerId: 'B' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // form1.resetFields();
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
    action: `${server}/users/photo?userid=${userId}&organizationid=${organizationid}`,
    onChange(info) {
      if (info.file.status === 'done') {
        // setImage(info.file.response.image);
        toast.success(`${info.file.name} ${t('billingprofile.label26')}`, { containerId: 'B' });
        getUserInfo();
      } else if (info.file.status === 'error') {
        toast.error(`${info.file.name}  ${t('billingprofile.label27')}`, { containerId: 'B' });
      }
    },
  };

  const applicationFinish = async (values) => {
    const response = await userInstance.post('/updateTimeZone', values);
    const statusCode = response.data.code;
    if (statusCode === 200) {
      toast.success('Time Zone Saved Successfully', { containerId: 'B' });
      getUserInfo();
    } else {
      toast.error('server error please try again', { containerId: 'B' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    form2.resetFields();
  };

  useEffect(() => {
    getUserInfo();
    getCompanyInfo();
  }, [getUserInfo, getCompanyInfo]);

  const Delete = async () => {
    const response = await userInstance.post('/removeProfile');
    if (response.data.code === 200) {
      toast.success('Profile Removed Successfully', { containerId: 'B' });
      getUserInfo();
    } else {
      toast.error('server error please try again', { containerId: 'B' });
    }
  };

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
    <Wrapper userName={userName} imgState={img}>
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
                                  {
                                    img
                                      ? (
                                        <div className="user-pic-success">
                                          <img src={img} alt="" />
                                          <span>
                                            {t('billingprofile.label3')}
                                            {t('billingprofile.label4')}
                                          </span>

                                        </div>
                                      )
                                      : (
                                        <>
                                          <p className="ant-upload-drag-icon">
                                            <UserOutlined />
                                          </p>
                                          <p className="ant-upload-text">
                                            {t('billingprofile.label3')}
                                          </p>
                                          <p className="ant-upload-hint">
                                            {t('billingprofile.label4')}
                                          </p>
                                        </>
                                      )
                                }
                                </Upload.Dragger>
                              </Form.Item>
                            </Form.Item>
                          </Col>

                          <Col span={12}>
                            <Form.Item
                              label="Subdomain"
                              name="subdomain"
                              rules={[
                                {
                                  required: true,
                                  message: t('billingprofile.label8'),
                                },
                              ]}
                            >
                              <Input disabled placeholder="" />
                            </Form.Item>
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
                            {img && (
                              <Button onClick={Delete}>Remove Avatar</Button>
                            )}
                          </Col>

                          <Col span={24}>
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
                          </Col>

                          <Col span={24}>
                            <Form.Item
                              label={t('strings.address')}
                              name="address"
                            >
                              <Input placeholder="" />
                            </Form.Item>
                          </Col>

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
                      <Form form={form2} onFinish={applicationFinish}>
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
                            <Form.Item label={t('billingprofile.label11')} name="timezone">
                              <Select
                                showSearch
                                optionFilterProp="children"
                              >
                                <Select.Option value="Etc/GMT+12">(GMT-12:00) International Date Line West</Select.Option>
                                <Select.Option value="Pacific/Midway">(GMT-11:00) Midway Island, Samoa</Select.Option>
                                <Select.Option value="Pacific/Honolulu">(GMT-10:00) Hawaii</Select.Option>
                                <Select.Option value="US/Alaska">(GMT-09:00) Alaska</Select.Option>
                                <Select.Option value="America/Los_Angeles">(GMT-08:00) Pacific Time (US & Canada)</Select.Option>
                                <Select.Option value="America/Tijuana">(GMT-08:00) Tijuana, Baja California</Select.Option>
                                <Select.Option value="US/Arizona">(GMT-07:00) Arizona</Select.Option>
                                <Select.Option value="America/Chihuahua">(GMT-07:00) Chihuahua, La Paz, Mazatlan</Select.Option>
                                <Select.Option value="US/Mountain">(GMT-07:00) Mountain Time (US & Canada)</Select.Option>
                                <Select.Option value="America/Managua">(GMT-06:00) Central America</Select.Option>
                                <Select.Option value="US/Central">(GMT-06:00) Central Time (US & Canada)</Select.Option>
                                <Select.Option value="America/Mexico_City">(GMT-06:00) Guadalajara, Mexico City, Monterrey</Select.Option>
                                <Select.Option value="Canada/Saskatchewan">(GMT-06:00) Saskatchewan</Select.Option>
                                <Select.Option value="America/Bogota">(GMT-05:00) Bogota, Lima, Quito, Rio Branco</Select.Option>
                                <Select.Option value="US/Eastern">(GMT-05:00) Eastern Time (US & Canada)</Select.Option>
                                <Select.Option value="US/East-Indiana">(GMT-05:00) Indiana (East)</Select.Option>
                                <Select.Option value="Canada/Atlantic">(GMT-04:00) Atlantic Time (Canada)</Select.Option>
                                <Select.Option value="America/Caracas">(GMT-04:00) Caracas, La Paz</Select.Option>
                                <Select.Option value="America/Manaus">(GMT-04:00) Manaus</Select.Option>
                                <Select.Option value="America/Santiago">(GMT-04:00) Santiago</Select.Option>
                                <Select.Option value="Canada/Newfoundland">(GMT-03:30) Newfoundland</Select.Option>
                                <Select.Option value="America/Sao_Paulo">(GMT-03:00) Brasilia</Select.Option>
                                <Select.Option value="America/Argentina/Buenos_Aires">(GMT-03:00) Buenos Aires, Georgetown</Select.Option>
                                <Select.Option value="America/Godthab">(GMT-03:00) Greenland</Select.Option>
                                <Select.Option value="America/Montevideo">(GMT-03:00) Montevideo</Select.Option>
                                <Select.Option value="America/Noronha">(GMT-02:00) Mid-Atlantic</Select.Option>
                                <Select.Option value="Atlantic/Cape_Verde">(GMT-01:00) Cape Verde Is.</Select.Option>
                                <Select.Option value="Atlantic/Azores">(GMT-01:00) Azores</Select.Option>
                                <Select.Option value="Africa/Casablanca">(GMT+00:00) Casablanca, Monrovia, Reykjavik</Select.Option>
                                <Select.Option value="Etc/Greenwich">(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London</Select.Option>
                                <Select.Option value="Europe/Amsterdam">(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</Select.Option>
                                <Select.Option value="Europe/Belgrade">(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague</Select.Option>
                                <Select.Option value="Europe/Brussels">(GMT+01:00) Brussels, Copenhagen, Madrid, Paris</Select.Option>
                                <Select.Option value="Europe/Sarajevo">(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb</Select.Option>
                                <Select.Option value="Africa/Lagos">(GMT+01:00) West Central Africa</Select.Option>
                                <Select.Option value="Asia/Amman">(GMT+02:00) Amman</Select.Option>
                                <Select.Option value="Europe/Athens">(GMT+02:00) Athens, Bucharest, Istanbul</Select.Option>
                                <Select.Option value="Asia/Beirut">(GMT+02:00) Beirut</Select.Option>
                                <Select.Option value="Africa/Cairo">(GMT+02:00) Cairo</Select.Option>
                                <Select.Option value="Africa/Harare">(GMT+02:00) Harare, Pretoria</Select.Option>
                                <Select.Option value="Europe/Helsinki">(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius</Select.Option>
                                <Select.Option value="Asia/Jerusalem">(GMT+02:00) Jerusalem</Select.Option>
                                <Select.Option value="Europe/Minsk">(GMT+02:00) Minsk</Select.Option>
                                <Select.Option value="Africa/Windhoek">(GMT+02:00) Windhoek</Select.Option>
                                <Select.Option value="Asia/Kuwait">(GMT+03:00) Kuwait, Riyadh, Baghdad</Select.Option>
                                <Select.Option value="Europe/Moscow">(GMT+03:00) Moscow, St. Petersburg, Volgograd</Select.Option>
                                <Select.Option value="Africa/Nairobi">(GMT+03:00) Nairobi</Select.Option>
                                <Select.Option value="Asia/Tbilisi">(GMT+03:00) Tbilisi</Select.Option>
                                <Select.Option value="Asia/Tehran">(GMT+03:30) Tehran</Select.Option>
                                <Select.Option value="Asia/Muscat">(GMT+04:00) Abu Dhabi, Muscat</Select.Option>
                                <Select.Option value="Asia/Baku">(GMT+04:00) Baku</Select.Option>
                                <Select.Option value="Asia/Yerevan">(GMT+04:00) Yerevan</Select.Option>
                                <Select.Option value="Asia/Kabul">(GMT+04:30) Kabul</Select.Option>
                                <Select.Option value="Asia/Yekaterinburg">(GMT+05:00) Yekaterinburg</Select.Option>
                                <Select.Option value="Asia/Karachi">(GMT+05:00) Islamabad, Karachi, Tashkent</Select.Option>
                                <Select.Option value="Asia/Calcutta">(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</Select.Option>
                                <Select.Option value="Asia/SriLanka">(GMT+05:30) Sri Jayawardenapura</Select.Option>
                                <Select.Option value="Asia/Katmandu">(GMT+05:45) Kathmandu</Select.Option>
                                <Select.Option value="Asia/Almaty">(GMT+06:00) Almaty, Novosibirsk</Select.Option>
                                <Select.Option value="Asia/Dhaka">(GMT+06:00) Astana, Dhaka</Select.Option>
                                <Select.Option value="Asia/Rangoon">(GMT+06:30) Yangon (Rangoon)</Select.Option>
                                <Select.Option value="Asia/Bangkok">(GMT+07:00) Bangkok, Hanoi, Jakarta</Select.Option>
                                <Select.Option value="Asia/Krasnoyarsk">(GMT+07:00) Krasnoyarsk</Select.Option>
                                <Select.Option value="Asia/Hong_Kong">(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi</Select.Option>
                                <Select.Option value="Asia/Kuala_Lumpur">(GMT+08:00) Kuala Lumpur, Singapore</Select.Option>
                                <Select.Option value="Asia/Irkutsk">(GMT+08:00) Irkutsk, Ulaan Bataar</Select.Option>
                                <Select.Option value="Australia/Perth">(GMT+08:00) Perth</Select.Option>
                                <Select.Option value="Asia/Taipei">(GMT+08:00) Taipei</Select.Option>
                                <Select.Option value="Asia/Tokyo">(GMT+09:00) Osaka, Sapporo, Tokyo</Select.Option>
                                <Select.Option value="Asia/Seoul">(GMT+09:00) Seoul</Select.Option>
                                <Select.Option value="Asia/Yakutsk">(GMT+09:00) Yakutsk</Select.Option>
                                <Select.Option value="Australia/Adelaide">(GMT+09:30) Adelaide</Select.Option>
                                <Select.Option value="Australia/Darwin">(GMT+09:30) Darwin</Select.Option>
                                <Select.Option value="Australia/Brisbane">(GMT+10:00) Brisbane</Select.Option>
                                <Select.Option value="Australia/Canberra">(GMT+10:00) Canberra, Melbourne, Sydney</Select.Option>
                                <Select.Option value="Australia/Hobart">(GMT+10:00) Hobart</Select.Option>
                                <Select.Option value="Pacific/Guam">(GMT+10:00) Guam, Port Moresby</Select.Option>
                                <Select.Option value="Asia/Vladivostok">(GMT+10:00) Vladivostok</Select.Option>
                                <Select.Option value="Asia/Magadan">(GMT+11:00) Magadan, Solomon Is., New Caledonia</Select.Option>
                                <Select.Option value="Pacific/Auckland">(GMT+12:00) Auckland, Wellington</Select.Option>
                                <Select.Option value="Pacific/Fiji">(GMT+12:00) Fiji, Kamchatka, Marshall Is.</Select.Option>
                                <Select.Option value="Pacific/Tongatapu">(GMT+13:00) Nukualofa</Select.Option>
                              </Select>
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
                              name="companyName"
                              label="company name"
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
                              {/* <img src={arrow} alt="" /> */}
                            </Form.Item>
                          </Col>

                          <Col span={12}>
                            <Form.Item name="state" label={t('strings.state')}>
                              <RegionDropdown country={country} />
                              {/* <img src={arrow} alt="" /> */}
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
