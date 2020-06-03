import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './property.css';
import {
  Form,
  Select,
  Input,
  Layout,
  Menu,
  Button,
  Tooltip,
  Dropdown,
} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  PlusOutlined,
  SearchOutlined,
  VerticalAlignMiddleOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import Wrapper from '../wrapper';
import { Modal } from 'antd';
import { Table } from 'antd';
import property1 from '../../assets/images/property-1.png';
import property2 from '../../assets/images/property-2.png';
import property3 from '../../assets/images/property-3.png';
import { Row, Col } from 'antd';
import { userInstance } from '../../axios/axiosconfig';
import Toaster from '../toaster/toaster';
import queryString from 'query-string';

const Services = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [group, setGroup] = useState([]);
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();

  const columns = [
    {
      title: 'Service Name',
      dataIndex: 'serviceName',
      width: 400,
    },
    {
      title: 'Service Price',
      dataIndex: 'servicePrice',
      width: 400,
    },
    {
      title: 'Standar Quanity',
      dataIndex: 'quantity',
    },
  ];

  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      serviceName: `Edward King ${i}`,
      servicePrice: 32,
      quantity: `London, Park Lane no. ${i}`,
    });
  }

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

  const close = () => {
    setNotifyType('');
  };

  const onFinish = async (values) => {
    console.log(values);
    const parsed = queryString.parse(window.location.search);
    values.propertyNo = parsed.propertyNo; // Change propertyNo to prpertyId after testing
    const response = await userInstance.post('/addService', values);
    const statusCode = response.data.code;
    const msg = response.data.msg;
    if (statusCode == 200) {
      setNotifyType('success');
      setNotifyMsg(msg);
    } else {
      setNotifyType('error');
      setNotifyMsg(msg);
    }
    form.resetFields();
  };

  return (
    <Wrapper>
      <div className="property-listing">
        <div className="page-header">
          <h1>Services</h1>

          <Button type="primary" icon={<PlusOutlined />} onClick={show}>
            <Link to="/services">Add Services</Link>
          </Button>
        </div>

        <div className="services-list">
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 500 }} />
        </div>
      </div>

      <Modal
        title="Add Services"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        wrapClassName="group-modal"
      >
        <Toaster notifyType={notifyType} notifyMsg={notifyMsg} close={close} />
        <Form form={form} name="basic" onFinish={onFinish}>
          <Form.Item
            label="Service Name"
            name="servicename"
            style={{ padding: '0px 10px' }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Service Price"
            name="serviceprice"
            style={{ padding: '0px 10px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Standard Quantity"
            name="servicequantity"
            style={{ padding: '0px 10px' }}
          >
            <Input />
          </Form.Item>
          <Form.Item style={{ padding: '0px 10px' }}>
            <Button htmlType="submit">Save</Button>
          </Form.Item>
        </Form>
      </Modal>
    </Wrapper>
  );
};

export default Services;
