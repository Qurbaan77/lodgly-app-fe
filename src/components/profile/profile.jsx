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


const { Panel } = Collapse;


const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };


  function onChange(checkedValues) {
    
  }

const petOptions = ['Pets Negotiable', 'Cats OK', 'Dogs OK', 'No Pets', 'Don’t specify'];
const featureOptions = ['Furnished or available furnished', 'Washer/Dryer', 'Parking'];

const featureOptions2 = ['Gym/Fitness Center', 'Air Conditioning', 'Hardwood Floors', 'Fireplace', 'Dishwasher', 'Storage', 'Walk-In Closet', 'Pool', 'Hot Tub'];
const featureOptions3 = ['Outdoor Space', 'Shared Yard', 'Private Yard', 'Patio', 'Balcony', 'Garden', 'Wheelchair accessible'];






const Profile = () => {




    return (
        <Wrapper>
            
                <div className="personal-information">

                    <div className="page-header">

                        <h1><UserOutlined /> Personal Information</h1>


                    </div>
 


                    <div className="profile-container">

                    <Row gutter={[16, 0]}>

                       <Col span={12}>
                       <Collapse defaultActiveKey={['1']} accordion>
                            <Panel header="Details" key="1">
                                <div className="main-info-form">

                                <h4>Details</h4>
                                <p>Add or edit your personal information</p>

                                <Form>
                                <Row gutter={[16, 0]}>

                                <Col span={12}>
                                <Form.Item >
                                    <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                                    <Upload.Dragger name="files" action="/upload.do">
                                        <p className="ant-upload-drag-icon">
                                        <UserOutlined />
                                        </p>
                                        <p className="ant-upload-text">Drop photos here or</p>
                                        <p className="ant-upload-hint">CHOOSE FILE</p>
                                    </Upload.Dragger>
                                    </Form.Item>
                                </Form.Item>
                                </Col>



                                <Col span={12}>
                                    <Form.Item label="First Name">
                                    <Input placeholder=""/>
                                    </Form.Item>

                                    <Form.Item label="Last Name">
                                    <Input placeholder=""/>
                                    </Form.Item>
                               </Col>


                                <Col span={24}>
                                    <Form.Item label="Address">
                                    <Input placeholder=""/>
                                    </Form.Item>
                                    </Col>



                                    <Col span={12}>
                                    <Form.Item label="Email">
                                    <Input placeholder=""/>
                                    </Form.Item>
                                    </Col>


                                    <Col span={12}>
                                    <Form.Item label="Phone">
                                    <Input placeholder=""/>
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


                                <Form>
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
                                        <Select.Option value="demo">Europe/Vienna</Select.Option>
                                    </Select>
                                    </Form.Item>
                                    </Col>



                                    <Col span={24}>
                                    <Form.Item >
                                    <Button>Save</Button>
                                    </Form.Item>
                                </Col>


                                    </Row>
                                </Form>
                                </div>
                            </Panel>
                            </Collapse>





                            
                            

                            <Collapse defaultActiveKey={['3']} accordion>
                            <Panel header="Password Change" key="3">
                                <div className="main-info-form">

                                    
                                    <h4>Password Change</h4>
                                    <p>Add or edit your personal information</p>


                                    <Form>

                                    <Row gutter={[16, 0]}>

                                    <Col span={24}>
                                    <Form.Item label="Old Password">
                                    <Input placeholder=""/>
                                    </Form.Item>
                                    </Col>


                                    <Col span={24}>
                                    <Form.Item label="New Password">
                                    <Input placeholder=""/>
                                    </Form.Item>
                                    </Col>


                                    <Col span={24}>
                                    <Form.Item label="Repeat New Password">
                                    <Input placeholder=""/>
                                    </Form.Item>
                                    </Col>


                                    <Col span={24}>
                                    <Form.Item >
                                    <Button>Change Password</Button>
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

                            <Form>
                                    <Row gutter={[16, 0]}>

                                    <Col span={24}>
                                    <Form.Item label="Name">
                                    <Input placeholder="My Demo Property"/>
                                    </Form.Item>
                                    </Col>


                                    <Col span={24}>
                                    <Form.Item label="Address">
                                    <Input placeholder="4901 St Anthony Eye"/>
                                    </Form.Item>
                                    </Col>



                                    <Col span={12}>
                                    <Form.Item label="Country">
                                    <Select>
                                        <Select.Option value="demo">Croatia</Select.Option>
                                    </Select>
                                    </Form.Item>
                                    </Col>


                                    <Col span={12}>
                                    <Form.Item label="State">
                                    <Select>
                                        <Select.Option value="demo">Choose</Select.Option>
                                    </Select>
                                    </Form.Item>
                                    </Col>



                                    <Col span={12}>
                                    <Form.Item label="City">
                                    <Select>
                                        <Select.Option value="demo">Zadar</Select.Option>
                                    </Select>
                                    </Form.Item>
                                    </Col>


                                    <Col span={12}>
                                    <Form.Item label="Zip">
                                    <Select>
                                        <Select.Option value="demo">Choose</Select.Option>
                                    </Select>
                                    </Form.Item>
                                    </Col>

                                    <Col span={24}>
                                    <Form.Item label="Vat ID">
                                    <Input />
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