import React, { useEffect, useState, useCallback } from 'react';
import Helmet from 'react-helmet';
import './owner.css';
import {
  Form,
  Select,
  Input,
  Button,
  Radio,
  DatePicker,
  Tooltip,
  Modal,
  Row,
  Col,
} from 'antd';
import { PlusOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import moment from 'moment';
import Wrapper from '../wrapper';
import DeletePopup from '../property/deletepopup';

import property1 from '../../assets/images/property-1.png';
import property2 from '../../assets/images/property-2.png';
import property3 from '../../assets/images/property-3.png';
import owner from '../../assets/images/profile_user.jpg';
import favicon from '../../assets/images/logo-mobile.png';
import subuser from '../../assets/images/subuser.jpg';
import { userInstance } from '../../axios/axiosconfig';
import Toaster from '../toaster/toaster';
import UserLock from '../userlock/userlock';

const Owner = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [country, setCountry] = useState(null);
  const [propertyData, setPropertyData] = useState([]);
  const [subUserData, setSubUserData] = useState([]);
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();
  const [curOwner, setCurOwner] = useState();
  const [subscribed, setSubscribed] = useState();
  const [onTrial, setOnTrial] = useState();
  const [daysLeft, setDaysLeft] = useState();

  const isSubUser = localStorage.getItem('isSubUser') || false;

  const [{ userId, ownerWrite: canWrite }] = JSON.parse(
    localStorage.getItem('userCred'),
  ) || [{}];

  const show = () => {
    form.resetFields();
    setVisible(true);
    setNotifyType('');
  };

  const handleOk = () => {
    setVisible(false);
    setVisible2(false);
  };

  const handleCancel = () => {
    setVisible(false);
    setVisible2(false);
  };

  const close = () => {
    setNotifyType('');
  };

  const showDeletePopUP = (unitId) => {
    setVisible2(true);
    setCurOwner(unitId);
  };

  const getPropertyData = useCallback(async () => {
    const response0 = await userInstance.get('/getUserSubscriptionStatus');
    if (response0.data.code === 200) {
      const [{
        days, isOnTrial, isSubscribed,
      }] = response0.data.userSubsDetails;
      setDaysLeft(parseInt(days, 10));
      setSubscribed(JSON.parse(isSubscribed));
      setOnTrial(JSON.parse(isOnTrial));
    }
    const response = await userInstance.post('/fetchProperty', {
      affiliateId: userId,
    });
    const data = response.data.propertiesData;
    const arr = [];
    data
      .filter((el) => el.ownerId === 0)
      .forEach((filterData) => {
        arr.push(filterData);
      });
    if (response.data.code === 200) {
      setPropertyData(arr);
    }
  }, [userId]);

  const getSubUserData = useCallback(async () => {
    const response = await userInstance.post('/getOwner', {
      affiliateId: userId,
    });
    if (response.data.code === 200) {
      setSubUserData(response.data.data);
    }
  }, [userId]);

  const edit = async (data) => {
    const m1 = moment(data.dob);
    const response = await userInstance.post('/fetchProperty', {
      affiliateId: userId,
    });
    if (response.data.code === 200) {
      const data2 = response.data.propertiesData;
      setVisible(true);
      setNotifyType('');
      const selectedProperty = [];
      const data3 = data2.filter((el) => el.ownerId === data.id);
      data3.forEach((filter) => {
        selectedProperty.push(filter.propertyName);
      });
      console.log('selected property', selectedProperty);
      form.setFieldsValue({
        id: data.id,
        firstname: data.fname,
        secondname: data.lname,
        email: data.email,
        phone: data.phone,
        dob: m1,
        gender: data.gender,
        country: data.country,
        citizenship: data.citizenship,
        address: data.address,
        document: data.typeofdoc,
        documentnumber: data.docNo,
        notes: data.notes,
        properties: selectedProperty,
      });
    }
  };

  const onFinish = async (values) => {
    const copyValues = values;
    copyValues.affiliateId = userId;
    const response = await userInstance.post('/addOwner', copyValues);
    const statusCode = response.data.code;
    const { msg } = response.data;
    if (statusCode === 200) {
      setNotifyType('success');
      setNotifyMsg(msg);
      setVisible(false);
      getSubUserData();
    } else {
      setNotifyType('error');
      setNotifyMsg(msg);
    }
    form.resetFields();
  };

  const remove = async () => {
    const values = {
      id: curOwner,
    };
    const response = await userInstance.post('/deleteOwner', values);
    if (response.data.code === 200) {
      setVisible2(false);
      getPropertyData();
      getSubUserData();
    }
  };

  useEffect(() => {
    getSubUserData();
    getPropertyData();
  }, [getSubUserData, getPropertyData]);

  const enableButton = (
    <Button type="primary" icon={<PlusOutlined />} onClick={show}>
      Add New Owner
    </Button>
  );
  const disabledButton = (
    <Tooltip
      title="You are not authorize to create new owner"
      color="gold"
    >
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={show}
        disabled="true"
      >
        Add New Owner
      </Button>
    </Tooltip>
  );

  const btn = isSubUser && canWrite ? enableButton : disabledButton;
  const perm = isSubUser ? btn : enableButton;

  const hasAccess = onTrial && daysLeft !== 0 ? 1 : subscribed;

  const pageContent = (
    <>
      {subUserData.length ? (
        <Wrapper>
          <div className="owner-page">
            <div className="page-header">
              <h1>Owner</h1>
              { perm }
            </div>

            <div className="owner-list">
              <div className="custom-table">
                <table>
                  <thead>
                    <tr>
                      <th>Sub User</th>
                      <th>Email</th>
                      <th>Properties</th>
                    </tr>
                  </thead>

                  <tbody>
                    {subUserData.map((el) => (
                      <tr>
                        <td>
                          <div className="owner-info">
                            <div className="owner-pic">
                              <img src={owner} alt="ownerImage" />
                            </div>
                            <div className="owner-title">
                              <h5>{`${el.fname} ${el.lname}`}</h5>
                              <span>
                                Job Title |
                                {' '}
                                {el.citizenship}
                                ,
                                {' '}
                                {el.country}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td>{el.email}</td>

                        <td>
                          <div className="owner-property">
                            <img src={property1} alt="property1" />
                            <img src={property2} alt="property1" />
                            <img src={property3} alt="property1" />
                          </div>
                        </td>

                        <td>
                          <div className="owner-action">
                            <FormOutlined onClick={() => edit(el)} />
                            <DeleteOutlined
                              onClick={() => showDeletePopUP(el.id)}
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
            title="Update Owner"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            wrapClassName="guest-modal"
          >
            <Toaster
              notifyType={notifyType}
              notifyMsg={notifyMsg}
              close={close}
            />
            <Form form={form} name="basic" onFinish={onFinish}>
              <h4>Owner Information</h4>
              <Row style={{ alignItems: 'center' }}>
                <Form.Item name="id">
                  <Input hidden />
                </Form.Item>
                <Col span={12}>
                  <Form.Item
                    label="First Name"
                    name="firstname"
                    style={{ paddingRight: 20 }}
                    rules={[
                      {
                        required: true,
                        message: 'Enter firstname!',
                      },
                    ]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Second Name"
                    name="secondname"
                    style={{ paddingRight: 20 }}
                    rules={[
                      {
                        required: true,
                        message: 'Enter secondname!',
                      },
                    ]}
                  >
                    <Input placeholder="Second Name" />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ alignItems: 'center' }}>
                <Col span={12}>
                  <Form.Item
                    label="E-mail"
                    name="email"
                    style={{ paddingRight: 20 }}
                    rules={[
                      {
                        type: 'email',
                        message: 'Invalid E-mail!',
                      },
                      {
                        required: true,
                        message: 'Enter E-mail!',
                      },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="Phone" name="phone">
                    <Input
                      placeholder="Phone"
                      type="number"
                      minLength="9"
                      maxLength="15"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ alignItems: 'center' }}>
                <Col span={12}>
                  <Form.Item
                    name="dob"
                    label="Date of Birth"
                    style={{ paddingRight: 20 }}
                  >
                    <DatePicker />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item name="gender" label="Gender">
                    <Radio.Group name="radiogroup">
                      <Radio value="Male">M</Radio>
                      <Radio value="female">F</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ alignItems: 'center' }}>
                <Col span={12}>
                  <Form.Item
                    label="Country of Residence"
                    name="country"
                    style={{ paddingRight: 20 }}
                  >
                    <CountryDropdown onChange={(val) => setCountry(val)} />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ alignItems: 'center' }}>
                <Col span={12}>
                  <Form.Item
                    label="Citizenship"
                    name="citizenship"
                    style={{ paddingRight: 20 }}
                  >
                    <RegionDropdown country={country} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="PLace of Residence" name="address">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ alignItems: 'center' }}>
                <Col span={12}>
                  <Form.Item
                    label="Type of Document"
                    name="document"
                    style={{ paddingRight: 20 }}
                  >
                    <Select>
                      <Select.Option value="demo">Holiday House</Select.Option>
                      <Select.Option value="demo">Holiday House</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="Document Number" name="documentnumber">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ alignItems: 'center' }}>
                <Form.Item
                  style={{ width: '100%' }}
                  name="properties"
                  label="Properties"
                  rules={[
                    {
                      required: true,
                      message: 'Please select your property!',
                      type: 'array',
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    size="large"
                    placeholder="Please select property"
                  >
                    {propertyData.map((el) => (
                      <Option value={el.id}>{el.propertyName}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Row>

              <Row style={{ alignItems: 'center' }}>
                <Col span={24}>
                  <Form.Item label="Notes" name="notes">
                    <Input.TextArea />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ alignItems: 'center', textAlign: 'right' }}>
                <Col span={24}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Save Owner Property
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Modal>
          <Modal
            visible={visible2}
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
              <img src={subuser} alt="subuser" />
              <h4>Owner</h4>
              <p>Currently there are no Owner created</p>
              {perm}
            </div>
          </div>
          <Modal
            title="Update Owner"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            wrapClassName="guest-modal"
          >
            <Toaster
              notifyType={notifyType}
              notifyMsg={notifyMsg}
              close={close}
            />
            <Form form={form} name="basic" onFinish={onFinish}>
              <h4>Owner Information</h4>
              <Row style={{ alignItems: 'center' }}>
                <Form.Item name="id">
                  <Input hidden />
                </Form.Item>
                <Col span={12}>
                  <Form.Item
                    label="First Name"
                    name="firstname"
                    style={{ paddingRight: 20 }}
                    rules={[
                      {
                        required: true,
                        message: 'Enter firstname!',
                      },
                    ]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Second Name"
                    name="secondname"
                    style={{ paddingRight: 20 }}
                    rules={[
                      {
                        required: true,
                        message: 'Enter secondname!',
                      },
                    ]}
                  >
                    <Input placeholder="Second Name" />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ alignItems: 'center' }}>
                <Col span={12}>
                  <Form.Item
                    label="E-mail"
                    name="email"
                    style={{ paddingRight: 20 }}
                    rules={[
                      {
                        type: 'email',
                        message: 'Invalid E-mail!',
                      },
                      {
                        required: true,
                        message: 'Enter E-mail!',
                      },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="Phone" name="phone">
                    <Input
                      placeholder="Phone"
                      type="number"
                      minLength="9"
                      maxLength="15"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ alignItems: 'center' }}>
                <Col span={12}>
                  <Form.Item
                    name="dob"
                    label="Date of Birth"
                    style={{ paddingRight: 20 }}
                  >
                    <DatePicker />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item name="gender" label="Gender">
                    <Radio.Group name="radiogroup">
                      <Radio value="Male">M</Radio>
                      <Radio value="female">F</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ alignItems: 'center' }}>
                <Col span={12}>
                  <Form.Item
                    label="Country of Residence"
                    name="country"
                    style={{ paddingRight: 20 }}
                  >
                    <CountryDropdown onChange={(val) => setCountry(val)} />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ alignItems: 'center' }}>
                <Col span={12}>
                  <Form.Item
                    label="Citizenship"
                    name="citizenship"
                    style={{ paddingRight: 20 }}
                  >
                    <RegionDropdown country={country} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="PLace of Residence" name="address">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ alignItems: 'center' }}>
                <Col span={12}>
                  <Form.Item
                    label="Type of Document"
                    name="document"
                    style={{ paddingRight: 20 }}
                  >
                    <Select>
                      <Select.Option value="demo">Holiday House</Select.Option>
                      <Select.Option value="demo">Holiday House</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="Document Number" name="documentnumber">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ alignItems: 'center' }}>
                <Form.Item
                  style={{ width: '100%' }}
                  name="properties"
                  label="Properties"
                  rules={[
                    {
                      required: true,
                      message: 'Please select your property!',
                      type: 'array',
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    size="large"
                    placeholder="Please select property"
                  >
                    {propertyData.map((el) => (
                      <Option value={el.id}>{el.propertyName}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Row>

              <Row style={{ alignItems: 'center' }}>
                <Col span={24}>
                  <Form.Item label="Notes" name="notes">
                    <Input.TextArea />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ alignItems: 'center', textAlign: 'right' }}>
                <Col span={24}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Save Owner Property
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Modal>
        </Wrapper>
      )}
    </>
  );
  return (
    <>
      <Helmet>
        <link rel="icon" href={favicon} />
        <title>Lodgly - Comprehensive Vacation Rental Property Management</title>
        <meta name="description" content="Grow your Vacation Rental with Lodgly" />
        <body className="owner-page-view" />
      </Helmet>
      {hasAccess ? pageContent
        : (
          <Wrapper>
            <UserLock />
          </Wrapper>
        )}
    </>
  );
};

export default Owner;
