import React, { useEffect, useState } from "react";
import "./login.css";
import { Form, Input, Button, Checkbox } from 'antd';
import { Link } from "react-router-dom";
import { MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined, PlusOutlined, SearchOutlined, VerticalAlignMiddleOutlined,UserOutlined, VideoCameraOutlined, UploadOutlined, } from '@ant-design/icons';




const AdminLogin = () => {

    const onFinish = values => {
        console.log('Success:', values);
      };
    
      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };



    return (

        <div className="admin-login">

            <div className="admin-login-container">

                <div className="left">


                <div className="row">
                    <div className="col-md-12">
                    <div className="login-form">
                            <h1>Welcome back!</h1>
                            <p>We're happy to have you here again!</p>
                            <div className="login-box">

                            <Form name="basic" 
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
                                    <Input placeholder="me@janlosert.com"/>
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
                                    
                                    <Input.Password  placeholder="******"/>
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

                            <p><Link to={'/'}>Forget your password? 
                                
                                </Link> 
                            </p>   

                        </div>



                    </div>
                </div> 

                </div>


                <div className="right">
                    <div className="admin-bg">

                    </div>

                </div>

            </div>

        </div>
        
        
    );
  };
  
  export default AdminLogin;