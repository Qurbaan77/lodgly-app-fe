import React, { useEffect, useState } from "react";
import "./profile.css";
import { Form, Select, Input, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined, PlusOutlined, SearchOutlined, VerticalAlignMiddleOutlined,UserOutlined, VideoCameraOutlined, UploadOutlined, } from '@ant-design/icons';
import Wrapper from "../wrapper"
import property1 from "../../assets/images/property-1.png"
import property2 from "../../assets/images/property-2.png"
import property3 from "../../assets/images/property-3.png"
import { Collapse } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import BillingHistory from "./billinghistory";


const { Panel } = Collapse;



const BillingInformation = () => {




    return (
        <Wrapper>
            
                <div className="billing-information">

                    <div className="page-header">

                        <h1><UserOutlined /> Billing Information</h1>


                    </div>
 


                    <div className="billing-container">

                    <Row gutter={[16, 0]}>

                       <Col span={12}>
                       <Collapse defaultActiveKey={['1']} accordion>
                            <Panel header="Monthly Subscription Plan" key="1">
                                <div className="billing-info-form">

                               
                                
                                
                                <Row gutter={[16, 0]}>



                                <Col span={14}>
                                    <div className="subscription-plan-list">
                                        <ul>
                                            <li>Tier 3 <span>1,000,00 EUR/month</span></li>
                                            <li>Bonus Credit <span>305 EUR</span></li>
                                            <li>Rate <span>11.5 / hr</span></li>
                                            <li>Discount <span>23% off Pay-As-You-Go</span></li>
                                        </ul>
                                    </div>
                                    
                               </Col>


                                <Col span={10}>

                                <div className="subscription-plan-list">
                                    <p>You <a href="">Monthly Subscription Plan</a></p>
                                    <p>will review on November 20, 2019.</p>
                                </div>
                                    
                                </Col>

                               

                                </Row>
                       
                                </div>

                            </Panel>

                            </Collapse>



                       </Col>


                       <Col span={12}>
                       <Collapse defaultActiveKey={['4']} accordion>

                        <Panel header="Choose Your Payment Method" key="4">

                        <div className="main-info-form">

                            <h4>Visa Credit/Debit Card</h4>
                            <p>If choosen this method $0.20 fee will be automatically added to your total. Tha fee isn't refundable and works as a prevention against ladybugs.</p>
                            

                            <Form>
                                    <Row gutter={[16, 0]}>

                                    <Col span={9}>
                                    <Form.Item label="Card Number">
                                    <Input placeholder="**** **** **** 7117"/>
                                    </Form.Item>
                                    </Col>

                                    <Col span={10}>
                                    <Form.Item label="Expiry Date">
                                    <Row>
                                    <Col span={12} style={{ marginRight: 10 }}>
                                    <Select>
                                        <Select.Option value="demo">10</Select.Option>
                                    </Select>
                                    </Col>
                                    <Col span={10}>
                                    <Select>
                                        <Select.Option value="demo">2019</Select.Option>
                                    </Select>
                                    </Col>
                                    </Row>
                                    </Form.Item>
                                    </Col>

                                    <Col span={5}>
                                    <Form.Item label="CVC Code">
                                    <Input placeholder="234"/>
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



                <BillingHistory />


        </Wrapper>
        
    );
  };
  
  export default BillingInformation;