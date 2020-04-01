import React, { useEffect, useState } from "react";
import "./booking.css";
import { Form, Select, Input,  InputNumber, Switch, Radio, Slider, DatePicker, TimePicker, Button, Upload, Rate, Checkbox, Row, Col, } from 'antd';
import { MenuUnfoldOutlined, DeleteOutlined, RedEnvelopeOutlined,ReconciliationOutlined, MailOutlined, MenuFoldOutlined, FormOutlined, DownloadOutlined, SyncOutlined, UserOutlined, ThunderboltOutlined, HomeOutlined, PlusOutlined, SearchOutlined, VerticalAlignMiddleOutlined, VideoCameraOutlined, UploadOutlined, } from '@ant-design/icons';
import Wrapper from "../wrapper"
import { Collapse, Menu, Dropdown } from 'antd';
import { InboxOutlined, DownOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Modal } from 'antd';

const { MonthPicker, RangePicker } = DatePicker;

const BookingFilter = () => {

    function onChange(checked) {
        console.log(`switch to ${checked}`);
      }

return (
    <Wrapper>

        <div className="booking-filter">

            <div className="container">
                    <Row>
                        <Col span={10}>

                            <div className="filter-box">

                                <h2>Filters</h2>


                            <Form name="basic" >

                                <Row style={{ alignItems: "center" }}>

                                    <Col span={24}>
                                        <Form.Item
                                            label="Select Date"
                                            name="groupname"                                           
                                            >
                                            <RangePicker />
                                        </Form.Item>
                                    </Col>


                                    <Col span={24}>
                                        <Form.Item
                                            label="Property"
                                            name="property"
                                            >
                                                <Select>
                                                    <Select.Option value="demo">All Property</Select.Option>
                                                    <Select.Option value="demo">All Property</Select.Option>
                                                </Select>
                                        </Form.Item>
                                    </Col>


                                    <Col span={24}>
                                        <Form.Item
                                            label="Status"
                                            name="status"
                                            >
                                                <Select>
                                                    <Select.Option value="demo">Booked</Select.Option>
                                                    <Select.Option value="demo">Booked</Select.Option>
                                                </Select>
                                        </Form.Item>
                                    </Col>


                                    <Col span={24}>
                                        <Form.Item
                                            label="Price"
                                            name="price"
                                            >

                                            <div className="inline-form">
                                                <label>from</label>
                                                <Input
                                                    type="text"
                                                    placeholder="1000000"
                                                />
                                                <label>to</label>
                                                <Input
                                                    type="text"
                                                    placeholder="1000000"
                                                />
                                                <label>USD</label>

                                            </div>
                                                        
                                                   
                                                
                                        </Form.Item>
                                    </Col>



                                    <Col span={24}>
                                        <Form.Item>

                                            <ul className="filter-list">

                                                <li>
                                                    <span><RedEnvelopeOutlined /> Unreplied</span>
                                                    <Switch defaultChecked onChange={onChange} />
                                                </li>

                                                <li>
                                                    <span><MailOutlined /> Unread</span>
                                                    <Switch  onChange={onChange} />
                                                </li>

                                                <li>
                                                    <span><ReconciliationOutlined /> Overdue</span>
                                                    <Switch  onChange={onChange} />
                                                </li>

                                                <li>
                                                    <span><DeleteOutlined /> Trash</span>
                                                    <Switch  onChange={onChange} />
                                                </li>

                                            </ul>

                                        </Form.Item>
                                    </Col>


                                </Row>

                            </Form>

                            </div>

                 

                        </Col>
                    </Row>
            </div>
            
        </div>

    </Wrapper>
        
    );
  };
  
  export default BookingFilter;