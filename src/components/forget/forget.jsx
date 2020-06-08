import React, { useEffect, useState } from 'react';
import './forget.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.jpg';
import Toaster from '../toaster/toaster';
import { userInstance } from '../../axios/axiosconfig';

const Forget = () => {
  const [form] = Form.useForm();
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();

  const onFinish = async (values) => {
    const response = await userInstance.post('/resetpassword', values);
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
                        label="E-mail Address"
                        name="email"
                        rules={[
                          {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                          },
                          {
                            required: true,
                            message: 'Please enter your E-mail Address!',
                          },
                        ]}
                      >
                        <Input placeholder="me@janlosert.com" />
                      </Form.Item>

                      <Form.Item>
                        <Button
                          //   onClick={() => handleMenu(`toggle`)}
                          className="forget-btn"
                          htmlType="submit"
                        >
                          Submit
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

export default Forget;
