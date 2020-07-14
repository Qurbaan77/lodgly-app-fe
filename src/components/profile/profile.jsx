import React, { useEffect, useState } from 'react';
import './profile.css';
import {
  Form,
  Select,
  Input,
  Button,
  Upload,
  Row,
  Col,
  message,
  Collapse,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Wrapper from '../wrapper';
import Toaster from '../toaster/toaster';
import { userInstance } from '../../axios/axiosconfig';

const { Panel } = Collapse;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const Profile = () => {
  const [form1] = Form.useForm();
  const [form3] = Form.useForm();
  const [form4] = Form.useForm();
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();
  const userId = localStorage.getItem('userId');
  const [img, setImg] = useState('');
  const [userName, setUserName] = useState('');

  const getUserInfo = async () => {
    const response = await userInstance.post('/getuserData');
    const body = response.data.userData;
    if (body.length > 0) {
      const fullname = `${body[0].fname} ${body[0].lname}`;
      setImg(body[0].image);
      setUserName(fullname);
      form1.setFieldsValue({
        fname: body[0].fname,
        lname: body[0].lname,
        address: body[0].address,
        email: body[0].email,
        phone: body[0].phone,
      });
    }
  };

  const getCompanyInfo = async () => {
    const response = await userInstance.post('/getCompanyData');
    const body = response.data.companyData;
    if (body.length > 0) {
      form4.setFieldsValue({
        name: body[0].name,
        address: body[0].address,
        country: body[0].country,
        state: body[0].state,
        city: body[0].city,
        zip: body[0].zip,
        vatId: body[0].vatId,
      });
    }
  };
  const personalInfoFinish = async (values) => {
    const response = await userInstance.post('/updatePersonalInfo', values);
    const statusCode = response.data.code;
    const { msg } = response.data;
    if (statusCode === 200) {
      setNotifyType('success');
      setNotifyMsg(msg);
      getUserInfo();
    } else {
      setNotifyType('error');
      setNotifyMsg(msg);
    }
    form1.resetFields();
  };

  const companyFinsh = async (values) => {
    const response = await userInstance.post('/updateOrganisation', values);
    const statusCode = response.data.code;
    const { msg } = response.data;
    if (statusCode === 200) {
      setNotifyType('success');
      setNotifyMsg(msg);
      getCompanyInfo();
    } else {
      setNotifyType('error');
      setNotifyMsg(msg);
    }
    form4.resetFields();
  };

  const passwordFininsh = async (values) => {
    const response = await userInstance.post('/changePassword', values);
    const statusCode = response.data.code;
    const { msg } = response.data;
    if (statusCode === 200) {
      setNotifyType('success');
      setNotifyMsg(msg);
    } else {
      setNotifyType('error');
      setNotifyMsg(msg);
    }
    form3.resetFields();
  };

  const close = () => {
    setNotifyType('');
  };

  const props = {
    name: 'file',
    multiple: false,
    action: `http://localhost:3001/users/photo/${userId}`,
    onChange(info) {
      // if (info.file.status !== 'uploading') {
      //   console.log(info.file, info.fileList);
      // }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        getUserInfo();
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  useEffect(() => {
    getUserInfo();
    getCompanyInfo();
  }, []);

  return (
    <Wrapper img={img} name={userName} getUserInfo={getUserInfo}>
      <div className="personal-information">
        <div className="page-header">
          <h1>
            <UserOutlined />
            {' '}
            Personal Information
          </h1>
        </div>
        <Toaster notifyType={notifyType} notifyMsg={notifyMsg} close={close} />

        <div className="profile-container">
          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Collapse defaultActiveKey={['1']} accordion>
                <Panel header="Details" key="1">
                  <div className="main-info-form">
                    <h4>Details</h4>
                    <p>Add or edit your personal information</p>
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
                                <p className="ant-upload-drag-icon">
                                  <UserOutlined />
                                </p>
                                <p className="ant-upload-text">
                                  Drop photos here or
                                </p>
                                <p className="ant-upload-hint">CHOOSE FILE</p>
                              </Upload.Dragger>
                            </Form.Item>
                          </Form.Item>
                        </Col>

                        <Col span={12}>
                          <Form.Item
                            label="First Name"
                            name="fname"
                            rules={[
                              {
                                required: true,
                                message: 'Please enter your first name!',
                              },
                            ]}
                          >
                            <Input placeholder="" />
                          </Form.Item>

                          <Form.Item
                            label="Last Name"
                            name="lname"
                            rules={[
                              {
                                required: true,
                                message: 'Please enter your last name!',
                              },
                            ]}
                          >
                            <Input placeholder="" />
                          </Form.Item>
                        </Col>

                        <Col span={24}>
                          <Form.Item label="Address" name="address">
                            <Input placeholder="" />
                          </Form.Item>
                        </Col>

                        <Col span={12}>
                          <Form.Item label="Email" name="email">
                            <Input placeholder="" />
                          </Form.Item>
                        </Col>

                        <Col span={12}>
                          <Form.Item label="Phone" name="phone">
                            <Input
                              placeholder=""
                              type="number"
                              minLength="9"
                              maxLength="15"
                            />
                          </Form.Item>
                        </Col>

                        <Col span={12}>
                          <Form.Item>
                            <Button type="primary" htmlType="submit">
                              Save
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
                    <h4>Application Settings</h4>
                    <p>Add or edit your personal information</p>

                    <Row gutter={[16, 0]}>
                      <Col span={12}>
                        <Form.Item label="UI Language">
                          <Select>
                            <Select.Option value="demo">English</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item label="Timezone">
                          <Select>
                            <Select.Option value="demo">
                              Europe/Vienna
                            </Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <Form.Item>
                          <Button>Save</Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                </Panel>
              </Collapse>

              <Collapse defaultActiveKey={['3']} accordion>
                <Panel header="Password Change" key="3">
                  <div className="main-info-form">
                    <h4>Password Change</h4>
                    <p>Add or edit your personal information</p>

                    <Form form={form3} onFinish={passwordFininsh}>
                      <Row gutter={[16, 0]}>
                        <Col span={24}>
                          <Form.Item
                            name="oldPassword"
                            label="Old Password"
                            rules={[
                              {
                                required: true,
                                message: 'Please enter your old password!',
                              },
                            ]}
                          >
                            <Input.Password placeholder="" />
                          </Form.Item>
                        </Col>

                        <Col span={24}>
                          <Form.Item
                            name="newPassword"
                            label="New Password"
                            rules={[
                              {
                                required: true,
                                message: 'Please enter your new password!',
                              },
                            ]}
                          >
                            <Input.Password placeholder="" />
                          </Form.Item>
                        </Col>

                        <Col span={24}>
                          <Form.Item
                            name="confirm"
                            label="Repeat New Password"
                            dependencies={['newPassword']}
                            hasFeedback
                            rules={[
                              {
                                required: true,
                                message: 'Please confirm your password!',
                              },
                              ({ getFieldValue }) => ({
                                validator(rule, value) {
                                  if (
                                    !value
                                    || getFieldValue('newPassword') === value
                                  ) {
                                    return Promise.resolve();
                                  }

                                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
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
                              Change Password
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
                    <h4>Company Data</h4>
                    <p>Add or edit your company data</p>

                    <Form form={form4} onFinish={companyFinsh}>
                      <Row gutter={[16, 0]}>
                        <Col span={24}>
                          <Form.Item
                            name="name"
                            label="Name"
                            rules={[
                              {
                                required: true,
                                message: 'Please enter your name!',
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>

                        <Col span={24}>
                          <Form.Item name="address" label="Address">
                            <Input placeholder="4901 St Anthony Eye" />
                          </Form.Item>
                        </Col>

                        <Col span={12}>
                          <Form.Item name="country" label="Country">
                            <Select>
                              <Select.Option value="demo">
                                Croatia
                              </Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>

                        <Col span={12}>
                          <Form.Item name="state" label="State">
                            <Select>
                              <Select.Option value="demo">Choose</Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>

                        <Col span={12}>
                          <Form.Item name="city" label="City">
                            <Select>
                              <Select.Option value="demo">Zadar</Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>

                        <Col span={12}>
                          <Form.Item name="zip" label="Zip">
                            <Select>
                              <Select.Option value="demo">Choose</Select.Option>
                            </Select>
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
                              Save
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
    </Wrapper>
  );
};

export default Profile;
