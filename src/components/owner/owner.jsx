import React, { useEffect, useState, useCallback } from 'react';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import './owner.css';
import { toast } from 'react-toastify';
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
  Spin,
} from 'antd';
import { PlusOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import moment from 'moment';
import Wrapper from '../wrapper';
import DeletePopup from '../property/deletepopup';
import propertyplace from '../../assets/images/property-placeholder.png';
import property1 from '../../assets/images/property-1.png';
import owner from '../../assets/images/profile_user.jpg';
import favicon from '../../assets/images/logo-mobile.png';
import arrow from '../../assets/images/select-arrow.png';
import subuser from '../../assets/images/subuser.jpg';
import { userInstance } from '../../axios/axiosconfig';
import UserLock from '../userlock/userlock';

const Owner = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [form] = Form.useForm();
  const { Option } = Select;
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [country, setCountry] = useState(null);
  const [propertyData, setPropertyData] = useState([]);
  const [ownerData, setOwnerData] = useState([]);
  const [curOwner, setCurOwner] = useState();
  const [subscribed, setSubscribed] = useState();
  const [onTrial, setOnTrial] = useState(true);
  const [daysLeft, setDaysLeft] = useState();
  const [editOpen, setEditOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const isSubUser = localStorage.getItem('isSubUser') || false;

  const [{ userId, ownerWrite: canWrite, ownerDelete }] = JSON.parse(
    localStorage.getItem('userCred'),
  ) || [{}];

  const show = () => {
    form.resetFields();
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    setVisible2(false);
    setEditOpen(false);
  };

  const handleCancel = () => {
    setVisible(false);
    setVisible2(false);
    setEditOpen(false);
  };

  const showDeletePopUP = (unitId) => {
    setVisible2(true);
    setCurOwner(unitId);
  };

  const getPropertyData = useCallback(async () => {
    const response0 = await userInstance.get('/getUserSubscriptionStatus');
    if (response0.data.code === 200) {
      const [
        { days, isOnTrial, isSubscribed },
      ] = response0.data.userSubsDetails;
      setDaysLeft(parseInt(days, 10));
      setSubscribed(JSON.parse(isSubscribed));
      setOnTrial(JSON.parse(isOnTrial));
    }
    const response = await userInstance.post('/fetchProperty', {
      affiliateId: userId,
    });
    const data = response.data.propertiesData;
    setProperties(data);
    const arr = [];
    data
      .filter((el) => el.ownerId === 0)
      .forEach((filterData) => {
        arr.push(filterData);
      });
    if (response.data.code === 200) {
      setLoading(false);
      setPropertyData(arr);
    }
  }, [userId]);

  const getSubUserData = useCallback(async () => {
    const response = await userInstance.post('/getOwner', {
      affiliateId: userId,
    });
    if (response.data.code === 200) {
      setOwnerData(response.data.data);
      setLoading(false);
    }
  }, [userId]);

  const edit = async (data) => {
    setEditOpen(true);
    const m1 = moment(data.dob);
    const response = await userInstance.post('/fetchProperty', {
      affiliateId: userId,
    });
    if (response.data.code === 200) {
      const data2 = response.data.propertiesData;
      setVisible(true);
      const selectedProperty = [];
      const arr = [];
      const data3 = data2.filter((el) => el.ownerId === data.id);
      data3.forEach((filter) => {
        selectedProperty.push(filter.propertyName);
        arr.push(filter.id);
      });
      setSelectedPropertyId(arr);
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

  const handlePropertySelect = (e) => {
    if (selectedPropertyId && selectedPropertyId.length > 0) {
      setSelectedPropertyId(selectedPropertyId.concat(e));
    }
  };

  const onFinish = async (values) => {
    const copyValues = values;
    if (selectedPropertyId && selectedPropertyId.length > 0) {
      copyValues.properties = selectedPropertyId;
    }
    copyValues.affiliateId = userId;
    const response = await userInstance.post('/addOwner', copyValues);
    const statusCode = response.data.code;
    if (statusCode === 200) {
      toast.success('owner added successfully', { containerId: 'B' });
      setVisible(false);
      getSubUserData();
      getPropertyData();
    } else {
      toast.error('server error please try again', { containerId: 'B' });
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
      toast.success('successfully deleted owner', { containerId: 'B' });
    } else {
      toast.error('server error please try again', { containerId: 'B' });
    }
  };

  useEffect(() => {
    getSubUserData();
    getPropertyData();
  }, [getSubUserData, getPropertyData]);

  const enableButton = (
    <Button type="primary" icon={<PlusOutlined />} onClick={show}>
      {t('owner.button1')}
    </Button>
  );
  const disabledButton = (
    <Tooltip title={t('owner.tooltip1')} color="gold">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={show}
        disabled="true"
      >
        {t('owner.button1')}
      </Button>
    </Tooltip>
  );

  const btn = isSubUser && canWrite ? enableButton : disabledButton;
  const perm = isSubUser ? btn : enableButton;

  const hasAccess = onTrial && daysLeft !== 0 ? 1 : subscribed;

  const title = editOpen ? t('owner.label19') : t('owner.label17');
  const saveBtn = editOpen ? t('owner.label19') : t('owner.label17');

  const pageContent = (
    <>
      {ownerData.length > 0 ? (
        <Wrapper>
          <div className="owner-page">
            <div className="page-header">
              <h1>{t('owner.heading1')}</h1>
              {perm}
            </div>

            <div className="owner-list">
              <div className="custom-table">
                <table>
                  <thead>
                    <tr>
                      <th>{t('owner.label1')}</th>
                      <th>{t('owner.label2')}</th>
                      <th>{t('owner.label3')}</th>
                      <th> </th>
                    </tr>
                  </thead>

                  <tbody>
                    {ownerData.map((el) => (
                      <tr>
                        <td>
                          <div className="owner-info">
                            <div className="owner-pic">
                              <img src={owner} alt="ownerImage" />
                            </div>
                            <div className="owner-title">
                              <h5>{`${el.fname} ${el.lname}`}</h5>
                              <span>
                                {t('owner.label4')}
                                {' '}
                                |
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
                            {properties.map((ele) => {
                              if (ele.ownerId === el.id) {
                                return <img src={property1} alt="property1" />;
                              }
                              return null;
                            })}
                          </div>
                        </td>

                        <td>
                          <div className="owner-action">
                            <FormOutlined onClick={() => edit(el)} />
                            <DeleteOutlined
                              hidden={isSubUser ? !ownerDelete : false}
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
            title={title}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            wrapClassName="guest-modal"
          >
            <Form form={form} name="basic" onFinish={onFinish}>
              <h4>{t('owner.label20')}</h4>
              <Row style={{ alignItems: 'center' }}>
                <Form.Item name="id">
                  <Input hidden />
                </Form.Item>
                <Col span={12}>
                  <Form.Item
                    label={t('owner.label5')}
                    name="firstname"
                    style={{ paddingRight: 20 }}
                    rules={[
                      {
                        required: true,
                        message: t('owner.label6'),
                      },
                    ]}
                  >
                    <Input placeholder={t('owner.label5')} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label={t('owner.label7')}
                    name="secondname"
                    style={{ paddingRight: 20 }}
                    rules={[
                      {
                        required: true,
                        message: t('owner.label8'),
                      },
                    ]}
                  >
                    <Input placeholder={t('owner.label7')} />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ alignItems: 'center' }}>
                <Col span={12}>
                  <Form.Item
                    label={t('strings.email')}
                    name="email"
                    style={{ paddingRight: 20 }}
                    rules={[
                      {
                        type: 'email',
                        message: t('owner.label9'),
                      },
                      {
                        required: true,
                        message: t('owner.label10'),
                      },
                    ]}
                  >
                    <Input placeholder={t('strings.email')} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label={t('strings.phone')} name="phone">
                    <Input
                      placeholder={t('strings.phone')}
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
                    label={t('strings.dob')}
                    style={{ paddingRight: 20 }}
                  >
                    <DatePicker />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item name="gender" label="Gender">
                    <Radio.Group name="radiogroup">
                      <Radio value="Male">Male</Radio>
                      <Radio value="female">Female</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ alignItems: 'center' }}>
                <Col span={12}>
                  <Form.Item
                    label={t('owner.label11')}
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
                    label={t('strings.citizenship')}
                    name="citizenship"
                    style={{ paddingRight: 20 }}
                  >
                    <RegionDropdown country={country} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label={t('owner.label12')} name="address">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ alignItems: 'center' }}>
                <Col span={12}>
                  <Form.Item
                    label={t('owner.label13')}
                    name="document"
                    style={{ paddingRight: 20 }}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label={t('owner.label14')} name="documentnumber">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ alignItems: 'center' }}>
                <Form.Item
                  style={{ width: '100%' }}
                  name="properties"
                  label={t('owner.label21')}
                  rules={[
                    {
                      required: true,
                      message: t('owner.label15'),
                      type: 'array',
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    size="large"
                    placeholder={t('owner.label16')}
                    onSelect={(e) => handlePropertySelect(e)}
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
                      {saveBtn}
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
              <h4>{t('owner.heading1')}</h4>
              <p>{t('owner.label18')}</p>
              {perm}
            </div>
          </div>
          <Modal
            title={title}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            wrapClassName="guest-modal"
          >
            <Form form={form} name="basic" onFinish={onFinish}>
              <h4>{t('owner.label20')}</h4>
              <Row style={{ alignItems: 'center' }}>
                <Form.Item name="id">
                  <Input hidden />
                </Form.Item>
                <Col span={12}>
                  <Form.Item
                    label={t('owner.label5')}
                    name="firstname"
                    style={{ paddingRight: 20 }}
                    rules={[
                      {
                        required: true,
                        message: t('owner.label6'),
                      },
                    ]}
                  >
                    <Input placeholder={t('owner.label5')} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label={t('owner.label7')}
                    name="secondname"
                    style={{ paddingRight: 20 }}
                    rules={[
                      {
                        required: true,
                        message: t('owner.label8'),
                      },
                    ]}
                  >
                    <Input placeholder={t('owner.label7')} />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ alignItems: 'center' }}>
                <Col span={12}>
                  <Form.Item
                    label={t('strings.email')}
                    name="email"
                    style={{ paddingRight: 20 }}
                    rules={[
                      {
                        type: 'email',
                        message: t('owner.label9'),
                      },
                      {
                        required: true,
                        message: t('owner.label10'),
                      },
                    ]}
                  >
                    <Input placeholder={t('strings.email')} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label={t('strings.phone')} name="phone">
                    <Input
                      placeholder={t('strings.phone')}
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
                    label={t('strings.dob')}
                    style={{ paddingRight: 20 }}
                  >
                    <DatePicker />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item name="gender" label={t('strings.gender')}>
                    <Radio.Group name="radiogroup">
                      <Radio value="Male">Male</Radio>
                      <Radio value="female">Female</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ alignItems: 'center' }}>
                <Col span={12}>
                  <Form.Item
                    className="custom-select"
                    label={t('owner.label11')}
                    name="country"
                    style={{ paddingRight: 20 }}
                  >
                    <CountryDropdown onChange={(val) => setCountry(val)} />
                    <img src={arrow} alt="arrow" />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ alignItems: 'center' }}>
                <Col span={12}>
                  <Form.Item
                    className="custom-select"

                    label={t('strings.citizenship')}
                    name="citizenship"
                    style={{ paddingRight: 20 }}
                  >
                    <RegionDropdown country={country} />
                    <img src={arrow} alt="arrow" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label={t('owner.label12')} name="address">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ alignItems: 'center' }}>
                <Col span={12}>
                  <Form.Item
                    label={t('owner.label13')}
                    name="document"
                    style={{ paddingRight: 20 }}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label={t('owner.label14')} name="documentnumber">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ alignItems: 'center' }}>
                <Form.Item
                  className="custom-select"
                  style={{ width: '100%' }}
                  name="properties"
                  label={t('owner.label21')}
                  rules={[
                    {
                      required: true,
                      message: t('owner.label15'),
                      type: 'array',
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    size="large"
                    placeholder={t('owner.label16')}
                  >
                    {propertyData.map((el) => (
                      <Option value={el.id}>{el.propertyName}</Option>
                    ))}
                  </Select>
                  <img src={arrow} alt="arrow" />
                </Form.Item>
              </Row>

              <Row style={{ alignItems: 'center' }}>
                <Col span={24}>
                  <Form.Item label={t('strings.note')} name="notes">
                    <Input.TextArea />
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ alignItems: 'center', textAlign: 'right' }}>
                <Col span={24}>
                  <Form.Item>
                    <Button style={{ marginRight: 10 }} onClick={handleCancel}>
                      {t('strings.cancel')}
                    </Button>
                    <Button type="primary" htmlType="submit">
                      {t('strings.save')}
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
  if (loading) {
    return (
      <Wrapper>
        <Spin size="large" />
      </Wrapper>
    );
  }

  if (!propertyData && propertyData.length < 1) {
    return (
      <Wrapper>
        <div className="add-team-page">
          <div className="add-subuser">
            <img src={propertyplace} alt="subuser" />
            <h4>{t('strings.property')}</h4>
            <p>{t('nolist.heading1')}</p>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => history.push('/addproperty')}
            >
              {t('nolist.button1')}
            </Button>
          </div>
        </div>
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
        <body className="owner-page-view" />
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

export default Owner;
