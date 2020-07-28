import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './property.css';
import {
  Form, Input, Button, Tooltip, Modal, Table,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Wrapper from '../wrapper';

import { userInstance } from '../../axios/axiosconfig';
import Toaster from '../toaster/toaster';
import DeletePopup from './deletepopup';

const Services = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();
  const [serviceData, setServiceData] = useState([]);
  const [curRowId, setCurRowId] = useState(0);

  const isSubUser = localStorage.getItem('isSubUser') || false;
  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [{ propertiesWrite }] = userCred || [{}];
  const canWrite = propertiesWrite;

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
      render: (record) => (
        <div className="service-margin">
          <div onClick={() => edit(record.id)} role="button" aria-hidden="true">
            Edit
          </div>
          <div onClick={() => delRow(record.id)} role="button" aria-hidden="true">
            Delete
          </div>
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
      .filter((ele) => ele.id === id)
      .map((filterService) => showInform(filterService));
  };

  const showInform = (data) => {
    setNotifyType('');
    setVisible(true);
    form.setFieldsValue({
      serviceId: data.id,
      servicename: data.serviceName,
      serviceprice: data.servicePrice,
      servicequantity: data.quantity,
    });
  };

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
    const { msg } = response.data;
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

  const enableButton = (
    <Button type="primary" icon={<PlusOutlined />} onClick={show}>
      <Link to="/services">Add Services</Link>
    </Button>
  );

  const disableButton = (
    <Tooltip
      title="You are not authorize to create create new service"
      color="gold"
    >
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={show}
        disabled="true"
      >
        <Link to="/services">Add Services</Link>
      </Button>
    </Tooltip>
  );
  const btn1 = isSubUser && canWrite ? enableButton : disableButton;
  const btn2 = isSubUser ? btn1 : enableButton;

  return (
    <Wrapper>
      <div className="property-listing">
        <div className="page-header">
          <h1>Services</h1>

          {btn2}
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
          <Form.Item name="serviceId">
            <Input hidden />
          </Form.Item>
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
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Standard Quantity"
            name="servicequantity"
            style={{ padding: '0px 10px' }}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item className="text-center">
            <Button
              style={{ marginRight: 10 }}
              onClick={() => {
                setVisible(false);
              }}
              className="border-btn"
            >
              Cancel
            </Button>
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
