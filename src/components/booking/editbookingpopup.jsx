/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, Fragment } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './booking.css';
import {
  Form,
  Select,
  Input,
  InputNumber,
  Switch,
  Radio,
  Slider,
  DatePicker,
  TimePicker,
  Button,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
  Collapse, Modal, Avatar,
} from 'antd';
import {
  MenuUnfoldOutlined,
  PlusSquareOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  PlusOutlined,
  SearchOutlined,
  VerticalAlignMiddleOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  InboxOutlined, EditOutlined, DeleteOutlined,
} from '@ant-design/icons';

import { HelpBlock } from 'react-bootstrap';
import countryList from 'react-select-country-list';
import moment from 'moment';
import Wrapper from '../wrapper';
import Toaster from '../toaster/toaster';
import { userInstance } from '../../axios/axiosconfig';

const { Panel } = Collapse;

const { Option } = Select;

const { MonthPicker, RangePicker } = DatePicker;
let i = 1;
const j = 1;

const editbookingpopup = (props) => {
  console.log(props);
  const {
    editBookingValues,
    editCurrentGuest,
    setEditCurrentGuest,
    currentService,
    setCurrentService,
  } = props;
  console.log(editBookingValues);
  console.log(editCurrentGuest);
  console.log(editCurrentGuest.length);
  console.log(currentService);
  const arr = [];
  const [form] = Form.useForm();
  const [test, setTest] = useState(false);
  const [visible, setVisible] = useState(false);
  const [radio, setRadio] = useState(1);
  const [channel, setChannel] = useState('');
  const [adult, setAdult] = useState(0);
  const [children1, setChildren1] = useState(0);
  const [children2, setChildren2] = useState(0);
  const [channelCommission, setChannelCommission] = useState(5);
  const [panel, setPanel] = useState([1]);
  const [serviceState, setServiceState] = useState([]);
  const [arrValue, setArrValue] = useState(2);
  const [price, setPrice] = useState(0);
  const [night, setNight] = useState(0);
  const [amt, setAmt] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState('%');
  const [accomodation, setAccomodation] = useState(0);
  const [total, setTotal] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [servicePrice, setServicePrice] = useState(0);
  const [serviceAmt, setServiceAmt] = useState(0);
  const [serviceTax, setServiceTax] = useState(0);
  const [serviceAmount, setServiceAmount] = useState(0);
  const [currentPropertyName, setCurrentPropertyName] = useState('');
  const [unitName, setUnitName] = useState('');
  const [depositType, setDepositType] = useState('€');
  const [depositAmount, setDepositAmount] = useState(null);
  const [discountAmount, setdiscountAmount] = useState(null);
  const [editServicePanel, setEditServicePanel] = useState([]);
  const [deleteGuestId, setDeleteGuestId] = useState(null);
  const [deleteServiceId, setDeleteServiceId] = useState(null);
  const [fullName, setFullName] = useState({});
  const [email, setEmail] = useState({});
  const [phone, setPhone] = useState({});
  const [country, setCountry] = useState({});
  const [guest, setGuest] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [unitData, setUnitData] = useState([]);
  const [currentUnit, setCurrentUnit] = useState({});
  const [unitTypeData, setUnitTypeData] = useState([]);
  const [unitId, setUnitId] = useState(null);

  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();

  const [propertyData, setPropertyData] = useState([]);
  const [propertyName, setPropertyName] = useState('');
  const history = useHistory();
  const { nights, perNight } = editBookingValues;

  useEffect(() => {
    if (props.visible) {
      fun1(editBookingValues.propertyId);
      const m1 = moment(editBookingValues.startDate);
      const m2 = moment(editBookingValues.endDate);
      const data = editBookingValues.discountType === '%'
        ? (nights * perNight * editBookingValues.discount) / 100
        : editBookingValues.discount;
      console.log(data);
      form.setFieldsValue({
        groupname: [m1, m2],
        property: editBookingValues.propertyName,
        unit: editBookingValues.unitName,
        adult: editBookingValues.adult,
        children1: editBookingValues.children1,
        children2: editBookingValues.children2,
        perNight: editBookingValues.perNight,
        nights: editBookingValues.nights,
        discount: editBookingValues.discount,
        discountType: editBookingValues.discountType,
        discountTotal: data,
        deposit: editBookingValues.deposit,
        depositType: editBookingValues.depositType,
      });
      setGuest(editCurrentGuest);
      if (editCurrentGuest.length) {
        editCurrentGuest.map((el, i) => {
          form.setFieldsValue({
            [`fullName${i}`]: el.fullname,
            [`email${i}`]: el.email,
            [`country${i}`]: el.country,
            [`phone${i}`]: el.phone,
          });
        });
      }

      currentService.map((el, i) => {
        form.setFieldsValue({
          [`serviceName${i}`]: el.serviceName,
          [`servicePrice${i}`]: el.servicePrice,
          [`serviceQuantity${i}`]: el.quantity,
          [`serviceTax${i}`]: el.serviceTax,
        });
      });
      setServiceState(currentService);
      setPropertyName(editBookingValues.propertyName);
      setUnitName(editBookingValues.unitName);
      setUnitId(editBookingValues.unitId);
      setChannel(editBookingValues.channel);
      setChannelCommission(editBookingValues.commission);
      setAdult(editBookingValues.adult);
      setChildren1(editBookingValues.children1);
      setChildren2(editBookingValues.children2);
      setPrice(editBookingValues.perNight);
      setNight(editBookingValues.nights);
      setDiscount(editBookingValues.discount);
      setDiscountType(editBookingValues.discountType);
      setdiscountAmount(editBookingValues.discount);
      setDeposit(editBookingValues.deposit);
      setDepositType(editBookingValues.depositType);
      setAmt(editBookingValues.nights * editBookingValues.perNight);
      setAccomodation(
        editBookingValues.nights * editBookingValues.perNight
          - (editBookingValues.nights
            * editBookingValues.perNight
            * editBookingValues.discount)
            / 100,
      );
    }
  }, [props.visible]);

  console.log(adult);
  console.log(propertyName);
  console.log(channelCommission);
  console.log(unitName);
  console.log(channel);
  console.log(price, night);
  console.log(guest);

  const show = () => {
    setVisible(true);
  };

  const close = () => {
    setNotifyType('');
  };

  const Ok = () => {
    setVisible(false);
    console.log('working');
  };

  const Cancel = () => {
    setVisible(false);
  };

  const addMore = () => {
    i += 1;
    setEditCurrentGuest(editCurrentGuest.concat([{}]));
    setPanel([...panel, i]);
  };

  const addMoreService = async () => {
    if (currentService.length) {
      setCurrentService(currentService.concat([{}]));
      console.log(currentService);
      // const value = localStorage.getItem('propertyId');
      // fun1(value);
    }
  };

  const onFinish = async (values) => {
    console.log('raw values', values);
    values.id = localStorage.getItem('bookingId');
    values.perNight = price;
    values.nights = night;
    values.amt = amt;
    values.discountType = discountType;
    values.discount = discount;
    values.accomodation = accomodation;
    // values.acknowledge = radio;
    values.totalAmount = parseInt(total) + parseInt(accomodation);
    // values.total = parseInt(total) + parseInt(accomodation);
    // values.deposit = deposit;

    if (editCurrentGuest.length) {
      editCurrentGuest.map((el, i) => {
        const f = 'fullName';
        const e = 'email';
        const c = 'country';
        const p = 'phone';
        el.id = el.id || null;
        el.bookingId = el.bookingId || localStorage.getItem('bookingId');
        el.fullname = values[f + i];
        el.email = values[e + i];
        el.country = values[c + i];
        el.phone = values[p + i];
      });
      console.log(editCurrentGuest);
    }

    values.guestData = editCurrentGuest;
    editCurrentGuest.length
      ? (values.guest = editCurrentGuest[0].fullname)
      : (values.guest = 'No Guest');
    if (currentService.length) {
      currentService.map((el, i) => {
        const n = 'serviceName';
        const p = 'servicePrice';
        const q = 'serviceQuantity';
        const t = 'serviceTax';
        el.id = el.id || null;
        el.bookingId = el.bookingId || localStorage.getItem('bookingId');
        el.serviceName = values[n + i];
        el.servicePrice = values[p + i];
        el.serviceQuantity = values[q + i];
        el.serviceTax = values[t + i];
        el.serviceAmount = el.servicePrice * el.serviceQuantity
          + (el.servicePrice * el.serviceQuantity * el.serviceTax) / 100;
      });
    }

    values.serviceData = currentService;
    values.noOfservices = currentService.length;
    values.propertyName = currentPropertyName;
    values.channel = channel;
    values.commission = channelCommission;
    values.unitName = unitName;
    values.unit = unitId;
    values.deleteGuestId = deleteGuestId;
    values.deleteServiceId = deleteServiceId;
    const [{ userId }] = JSON.parse(localStorage.getItem('userCred')) || [{}];
    values.affiliateId = userId;
    console.log('Received values of edit form: ', values);
    const response = await userInstance.post('/changeBooking', values);
    console.log('response', response.data.code);
    const { msg } = response.data;
    if (response.data.code === 200) {
      props.getData();
      props.setBooked(true);
      props.close();
    } else {
      setNotifyType('error');
      setNotifyMsg(msg);
    }

    form.resetFields();
  };

  const calculateTotal = (el) => {
    console.log(el.id);
    const calculate = servicePrice * serviceAmt
      + servicePrice * serviceAmt * (serviceTax / 100);
    console.log('calculate', calculate);
    if (el.id) {
      currentService.forEach((ele) => {
        if (ele.id === el.id) {
          el.serviceAmount = calculate;
        }
      });
      setServiceState(currentService);
      console.log(currentService);
    } else {
      const sum = parseFloat(total) + calculate;
      setServiceAmount(calculate);
      setTotal(sum);
    }
    console.log('service amount', serviceAmount);
    setTest(true);
  };
  const fun1 = async (value) => {
    console.log(value);
    const payload = {
      propertyId: value,
    };
    const response = await userInstance.post('/getService', payload);
    const data = response.data.servicData;
    const response2 = await userInstance.post('/getUnit', payload);
    const data2 = response2.data.unitData;
    console.log('unitData', data2);
    const response3 = await userInstance.post('/getUnittype', payload);
    const data3 = response3.data.unittypeData;
    console.log('unittype data', data3);
    if (response.data.code === 200) {
      setServiceData(data);
    }

    if (response2.data.code === 200) {
      setUnitData(data2);
    }

    if (response3.data.code === 200) {
      setUnitTypeData(data3);
    }
  };

  const fun2 = (value, event) => {
    serviceData
      .filter((el) => el.serviceName === value)
      .map((filterService) => setEditServicePanel(filterService));

    unitData
      .filter((el) => el.propertyId === value)
      .map((filterUnit) => setCurrentUnit(filterUnit));
  };

  const fun3 = (event) => {
    console.log(event);
    const [data] = unitData.filter((el) => el.unitName !== event).map((el) => el.id);
    console.log(data);
    setUnitId(data);
    const unitname = event.children || event;
    console.log(unitname);
    const [unit] = unitData
      .filter((el) => el.unitName === unitname)
      .map((el) => el.unittypeId);
    console.log(unitData);
    console.log(unit);
    unitTypeData.map((el) => {
      if (el.id === unit) {
        setPrice(el.perNight);
        form.setFieldsValue({ perNight: el.perNight });
        setAmt(night * el.perNight);
        setAccomodation(night * el.perNight);
      }
    });
    setUnitName(unitname);
  };
  const fun5 = (value, event) => {
    console.log(event);
    setChannel(event.children);
  };
  const handleCommissionChange = (e) => {
    console.log(e.target.value);
    setChannelCommission(e.target.value);
  };

  const handleDiscount = (value) => {
    console.log(value);
    setDiscountType(value);
    if (value === '%') {
      const data = amt * (discountAmount / 100);
      setDiscount(data);
      setAccomodation(amt - data);
      console.log(data);
    } else {
      setDiscount(discountAmount);
      setAccomodation(amt - discountAmount);
      console.log(discountAmount);
    }
  };

  const handleDeposit = (value) => {
    setDepositType(value);
    if (value === '%') {
      const mon = Math.round(total * 100) / 100 + Math.round(accomodation * 100) / 100;
      const data = mon * (depositAmount / 100);
      setDeposit(data);
    } else {
      setDeposit(depositAmount);
    }
  };

  const fun4 = (value) => {
    console.log(value);
    console.log(value[0]._d);
    const d1 = new Date(value[0]._d);
    const d2 = new Date(value[1]._d);
    const diff = Math.abs(d1 - d2);
    const day = Math.floor(diff / (24 * 60 * 60 * 1000)) + 1;
    console.log(day);
    setNight(day);
  };

  const removePanel = (e) => {
    const id = e.currentTarget.parentNode.getAttribute('data-key');
    console.log(typeof id);

    editCurrentGuest.forEach((el, i) => {
      if (parseInt(id) === i) {
        console.log(el.id);
        setDeleteGuestId(el.id);
      }
    });

    const data0 = editCurrentGuest.filter((el, i) => i !== parseInt(id));
    console.log(data0);

    setEditCurrentGuest([...data0]);
    console.log(editCurrentGuest);
  };

  const handleRemoveEditServicePanel = (ele) => {
    console.log(ele);
    setDeleteServiceId(ele.id);
    const data = currentService.filter((el) => el.id !== ele.id);
    console.log(data);
    setCurrentService([...data]);
    console.log(currentService);
  };

  const handleAdult = (e) => setAdult(e);
  const handleChildren1 = (e) => setChildren1(e);
  const handleChildren2 = (e) => setChildren2(e);
  const handlename = (event, value) => console.log(event.target, value);
  return (
    <Modal
      title="Edit Booking"
      name="modal2"
      visible={props.visible}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      wrapClassName="create-booking-modal"
    >
      <Toaster notifyType={notifyType} notifyMsg={notifyMsg} close={close} />
      <Form form={form} name="basic" onFinish={onFinish}>
        <Row style={{ alignItems: 'center', padding: '0px 20px' }}>
          <Col span={12}>
            <Form.Item
              label="Reservation Date"
              name="groupname"
              style={{ paddingRight: 20 }}
              onChange={fun4}
              rules={[
                {
                  required: true,
                  message: 'Reservation date is required',
                },
              ]}
            >
              <RangePicker onChange={fun4} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Radio.Group
              name="radiogroup"
              defaultValue={1}
              onChange={(e) => setRadio(e.target.value)}
            >
              <Radio value={1}>Confirmed</Radio>
              <Radio value={2}>Option</Radio>
            </Radio.Group>
          </Col>
        </Row>

        <Row style={{ alignItems: 'center', padding: '0px 20px' }}>
          <Col span={8}>
            <Form.Item
              label="Property"
              name="property"
              style={{ paddingRight: 20 }}
              rules={[
                {
                  required: true,
                  message: 'Property name is required',
                },
              ]}
            >
              <Input value={propertyName} disabled="true" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Unit"
              name="unit"
              style={{ paddingRight: 20 }}
              rules={[
                {
                  required: true,
                  message: 'Unit is required',
                },
              ]}
            >
              <Select
                placeholder="Select"
                onSelect={(value, event) => fun3(value, event)}
                value={unitName}
              >
                {unitData.map((el, i) => (
                  <Select.Option value={el.unitName}>{el.unitName}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              className="comision"
              label="Channel, Commission(%)"
              name="channel"
            >
              <Select
                placeholder="Select"
                onSelect={(value, event) => fun5(value, event)}
                value={channel}
                style={{ width: '70%', display: 'inline-block' }}
              >
                <Select.Option value="Airbnb">Airbnb</Select.Option>
                <Select.Option value="Booking">Booking</Select.Option>
              </Select>

              <Input
                name="commission"
                style={{
                  width: '26%',
                  display: 'inline-block',
                  verticalAlign: 'top',
                  marginLeft: '4%',
                }}
                value={channelCommission}
                onChange={(e) => handleCommissionChange(e)}
                rules={[
                  {
                    required: true,
                    message: 'Commission is required',
                  },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row style={{ alignItems: 'center', padding: '0px 20px' }}>
          <Col span={8}>
            <Form.Item
              label="Adults"
              name="adult"
              style={{ paddingRight: 20 }}
              rules={[
                {
                  required: true,
                  message: 'Required Field',
                },
              ]}
            >
              <Select
                placeholder="Select"
                value={adult}
                onSelect={(e) => handleAdult(e)}
              >
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
                <Select.Option value="3">3</Select.Option>
                <Select.Option value="4">4</Select.Option>
                <Select.Option value="5">5</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Childrens(0-12yrs)"
              name="children1"
              style={{ paddingRight: 20 }}
            >
              <Select
                placeholder="Select"
                value={children1}
                onSelect={(e) => handleChildren1(e)}
              >
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
                <Select.Option value="3">3</Select.Option>
                <Select.Option value="4">4</Select.Option>
                <Select.Option value="5">5</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Childrens(12+ yrs)" name="children2">
              <Select
                placeholder="Select"
                value={children2}
                onSelect={(e) => handleChildren2(e)}
              >
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
                <Select.Option value="3">3</Select.Option>
                <Select.Option value="4">4</Select.Option>
                <Select.Option value="5">5</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row style={{ alignItems: 'center' }}>
          <Col span={24}>
            <Form.Item style={{ marginBottom: '0' }}>
              <Collapse accordion defaultActiveKey={['1']}>
                <Panel
                  icon={<PlusSquareOutlined />}
                  header="Add Guest Details (Optional)"
                  key="1"
                >
                  <div className="additional-guest">
                    {editCurrentGuest.length
                      ? editCurrentGuest.map((el, i) => {
                        console.log(el);
                        return (
                          <div className="addi-box" key={i} data-key={i}>
                            <Row style={{ alignItems: 'center' }}>
                              <Col span={6}>
                                <Form.Item
                                  id={el.id}
                                  label="Full Name"
                                  name={`fullName${i}`}
                                  style={{ paddingRight: 20 }}
                                >
                                  <Input
                                    defaultValue={el.fullname}
                                    value={fullName}
                                    onChange={(event, value) => handlename(event, value)}
                                  />
                                </Form.Item>
                              </Col>

                              <Col span={6}>
                                <Form.Item
                                  id={el.id}
                                  label="Email"
                                  name={`email${i}`}
                                  style={{ paddingRight: 20 }}
                                >
                                  <Input
                                    onChange={(e) => setEmail(e.target.value)}
                                  />
                                </Form.Item>
                              </Col>

                              <Col span={6}>
                                <Form.Item
                                  id={el.id}
                                  label="Country"
                                  name={`country${i}`}
                                  style={{ paddingRight: 20 }}
                                >
                                  <Select showSearch>
                                    {countryList()
                                      .getData()
                                      .map((ele, i) => (
                                        <Select.Option value={ele.label}>
                                          {ele.label}
                                        </Select.Option>
                                      ))}
                                  </Select>
                                </Form.Item>
                              </Col>

                              <Col span={6}>
                                <Form.Item
                                  label="Phone"
                                  name={`phone${i}`}
                                  style={{ paddingRight: 20 }}
                                >
                                  <Input
                                    onChange={(e) => setPhone(e.target.value)}
                                    type="number"
                                    minLength="9"
                                    maxLength="15"
                                  />
                                </Form.Item>
                              </Col>

                              <Col span={24}>
                                <div className="additional-edit">
                                  <a href="">
                                    <EditOutlined />
                                    {' '}
                                    Edit/Additional Data
                                  </a>
                                </div>
                              </Col>
                            </Row>

                            <div className="delete-data" data-key={i}>
                              <DeleteOutlined
                                onClick={(e) => removePanel(e)}
                              />
                            </div>
                          </div>
                        );
                      })
                      : null}

                    <Row>
                      <Col span={24}>
                        <div role="presentation" className="additional-add" onClick={addMore}>
                          <PlusOutlined />
                          {' '}
                          Add additional guest
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Panel>

                <Panel
                  icon={<PlusSquareOutlined />}
                  header="Add Notes (Optional)"
                  key="2"
                >
                  <div className="add-notes">
                    <Form.Item name="notes1">
                      <Input.TextArea />
                    </Form.Item>
                  </div>
                </Panel>

                <Panel
                  icon={<PlusSquareOutlined />}
                  header="Add Internal Notes (Optional)"
                  key="3"
                  name="notes"
                >
                  <div className="add-notes">
                    <Form.Item name="notes2">
                      <Input.TextArea />
                    </Form.Item>
                  </div>
                </Panel>
              </Collapse>
            </Form.Item>
          </Col>
        </Row>

        <div className="accommodation">
          <Row style={{ alignItems: 'center', padding: '0px 20px' }}>
            <Col span={8}>
              <Form.Item>
                <p>Accommodation</p>
              </Form.Item>
            </Col>

            <Col span={16}>
              <Form.Item>
                <div className="inline-form">
                  <label>Average price per night</label>
                  <Form.Item name="perNight">
                    <Input
                      type="number"
                      placeholder="0,00"
                      value={price}
                      disabled="true"
                      rules={[
                        {
                          required: true,
                          message: 'Required Field',
                        },
                      ]}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Form.Item>
                  <label>X</label>
                  <Input
                    type="number"
                    placeholder="0 nights"
                    name="nights"
                    value={night}
                    disabled="true"
                    onChange={(e) => setNight(e.target.value)}
                  />
                  <label>=</label>
                  <Input
                    name="totalAAmount"
                    type="number"
                    value={night * price}
                    onBlur={(e) => {
                      setAmt(e.target.value);
                    }}
                  />
                  <label>EUR</label>
                </div>

                <div className="inline-form">
                  <label>Discount</label>
                  <Form.Item name="discount">
                    <Input
                      value={discount}
                      type="number"
                      placeholder="0,00"
                      onChange={(e) => {
                        setDiscount(e.target.value);
                        setdiscountAmount(e.target.value);
                        discountType === '€'
                          ? setAccomodation(amt - e.target.value)
                          : setAccomodation(amt - amt * (e.target.value / 100));
                      }}
                    />
                  </Form.Item>
                  <label>X</label>
                  <Form.Item name="discountType">
                    <Select
                      placeholder="Discount type"
                      onSelect={(value) => handleDiscount(value)}
                      defaultValue={discountType}
                    >
                      <Select.Option value="€">€</Select.Option>
                      <Select.Option value="%">%</Select.Option>
                    </Select>
                  </Form.Item>
                  <label>=</label>
                  <Form.Item name="discountTotal">
                    <Input
                      type="number"
                      value={
                        discountType === '€'
                          ? discountAmount
                          : amt * (discountAmount / 100)
                      }
                      onBlur={(e) => setAccomodation(e.target.value)}
                    />

                  </Form.Item>
                  <label>EUR</label>
                </div>
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ alignItems: 'center' }}>
            <Col span={24}>
              <div className="per-night">
                <label>Per Night</label>
                <span>Accommondation cost:</span>
                <span className="amnt">
                  {accomodation}
                  {' '}
                  €
                </span>
              </div>
            </Col>

            <Col span={24}>
              <div role="presentation" className="srvice-heading" onClick={addMoreService}>
                <PlusOutlined />
                {' '}
                Add Services
              </div>
            </Col>

            <Col span={24}>
              <Form.Item style={{ marginBottom: '0' }}>
                <Collapse
                  defaultActiveKey={['1']}
                  className="service-panel"
                  accordion
                >
                  <Panel
                    icon={<PlusSquareOutlined />}
                    header="Services"
                    key="1"
                  >
                    <div className="service-form">
                      {currentService.length
                        ? currentService.map((el, i) =>
                        // edit booking service
                          (
                            <div className="inline-form">
                              <div className="delete-data">
                                <DeleteOutlined
                                  onClick={() => handleRemoveEditServicePanel(el)}
                                />
                              </div>
                              <Col span={4}>
                                <Form.Item name={`serviceName${i}`}>
                                  <Select
                                    style={{ width: '100px' }}
                                    placeholder="Select Service"
                                    onSelect={(value, event) => fun2(value, event)}
                                  >
                                    {serviceData.map((ele, i) => (
                                      <Select.Option
                                        value={ele.serviceName}
                                      >
                                        {ele.serviceName}
                                      </Select.Option>
                                    ))}
                                  </Select>
                                </Form.Item>
                              </Col>
                              <Col span={4}>
                                <Form.Item name={`servicePrice${i}`}>
                                  <Select
                                    placeholder="Rate"
                                    onSelect={(value) => setServicePrice(value)}
                                  >
                                    <Select.Option
                                      value={editServicePanel.servicePrice}
                                    >
                                      {editServicePanel.servicePrice}
                                    </Select.Option>
                                  </Select>
                                </Form.Item>
                              </Col>

                              <label>X</label>
                              <Col span={4}>
                                <Form.Item name={`serviceQuantity${i}`}>
                                  <Input
                                    type="number"
                                    placeholder="Quantity"
                                    onChange={(e) => setServiceAmt(e.target.value)}
                                  />
                                </Form.Item>
                              </Col>

                              <label>+</label>
                              <Col span={4}>
                                <Form.Item name={`serviceTax${i}`}>
                                  <Input
                                    type="number"
                                    placeholder="%"
                                    onChange={(e) => setServiceTax(e.target.value)}
                                  />
                                </Form.Item>
                              </Col>

                              <label>=</label>
                              <Col span={4}>
                                <Form.Item name={`serviceAmount${i}`}>
                                  <Input
                                    value={serviceAmount}
                                    onBlur={calculateTotal}
                                  />
                                </Form.Item>
                              </Col>

                              <label>EUR</label>
                            </div>
                          ))
                        : null}
                    </div>
                  </Panel>
                </Collapse>
              </Form.Item>
            </Col>

            <Col span={24}>
              <div className="amnt-total">
                <h4>
                  {serviceState.length === 0 ? (
                    <>
                      Total:
                      {' '}
                      {Math.round(total * 100) / 100
                        + Math.round(accomodation * 100) / 100}
                      {' '}
                      €
                    </>
                  ) : (
                    <>
                      Total:
                      {' '}
                      {Math.round(total * 100) / 100
                        + Math.round(accomodation * 100) / 100
                        + serviceState
                          .map((el) => el.serviceAmount)
                          .reduce((a, b) => a + (b || 0), 0)}
                      {' '}
                      €
                    </>
                  )}
                </h4>
              </div>

              <div className="deposit">
                <label>Deposit</label>

                <div className="inline-form">
                  <label>Accommodation deposit</label>

                  <Input
                    name="deposit"
                    type="number"
                    value={deposit}
                    placeholder="0,00"
                    onChange={(e) => {
                      setDeposit(e.target.value);
                      setDepositAmount(e.target.value);
                    }}
                  />
                  <Form.Item name="depositType">
                    <Select
                      placeholder="Deposit type"
                      onSelect={(value) => handleDeposit(value)}
                      defaultValue="€"
                    >
                      <Select.Option value="€">€</Select.Option>
                      <Select.Option value="%">%</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>
            </Col>

            <Col span={24}>
              <div className="outstanding">
                <label>
                  Accommodation deposit:
                  {' '}
                  <span>
                    {/* {deposit}€ (0,00 %) */}
                    {depositType === '%'
                      ? `${deposit}€ (${depositAmount}%)`
                      : `${deposit}€`}
                  </span>
                </label>
                <label>
                  Outstanding amount:
                  {' '}
                  <span>
                    {Math.round(total * 100) / 100
                      + Math.round(accomodation * 100) / 100
                      - deposit}
                    €
                  </span>
                </label>
              </div>
            </Col>
          </Row>
        </div>

        <Row
          style={{
            alignItems: 'center',
            background: '#fbfbfc',
            padding: '0px 20px',
            paddingTop: '20px',
          }}
        >
          <Col span={24}>
            <Form.Item style={{ textAlign: 'right' }}>
              <Button
                style={{ marginRight: 10 }}
                onClick={() => {
                  props.close();
                  setDiscount(0);
                  setdiscountAmount(0);
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" onClick={() => Ok}>
                Save Reservation
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default editbookingpopup;
