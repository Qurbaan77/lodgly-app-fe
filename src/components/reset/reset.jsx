import React, { useState } from 'react';
import Helmet from 'react-helmet';
import './reset.css';
import { Form, Input, Button } from 'antd';
import queryString from 'query-string';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/images/logo.jpg';
import favicon from '../../assets/images/logo-mobile.png';
import Toaster from '../toaster/toaster';
import { userInstance } from '../../axios/axiosconfig';

const Reset = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();

  const onFinish = async (values) => {
    const parsed = queryString.parse(window.location.search);
    values.hex = parsed.hh;
    const response = await userInstance.post('/forgetpassword', values);
    const statusCode = response.data.code;
    const { msg } = response.data;
    if (statusCode === 200) {
      setNotifyType('success');
      setNotifyMsg(msg);
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
    <>
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
      <div className="forget">
        <div className="forget-section">
          <Toaster
            notifyType={notifyType}
            notifyMsg={notifyMsg}
            close={close}
          />
          <div className="container">
            <div classNmae="row">
              <div className="col-md-12">
                <div className="forget-logo">
                  <img src={logo} alt="Logo" />
                </div>
                <div className="forget-form">
                  <h1>{t('reset.heading1')}</h1>
                  <p>{t('reset.label2')}</p>
                  <div className="forget-box">
                    <div>
                      <Form
                        form={form}
                        name="basic"
                        initialValues={{
                          remember: true,
                        }}
                        onFinish={onFinish}
                      >
                        <Form.Item
                          label={t('reset.label7')}
                          name="newpassword"
                          rules={[
                            {
                              required: true,
                              message: t('reset.label8'),
                            },
                          ]}
                        >
                          <Input.Password placeholder={t('reset.label7')} />
                        </Form.Item>

                        <Form.Item
                          label={t('reset.label9')}
                          name="confirmpassword"
                          dependencies={['newpassword']}
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message: t('reset.label10'),
                            },
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                if (
                                  !value
                                  || getFieldValue('newpassword') === value
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
                          <Input.Password placeholder={t('reset.label9')} />
                        </Form.Item>

                        <Form.Item>
                          <Button className="forget-btn" htmlType="submit">
                            {t('reset.label11')}
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
    </>
  );
};

export default Reset;
