import React, { useEffect } from "react";
import "./login.css";
import { Form, Input, Button, Checkbox } from 'antd';
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.jpg"
import Toaster from "../toaster/toaster"




const Login = () => {

    const onFinish = values => {
        console.log('Success:', values);
      };
    
      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };


    return (
        <div className="login">
          {/* <Toaster /> */}
          <div className="login-section">
            <div className="container">
                <div classNmae="row">
                    <div className="col-md-12">
                    <div className="login-logo">
                        <img src={logo} alt="Logo"/>
                    </div>
                    <div className="login-form">
                            <h1>Sign In</h1>
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
                                    Sign In
                                    </Button>
                                </Form.Item>


                                 <div className="google-login">

                                    <p>or connect with</p>

                                    <Button className="google-btn" >
                                            <span>Google</span>
                                    </Button>


                                    </div>


                                </Form>

                                                  
                            </div>
                        </div>


                        <div className="q-links">

                           <p>Don't have an account yet? <Link to={'/register'}>
                                Register now               
                                </Link> 
                            </p> 

                            <p>Forget your password? <Link to={'/'}>
                                Get a new password          
                                </Link> 
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