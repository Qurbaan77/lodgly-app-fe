import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import './property.css';
import {
  Form, Input, Button, Tooltip, Modal, Table,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import Wrapper from '../wrapper';
import { userInstance } from '../../axios/axiosconfig';
import Toaster from '../toaster/toaster';
import DeletePopup from './deletepopup';
import favicon from '../../assets/images/logo-mobile.png';
import UserLock from '../userlock/userlock';

const Services = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();
  const [serviceData, setServiceData] = useState([]);
  const [curRowId, setCurRowId] = useState(0);
  const [subscribed, setSubscribed] = useState();
  const [onTrial, setOnTrial] = useState(true);
  const [daysLeft, setDaysLeft] = useState();
  const isSubUser = localStorage.getItem('isSubUser') || false;
  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [{ propertiesWrite }] = userCred || [{}];
  const canWrite = propertiesWrite;

  const columns = [
    {
      title: 'Service Name',
      dataIndex: 'serviceName',
    },
    {
      title: 'Service Price',
      dataIndex: 'servicePrice',
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
          <div onClick={() => edit(record.id)} role="presentation">
            {t('strings.edit')}
          </div>
          <div
            onClick={() => delRow(record.id)}
            role="presentation"
          >
            {t('strings.delete')}
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
    const res = await userInstance.get('/getUserSubscriptionStatus');
    if (res.data.code === 200) {
      const [{
        days, isOnTrial, isSubscribed,
      }] = res.data.userSubsDetails;
      setDaysLeft(parseInt(days, 10));
      setSubscribed(JSON.parse(isSubscribed));
      setOnTrial(JSON.parse(isOnTrial));
    }
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
      <Link to="/services">{t('services.heading1')}</Link>
    </Button>
  );

  const disableButton = (
    <Tooltip title={t('services.heading2')} color="gold">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={show}
        disabled="true"
      >
        <Link to="/services">{t('services.heading1')}</Link>
      </Button>
    </Tooltip>
  );
  const btn1 = isSubUser && canWrite ? enableButton : disableButton;
  const btn2 = isSubUser ? btn1 : enableButton;

  const hasAccess = onTrial && daysLeft !== 0 ? 1 : subscribed;
  return (
    <Wrapper>
      <Helmet>
        <link rel="icon" href={favicon} />
        <title>
          Lodgly - Comprehensive Vacation Rental Property Management
        </title>
        <meta
          name="description"
          content="Grow your Vacation Rental with Lodgly"
        />
        <body className="service-page-view" />
      </Helmet>
      {
        hasAccess
          ? (
            <>
              <div className="property-listing">
                <div className="page-header">
                  <h1>{t('services.heading3')}</h1>

                  {btn2}
                </div>

                <div className="services-list">
                  <Table columns={columns} dataSource={serviceData} />
                </div>
              </div>

              <Modal
                title={t('services.heading1')}
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
                    label={t('services.heading4')}
                    name="servicename"
                    style={{ padding: '0px 10px' }}
                    rules={[
                      {
                        required: true,
                        message: t('services.heading5'),
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label={t('services.heading6')}
                    name="serviceprice"
                    style={{ padding: '0px 10px' }}
                    rules={[
                      {
                        required: true,
                        message: t('services.heading8'),
                      },
                    ]}
                  >
                    <Input autoFocus type="number" />
                  </Form.Item>
                  <Form.Item
                    label={t('services.heading9')}
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
                      {t('strings.cancel')}
                    </Button>
                    <Button type="primary" htmlType="submit">
                      {t('strings.save')}
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
            </>
          )
          : <UserLock />
      }
    </Wrapper>
  );
};

export default Services;
