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
  DeleteOutlined,
  FormOutlined,
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
import DeletePopup from './deletepopup';

const Services = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [group, setGroup] = useState([]);
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();
  const [serviceData, setServiceData] = useState([]);
  const [curRowId, setCurRowId] = useState(0);

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
      title: 'Standard Quanity',
      dataIndex: 'quantity',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'x',
      render: (text, record) => (
        <div className="service-margin">
          <a onClick={() => edit(record.id)}>Edit</a>
          <a onClick={() => delRow(record.id)}>Delete</a>
        </div>
      ),
    },
  ];

  const delRow = (id) => {
    setVisible1(true);
    setCurRowId(id);
  };

  const show = () => {
    setNotifyType('');
    form.resetFields();
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    setVisible1(false);
  };

  const handleCancel = () => {
    setVisible(false);
    setVisible1(false);
  };

  const close = () => {
    setNotifyType('');
  };

  const edit = (id) => {
    serviceData
     .filter(ele => ele.id == id)
     .map(filterService => showInform(filterService))
  };

  const showInform = (data) => {
    setNotifyType('');
    setVisible(true);
    form.setFieldsValue({
      serviceId: data.id,
      servicename: data.serviceName,
      serviceprice: data.servicePrice,
      servicequantity: data.quantity,
    })
  }

  const remove = async () => {
    const values = {
      id: curRowId,
    };
    const response = await userInstance.post('/deleteService', values);
    if (response.data.code === 200) {
      setVisible1(false);
      getData();
    }
  };

  const onFinish = async (values) => {
    values.propertyNo = localStorage.getItem('propertyId');
    const response = await userInstance.post('/addService', values);
    const statusCode = response.data.code;
    const msg = response.data.msg;
    if (statusCode === 200) {
      setNotifyType('success');
      setNotifyMsg(msg);
      setVisible(false);
      getData();
    } else {
      setNotifyType('error');
      setNotifyMsg(msg);
    }
    form.resetFields();
  };

  const getData = async () => {
    const values = {
      propertyId: localStorage.getItem('propertyId'),
    };
    const response = await userInstance.post('/getService', values);
    const data = response.data.servicData;
    if (response.data.code === 200) {
      setServiceData(data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
          <Table
            columns={columns}
            dataSource={serviceData}
            pagination={{ pageSize: 50 }}
            scroll={{ y: 500 }}
          />
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
          <Form.Item name="serviceId"><Input hidden={true}/></Form.Item>
          <Form.Item
            label="Service Name"
            name="servicename"
            style={{ padding: '0px 10px' }}
            rules={[
              {
                required: true,
                message: 'please enter service name',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Service Price"
            name="serviceprice"
            style={{ padding: '0px 10px' }}
            rules={[
              {
                required: true,
                message: 'Please enter price',
              },
            ]}
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
          <Form.Item className="text-center">
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        visible={visible1}
        onOk={handleOk}
        onCancel={handleCancel}
        wrapClassName="delete-modal"
      >
        <DeletePopup
          dataObject={() => remove()}
          cancel={() => handleCancel()}
        />
      </Modal>
    </Wrapper>
  );
};

export default Services;
