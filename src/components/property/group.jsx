import React, { useEffect, useState } from "react";
import "./property.css";
import { Form, Select, Input, InputNumber, Switch, Radio, Slider, DatePicker, TimePicker, Button, Upload, Rate, Checkbox, Row, Col, } from 'antd';
import { MenuUnfoldOutlined, FolderOutlined, DeleteOutlined, FormOutlined, CheckOutlined, BellOutlined, MenuFoldOutlined, HomeOutlined, PlusOutlined, SearchOutlined, VerticalAlignMiddleOutlined,UserOutlined, VideoCameraOutlined, UploadOutlined, } from '@ant-design/icons';
import Wrapper from "../wrapper"
import { Collapse } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { Avatar } from 'antd';
import people1 from '../../assets/images/people-1.png'
import people2 from '../../assets/images/people-2.png'
import people3 from '../../assets/images/people-3.jpg'
import people4 from '../../assets/images/people-4.jpg'

const { Panel } = Collapse;


const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;




const { Option } = Select;


const { MonthPicker, RangePicker } = DatePicker;

const genExtra = () => (
    <FolderOutlined
      onClick={event => {
        event.stopPropagation();
      }}
    />
  );


  const tExtra = () => (
    <BellOutlined
      onClick={event => {
        event.stopPropagation();
      }}
    />
  );


const Groups = () => {

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
            
                <div className="group">

                    <div className="page-header">

                        <h1><HomeOutlined /> Groups</h1>

                        <Button type="primary" icon={<PlusOutlined />}  onClick={show}>
                            Add Group
                        </Button>


                    </div>
 


                    <div className="panel-container">

                        <div className="panel-box groups">

                            <div className="group-icon">
                                <FolderOutlined />
                            </div>

                            <div className="group-name">
                                <h4>Inventory Check</h4>
                                <span>Check every 1 month</span>
                            </div>

                            <div className="group-people">
                                <ul>
                                    <li><img src={people1} /></li>
                                    <li><img src={people2} /></li>
                                    <li><img src={people3} /></li>
                                    <li><img src={people4} /></li>
                                </ul>
                            </div>

                            <div className="group-action">
                               <BellOutlined />
                               <div className="hover-action">
                                <FormOutlined />
                                <DeleteOutlined />
                               </div>
                              
                            </div>

                        </div>



                        <div className="panel-box groups">
                            
                            <div className="group-icon">
                                <FolderOutlined />
                            </div>

                            <div className="group-name">
                                <h4>Inventory Check</h4>
                                <span>Check every 1 month</span>
                            </div>

                            <div className="group-people">
                                <ul>
                                    <li><img src={people1} /></li>
                                    <li><img src={people2} /></li>
                                    <li><img src={people3} /></li>
                                    <li><img src={people4} /></li>
                                </ul>
                            </div>

                            <div className="group-action">
                               <CheckOutlined />
                               <div className="hover-action">
                                <FormOutlined />
                                <DeleteOutlined />
                               </div>
                            </div>

                        </div>




                        <div className="panel-box groups">
                            
                            <div className="group-icon">
                                <FolderOutlined />
                            </div>

                            <div className="group-name">
                                <h4>Inventory Check</h4>
                                <span>Check every 1 month</span>
                            </div>

                            <div className="group-people">
                                <ul>
                                    <li><img src={people1} /></li>
                                    <li><img src={people2} /></li>
                                    <li><img src={people3} /></li>
                                    <li><img src={people4} /></li>
                                </ul>
                            </div>

                            <div className="group-action">
                               <CheckOutlined />
                               <div className="hover-action">
                                <FormOutlined />
                                <DeleteOutlined />
                               </div>
                            </div>

                        </div>




                        <div className="panel-box groups">
                            
                            <div className="group-icon">
                                <FolderOutlined />
                            </div>

                            <div className="group-name">
                                <h4>Inventory Check</h4>
                                <span>Check every 1 month</span>
                            </div>

                            <div className="group-people">
                                <ul>
                                    <li><img src={people1} /></li>
                                    <li><img src={people2} /></li>
                                    <li><img src={people3} /></li>
                                    <li><img src={people4} /></li>
                                </ul>
                            </div>

                            <div className="group-action">
                               <BellOutlined />
                               <div className="hover-action">
                                <FormOutlined />
                                <DeleteOutlined />
                               </div>
                            </div>

                        </div>

                   

                    </div>




                </div>


                <Modal
                    title="Add/Edit Groups"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    wrapClassName="group-modal"
                    
                    >
                
                <Form name="basic" >
                    <Form.Item
                        label="Group Name"
                        name="groupname"
                        rules={[{ required: true, message: 'Please input your group name!' }]}
                    >
                        <Input placeholder="Inventory Check"/>
                    </Form.Item>


                    <Form.Item>
                    <div className="user-avatar">
                        <PlusOutlined />
                        <img src={people1} />
                        <img src={people2} />
                        <img src={people3} />
                        <img src={people4} />
                    </div>
                    </Form.Item>


                    <Form.Item label="Check Every" style={{ marginBottom: 0 }}>
                        <Form.Item
                        name="year"
                        style={{ display: 'inline-block', width: 'calc(10% - 5px)', marginRight: 8 }}
                        >
                        <Input placeholder="" />
                        </Form.Item>
                        <Form.Item
                        name="month"
                        style={{ display: 'inline-block', width: 'calc(30% - 5px)', marginRight: 8 }}
                        >
                        <Select placeholder="Day">
                            <Option value="Day">Day</Option>
                            <Option value="Week">Week</Option>
                            <Option value="Month">Month</Option>
                        </Select>
                        </Form.Item>

                        <Form.Item
                            name="month"
                            style={{ display: 'inline-block' }}
                            >
                            <Checkbox>
                             Check only on free days
                            </Checkbox>
                           
                        </Form.Item>

                    </Form.Item>



                    <Form.Item>
                    

                        <Form.Item name="date-picker" label="Previous Checking"
                        style={{ display: 'inline-block', width: 'calc(40% - 5px)', marginRight: 8 }}
                        >
                            <DatePicker />
                        </Form.Item>


                        <Form.Item name="date-picker" label="Next Checking"
                        style={{ display: 'inline-block', width: 'calc(40% - 5px)'}}
                        >
                            <DatePicker />
                        </Form.Item>

                    </Form.Item>



                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                        Save
                        </Button>
                    </Form.Item>
                    </Form>

                </Modal>


        </Wrapper>
        
    );
  };
  
  export default Groups;