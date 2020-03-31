import React, { useEffect, useState } from "react";
import "./booking.css";
import { Form, Select, Input,  InputNumber, Switch, Radio, Slider, DatePicker, TimePicker, Button, Upload, Rate, Checkbox, Row, Col, } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, FormOutlined, DownloadOutlined, SyncOutlined, UserOutlined, ThunderboltOutlined, HomeOutlined, PlusOutlined, SearchOutlined, VerticalAlignMiddleOutlined, VideoCameraOutlined, UploadOutlined, } from '@ant-design/icons';
import Wrapper from "../wrapper"
import { Collapse } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Modal } from 'antd';


const Booking = () => {



    

return (
    <Wrapper>

        <div className="booking">

            <div className="container">
                    <Row>
                        <Col span={10}>

                            <div className="booking-list-conatiner">


                                <div className="booking-list">
                                    <div className="detail">
                                        <h3>Emily Byrd</h3>
                                        <p>Rental Type - Property Name_1</p>
                                        <ul>
                                            <li>Aug 5 2019</li>
                                            <li>10 <ThunderboltOutlined /></li>
                                            <li>2 <UserOutlined /></li>
                                        </ul>
                                    </div>
                                    <div className="detail-info">
                                        <span>8:42 PM</span>
                                        <span className="green-label">$1000</span>
                                    </div>
                                </div>


                                <div className="booking-list">
                                    <div className="detail">
                                        <h3>Emily Byrd</h3>
                                        <p>Rental Type - Property Name_1</p>
                                        <ul>
                                            <li>Aug 5 2019</li>
                                            <li>10 <ThunderboltOutlined /></li>
                                            <li>2 <UserOutlined /></li>
                                        </ul>
                                    </div>
                                    <div className="detail-info">
                                        <span>8:42 PM</span>
                                        <span className="green-label">$1000</span>
                                    </div>
                                </div>



                                <div className="booking-list">
                                    <div className="detail">
                                        <h3>Emily Byrd</h3>
                                        <p>Rental Type - Property Name_1</p>
                                        <ul>
                                            <li>Aug 5 2019</li>
                                            <li>10 <ThunderboltOutlined /></li>
                                            <li>2 <UserOutlined /></li>
                                        </ul>
                                    </div>
                                    <div className="detail-info">
                                        <span>8:42 PM</span>
                                        <span className="green-label">$1000</span>
                                    </div>
                                </div>



                                <div className="booking-list">
                                    <div className="detail">
                                        <h3>Emily Byrd</h3>
                                        <p>Rental Type - Property Name_1</p>
                                        <ul>
                                            <li>Aug 5 2019</li>
                                            <li>10 <ThunderboltOutlined /></li>
                                            <li>2 <UserOutlined /></li>
                                        </ul>
                                    </div>
                                    <div className="detail-info">
                                        <span>8:42 PM</span>
                                        <span className="green-label">$1000</span>
                                    </div>
                                </div>




                                <div className="booking-list">
                                    <div className="detail">
                                        <h3>Emily Byrd</h3>
                                        <p>Rental Type - Property Name_1</p>
                                        <ul>
                                            <li>Aug 5 2019</li>
                                            <li>10 <ThunderboltOutlined /></li>
                                            <li>2 <UserOutlined /></li>
                                        </ul>
                                    </div>
                                    <div className="detail-info">
                                        <span>8:42 PM</span>
                                        <span className="green-label">$1000</span>
                                    </div>
                                </div>



                                <div className="bookin-footer">

                                    <ul>
                                        <li><FormOutlined /></li>
                                        <li><DownloadOutlined /></li>
                                        <li><SyncOutlined /></li>
                                    </ul>

                                    <Button type="primary" icon={<PlusOutlined />} >
                                        Create Booking
                                    </Button>

                                </div>



                            </div>

                        </Col>

                        <Col span={14}>
                            
                        </Col>


                    </Row>
            </div>
            
        </div>

    </Wrapper>
        
    );
  };
  
  export default Booking;