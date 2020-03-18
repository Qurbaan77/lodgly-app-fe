import React, { useEffect } from "react";
import "./login.css";
import {Navbar,Nav,NavDropdown,Form,Button,Tabs, Tab} from 'react-bootstrap';
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.jpg"
import Toaster from "../toaster/toaster"




const Login = () => {
    return (
        <div className="login">
          <Toaster />
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
                                <Form>
                                    <Form.Group controlId="formBasicloginone">
                                        <Form.Label>E-mail address</Form.Label>
                                            <Form.Control type="email" placeholder="me@janlosert.com" name="email"  />                                      
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="********" name="password"  />
                                    </Form.Group>
                                 
                                    <div className="login-button">
                                        <Button className="login-btn" >
                                            Sign In
                                        </Button>
                                    </div>


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

                           <p>Don't have an account yet? <Link to={'/'}>
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