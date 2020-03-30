import React, { useEffect, useState } from "react";
import "./booking.css";
import { Form, Select, Input, InputNumber, Switch, Radio, Slider, DatePicker, TimePicker, Button, Upload, Rate, Checkbox, Row, Col, } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined, PlusOutlined, SearchOutlined, VerticalAlignMiddleOutlined,UserOutlined, VideoCameraOutlined, UploadOutlined, } from '@ant-design/icons';
import Wrapper from "../wrapper"
import { Collapse } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { Avatar } from 'antd';


const { Panel } = Collapse;


const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;




const { Option } = Select;


const { MonthPicker, RangePicker } = DatePicker;




const CreateBookingPopup = () => {

    const [visible,setVisible]=useState(false)

    const show = () => {
        setVisible(true);
    };


    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };


    

    return (
        <Wrapper>
            

                    <div className="page-header">

                        <h1><HomeOutlined /> Booking</h1>

                        <Button type="primary" icon={<PlusOutlined />}  onClick={show}>
                            Create Booking
                        </Button>


                    </div>
 





                <Modal
                    title="Create Booking"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    wrapClassName="create-booking-modal"
                    
                    >
                
                <Form name="basic" >

                    <Row style={{ alignItems: "center" }}>

                        <Col span={12}>
                            <Form.Item
                                label="Reservation Date"
                                name="groupname"
                                style={{ paddingRight: 20 }}
                                >
                                <RangePicker />
                            </Form.Item>
                    </Col>


                    <Col span={12}>
                    <Radio.Group name="radiogroup" defaultValue={1}>
                        <Radio value={1}>Confirmed</Radio>
                        <Radio value={2}>Option</Radio>
                    </Radio.Group>
                    </Col>

                    

                    </Row>





                    <Row style={{ alignItems: "center" }}>

                        <Col span={8}>
                            <Form.Item
                                label="Property"
                                name="property"
                                style={{ paddingRight: 20 }}
                                >
                                <Input />
                            </Form.Item>
                        </Col>


                        <Col span={8}>
                            <Form.Item
                            label="Unit"
                            name="unit"
                            style={{ paddingRight: 20 }}>
                            <Select>
                                    <Select.Option value="demo">Holiday House</Select.Option>
                                    <Select.Option value="demo">Holiday House</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>


                        <Col span={8}>
                            <Form.Item
                            label="Channel, Commission(%)"
                            name="channel"
                            >
                            <Select>
                                    <Select.Option value="demo">Holiday House</Select.Option>
                                    <Select.Option value="demo">Holiday House</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>

                    

                    </Row>









                    <Row style={{ alignItems: "center" }}>

                        <Col span={8}>
                            <Form.Item
                                label="Adults"
                                name="adults"
                                style={{ paddingRight: 20 }}
                                >
                                <Select>
                                    <Select.Option value="demo">Holiday House</Select.Option>
                                    <Select.Option value="demo">Holiday House</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>


                        <Col span={8}>
                            <Form.Item
                            label="Childrens(0-12yrs)"
                            name="unit"
                            style={{ paddingRight: 20 }}>
                            <Select>
                                    <Select.Option value="demo">Holiday House</Select.Option>
                                    <Select.Option value="demo">Holiday House</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>


                        <Col span={8}>
                            <Form.Item
                            label="Childrens(12+ yrs)"
                            name="channel"
                            >
                            <Select>
                                    <Select.Option value="demo">Holiday House</Select.Option>
                                    <Select.Option value="demo">Holiday House</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>

                    

                    </Row>




                    <Row style={{ alignItems: "center" }}>

                        <Col span={24}>
                        <Form.Item>

                    <Collapse accordion>

                    <Panel header="Add Guest Details (Optional)" key="1">
                    {text}
                    </Panel>


                    <Panel header="Add Notes (Optional)" key="2">
                        {text}
                    </Panel>



                    <Panel header="Add Notes (Optional)" key="3">
                    {text}
                    </Panel>


                    </Collapse>
                    </Form.Item>
                    </Col>
                    </Row>




                    <Row style={{ alignItems: "center" }}>

                        <Col span={12}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                Save
                                </Button>
                            </Form.Item>

                        </Col>
                    </Row>


                    </Form>

                </Modal>


        </Wrapper>
        
    );
  };
  
  export default CreateBookingPopup;