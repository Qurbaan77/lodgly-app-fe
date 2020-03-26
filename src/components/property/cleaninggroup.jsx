import React, { useEffect, useState } from "react";
import "./property.css";
import { Form, Select, Input, InputNumber, Switch, Radio, Slider, Button, Upload, Rate, Checkbox, Row, Col, } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined, PlusOutlined, SearchOutlined, VerticalAlignMiddleOutlined,UserOutlined, VideoCameraOutlined, UploadOutlined, } from '@ant-design/icons';
import Wrapper from "../wrapper"
import { Collapse } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { Table, Tag } from 'antd';
import { Modal } from 'antd';



const { Option } = Select;

const CleaningGroup = () => {

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: text => <a>{text}</a>,
        },
       
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
          render: tags => (
            <span>
              {tags.map(tag => {
                let color = ['red', 'green', 'orange', 'blue'];
                if (tag === 'Decline') {
                  color = 'red';
                }else if (tag === 'Approved'){
                    color = 'green';
                }else if (tag === 'In Review'){
                    color = 'orange';
                }else if (tag === 'Waiting'){
                    color = 'blue';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </span>
          ),
        },
      ];

    const data = [
        {
          key: '1',
          name: 'Wash the bathroom',
          address: 'Wash the bathroom',
          tags: ['Approved'],
        },
        {
          key: '2',
          name: 'Wash the bathroom',
          address: 'Wash the bathroom',
          tags: ['Decline'],
        },
        {
          key: '3',
          name: 'Wash the bathroom',
          address: 'Wash the bathroom',
          tags: ['In Review'],
        },
        {
            key: '4',
            name: 'Wash the bathroom',
            address: 'Wash the bathroom',
            tags: ['Waiting'],
          },
          {
            key: '5',
            name: 'Wash the bathroom',
            address: 'Wash the bathroom',
            tags: ['Decline'],
          },
          {
            key: '6',
            name: 'Wash the bathroom',
            address: 'Wash the bathroom',
            tags: ['Approved'],
          },
      ];




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
            
                <div className="cleaning-group">

                    <div className="page-header">

                        <h1><HomeOutlined /> Cleaning Group</h1>


                    <div className="cleaning-button">
                        <div className="user-avatar">
                            <Avatar icon={<PlusOutlined />} />
                            <Avatar>U</Avatar>
                            <Avatar>S</Avatar>
                            <Avatar>E</Avatar>
                            <Avatar>R</Avatar>
                        </div>
                        <Button type="primary" icon={<PlusOutlined />} onClick={show}>
                           Add Task
                        </Button>
                    </div>

                    </div>
 


                    <div className="panel-container">

                    <Table columns={columns} dataSource={data} />


                    </div>


                </div>


                <Modal
                    title="Add/Edit Task"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    wrapClassName="task-modal"
                    
                    >

                <Form name="basic" >
                    <Form.Item
                        label="Task"
                        name="task"
                        rules={[{ required: true, message: 'Please input your Task name!' }]}
                    >
                        <Input placeholder="Wash the bathroom"/>
                    </Form.Item>

                    <Form.Item
                        label="Note"
                        name="note"
                        rules={[{ required: true, message: 'Please input your note!' }]}
                    >
                        <Input placeholder="Wash the bathroom"/>
                    </Form.Item>

                    <Form.Item>
                    <Select defaultValue="approved" style={{ width: 120 }}>
                        <Option value="approved">Approved</Option>
                        <Option value="waiting">Waiting</Option>
                        <Option value="decline">Decline</Option>
                        <Option value="inreview">In Review</Option>
                    </Select>
                    </Form.Item>

                    <Form.Item className="text-center">
                        <Button type="primary" htmlType="submit">
                        Save
                        </Button>
                    </Form.Item>

                </Form>

                 </Modal>


        </Wrapper>
        
    );
  };
  
  export default CleaningGroup;