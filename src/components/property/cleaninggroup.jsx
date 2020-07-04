import React, { useEffect, useState } from 'react';
import './property.css';
import {
  Form,
  Select,
  Input,
  InputNumber,
  Switch,
  DatePicker,
  Radio,
  Slider,
  Button,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DeleteOutlined,
  FormOutlined,
  HomeOutlined,
  PlusOutlined,
  SearchOutlined,
  VerticalAlignMiddleOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import Wrapper from '../wrapper';
import { Collapse } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { Table, Tag } from 'antd';
import { Modal } from 'antd';
import people1 from '../../assets/images/people-1.png';
import people2 from '../../assets/images/people-2.png';
import people3 from '../../assets/images/people-3.jpg';
import people4 from '../../assets/images/people-4.jpg';
import { userInstance } from '../../axios/axiosconfig';
import Toaster from '../toaster/toaster';

const { Option } = Select;

const CleaningGroup = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();
  const initialFormState = { name: '' };
  const [editUser, setEditUser] = useState(initialFormState);

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
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
      render: (tags, record) => {
        let color = '';
        if (tags === 'Decline') {
          color = 'red';
        } else if (tags === 'Approved') {
          color = 'green';
        } else if (tags === 'In Review') {
          color = 'orange';
        } else if (tags === 'Waiting') {
          color = 'blue';
        }
        return (
          <div>
            <Tag color={color} key={tags}>
              {tags.toUpperCase()}
            </Tag>
            <span class="group-action">
              <FormOutlined onClick={() => edit(record)} />
              <DeleteOutlined onClick={() => remove(record.id)} />
            </span>
          </div>
        );
      },
    },
  ];

  const show = () => {
    form.resetFields();
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const getData = async () => {
    const response = await userInstance.post('/taskList');
    console.log(response.data.taskDetail);
    if (response.data.code === 200) {
      setTasks(response.data.taskDetail);
    }
  };

  const onFinish = async (values) => {
    saveData(values);
  };

  const saveData = async (values) => {
    console.log('Received values of form: ', values);
    const response = await userInstance.post('/addTask', values);
    const statusCode = response.data.code;
    const msg = response.data.msg;
    if (statusCode === 200) {
      setEditUser(initialFormState);
      setNotifyType('success');
      setNotifyMsg(msg);
      getData();
    } else {
      setNotifyType('error');
      setNotifyMsg(msg);
    }
    form.resetFields();
  };

  const remove = async (taskId) => {
    console.log('taskId', taskId);
    const data = {
      id: taskId,
    };
    const response = await userInstance.post('/deleteTask', data);
    const statusCode = response.data.code;
    const msg = response.data.msg;
    if (statusCode == 200) {
      getData();
    }
  };

  const edit = async (data) => {
    console.log(data);
    form.setFieldsValue({
      id: data.id,
      name: data.name,
      address: data.address,
      tags: data.tags,
    });
    setVisible(true);
  };

  return (
    <Wrapper>
      <div className="cleaning-group">
        <div className="page-header">
          <h1>
            <HomeOutlined /> Cleaning Group
          </h1>

          <div className="cleaning-button">
            <div className="user-avatar">
              <PlusOutlined />
              <img src={people1} />
              <img src={people2} />
              <img src={people3} />
              <img src={people4} />
            </div>
            <Button type="primary" icon={<PlusOutlined />} onClick={show}>
              Add Task
            </Button>
          </div>
        </div>

        <div className="panel-container">
          <Table columns={columns} dataSource={tasks} />
        </div>

        <div className="clean-filter">
          <Row>
            <Col span={12}>
              <Form.Item
                label="Check Every"
                style={{ marginBottom: 0, textAlign: 'left' }}
              >
                <Form.Item
                  name="year"
                  style={{
                    display: 'inline-block',
                    width: 'calc(10% - 5px)',
                    marginRight: 8,
                  }}
                >
                  <Input placeholder="" />
                </Form.Item>
                <Form.Item
                  name="month"
                  style={{
                    display: 'inline-block',
                    width: 'calc(30% - 5px)',
                    marginRight: 8,
                  }}
                >
                  <Select placeholder="Day">
                    <Option value="Day">Day</Option>
                    <Option value="Week">Week</Option>
                    <Option value="Month">Month</Option>
                  </Select>
                </Form.Item>

                <Form.Item name="month" style={{ display: 'inline-block' }}>
                  <Checkbox>Check only on free days</Checkbox>
                </Form.Item>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item>
                <Form.Item
                  name="date-picker"
                  label="Previous Checking"
                  style={{
                    display: 'inline-block',
                    width: 'calc(40% - 5px)',
                    marginRight: 8,
                  }}
                >
                  <DatePicker />
                </Form.Item>

                <Form.Item
                  name="date-picker"
                  label="Next Checking"
                  style={{ display: 'inline-block', width: 'calc(40% - 5px)' }}
                >
                  <DatePicker />
                </Form.Item>
              </Form.Item>
            </Col>
          </Row>
        </div>
      </div>

      <Modal
        title="Add/Edit Task"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        wrapClassName="task-modal"
      >
        <Toaster notifyType={notifyType} notifyMsg={notifyMsg} />
        <Form form={form} name="basic" onFinish={onFinish}>
          <Form.Item label="ID" name="id" hidden={true}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Task"
            name="name"
            rules={[
              { required: true, message: 'Please input your Task name!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Note"
            name="address"
            rules={[{ required: true, message: 'Please input your note!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="tags">
            <Select defaultValue="Select" style={{ width: 120 }}>
              <Option value="Approved">Approved</Option>
              <Option value="Waiting">Waiting</Option>
              <Option value="Decline">Decline</Option>
              <Option value="In Review">In Review</Option>
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
