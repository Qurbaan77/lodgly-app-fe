import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import moment from 'moment';
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
  DeleteOutlined,
  ClockCircleOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import countryList from 'react-select-country-list';
import { toast } from 'react-toastify';
import { userInstance, reservationInstance, propertyInstance } from '../../axios/axiosconfig';

const { Panel } = Collapse;

const { RangePicker } = DatePicker;
let i = 1;

const EditReservation = (props) => {
  const { t } = useTranslation();
  const {
    editvisible,
    setEditVisible,
    setVisible,
    reservationData,
    guestArray,
    setGuestArray,
    serviceArray,
    setServiceArray,
  } = props;
  const [form] = Form.useForm();
  // const [visible1, setVisible1] = useState(false);
  // const [radio, setRadio] = useState(1);
  const [channel, setChannel] = useState('');
  // const [children1, setChildren1] = useState(0);
  // const [children2, setChildren2] = useState(0);
  const [channelCommission, setChannelCommission] = useState(null);
  const [panel, setPanel] = useState([1]);
  // const [servicePanel, setServicePanel] = useState([100]);
  // const [arrValue, setArrValue] = useState(2);
  const [price, setPrice] = useState(0);
  const [night, setNight] = useState(0);
  const [amt, setAmt] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState('%');
  const [accomodation, setAccomodation] = useState(0);
  // const [total, setTotal] = useState(0);
  const [deposit, setDeposit] = useState(0);
  // const [servicePrice, setServicePrice] = useState(0);
  // const [serviceAmt, setServiceAmt] = useState(0);
  // const [serviceTax, setServiceTax] = useState(0);
  // const [serviceAmount, setServiceAmount] = useState(0);
  const [leftDays, setLeftDays] = useState(0);
  const [editServicePanel, setEditServicePanel] = useState([]);
  const [unitName, setUnitName] = useState('');
  const [depositType, setDepositType] = useState('€');
  const [depositAmount, setDepositAmount] = useState(null);
  const [discountAmount, setdiscountAmount] = useState(null);
  const [showOptional, setShowOptional] = useState(true);

  // const [fullname, setFullname] = useState({});
  // const [email, setEmail] = useState({});
  // const [phone, setPhone] = useState({});
  // const [country, setCountry] = useState({});
  const [serviceData, setServiceData] = useState([]);
  const [unitData, setUnitData] = useState([]);
  // const [currentUnit, setCurrentUnit] = useState({});

  // const [propertyData, setPropertyData] = useState([]);
  // const [currentPropertyId, setCurrentPropertyId] = useState(null);
  // const [reservationDate, setReservationDate] = useState(null);
  const [unitId, setUnitId] = useState(null);
  const [propertyName, setPropertyName] = useState('');
  const [deleteServiceId, setDeleteServiceId] = useState(null);
  // const history = useHistory();

  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [{ userId }] = userCred || [{}];

  const close = () => {
    form.resetFields();
    setVisible(false);
    setEditVisible(false);
  };

  const addMore = () => {
    if (guestArray && guestArray.length > 0) {
      let i;
      guestArray.forEach((el) => {
        i = el.id;
      });
      setGuestArray(guestArray.concat([{ id: i + 1 }]));
    }
    i += 1;
    setPanel([...panel, i]);
  };

  const removePanel = () => {
    const oldarray = [...panel];
    oldarray.pop();
    setPanel([...oldarray]);
  };

  const addMoreService = async () => {
    let i;
    serviceArray.forEach((el) => {
      i = el.id;
    });
    setServiceArray(serviceArray.concat([{ id: i + 1 }]));
  };

  // const removeServicePanel = () => {
  //   if (serviceAmount !== 0) {
  //     const sum = parseInt(total, 10) - parseInt(serviceAmount, 10);
  //     setServiceAmount(0);
  //     setServicePrice(0);
  //     setServiceTax(0);
  //     setServiceAmt(0);
  //     setTotal(sum);
  //   }
  //   const oldarray = [...servicePanel];
  //   oldarray.pop();
  //   setServicePanel([...oldarray]);
  // };

  function useUpdate() {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
      setTick((tick) => tick + 1);
    }, []);
    return update;
  }

  const update = useUpdate();

  const updateFields = useCallback(() => {
    if (editvisible) {
      onSelectProperty((reservationData.unitTypeId));
      const m1 = moment(reservationData.startDate);
      const m2 = moment(reservationData.endDate);
      const data = reservationData.discountType === '%'
        ? (reservationData.night * reservationData.perNight * reservationData.discount) / 100
        : reservationData.discount;
      form.setFieldsValue({
        groupname: [m1, m2],
        property: reservationData.propertyName,
        unit: reservationData.unitName,
        adult: reservationData.adult,
        children1: reservationData.children1,
        children2: reservationData.children2,
        perNight: reservationData.perNight,
        nights: reservationData.night,
        discount: reservationData.discount,
        discountType: reservationData.discountType,
        discountTotal: data,
        deposit: reservationData.deposit,
        depositType: reservationData.depositType,
      });
      if (guestArray && guestArray.length) {
        guestArray.forEach((el, i) => {
          form.setFieldsValue({
            [`fullname${i}`]: el.fullname,
            [`email${i}`]: el.email,
            [`country${i}`]: el.country,
            [`phone${i}`]: el.phone,
          });
        });
      }
      if (serviceArray && serviceArray.length > 0) {
        serviceArray.forEach((el, i) => {
          form.setFieldsValue({
            [`serviceName${i}`]: el.serviceName,
            [`servicePrice${i}`]: el.servicePrice,
            [`serviceQuantity${i}`]: el.quantity,
            [`serviceTax${i}`]: el.serviceTax,
            [`serviceAmount${i}`]: el.serviceAmount,
          });
        });
      }
      setPropertyName(reservationData.propertyName);
      setUnitName(reservationData.unitName);
      setUnitId(reservationData.unitId);
      setChannel(reservationData.channel);
      setChannelCommission(reservationData.commission);
      setPrice(reservationData.perNight);
      setNight(reservationData.night);
      setDiscount(reservationData.discount);
      setDiscountType(reservationData.discountType);
      setdiscountAmount(reservationData.discount);
      setDeposit(reservationData.deposit);
      setDepositType(reservationData.depositType);
      setAmt(reservationData.night * reservationData.perNight);
      setAccomodation(reservationData.accomodation);
    }
  }, [
    serviceArray,
    guestArray,
    reservationData,
    form,
    editvisible,
  ]);

  const onFinish = async (values) => {
    values.reservationId = reservationData.id;
    values.perNight = price;
    values.nights = night;
    values.amt = amt;
    values.discountType = discountType;
    values.discount = discount;
    values.deposit = deposit;
    values.depositType = depositType;
    values.accomodation = accomodation;
    const serviceDataNew = [];
    values.totalAmount = accomodation
      + serviceArray
        .map((service) => service.serviceAmount)
        .reduce((a, b) => a + (b || 0), 0);
    if (guestArray.length) {
      guestArray.forEach((el, i) => {
        const f = 'fullname';
        const e = 'email';
        const c = 'country';
        const p = 'phone';
        el.reservationId = reservationData.id;
        el.fullname = values[f + i];
        el.email = values[e + i];
        el.country = values[c + i];
        el.phone = values[p + i];
      });
    }
    values.guestData = guestArray;
    if (guestArray.length > 0) {
      values.guest = guestArray[0].fullName;
    } else {
      values.guest = 'No Guest';
    }
    values.serviceData = serviceDataNew;
    values.channel = channel;
    values.commission = channelCommission;
    values.unitName = unitName;
    values.unit = unitId;
    values.unitTypeId = reservationData.unitTypeId;
    values.affiliateId = userId;
    values.deleteServiceId = deleteServiceId;
    const response = await reservationInstance.post('/changeReservation', values);
    if (response.data.code === 200) {
      window.location.reload();
      toast.success('successfully added reservation', { containerId: 'B' });
    } else {
      toast.error('server error please try again', { containerId: 'B' });
    }

    form.resetFields();
  };

  useEffect(() => {
    updateFields();
  }, [updateFields]);

  // const getPropertyData = useCallback(async () => {
  //   const response = await propertyInstance.post('/fetchProperty', { affiliateId: userId });
  //   const data = response.data.propertiesData;
  //   if (response.data.code === 200) {
  //     setPropertyData(data);
  //   }
  // }, [userId]);

  // useEffect(() => {
  //   getPropertyData();
  // }, [getPropertyData]);

  // const calculateTotal = () => {
  //   const calculate = servicePrice * serviceAmt
  //     + servicePrice * serviceAmt * (serviceTax / 100);
  //   const sum = parseInt(total, 10) + parseInt(calculate, 10);
  //   setServiceAmount(calculate);
  //   setTotal(sum);
  // };

  const onSelectProperty = async (value) => {
    const payload = {
      propertyId: value,
    };
    const response = await userInstance.post('/getService', payload);
    const data = response.data.servicData;
    const response3 = await propertyInstance.post('/getUnittype', payload);
    if (response.data.code === 200) {
      setServiceData(data);
    }
    if (response3.data.code === 200) {
      const dataUnit = response3.data.unitData;
      setUnitData(dataUnit);
    }
  };

  // const fun2 = (value) => {
  //   serviceData
  //     .filter((el) => el.serviceName === value)
  //     .map((filterService) => setCurrentService(filterService));

  //   // unitData
  //   //   .filter((el) => el.propertyId === value)
  //   //   .map((filterUnit) => setCurrentUnit(filterUnit));
  // };

  const fun3 = (event) => {
    const [data] = unitData
      .filter((el) => el.unitName !== event)
      .map((el) => el.id);
    setUnitId(data);
    const unitname = event.children || event;
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
      // const mon = Math.round(total * 100) / 100 + Math.round(accomodation * 100) / 100;
      // const data = mon * (depositAmount / 100);
      const data = (night * price * discountAmount) / 100;
      setDiscount(data);
      setAccomodation(night * price - data);
      setDeposit(data);
    } else {
      setDiscount(discountAmount);
      setAccomodation(night * price - discountAmount);
    }
  };

  const onChangeDate = (value) => {
    if (value) {
      const d1 = new Date(value[0]._d);
      const d2 = new Date(value[1]._d);
      const diff = Math.abs(d1 - d2);
      const day = Math.floor(diff / (24 * 60 * 60 * 1000));
      setNight(day);
    }
  };

  const handleRemoveEditServicePanel = (ele) => {
    setDeleteServiceId(ele.id);
    const data = serviceArray.filter((el) => el.id !== ele.id);
    setServiceArray([...data]);
  };

  const onOptionalDate = (value) => {
    if (value) {
      // setSelectDate(value);
      const d1 = new Date(value._d);
      const d2 = new Date();
      const diff = Math.abs(d1 - d2);
      const day = Math.floor(diff / (24 * 60 * 60 * 1000)) + 1;
      setLeftDays(day);
    }
  };

  // service handlers
  const handleServiceName = (value, el) => {
    serviceData
      .filter((el) => el.serviceName === value)
      .map((filterService) => setEditServicePanel(filterService));
    serviceArray.forEach((ele) => {
      if (ele.id === el.id) {
        ele.serviceName = value;
      }
    });
    setServiceArray(serviceArray);
  };

  const handleServicePrice = (value, el, i) => {
    serviceArray.forEach((ele) => {
      if (ele.id === el.id) {
        ele.servicePrice = value;
        ele.serviceAmount = value * ele.quantity
         + (value * ele.quantity * ele.serviceTax) / 100;
      }
    });
    setServiceArray(serviceArray);
    form.setFieldsValue({
      [`serviceAmount${i}`]:
         value * el.quantity
         + (value * el.quantity * el.serviceTax) / 100,
    });
    update();
  };
  const handleServiceQuantity = (e, el, i) => {
    serviceArray.forEach((ele) => {
      if (ele.id === el.id) {
        ele.quantity = e.target.value;
        ele.serviceAmount = ele.servicePrice * e.target.value
        + (ele.servicePrice * e.target.value * ele.serviceTax) / 100;
        form.setFieldsValue({
          [`serviceAmount${i}`]:
             ele.servicePrice * e.target.value
             + (ele.servicePrice * e.target.value * ele.serviceTax) / 100,
        });
      }
    });
    setServiceArray(serviceArray);
    update();
  };
  const handleServiceTax = (e, el, i) => {
    serviceArray.forEach((ele) => {
      if (ele.id === el.id) {
        ele.serviceTax = e.target.value;
        ele.serviceAmount = ele.servicePrice * ele.quantity
        + (ele.servicePrice * ele.quantity * e.target.value) / 100;
        form.setFieldsValue({
          [`serviceAmount${i}`]:
            ele.servicePrice * ele.quantity
            + (ele.servicePrice * ele.quantity * e.target.value) / 100,
        });
      }
    });
    setServiceArray(serviceArray);
    update();
  };

  const createGuestDetails = (
    <>
      {guestArray.length
        ? guestArray.map((el, j) => (
          <div className="addi-box" id={el} key={el}>
            <Row style={{ alignItems: 'center' }}>
              <Col span={6}>
                <Form.Item
                  label={t('strings.full')}
                  name={`fullname${j}`}
                  style={{ paddingRight: 20 }}
                  rules={[
                    {
                      required: 'true',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  label={t('strings.email')}
                  name={`email${j}`}
                  style={{ paddingRight: 20 }}
                  rules={[
                    {
                      required: 'true',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  label={t('strings.country')}
                  name={`country${j}`}
                  style={{ paddingRight: 20 }}
                  rules={[
                    {
                      required: 'true',
                    },
                  ]}
                >
                  <Select showSearch>
                    {countryList()
                      .getData()
                      .map((ele) => (
                        <Select.Option value={ele.label} key={ele}>
                          {ele.label}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  label={t('strings.phone')}
                  name={`phone${j}`}
                  style={{ paddingRight: 20 }}
                >
                  <Input type="number" minLength="9" maxLength="15" />
                </Form.Item>
              </Col>
            </Row>

            <div className="delete-data">
              <DeleteOutlined onClick={removePanel} />
            </div>
          </div>
        )) : null}
    </>
  );

  return (
    <Modal
      title={t('addreservation.heading15')}
      name="modal1"
      visible={editvisible}
      onOk={close}
      onCancel={close}
      wrapClassName="create-booking-modal"
    >
      <Helmet>
        <body className={editvisible ? 'ant-scrolling-effect' : ''} />
      </Helmet>
      <Form form={form} name="basic" onFinish={onFinish}>
        <Row style={{ alignItems: 'center', padding: '0px 20px' }}>
          <Col span={12}>
            <Form.Item
              label={t('addreservation.heading2')}
              name="groupname"
              style={{ paddingRight: 20 }}
              onChange={onChangeDate}
              rules={[
                {
                  required: true,
                  message: t('addreservation.heading3'),
                },
              ]}
            >
              <RangePicker
                disabled={false}
                defaultValue={moment()}
                format="YYYY-MM-DD"
                disabledDate={(current) => current && current < moment().subtract(1, 'day')}
                onChange={onChangeDate}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Radio.Group name="radiogroup" defaultValue={1}>
              <Radio value={1} onClick={() => setShowOptional(true)}>
                {t('strings.confirmed')}
              </Radio>
              <Radio value={2} onClick={() => setShowOptional(false)}>
                {t('strings.option')}
              </Radio>
            </Radio.Group>
          </Col>

          <Col span={24}>
            <div className="option-content" hidden={showOptional}>
              <p>
                <ClockCircleOutlined />
                {' '}
                Option is active untill
              </p>
              <DatePicker
                disabledDate={(current) => current && current < moment().subtract(1, 'day')}
                onChange={onOptionalDate}
              />
              <span>
                (days left:
                {leftDays}
                )
              </span>
              <div className="option-tag">
                <CheckOutlined />
                {' '}
                Confirmed
              </div>
            </div>
            <p className="checked-avail">
              *Availability is checked automatically
            </p>
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
                  message: t('addreservation.heading4'),
                },
              ]}
            >
              <Input value={propertyName} disabled />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label={t('strings.unit')}
              name="unit"
              style={{ paddingRight: 20 }}
              // rules={[
              //   {
              //     required: true,
              //     message: t('addreservation.heading5'),
              //   },
              // ]}
            >
              <Select
                disabled={false}
                placeholder={t('strings.select')}
                onSelect={(value) => fun3(value)}
                value={unitName}
              >
                {unitData.map((el) => (
                  <Select.Option value={el.id} key={el.id}>{el.unitName}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              className="comision"
              label={t('addreservation.heading6')}
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
                    message: t('addreservation.heading8'),
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
                  message: t('addreservation.heading9'),
                },
              ]}
            >
              <Select placeholder={t('strings.select')}>
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
              label={t('addreservation.heading10')}
              name="children1"
              style={{ paddingRight: 20 }}
            >
              <Select placeholder={t('strings.select')}>
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
                <Select.Option value="3">3</Select.Option>
                <Select.Option value="4">4</Select.Option>
                <Select.Option value="5">5</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label={t('addreservation.heading11')} name="children2">
              <Select placeholder="Select">
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
              <Collapse defaultActiveKey={['1']} accordion>
                <Panel
                  icon={<PlusSquareOutlined />}
                  header="Add Guest Details (Optional)"
                  key="1"
                >
                  <div className="additional-guest">
                    {createGuestDetails}

                    <Row>
                      <Col span={24}>
                        <div
                          className="additional-add"
                          onClick={addMore}
                          role="presentation"
                        >
                          <PlusOutlined />
                          {' '}
                          {t('addreservation.heading12')}
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
                <p>{t('addreservation.heading18')}</p>
              </Form.Item>
            </Col>

            <Col span={16}>
              <Form.Item>
                <div className="inline-form">
                  <label htmlFor="abc">
                    <input hidden />
                    {t('addreservation.heading19')}
                  </label>
                  <Form.Item name="perNight">
                    <Input
                      type="number"
                      placeholder="0,00"
                      value={price}
                      rules={[
                        {
                          required: true,
                          message: t('addreservation.heading9'),
                        },
                      ]}
                      onChange={(e) => {
                        setPrice(e.target.value);
                        setAccomodation(night * e.target.value);
                      }}
                    />
                  </Form.Item>
                  <label htmlFor="number">
                    <input hidden />
                    X
                  </label>
                  <Input
                    type="number"
                    placeholder={t('addreservation.heading30')}
                    name="nights"
                    value={night}
                    disabled="true"
                    onChange={(e) => setNight(e.target.value)}
                  />
                  <label htmlFor="amount">
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
                  <label htmlFor="discount">
                    <input hidden />
                    {t('addreservation.heading20')}
                  </label>
                  <Input
                    type="number"
                    placeholder="0,00"
                    onChange={(e) => {
                      setDiscount(e.target.value);
                      setdiscountAmount(e.target.value);
                      if (discountType === '€') {
                        setAccomodation(night * price - e.target.value);
                      } else {
                        setAccomodation(
                          night * price - (night * price * e.target.value) / 100,
                        );
                      }
                    }}
                  />
                  <label htmlFor="discount">
                    <input hidden />
                    X
                  </label>
                  <Form.Item name="discountType">
                    <Select
                      placeholder={t('addreservation.heading21')}
                      onSelect={(value) => handleDiscount(value)}
                      defaultValue="%"
                    >
                      <Select.Option value="€">€</Select.Option>
                      <Select.Option value="%">%</Select.Option>
                    </Select>
                  </Form.Item>
                  <label htmlFor="equal">
                    <input hidden />
                    =
                  </label>
                  <Input
                    type="number"
                    value={
                      discountType === '€' ? discountAmount : (night * price * discountAmount) / 100
                      // : amt - amt * (discountAmount / 100)
                    }
                    onBlur={(e) => setAccomodation(e.target.value)}
                  />
                  <label htmlFor="eur">
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
                <label htmlFor="night">
                  <input hidden />
                  {t('addreservation.heading22')}
                </label>
                <span>
                  {t('addreservation.heading23')}
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
                className="srvice-heading"
                onClick={addMoreService}
                role="presentation"
              >
                <PlusOutlined />
                {' '}
                {t('addreservation.heading24')}
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
                      {serviceArray.length
                        ? serviceArray.map((el, j) => (
                          <div className="inline-form" key={el.id}>
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
                                  onSelect={(value) => handleServiceName(value, el, j)}
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
                                  onSelect={(value) => handleServicePrice(value, el, j)}
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
                                  onChange={(e) => handleServiceQuantity(e, el, j)}
                                />
                              </Form.Item>
                            </Col>

                            <label htmlFor="dis">
                              <input hidden />
                              +
                            </label>
                            <Col span={4}>
                              <Form.Item name={`serviceTax${j}`}>
                                <Input
                                  type="number"
                                  placeholder="Tax"
                                    // onBlur={calculateTotal}
                                  value={el.serviceTax}
                                  onChange={(e) => handleServiceTax(e, el, j)}
                                />
                              </Form.Item>
                            </Col>

                            <label htmlFor="dis">
                              <input hidden />
                              =
                            </label>

                            <Col span={4}>
                              <Form.Item name={`serviceAmount${j}`}>
                                <Input
                                  readOnly
                                  type="number"
                                  placeholder="Total"
                                    // onBlur={calculateTotal}
                                  value={el.serviceAmount}
                                />
                              </Form.Item>
                              {/* <label htmlFor="eur">
                                {serviceAmount}
                              </label> */}
                            </Col>
                            <label htmlFor="eur">
                              <input hidden />
                              EUR
                            </label>
                          </div>
                        )) : null}
                    </div>
                  </Panel>
                </Collapse>
              </Form.Item>
            </Col>

            <Col span={24}>
              <div className="amnt-total">
                <h4>
                  {accomodation
                    + serviceArray
                      .map((service) => service.serviceAmount)
                      .reduce((a, b) => a + (b || 0), 0)}
                  {/* {t('addreservation.heading26')}
                  :
                  {accomodation + serviceAmount} */}
                  {/* {Math.round(total * 100) / 100
                    + Math.round(accomodation * 100) / 100} */}
                  {' '}
                  €
                </h4>
              </div>

              <div className="deposit">
                <label htmlFor="discount">
                  <input hidden />
                  {t('addreservation.heading27')}
                </label>

                <div className="inline-form">
                  <label htmlFor="deposit">
                    <input hidden />
                    {t('addreservation.heading28')}
                  </label>

                  <Input
                    name="deposit"
                    type="number"
                    placeholder="0,00"
                    onChange={(e) => {
                      setDeposit(e.target.value);
                      setDepositAmount(e.target.value);
                    }}
                  />
                  {/* <Input type='number' placeholder='%' /> */}
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
                <label htmlFor="depo">
                  {t('addreservation.heading28')}
                  :
                  {' '}
                  <span>
                    {/* {deposit}€ (0,00 %) */}
                    {depositType === '%'
                      ? `${deposit}€ (${depositAmount}%)`
                      : `${deposit}€`}
                  </span>
                </label>
                <label htmlFor="amount">
                  {t('addreservation.heading29')}
                  :
                  {' '}
                  <span>
                    {Math.round(
                      accomodation
                        + serviceArray
                          .map((service) => service.serviceAmount)
                          .reduce((a, b) => a + (b || 0), 0)
                        - deposit,
                    )}
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

EditReservation.propTypes = {
  editvisible: PropTypes.bool,
  setEditVisible: PropTypes.func,
  setVisible: PropTypes.func,
  reservationData: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
  ]),
  guestArray: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  setGuestArray: PropTypes.func,
  serviceArray: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  setServiceArray: PropTypes.func,
};
EditReservation.defaultProps = {
  editvisible: false,
  setEditVisible: () => {},
  setVisible: () => {},
  reservationData: {},
  guestArray: {},
  setGuestArray: () => {},
  serviceArray: {},
  setServiceArray: () => {},
};

export default EditReservation;
