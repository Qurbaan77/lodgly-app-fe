import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './register.css';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import logo from '../../assets/images/logo.jpg';
import Toaster from '../toaster/toaster';
import { userInstance } from '../../axios/axiosconfig';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const Register = () => {
  const [form] = Form.useForm();
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();
  const [userName, setUserName] = useState();
  const history = useHistory();

  const onFinish = async (values) => {
    const response = await userInstance.post('/signup', values);
    const statusCode = response.data.code;
    const msg = response.data.msg;
    if (statusCode == 200) {
      setNotifyType('success');
      setNotifyMsg(msg);
      history.push('/thankyou');
    } else {
      setNotifyType('error');
      setNotifyMsg(msg);
    }
    form.resetFields();
  };

  const addOn = () => {
    form.setFieldsValue({
      username: userName,
    })
  }

  const close = () => {
    setNotifyType('');
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  return (
    <div className="register">
      <Toaster notifyType={notifyType} notifyMsg={notifyMsg} close={close} />
      <div className="register-section">
        <div className="container">
          <div classNmae="row">
            <div className="col-md-12">
              <div className="register-logo">
                <img src={logo} alt="Logo" />
              </div>
              <div className="register-form">
                <h1>Register</h1>
                <p>We're happy to have you here!</p>
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
                          onChange={(e)=> setUserName(`${e.target.value}.lodgly.com`)}
                          onBlur={addOn}
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
                              message: 'Please input your password!',
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
                              message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                if (
                                  !value ||
                                  getFieldValue('password') === value
                                ) {
                                  return Promise.resolve();
                                }

                                return Promise.reject(
                                  'The two passwords that you entered do not match!',
                                );
                              },
                            }),
                          ]}
                        >
                          <Input.Password />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={24}>
                        <Form.Item label="Select Package" hidden={true}>
                          <Select>
                            <Select.Option value="demo">Demo</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={24}>
                        <Form.Item
                          name="phone"
                          label="Phone Number"
                          rules={[
                            {
                              required: true,
                              message: 'Please input your phone number!',
                            },
                          ]}
                        >
                          <Input
                            addonBefore={prefixSelector}
                            style={{
                              width: '100%',
                            }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={24}>
                        <Form.Item name="agreement" valuePropName="checked">
                          <Checkbox>
                            I have read the <Link to={'/'}>agreement</Link>
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
                  Already have an account? <Link to={'/'}>Login now</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
