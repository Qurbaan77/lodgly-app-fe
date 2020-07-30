import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Helmet from 'react-helmet';
import './register.css';
import {
  Form, Input, Row, Col, Checkbox, Button,
} from 'antd';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import logo from '../../assets/images/logo.jpg';
import favicon from '../../assets/images/logo-mobile.png';
import Toaster from '../toaster/toaster';
import { userInstance } from '../../axios/axiosconfig';

const Register = () => {
  const [form] = Form.useForm();
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();
  const [phone, setPhone] = useState(null);
  const history = useHistory();

  const onFinish = async (values) => {
    const response = await userInstance.post('/signup', values);
    const statusCode = response.data.code;
    const { msg } = response.data;
    if (statusCode === 200) {
      setNotifyType('success');
      setNotifyMsg(msg);
      history.push('/thankyou');
    } else {
      setNotifyType('error');
      setNotifyMsg(msg);
    }
    form.resetFields();
  };

  const close = () => {
    setNotifyType('');
  };

  const handleChange = (value) => {
    setPhone(value);
  };

  return (
    <>
      <Helmet>
        <link rel="icon" href={favicon} />
        <title>Lodgly - Comprehensive Vacation Rental Property Management</title>
        <meta name="description" content="Grow your Vacation Rental with Lodgly" />
      </Helmet>
      <div className="register">
        <Toaster notifyType={notifyType} notifyMsg={notifyMsg} close={close} />
        <div className="register-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="register-logo">
                  <img src={logo} alt="Logo" />
                </div>
                <div className="register-form">
                  <h1>Register</h1>
                  <p>
                    We
                    <span>&apos;</span>
                    re happy to have you here!
                  </p>
                  <div className="register-box">
                    <Form
                      form={form}
                      name="register"
                      onFinish={onFinish}
                      initialValues={{
                        residence: ['zhejiang', 'hangzhou', 'xihu'],
                        prefix: '86',
                      }}
                      scrollToFirstError
                    >
                      <Row gutter={[16, 0]}>
                        <Col span={12}>
                          <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                              {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                              },
                              {
                                required: true,
                                message: 'Please input your E-mail!',
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>

                        <Col span={12}>
                          <Form.Item
                            name="username"
                            label="Username"
                            rules={[
                              {
                                required: true,
                                message: 'Please input your username!',
                                whitespace: true,
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row gutter={[16, 0]}>
                        <Col span={12}>
                          <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                              {
                                required: true,
                                min: 6,
                                max: 15,
                                message:
                                'Password should be between 6 to 15 characters long!',
                              },
                            ]}
                            hasFeedback
                          >
                            <Input.Password />
                          </Form.Item>
                        </Col>

                        <Col span={12}>
                          <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                              {
                                required: true,
                                Min: 6,
                                Max: 15,
                                message: 'Please confirm your password!',
                              },
                              ({ getFieldValue }) => ({
                                validator(rule, value) {
                                  if (
                                    !value
                                  || getFieldValue('password') === value
                                  ) {
                                    return Promise.resolve();
                                  }

                                  return Promise.reject(
                                    new Error(
                                      'The two passwords that you entered do not match!',
                                    ),
                                  );
                                },
                              }),
                            ]}
                          >
                            <Input.Password />
                          </Form.Item>
                        </Col>
                      </Row>

                      {/* <Row>
                      <Col span={24}>
                        <Form.Item label="Select Package" hidden>
                          <Select>
                            <Select.Option value="demo">Demo</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row> */}

                      <Row>
                        <Col span={24}>
                          <Form.Item
                            name="phone"
                            label="Phone Number"
                            rules={[
                              {
                                required: true,
                                max: 15,
                                min: 9,
                                message:
                                'Please input your phone number between range 9 - 15!',
                              },
                            ]}
                          >
                            <PhoneInput
                              country="us"
                              value={phone}
                              onChange={(value) => handleChange(value)}
                            />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={24}>
                          <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            rules={[
                              {
                                validator: (_, value) => (value
                                  ? Promise.resolve()
                                  : Promise.reject(new Error('Should accept agreement'))),
                              },
                            ]}
                          >
                            <Checkbox>
                              I have read the
                              {' '}
                              <Link to="/register">agreement</Link>
                            </Checkbox>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={24}>
                          <Form.Item>
                            <Button
                              type="primary"
                              className="register-btn"
                              htmlType="submit"
                            >
                              Register
                            </Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </div>

                <div className="q-links">
                  <p>
                    Already have an account?
                    {' '}
                    <Link to="/">Login now</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
