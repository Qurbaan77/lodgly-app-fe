import React, { useEffect, useState } from 'react';
import './login.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.jpg';
import Toaster from '../toaster/toaster';
import { userInstance } from '../../axios/axiosconfig';

const Login = () => {
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();

  const onFinish = async (values) => {
    const response = await userInstance.post('/login', values);
    const statusCode = response.data.code;
    const msg = response.data.msg;
    console.log(msg);
    if (statusCode == 200) {
      localStorage.setItem('token', response.data.token);
      let payload = tokenparser(response.data.token);
      localStorage.setItem('userId', payload.userid);
      setNotifyType('success');
      setNotifyMsg(msg);
    } else {
      setNotifyType('error');
      setNotifyMsg(msg);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const tokenparser = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );
    return JSON.parse(jsonPayload);
  };

  return (
    <div className="login">
      <Toaster notifyType={notifyType} notifyMsg={notifyMsg} />
      <div className="login-section">
        <div className="container">
          <div classNmae="row">
            <div className="col-md-12">
              <div className="login-logo">
                <img src={logo} alt="Logo" />
              </div>
              <div className="login-form">
                <h1>Sign In</h1>
                <p>We're happy to have you here again!</p>
                <div className="login-box">
                  <Form
                    name="basic"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
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
                        Sign In
                      </Button>
                    </Form.Item>

                    <div className="google-login">
                      <p>or connect with</p>

                      <Button className="google-btn">
                        <span>Google</span>
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>

              <div className="q-links">
                <p>
                  Don't have an account yet?{' '}
                  <Link to={'/register'}>Register now</Link>
                </p>

                <p>
                  Forget your password? <Link to={'/'}>Get a new password</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
