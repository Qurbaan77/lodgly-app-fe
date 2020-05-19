import React, { useEffect, useState } from "react";
import "./setting.css";
import { Form, Input, Button, Checkbox, Select, Row, Col } from 'antd';
import { Link } from "react-router-dom";
import { MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined, PlusOutlined, SearchOutlined, VerticalAlignMiddleOutlined,UserOutlined, VideoCameraOutlined, UploadOutlined, } from '@ant-design/icons';
import logo from "../../../assets/images/admin-logo.jpg"
import AdminHeader from "../header/header";
import user from "../../../assets/images/profile_user.jpg"
import { SettingOutlined } from '@ant-design/icons';
import Toaster from '../../toaster/toaster';
import { adminInstance } from '../../../axios/axiosconfig';

const AdminSetting = () => {

    const [form] = Form.useForm();
    const [form2] = Form.useForm();
    const [notifyType, setNotifyType] = useState();
    const [notifyMsg, setNotifyMsg] = useState();

    const onFinish = async (values) => {
      console.log('Received values of form: ', values);
      const response = await adminInstance.post('/completeProfile', values);
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

    const onFinish2 = async (values) => {
        console.log('Received values of form: ', values);
        const response = await adminInstance.post('/changePassword', values);
      const statusCode = response.data.code;
      const msg = response.data.msg;

    if (statusCode == 200) {
      setNotifyType('success');
      setNotifyMsg(msg);
    } else {
      setNotifyType('error');
      setNotifyMsg(msg);
    }
    form2.resetFields();

    };

    return (

        <div className="admin-setting">

            <div className="admin-setting-container">

               <AdminHeader />


               <div className="seting-container">

               <div className="page-header">

                    <h1><HomeOutlined /> Setting</h1>

                </div>



            <div className="setttng-box">
                <div className="user-profile">
                    <div className="user-img">
                        <img src={user} alt="User"/>
                        <SettingOutlined />
                    </div>
                    <h3>Frederick</h3>
                    <span>Admin</span>
                </div>

                <div className="setting-form">
                <Toaster notifyType={notifyType} notifyMsg={notifyMsg} />

                <div className="register-form">
                            <div className="register-box">

                            
                            <Form
                            
                            form={form}
                            name="register"
                            onFinish={onFinish}
                            scrollToFirstError
                            >


                            <Row gutter={[16, 0]}>
                                <Col span={12}>
                                <Form.Item
                                        name="firstname"
                                        label="First Name"
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please input your firstname!',
                                            whitespace: true,
                                        },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item
                                        name="lastname"
                                        label="Last Name"
                                        rules={[
                                        {
                                            required: true,
                                            message: 'Please input your lastname!',
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
                                        name="phone"
                                        label="Phone"
                                        rules={[
                                       
                                        {
                                            required: true,
                                            message: 'Please input your phone',
                                        },
                                        ]}
                                        >
                                        <Input />
                                    </Form.Item>
                                    </Col>

                                

                            </Row>


                           

                            

            




                            <Row>
                                <Col span={24}>
                                <Form.Item>
                                    <Button type="primary" className="register-btn" htmlType="submit">
                                    Save
                                    </Button>
                                </Form.Item>
                                </Col>
                            </Row>



                            </Form>
                                                  
                            </div>
                        </div>

                </div>
            </div>




            <div className="setttng-box">

            <div className="change-icon">

                    <SettingOutlined />
       
                    <h3>Change Password</h3>

            </div>


                    <div className="change-pasword setting-form">
                    <div className="register-form">
                    <Form
                            
                            form={form2}
                            name="change"
                            onFinish={onFinish2}
                            scrollToFirstError
                            >


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
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject('The two passwords that you entered do not match!');
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
                                <Form.Item>
                                    <Button type="primary" className="register-btn" htmlType="submit">
                                    Change Password
                                    </Button>
                                </Form.Item>
                                </Col>
                            </Row>



                            </Form>
                            </div>
                    </div>

            </div>



               </div>


            </div>

        </div>
        
        
    );
  };
  
  export default AdminSetting;