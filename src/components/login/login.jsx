import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './login.css';
import { Form, Input, Button } from 'antd';
import logo from '../../assets/images/logo.jpg';
import Toaster from '../toaster/toaster';
import { userInstance } from '../../axios/axiosconfig';

const Login = () => {
  const [form] = Form.useForm();
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();
  const history = useHistory();

  const tokenparser = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(''),
    );
    return JSON.parse(jsonPayload);
  };

  const onFinish = async (values) => {
    const response = await userInstance.post('/login', values);
    const statusCode = response.data.code;
    const { msg } = response.data;

    if (statusCode === 200) {
      if (response.data.subUser.length) {
        localStorage.setItem('isSubUser', true);
        localStorage.setItem(
          'subUserCred',
          JSON.stringify(response.data.subUser),
        );
      }
      localStorage.setItem('token', response.data.token);
      const payload = tokenparser(response.data.token);
      localStorage.setItem('userId', payload.userid);
      setNotifyType('success');
      setNotifyMsg(msg);
      history.push('/propertylist');
    } else {
      setNotifyType('error');
      setNotifyMsg(msg);
    }
    form.resetFields();
  };

  const close = () => {
    setNotifyType('');
  };

  return (
    <div className="login">
      <div className="login-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="login-logo">
                <img src={logo} alt="Logo" />
              </div>
              <Toaster
                notifyType={notifyType}
                notifyMsg={notifyMsg}
                close={close}
              />
              <div className="login-form">
                <h1>Sign In</h1>
                <p>
                  We
                  <span>&apos;</span>
                  re happy to have you here again!
                </p>
                <div className="login-box">
                  <Form
                    form={form}
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
                      <Input />
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
                      <Input.Password />
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
                  Don
                  <span>&apos;</span>
                  t have an account yet?
                  {' '}
                  <Link to="/register">Register now</Link>
                </p>

                <p>
                  Forget your password?
                  {' '}
                  <Link to="/forget">Get a new password</Link>
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
