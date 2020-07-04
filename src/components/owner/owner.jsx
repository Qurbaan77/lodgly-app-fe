import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './owner.css';
import {
  Form,
  Select,
  Input,
  Layout,
  Menu,
  Button,
  Radio,
  Slider,
  DatePicker,
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
  DownOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import Wrapper from '../wrapper';
import DeletePopup from '../property/deletepopup';
import { Modal } from 'antd';
import { Table } from 'antd';
import property1 from '../../assets/images/property-1.png';
import property2 from '../../assets/images/property-2.png';
import property3 from '../../assets/images/property-3.png';
import owner from '../../assets/images/profile_user.jpg';
import { Row, Col } from 'antd';
import countryList from 'react-select-country-list';
import { userInstance } from '../../axios/axiosconfig';
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from 'react-country-region-selector';
import Toaster from '../toaster/toaster';
import moment from 'moment';

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

  const isSubUser = localStorage.getItem('isSubUser') || false;

  const [{ userId, ownerWrite: canWrite}] = JSON.parse(localStorage.getItem('userCred')) || [{}];

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

  const edit = async(data) => {
    console.log('Edit Values', data)
    const m1 = moment(data.dob)
    const response = await userInstance.post('/fetchProperty', { affiliateId: userId });
    const data2 = response.data.propertiesData;
    setVisible(true);
    setNotifyType('');
    const selectedProperty = [];
    data2.filter(el => el.ownerId == data.id).map(filter => {
      selectedProperty.push(filter.id);
    })
    console.log('selectedProperty', selectedProperty)
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
  };

  const onFinish = async (values) => {
    console.log('Form is Good', values);
    values.affiliateId = userId;
    const response = await userInstance.post('/addOwner', values);
    const statusCode = response.data.code;
    const msg = response.data.msg;
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
      getSubUserData();
    }
  };

  const getPropertyData = async () => {
    const response = await userInstance.post('/fetchProperty', { affiliateId: userId });
    const data = response.data.propertiesData;
    let arr = [];
    data
      .filter((el) => el.ownerId === 0)
      .map((filterData) => {
        arr.push(filterData);
      });
    if (response.data.code === 200) {
      setPropertyData(arr);
    }
  };

  const getSubUserData = async () => {
    const response = await userInstance.post('/getOwner', { affiliateId: userId });
    if (response.data.code === 200) {
      setSubUserData(response.data.data);
    }
  };

  useEffect(() => {
    getPropertyData();
    getSubUserData();
  }, []);

  return (
    <Wrapper>
      <div className="owner-page">
        <div className="page-header">
          <h1>Owner</h1>
          {
            isSubUser ? canWrite ?
            <Button type="primary" icon={<PlusOutlined />} onClick={show}>
            Add New Owner
          </Button> :
          <Tooltip title='You are not authorize to create new owner' color='gold' >
          <Button type="primary" icon={<PlusOutlined />} onClick={show} disabled='true'>
            Add New Owner
          </Button>
          </Tooltip> :
          <Button type="primary" icon={<PlusOutlined />} onClick={show}>
            Add New Owner
          </Button>
          }
      
        </div>

        <div className="owner-list">
          <div className="custom-table">
            <table>
              <thead>
                <tr>
                  <th>Sub User</th>
                  <th>Email</th>
                  <th>Properties</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {subUserData.map((el, i) => {
                  return (
                    <tr>
                      <td>
                        <div className="owner-info">
                          <div className="owner-pic">
                            <img src={owner} />
                          </div>
                          <div className="owner-title">
                            <h5>{el.fname + ' ' + el.lname}</h5>
                            <span>
                              Job Title | {el.citizenship}, {el.country}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>{el.email}</td>

                      <td>
                        <div className="owner-property">
                          <img src={property1} />
                          <img src={property2} />
                          <img src={property3} />
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
                  );
                })}
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
        <Toaster notifyType={notifyType} notifyMsg={notifyMsg} close={close} />
        <Form form={form} name="basic" onFinish={onFinish}>
          <h4>Owner Information</h4>
          <Row style={{ alignItems: 'center' }}>
            <Form.Item name="id">
              <Input hidden={true} />
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
              <Form.Item label="Country of Residence" name="country" style={{ paddingRight: 20 }}>
                <CountryDropdown onChange={(val) => setCountry(val)} />

                {/* <Select showSearch>
                  {countryList()
                    .getData()
                    .map((ele, i) => {
                      return (
                        <Select.Option value={ele.label}>
                          {ele.label}
                        </Select.Option>
                      );
                    })}
                </Select> */}
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
                {/* <Select>
                  <Select.Option value="demo">Holiday House</Select.Option>
                  <Select.Option value="demo">Holiday House</Select.Option>
                </Select> */}
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
                {propertyData.map((el, i) => {
                  return <Option value={el.id}>{el.propertyName}</Option>;
                })}
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
  );
};

export default Owner;
