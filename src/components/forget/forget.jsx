import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './forget.css';
import { Form, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { marketingPath } from '../../config/keys';
import logo from '../../assets/images/logo.jpg';
import Toaster from '../toaster/toaster';
import { userInstance } from '../../axios/axiosconfig';

const Forget = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();

  const onFinish = async (values) => {
    const companyName = window.location.hostname.split('.');
    values.company = companyName[0];
    const response = await userInstance.post('/resetpassword', values);
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

  useEffect(() => {
    async function searchCompany() {
      const companyName = window.location.hostname.split('.');
      const values = {
        companyName: companyName[0],
      };
      const response = await userInstance.post('/searchComapany', values);
      if (response.data.code === 404) {
        window.location.href = marketingPath;
      }
    }
    searchCompany();
  }, []);

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
                <h1>
                  {' '}
                  {t('forget.heading1')}
                </h1>
                <p>{t('forget.label2')}</p>
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
                        label={t('forget.label3')}
                        name="email"
                        rules={[
                          {
                            type: 'email',
                            message: t('forget.label5'),
                          },
                          {
                            required: true,
                            message: t('forget.label4'),
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
                          {t('forget.label6')}
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
              <div className="q-links">
                <p>
                  Go to Login!
                  {' '}
                  <Link to="/">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forget;
