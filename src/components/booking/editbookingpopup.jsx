import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
import './booking.css';
import { toast } from 'react-toastify';
import {
  Form,
  Select,
  Input,
  Radio,
  DatePicker,
  Button,
  Row,
  Col,
  Collapse, Modal,
} from 'antd';
import {
  PlusSquareOutlined,
  PlusOutlined,
  EditOutlined, DeleteOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import countryList from 'react-select-country-list';
import moment from 'moment';
import { userInstance } from '../../axios/axiosconfig';

const { Panel } = Collapse;

// const { Option } = Select;

const { RangePicker } = DatePicker;
let i = 1;

const Editbookingpopup = (props) => {
  const { t } = useTranslation();
  const {
    editBookingValues,
    editCurrentGuest,
    setEditCurrentGuest,
    currentService,
    setCurrentService,
    close,
    visible,
    handleOk,
    handleCancel,
    setBooked,
    getData,
  } = props;
  const [form] = Form.useForm();
  // const [test, setTest] = useState(false);
  // const [visible, setVisible] = useState(false);
  // const [radio, setRadio] = useState(1);
  const [channel, setChannel] = useState('');
  const [adult, setAdult] = useState(0);
  const [children1, setChildren1] = useState(0);
  const [children2, setChildren2] = useState(0);
  const [channelCommission, setChannelCommission] = useState(5);
  const [panel, setPanel] = useState([1]);
  const [serviceState, setServiceState] = useState([]);
  // const [arrValue, setArrValue] = useState(2);
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
  // const [currentPropertyName, setCurrentPropertyName] = useState('');
  const [unitName, setUnitName] = useState('');
  const [depositType, setDepositType] = useState('€');
  const [depositAmount, setDepositAmount] = useState(null);
  const [discountAmount, setdiscountAmount] = useState(null);
  const [editServicePanel, setEditServicePanel] = useState([]);
  const [deleteGuestId, setDeleteGuestId] = useState(null);
  const [deleteServiceId, setDeleteServiceId] = useState(null);
  // const [fullName, setFullName] = useState({});
  // const [email, setEmail] = useState({});
  // const [phone, setPhone] = useState({});
  // const [country, setCountry] = useState({});
  // const [guest, setGuest] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [unitData, setUnitData] = useState([]);
  // const [currentUnit, setCurrentUnit] = useState({});
  const [unitTypeData, setUnitTypeData] = useState([]);
  const [unitId, setUnitId] = useState(null);

  // const [propertyData, setPropertyData] = useState([]);
  const [propertyName, setPropertyName] = useState('');
  // const history = useHistory();
  const { nights, perNight } = editBookingValues;

  const updateFields = useCallback(() => {
    if (visible) {
      fun1(editBookingValues.propertyId);
      const m1 = moment(editBookingValues.startDate);
      const m2 = moment(editBookingValues.endDate);
      const data = editBookingValues.discountType === '%'
        ? (nights * perNight * editBookingValues.discount) / 100
        : editBookingValues.discount;
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
      // setGuest(editCurrentGuest);
      if (editCurrentGuest.length) {
        editCurrentGuest.forEach((el) => {
          form.setFieldsValue({
            [`fullName${i}`]: el.fullname,
            [`email${i}`]: el.email,
            [`country${i}`]: el.country,
            [`phone${i}`]: el.phone,
          });
        });
      }

      currentService.forEach((el) => {
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
  }, [currentService, editBookingValues, editCurrentGuest, form, nights, perNight,
    visible]);

  useEffect(() => {
    updateFields();
  }, [visible, updateFields]);

  // const show = () => {
  //   setVisible(true);
  // };

  // const close = () => {
  //   setNotifyType('');
  // };

  // const Ok = () => {
  //   setVisible(false);
  // };

  // const Cancel = () => {
  //   setVisible(false);
  // };

  const addMore = () => {
    i += 1;
    setEditCurrentGuest(editCurrentGuest.concat([{}]));
    setPanel([...panel, i]);
  };

  const addMoreService = async () => {
    if (currentService.length) {
      setCurrentService(currentService.concat([{}]));
      // const value = localStorage.getItem('propertyId');
      // fun1(value);
    }
  };

  const onFinish = async (values) => {
    values.id = localStorage.getItem('bookingId');
    values.perNight = price;
    values.nights = night;
    values.amt = amt;
    values.discountType = discountType;
    values.discount = discount;
    values.accomodation = accomodation;
    // values.acknowledge = radio;
    values.totalAmount = parseInt(total, 10) + parseInt(accomodation, 10);
    // values.total = parseInt(total) + parseInt(accomodation);
    // values.deposit = deposit;

    if (editCurrentGuest.length) {
      editCurrentGuest.forEach((el) => {
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
    }

    values.guestData = editCurrentGuest;
    if (editCurrentGuest.length > 1) {
      values.guest = editCurrentGuest[0].fullName;
    } else {
      values.guest = 'No Guest';
    }
    if (currentService.length) {
      currentService.forEach((el) => {
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
    values.propertyName = propertyName;
    values.channel = channel;
    values.commission = channelCommission;
    values.unitName = unitName;
    values.unit = unitId;
    values.deleteGuestId = deleteGuestId;
    values.deleteServiceId = deleteServiceId;
    const [{ userId }] = JSON.parse(localStorage.getItem('userCred')) || [{}];
    values.affiliateId = userId;
    const response = await userInstance.post('/changeBooking', values);
    if (response.data.code === 200) {
      getData();
      setBooked(true);
      close();
      toast.success('booking changed successfully', { containerId: 'B' });
    } else {
      toast.error('some error occurred!', { containerId: 'B' });
    }

    form.resetFields();
  };

  const calculateTotal = (el) => {
    const calculate = servicePrice * serviceAmt
      + servicePrice * serviceAmt * (serviceTax / 100);
    if (el.id) {
      currentService.forEach((ele) => {
        if (ele.id === el.id) {
          el.serviceAmount = calculate;
        }
      });
      setServiceState(currentService);
    } else {
      const sum = parseFloat(total) + calculate;
      setServiceAmount(calculate);
      setTotal(sum);
    }
  };
  const fun1 = async (value) => {
    const payload = {
      propertyId: value,
    };
    const response = await userInstance.post('/getService', payload);
    const data = response.data.servicData;
    const response2 = await userInstance.post('/getUnit', payload);
    const data2 = response2.data.unitData;
    const response3 = await userInstance.post('/getUnittype', payload);
    const data3 = response3.data.unittypeData;
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

  const fun2 = (value) => {
    serviceData
      .filter((el) => el.serviceName === value)
      .map((filterService) => setEditServicePanel(filterService));

    // unitData
    //   .filter((el) => el.propertyId === value)
    //   .map((filterUnit) => setCurrentUnit(filterUnit));
  };

  const fun3 = (event) => {
    const [data] = unitData.filter((el) => el.unitName !== event).map((el) => el.id);
    setUnitId(data);
    const unitname = event.children || event;
    const [unit] = unitData
      .filter((el) => el.unitName === unitname)
      .map((el) => el.unittypeId);
    unitTypeData.forEach((el) => {
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
    setChannel(event.children);
  };
  const handleCommissionChange = (e) => {
    setChannelCommission(e.target.value);
  };

  const handleDiscount = (value) => {
    setDiscountType(value);
    if (value === '%') {
      const data = amt * (discountAmount / 100);
      setDiscount(data);
      setAccomodation(amt - data);
    } else {
      setDiscount(discountAmount);
      setAccomodation(amt - discountAmount);
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
    const d1 = new Date(value[0]._d);
    const d2 = new Date(value[1]._d);
    const diff = Math.abs(d1 - d2);
    const day = Math.floor(diff / (24 * 60 * 60 * 1000)) + 1;
    setNight(day);
  };

  const removePanel = (e) => {
    const id = e.currentTarget.parentNode.getAttribute('data-key');
    editCurrentGuest.forEach((el, j) => {
      if (parseInt(id, 10) === j) {
        setDeleteGuestId(el.id);
      }
    });

    const data0 = editCurrentGuest.filter((el, j) => j !== parseInt(id, 10));
    setEditCurrentGuest([...data0]);
  };

  const handleRemoveEditServicePanel = (ele) => {
    setDeleteServiceId(ele.id);
    const data = currentService.filter((el) => el.id !== ele.id);
    setCurrentService([...data]);
  };

  const handleAdult = (e) => setAdult(e);
  const handleChildren1 = (e) => setChildren1(e);
  const handleChildren2 = (e) => setChildren2(e);
  // const handlename = (event, value) => console.log(event.target, value);
  return (
    <Modal
      title={t('editbookingpopup.heading1')}
      name="modal2"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      wrapClassName="create-booking-modal"
    >
      <Form form={form} name="basic" onFinish={onFinish}>
        <Row style={{ alignItems: 'center', padding: '0px 20px' }}>
          <Col span={12}>
            <Form.Item
              label={t('editbookingpopup.heading16')}
              name="groupname"
              style={{ paddingRight: 20 }}
              onChange={fun4}
              rules={[
                {
                  required: true,
                  message: t('editbookingpopup.heading17'),
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
              // onChange={(e) => setRadio(e.target.value)}
            >
              <Radio value={1}>{t('strings.confirmed')}</Radio>
              <Radio value={2}>{t('strings.option')}</Radio>
            </Radio.Group>
          </Col>
        </Row>

        <Row style={{ alignItems: 'center', padding: '0px 20px' }}>
          <Col span={8}>
            <Form.Item
              label={t('strings.property')}
              name="property"
              style={{ paddingRight: 20 }}
              rules={[
                {
                  required: true,
                  message: t('editbookingpopup.heading2'),
                },
              ]}
            >
              <Input value={propertyName} disabled="true" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label={t('strings.unit')}
              name="unit"
              style={{ paddingRight: 20 }}
              rules={[
                {
                  required: true,
                  message: t('editbookingpopup.heading3'),
                },
              ]}
            >
              <Select
                placeholder={t('strings.select')}
                onSelect={(value, event) => fun3(value, event)}
                value={unitName}
              >
                {unitData.map((el) => (
                  <Select.Option value={el.unitName}>
                    {el.unitName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              className="comision"
              label={t('editbookingpopup.heading4')}
              name="channel"
            >
              <Select
                placeholder={t('strings.select')}
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
                    message: t('editbookingpopup.heading5'),
                  },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row style={{ alignItems: 'center', padding: '0px 20px' }}>
          <Col span={8}>
            <Form.Item
              label={t('strings.adults')}
              name="adult"
              style={{ paddingRight: 20 }}
              rules={[
                {
                  required: true,
                  message: t('editbookingpopup.heading6'),
                },
              ]}
            >
              <Select
                placeholder={t('strings.select')}
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
              label={t('editbookingpopup.heading7')}
              name="children1"
              style={{ paddingRight: 20 }}
            >
              <Select
                placeholder={t('strings.select')}
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
            <Form.Item label={t('editbookingpopup.heading8')} name="children2">
              <Select
                placeholder={t('strings.select')}
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
                  header={t('editbookingpopup.heading9')}
                  key="1"
                >
                  <div className="additional-guest">
                    {editCurrentGuest.length
                      ? editCurrentGuest.map((el, j) => (
                        <div className="addi-box" key={el.id} data-key={j}>
                          <Row style={{ alignItems: 'center' }}>
                            <Col span={6}>
                              <Form.Item
                                id={el.id}
                                label={t('strings.full')}
                                name={`fullName${j}`}
                                style={{ paddingRight: 20 }}
                              >
                                <Input
                                  defaultValue={el.fullname}
                                />
                              </Form.Item>
                            </Col>

                            <Col span={6}>
                              <Form.Item
                                id={el.id}
                                label={t('strings.email')}
                                name={`email${i}`}
                                style={{ paddingRight: 20 }}
                              >
                                <Input />
                              </Form.Item>
                            </Col>

                            <Col span={6}>
                              <Form.Item
                                id={el.id}
                                label={t('strings.country')}
                                name={`country${i}`}
                                style={{ paddingRight: 20 }}
                              >
                                <Select showSearch>
                                  {countryList()
                                    .getData()
                                    .map((ele) => (
                                      <Select.Option value={ele.label}>
                                        {ele.label}
                                      </Select.Option>
                                    ))}
                                </Select>
                              </Form.Item>
                            </Col>

                            <Col span={6}>
                              <Form.Item
                                label={t('strings.phone')}
                                name={`phone${i}`}
                                style={{ paddingRight: 20 }}
                              >
                                <Input
                                    // onChange={(e) => setPhone(e.target.value)}
                                  type="number"
                                  minLength="9"
                                  maxLength="15"
                                />
                              </Form.Item>
                            </Col>

                            <Col span={24}>
                              <div className="additional-edit">
                                <div>
                                  <EditOutlined />
                                  {' '}
                                  Edit/Additional Data
                                </div>
                              </div>
                            </Col>
                          </Row>

                          <div className="delete-data" data-key={i}>
                            <DeleteOutlined onClick={(e) => removePanel(e)} />
                          </div>
                        </div>
                      ))
                      : null}

                    <Row>
                      <Col span={24}>
                        <div
                          role="presentation"
                          className="additional-add"
                          onClick={addMore}
                        >
                          <PlusOutlined />
                          {' '}
                          {t('editbookingpopup.heading11')}
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Panel>

                <Panel
                  icon={<PlusSquareOutlined />}
                  header={t('editbookingpopup.heading12')}
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
                  header={t('editbookingpopup.heading13')}
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
                <p>{t('editbookingpopup.heading15')}</p>
              </Form.Item>
            </Col>

            <Col span={16}>
              <Form.Item>
                <div className="inline-form">
                  <label htmlFor="price">
                    <input hidden />
                    {t('editbookingpopup.heading14')}
                  </label>
                  <Form.Item name="perNight">
                    <Input
                      type="number"
                      placeholder="0,00"
                      value={price}
                      disabled="true"
                      rules={[
                        {
                          required: true,
                          message: t('editbookingpopup.heading6'),
                        },
                      ]}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Form.Item>
                  <label htmlFor="x">
                    <input hidden />
                    X
                  </label>
                  <Input
                    type="number"
                    placeholder={t('editbookingpopup.heading27')}
                    name="nights"
                    value={night}
                    disabled="true"
                    onChange={(e) => setNight(e.target.value)}
                  />
                  <label htmlFor="equal">
                    <input hidden />
                    =
                  </label>
                  <Input
                    name="totalAAmount"
                    type="number"
                    value={night * price}
                    onBlur={(e) => {
                      setAmt(e.target.value);
                    }}
                  />
                  <label htmlFor="eur">
                    <input hidden />
                    EUR
                  </label>
                </div>

                <div className="inline-form">
                  <label htmlFor="dis">
                    <input hidden />
                    {t('editbookingpopup.heading18')}
                  </label>
                  <Form.Item name="discount">
                    <Input
                      value={discount}
                      type="number"
                      placeholder="0,00"
                      onChange={(e) => {
                        setDiscount(e.target.value);
                        setdiscountAmount(e.target.value);
                        if (discountType === '€') {
                          setAccomodation(amt - e.target.value);
                        } else {
                          setAccomodation(amt - amt * (e.target.value / 100));
                        }
                      }}
                    />
                  </Form.Item>
                  <label htmlFor="dis">
                    <input hidden />
                    X
                  </label>
                  <Form.Item name="discountType">
                    <Select
                      placeholder={t('editbookingpopup.heading28')}
                      onSelect={(value) => handleDiscount(value)}
                      defaultValue={discountType}
                    >
                      <Select.Option value="€">€</Select.Option>
                      <Select.Option value="%">%</Select.Option>
                    </Select>
                  </Form.Item>
                  <label htmlFor="dis">
                    <input hidden />
                    =
                  </label>
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
                  <label htmlFor="dis">
                    <input hidden />
                    EUR
                  </label>
                </div>
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ alignItems: 'center' }}>
            <Col span={24}>
              <div className="per-night">
                <label htmlFor="dis">
                  <input hidden />
                  {t('editbookingpopup.heading19')}
                </label>
                <span>
                  {t('editbookingpopup.heading20')}
                  :
                </span>
                <span className="amnt">
                  {accomodation}
                  {' '}
                  €
                </span>
              </div>
            </Col>

            <Col span={24}>
              <div
                role="presentation"
                className="srvice-heading"
                onClick={addMoreService}
              >
                <PlusOutlined />
                {' '}
                {t('editbookingpopup.heading21')}
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
                        ? currentService.map((el, j) => (
                          <div className="inline-form">
                            <div className="delete-data">
                              <DeleteOutlined
                                onClick={() => handleRemoveEditServicePanel(el)}
                              />
                            </div>
                            <Col span={4}>
                              <Form.Item name={`serviceName${j}`}>
                                <Select
                                  style={{ width: '100px' }}
                                  placeholder="Select Service"
                                  onSelect={(value, event) => fun2(value, event)}
                                >
                                  {serviceData.map((ele) => (
                                    <Select.Option value={ele.serviceName}>
                                      {ele.serviceName}
                                    </Select.Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col span={4}>
                              <Form.Item name={`servicePrice${j}`}>
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

                            <label htmlFor="dis">
                              <input hidden />
                              X
                            </label>
                            <Col span={4}>
                              <Form.Item name={`serviceQuantity${j}`}>
                                <Input
                                  type="number"
                                  placeholder="Quantity"
                                  onChange={(e) => setServiceAmt(e.target.value)}
                                />
                              </Form.Item>
                            </Col>

                            <label htmlFor="dis">
                              <input hidden />
                              +
                            </label>
                            <Col span={4}>
                              <Form.Item name={`serviceTax${i}`}>
                                <Input
                                  type="number"
                                  placeholder="%"
                                  onChange={(e) => setServiceTax(e.target.value)}
                                />
                              </Form.Item>
                            </Col>

                            <label htmlFor="dis">
                              <input hidden />
                              =
                            </label>
                            <Col span={4}>
                              <Form.Item name={`serviceAmount${i}`}>
                                <Input
                                  value={serviceAmount}
                                  onBlur={calculateTotal}
                                />
                              </Form.Item>
                            </Col>

                            <label htmlFor="eur">
                              <input hidden />
                              EUR
                            </label>
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
                <label htmlFor="deposit">
                  <input hidden />
                  {t('editbookingpopup.heading23')}
                </label>

                <div className="inline-form">
                  <label htmlFor="depo">
                    <input hidden />
                    {t('editbookingpopup.heading29')}
                  </label>

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
                      placeholder={t('editbookingpopup.heading24')}
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
                <label htmlFor="acco">
                  {t('editbookingpopup.heading29')}
                  :
                  {' '}
                  <span>
                    {/* {deposit}€ (0,00 %) */}
                    {depositType === '%'
                      ? `${deposit}€ (${depositAmount}%)`
                      : `${deposit}€`}
                  </span>
                </label>
                <label htmlFor="amou">
                  {t('editbookingpopup.heading25')}
                  :
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
                  close();
                  setDiscount(0);
                  setdiscountAmount(0);
                }}
              >
                {t('strings.cancel')}
              </Button>
              <Button type="primary" htmlType="submit">
                {t('strings.save')}
                {' '}
                {t('strings.reservat')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
Editbookingpopup.propTypes = {
  editBookingValues: PropTypes.objectOf(PropTypes.object),
  editCurrentGuest: PropTypes.arrayOf(PropTypes.array),
  setEditCurrentGuest: PropTypes.func,
  currentService: PropTypes.arrayOf(PropTypes.array),
  setCurrentService: PropTypes.func,
  close: PropTypes.func,
  visible: PropTypes.bool,
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
  setBooked: PropTypes.func,
  getData: PropTypes.func,
};

Editbookingpopup.defaultProps = {
  close: () => {},
  visible: false,
  handleOk: () => {},
  handleCancel: () => {},
  setBooked: () => {},
  getData: () => {},
  setEditCurrentGuest: () => {},
  setCurrentService: () => {},
  editBookingValues: {},
  editCurrentGuest: [],
  currentService: [],
};

export default Editbookingpopup;
