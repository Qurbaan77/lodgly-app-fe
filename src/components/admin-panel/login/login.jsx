import React, { useState } from 'react';
import './login.css';
import {
  Form, Input, Button,
} from 'antd';
import { Link } from 'react-router-dom';
import Toaster from '../../toaster/toaster';
import { adminInstance } from '../../../axios/axiosconfig';

const AdminLogin = () => {
  const [form] = Form.useForm();
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();

  const onFinish = async (values) => {
    const response = await adminInstance.post('/login', values);
    const statusCode = response.data.code;
    const { msg } = response.data;

    const tokenparser = (token) => {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
          .join(''),
      );
      return JSON.parse(jsonPayload);
    };
    if (statusCode === 200) {
      localStorage.setItem('adminToken', response.data.token);
      const payload = tokenparser(response.data.token);
      localStorage.setItem('userId', payload.userid);
      setNotifyType('success');
      setNotifyMsg(msg);
    } else {
      setNotifyType('error');
      setNotifyMsg(msg);
    }
    form.resetFields();
  };

  return (
    <div className="admin-login">
      <div className="admin-login-container">
        <div className="left">
          <Toaster notifyType={notifyType} notifyMsg={notifyMsg} />
          <div className="row">
            <div className="col-md-12">
              <div className="login-form">
                <h1>Welcome back!</h1>
                <p>We are happy to have you here again!</p>
                <div className="login-box">
                  <Form
                    name="basic"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                  >
                    <Form.Item
                      label="E-mail Address"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter your E-mail Address!',
                        },
                      ]}
                    >
                      <Input placeholder="me@janlosert.com" />
                    </Form.Item>

                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your password!',
                        },
                      ]}
                    >
                      <Input.Password placeholder="******" />
                    </Form.Item>

                    <Form.Item>
                      <Button className="login-btn" htmlType="submit">
                        Login
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>

              <div className="q-links">
                <p>
                  <Link to="/">Forget your password?</Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="right">
          <div className="admin-bg" />
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
