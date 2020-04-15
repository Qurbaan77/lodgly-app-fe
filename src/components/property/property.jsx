import React, { useEffect, useState } from "react";
import "./property.css";
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






const Property = () => {




    return (
        <Wrapper>
            
                <div className="add-property">

                    <div className="page-header">

                        <h1><HomeOutlined /> Property 1</h1>


                    </div>
 


                    <div className="panel-container">

                    <Collapse defaultActiveKey={['1']} accordion>

                        <Panel header="Main Information" key="1">
                            <div className="main-info-form">
                            <Form>
                                <Row gutter={[16, 0]}>

                                <Col span={24}>
                                <Form.Item label="Name">
                                <Input placeholder="My Demo Property"/>
                                </Form.Item>
                                </Col>

                                <Col span={24}>
                                <Form.Item label="Property Type">
                                <Select>
                                    <Select.Option value="demo">Holiday House</Select.Option>
                                </Select>
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
                                <Form.Item label="Website">
                                <Input placeholder="www.mywebsite.com"/>
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


                        <Panel header="Details" key="2">
                        <div className="main-info-form">
                            <Form>
                                <Row gutter={[16, 0]}>

                                <Col span={24}>
                                <Form.Item label="Property Type">
                                <Select>
                                    <Select.Option value="demo">Holiday House</Select.Option>
                                </Select>
                                </Form.Item>
                                </Col>
                       

                              



                                <Col span={8}>
                                <Form.Item label="Bedrooms">
                                <Select>
                                    <Select.Option value="demo">Croatia</Select.Option>
                                </Select>
                                </Form.Item>
                                </Col>


                                <Col span={8}>
                                <Form.Item label="Full Bathrooms">
                                <Select>
                                    <Select.Option value="demo">Choose</Select.Option>
                                </Select>
                                </Form.Item>
                                </Col>


                                
                                <Col span={8}>
                                <Form.Item label="Half Bathrooms">
                                <Select>
                                    <Select.Option value="demo">Choose</Select.Option>
                                </Select>
                                </Form.Item>
                                </Col>


                                <Col span={8}>
                                <Form.Item label="SQ Footage">
                                <Select>
                                    <Select.Option value="demo">Zadar</Select.Option>
                                </Select>
                                </Form.Item>
                                </Col>



                                <Col span={24}>
                                <Form.Item label="Description">
                                <Input.TextArea />
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



                        <Panel header="Listing" key="3">
                            <div className="listing-info-form">
                                <Form>

                                <Row gutter={[16, 0]}>

                                    <Col span={6}>

                                    <Form.Item label="Pet Policy">

                                       <Checkbox.Group options={petOptions} defaultValue={['Pets Negotiable']} onChange={onChange} />


                                    </Form.Item>

                                    </Col>



                                    <Col span={6}>

                                        <Form.Item label="Features and Amenities">

                                        <Checkbox.Group options={featureOptions} defaultValue={['Furnished or available furnished']} onChange={onChange} />


                                        </Form.Item>

                                    </Col>



                                    <Col span={6}>

                                        <Form.Item label="Features and Amenities">

                                        <Checkbox.Group options={featureOptions2} defaultValue={['Gym/Fitness Center']} onChange={onChange} />


                                        </Form.Item>

                                        </Col>


                                        <Col span={6}>

                                        <Form.Item label="Features and Amenities">

                                        <Checkbox.Group options={featureOptions3} defaultValue={['Outdoor Space']} onChange={onChange} />


                                        </Form.Item>

                                        </Col>



                                </Row>


                                </Form>

                            </div>
                        </Panel>



                        <Panel header="Photo" key="4">

                        <div className="main-info-form">
                            <Form>
                                <Row gutter={[16, 0]}>

                                <Col span={24}>
                                <Form.Item label="Show off your place">
                                    <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                                    <Upload.Dragger name="files" action="/upload.do">
                                        <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">Drop photos here or</p>
                                        <p className="ant-upload-hint">CHOOSE FILE</p>
                                    </Upload.Dragger>
                                    <p>At least 1 photo is required. Max file size is 30MB per image. JPG, PNG, or GIF formats only.</p>
                                    </Form.Item>
                                </Form.Item>
                                </Col>


                                <Col span={24}>
                                <Form.Item label="Video Tour (Optional)">
                                <Input />
                                <p>YouTube videos only. Paste your link here</p>
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

                    </div>


                </div>


        </Wrapper>
        
    );
  };
  
  export default Property;