import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import './property.css';
import { toast } from 'react-toastify';
import {
  Form, Input, Button, Tooltip, Modal,
} from 'antd';
import { useTranslation } from 'react-i18next';
import {
  PlusOutlined, DeleteOutlined, FormOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';
import Wrapper from '../wrapper';
import { userInstance } from '../../axios/axiosconfig';
import DeletePopup from './deletepopup';
import favicon from '../../assets/images/logo-mobile.png';
import UserLock from '../userlock/userlock';
import loader from '../../assets/images/cliploader.gif';

// import CreateProperty from './createProperty';

const Services = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  // const [visible2, setVisible2] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visible1, setVisible1] = useState(false);
  const [serviceData, setServiceData] = useState([]);
  const [curRowId, setCurRowId] = useState(0);
  const [subscribed, setSubscribed] = useState();
  const [onTrial, setOnTrial] = useState(true);
  const [daysLeft, setDaysLeft] = useState();
  const [editOpen, setEditOpen] = useState(false);
  // const [curOwner, setCurOwner] = useState();
  // const [editOpen, setEditOpen] = useState(false);
  const isSubUser = localStorage.getItem('isSubUser') || false;
  // const [visibleProperty, setVisibleProperty] = useState(false);
  const [{ ownerDelete }] = JSON.parse(
    localStorage.getItem('userCred'),
  ) || [{}];
  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [{ propertiesWrite }] = userCred || [{}];
  const canWrite = propertiesWrite;

  // const columns = [
  //   {
  //     title: 'Service Name',
  //     dataIndex: 'serviceName',
  //   },
  //   {
  //     title: 'Service Price',
  //     dataIndex: 'servicePrice',
  //   },
  //   {
  //     title: 'Standard Quanity',
  //     dataIndex: 'quantity',
  //   },
  //   {
  //     title: 'Action',
  //     dataIndex: 'action',
  //     key: 'x',
  //     render: (text, record) => (
  //       <div className="service-margin">
  //         <div onClick={() => edit(record.id)} role="presentation">
  //           {t('strings.edit')}
  //         </div>
  //         <div
  //           hidden={isSubUser ? !propertiesDelete : false}
  //           onClick={() => delRow(record.id)}
  //           role="presentation"
  //         >
  //           {t('strings.delete')}
  //         </div>
  //       </div>
  //     ),
  //   },
  // ];

  const delRow = (id) => {
    setVisible1(true);
    setCurRowId(id);
  };
  // const showDeletePopUP = (id) => {
  //   setVisible2(true);
  //   setCurOwner(id);
  // };

  const show = () => {
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

  // const closeCreateProperty = () => {
  //   setVisibleProperty(false);
  // };

  const edit = async (data) => {
    setEditOpen(true);
    setVisible(true);
    form.setFieldsValue({
      serviceId: data.id,
      servicename: data.serviceName,
      serviceprice: data.servicePrice,
      servicequantity: data.quantity,
    });
    // setEditOpen(true);
  };

  // const edit = (id) => {
  //   serviceData
  //     .filter((ele) => ele.id === id)
  //     .map((filterService) => showInform(filterService));
  // };

  // const showInform = (data) => {
  //   setVisible(true);
  //   form.setFieldsValue({
  //     serviceId: data.id,
  //     servicename: data.serviceName,
  //     serviceprice: data.servicePrice,
  //     servicequantity: data.quantity,
  //   });
  // };

  const remove = async () => {
    const values = {
      id: curRowId,
    };
    const response = await userInstance.post('/deleteService', values);
    if (response.data.code === 200) {
      setVisible1(false);
      // setVisible2(false);
      getData();
      toast.success('successfully deleted service', { containerId: 'B' });
    } else {
      toast.error('server error please try again', { containerId: 'B' });
    }
  };

  const onFinish = async (values) => {
    values.propertyNo = localStorage.getItem('propertyV2Id');
    // console.log(values);
    const response = await userInstance.post('/addService', values);
    const statusCode = response.data.code;

    if (statusCode === 200) {
      toast.success('successfully added service', { containerId: 'B' });
      setVisible(false);
      getData();
    } else {
      toast.error('server error please try again', { containerId: 'B' });
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
      propertyId: localStorage.getItem('propertyV2Id'),
    };
    const response = await userInstance.post('/getService', values);
    const data = response.data.servicData;
    if (response.data.code === 200) {
      setServiceData(data);
      setLoading(false);
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

  const title = t('services.label18');
  const hasAccess = onTrial && daysLeft !== 0 ? 1 : subscribed;
  // const saveBtn = editOpen ? t('services.label18') : t('services.label18');
  const pageContent = (
    <>
      {serviceData.length > 0 ? (
        <Wrapper>
          <div className="owner-page">
            <div className="page-header">
              <h1>{t('services.heading1')}</h1>
              {btn2}
            </div>

            <div className="owner-list">
              <div className="custom-table">
                <table>
                  <thead>
                    <tr>
                      <th>{t('services.th1')}</th>
                      <th>{t('services.th2')}</th>
                      <th>{t('services.th3')}</th>
                      <th> </th>
                    </tr>
                  </thead>

                  <tbody>
                    {serviceData.map((el) => (
                      <tr>
                        <td>
                          <div className="owner-info" onClick={() => edit(el)} role="presentation">
                            <div className="owner-title">
                              <h5>{`${el.serviceName}`}</h5>

                            </div>
                          </div>
                        </td>

                        <td>{el.servicePrice}</td>

                        <td>
                          {el.quantity}
                        </td>

                        <td>
                          <div className="owner-action">
                            <FormOutlined onClick={() => edit(el)} />
                            <DeleteOutlined
                              hidden={isSubUser ? !ownerDelete : false}
                              onClick={() => delRow(el.id)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <Modal
            title={editOpen ? t('services.label19') : title}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            wrapClassName="group-modal"
          >
            <Helmet>
              <body className="service-page-view" />
            </Helmet>
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
                <Input type="number" />
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
        </Wrapper>
      ) : (
        <Wrapper>
          <div className="add-team-page">
            <div className="add-subuser">
              <img alt="subuser" />
              <h4>{t('services.heading1')}</h4>
              <p>{t('services.label18')}</p>
              {btn2}
            </div>
          </div>
          <Modal
            title={t('services.label19')}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            wrapClassName="guest-modal"
          >
            <Helmet>
              <body className={visible ? 'ant-scrolling-effect' : ''} />
            </Helmet>
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
                <Input type="number" />
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
        </Wrapper>
      )}
    </>
  );

  if (loading) {
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
        <div className="loader">
          <div className="loader-box">
            <img src={loader} alt="loader" />
          </div>
        </div>
      </Wrapper>
    );
  }

  if (serviceData.length < 1) {
    return (
      <Wrapper>
        <div className="add-team-page">
          <div className="add-subuser">
            <ApartmentOutlined />
            <h4>{t('services.heading1')}</h4>
            {btn2}
          </div>
        </div>

        <Modal
          title={title}
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          wrapClassName="guest-modal"
        >
          <Helmet>
            <body className={visible ? 'ant-scrolling-effect' : ''} />
          </Helmet>
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
              <Input type="number" />
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
      </Wrapper>
    );
  }
  return (
    <>
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
      {hasAccess ? (
        pageContent
      ) : (
        <Wrapper>
          <UserLock />
        </Wrapper>
      )}
    </>
  );
};

export default Services;
