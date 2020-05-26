import React, { useEffect, useState } from 'react';
import './reset.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.jpg';
import Toaster from '../toaster/toaster';
import { userInstance } from '../../axios/axiosconfig';
import queryString from 'query-string';

const Reset = () => {
  const [form] = Form.useForm();
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();

  const onFinish = async (values) => {
    const parsed = queryString.parse(window.location.search);
    values.hex = parsed.hh;
    const response = await userInstance.post('/forgetpassword', values);
    const statusCode = response.data.code;
    const msg = response.data.msg;
    if (statusCode == 200) {
      setNotifyType('success');
      setNotifyMsg(msg);
    } else {
      setNotifyType('error');
      setNotifyMsg(msg);
    }
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const close = () => {
    setNotifyType('');
  };

  return (
    <div className="forget">
      <div className="forget-section">
      <Toaster notifyType={notifyType} notifyMsg={notifyMsg} close={close} />
        <div className="container">
          <div classNmae="row">
            <div className="col-md-12">
              <div className="forget-logo">
                <img src={logo} alt="Logo" />
              </div>
              <div className="forget-form">
                <h1>Get a new password</h1>
                <p>Enter your email address to reset your password</p>
                <div className="forget-box">
                  <div>
                    <Form
                      form={form}
                      name="basic"
                      initialValues={{
                        remember: true,
                      }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                    >
                      <Form.Item
                        label="New Password"
                        name="newpassword"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your password!',
                          },
                        ]}
                      >
                        <Input.Password placeholder="New password" />
                      </Form.Item>

                      <Form.Item
                        label="Confirm Password"
                        name="confirmpassword"
                        dependencies={['newpassword']}
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
                                getFieldValue('newpassword') === value
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
                        <Input.Password placeholder="Confirm Password" />
                      </Form.Item>

                      <Form.Item>
                        <Button className="forget-btn" htmlType="submit">
                          Change Password
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;
