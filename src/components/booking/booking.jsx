import React, { useEffect, useState } from "react";
import "./booking.css";
import { Form, Select, Input,  InputNumber, Switch, Radio, Slider, DatePicker, TimePicker, Button, Upload, Rate, Checkbox, Row, Col, } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, FormOutlined, DownloadOutlined, SyncOutlined, UserOutlined, ThunderboltOutlined, HomeOutlined, PlusOutlined, SearchOutlined, VerticalAlignMiddleOutlined, VideoCameraOutlined, UploadOutlined, } from '@ant-design/icons';
import Wrapper from "../wrapper"
import { Collapse, Menu, Dropdown } from 'antd';
import { InboxOutlined, DownOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Modal } from 'antd';


const Booking = () => {


    const menu = (
        <Menu>
          <Menu.Item key="1">
           Booked
          </Menu.Item>
          <Menu.Item key="2">
            Open
          </Menu.Item>
          <Menu.Item key="3">
            Set as Tentative
          </Menu.Item>
          <Menu.Item key="4">
            Decline
          </Menu.Item>
        </Menu>
      );
    

return (
    <Wrapper>

        <div className="booking">

            <div className="container">
                    <Row>
                        <Col span={10}>

                            <div className="booking-list-conatiner">


                                <div className="booking-list orange">
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

                            <div className="booking-details">

                                <h3>Emily Byrd</h3>
                                <ul>
                                    <li>5 Night - 1 room,</li>
                                    <li>2 Guests,</li>
                                    <li>ID: 1234567</li>
                                </ul>




                                <div className="booking-box">

                                    <div className="booking-head">

                                    <div className="box-heading">
                                        <h3>Booking</h3>
                                    </div>

                                    <div className="box-editing">
                                        <FormOutlined />
                                        <Dropdown overlay={menu}>
                                            <Button>
                                                Booked <DownOutlined />
                                            </Button>
                                        </Dropdown>
                                    </div>
                                    </div>


                                    <div className="booking-item">

                                        <div className="prorety-box">
                                            <span>Property</span>
                                            <p>Property Name</p>
                                        </div>

                                        <div className="prorety-box">
                                            <span>Unit</span>
                                            <p>Unit Name </p>
                                        </div>

                                    </div>


                                    <div className="booking-item-one">
                                        <div className="prorety-box">
                                            <span>channel, commission(%)</span>
                                            <p>AirBnB (10%)</p>                                            
                                        </div>
                                    </div>


                                    <div className="booking-item">

                                        <div className="prorety-box">
                                            <span>Guests</span>
                                            <p>2 Adults</p>
                                            <p>2 Children (0-12 yrs)</p>
                                        </div>

                                        <div className="prorety-box">
                                            <span>Date</span>
                                            <p>1 Aug'19 - 6 Aug'19 </p>
                                            <p>5 Nights</p>
                                        </div>

                                    </div>



                                </div>









                                <div className="booking-box">

                                    <div className="booking-head">

                                    <div className="box-heading">
                                        <h3>Guests</h3>
                                    </div>

                                    <div className="box-editing">
                                        <FormOutlined />
                                       
                                    </div>
                                    </div>


                                    <div className="booking-item">

                                        <div className="prorety-box">
                                            <span>Full Name</span>
                                            <p>Emily Byrd</p>
                                        </div>

                                        <div className="prorety-box">
                                            <span>Country</span>
                                            <p>France </p>
                                        </div>

                                    </div>


                                    


                                    <div className="booking-item">

                                        <div className="prorety-box">
                                            <span>Email</span>
                                            <p>mymail@gmail.com</p>
                                       
                                        </div>

                                        <div className="prorety-box">
                                            <span>Phone</span>
                                            <p>+123456789</p>
                            
                                        </div>

                                    </div>


                                    <div className="booking-item-one">
                                        <div className="prorety-box">
                                            <span>Notes</span>
                                            <p>Hello This is test</p>                                            
                                        </div>
                                    </div>



                                </div>






                            <Link className="additionl-link" to={'/'}><PlusOutlined />Add Additional Guest</Link>







                            </div>
                            
                        </Col>


                    </Row>
            </div>
            
        </div>

    </Wrapper>
        
    );
  };
  
  export default Booking;