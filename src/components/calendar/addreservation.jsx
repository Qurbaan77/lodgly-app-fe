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
  EditOutlined,
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

const AddReservation = (props) => {
  const { t } = useTranslation();
  const {
    getData, visible, setVisible, calendarBookingDate, setCalendarBookingDate,
  } = props;
  const [form] = Form.useForm();
  // const [visible1, setVisible1] = useState(false);
  // const [radio, setRadio] = useState(1);
  const [channel, setChannel] = useState('');
  // const [children1, setChildren1] = useState(0);
  // const [children2, setChildren2] = useState(0);
  const [channelCommission, setChannelCommission] = useState(null);
  const [panel, setPanel] = useState([1]);
  const [servicePanel, setServicePanel] = useState([{
    serviceName: '',
    servicePrice: 0,
    serviceQuantity: 0,
    serviceTax: 0,
    serviceTotal: 0,
  }]);
  // const [arrValue, setArrValue] = useState(2);
  const [serviceTotalArr, setServiceTotalArr] = useState([0]);
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
  const [currentPropertyName, setCurrentPropertyName] = useState('');
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
  const [currentService, setCurrentService] = useState({});
  const [unitData, setUnitData] = useState([]);
  // const [currentUnit, setCurrentUnit] = useState({});
  const [unitTypeData, setUnitTypeData] = useState([]);

  const [propertyData, setPropertyData] = useState([]);
  const [currentPropertyId, setCurrentPropertyId] = useState(null);
  const [reservationDate, setReservationDate] = useState(null);
  const [unitId, setUnitId] = useState(null);
  const [unitTypeId, setUnitTypeId] = useState(null);
  const [selectDisable, setSelectDisable] = useState(false);
  // const history = useHistory();

  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [{ userId }] = userCred || [{}];

  function useUpdate() {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
      setTick((tick) => tick + 1);
    }, []);
    return update;
  }

  const update = useUpdate();

  const close = () => {
    form.resetFields();
    setCalendarBookingDate([]);
    setSelectDisable(false);
    setVisible(false);
  };

  const addMore = () => {
    i += 1;
    setPanel([...panel, i]);
  };

  const removePanel = () => {
    const oldarray = [...panel];
    oldarray.pop();
    setPanel([...oldarray]);
  };

  const addMoreService = async () => {
    const oldarray = [...servicePanel];
    oldarray.push({
      serviceName: '',
      servicePrice: 0,
      serviceQuantity: 0,
      serviceTax: 0,
      serviceTotal: 0,
    });
    setServicePanel(oldarray);
    // j += 1;
    // setServicePanel([...servicePanel, j]);
  };

  const removeServicePanel = () => {
    // if (serviceAmount !== 0) {
    //   const sum = parseInt(total, 10) - parseInt(serviceAmount, 10);
    //   setServiceAmount(0);
    //  //  setServicePrice(0);
    //   setServiceTax(0);
    //  //  setServiceAmt(0);
    //   setTotal(sum);
    // }
    const oldarray = [...servicePanel];
    oldarray.pop();
    setServicePanel([...oldarray]);
  };

  const getServices = useCallback(async (propertyId) => {
    const payload = {
      propertyId,
    };
    const response = await userInstance.post('/getService', payload);
    const data = response.data.servicData;
    if (response.data.code === 200) {
      setServiceData(data);
    }
  }, []);

  useEffect(() => {
    if (Object.values(calendarBookingDate).length > 0) {
      if (Object.values(calendarBookingDate)[0].length > 0) {
        setVisible(true);
        setSelectDisable(true);
        const selectedDates = Object.values(calendarBookingDate)[0];
        const propertyId = parseInt(selectedDates[0].row.parentId.split(',')[1], 10);
        getServices(propertyId);
        setUnitTypeId(propertyId);
        const unitId = parseInt(selectedDates[0].id.split(',')[1].split('-')[0], 10);
        setUnitId(unitId);
        const unitName = selectedDates[0].row.label;
        const lastElement = selectedDates.length;
        const m1 = moment(selectedDates[0].time.leftGlobal);
        const m2 = moment(selectedDates[lastElement - 1].time.leftGlobal);
        const diff = Math.abs(m1 - m2);
        const day = Math.floor(diff / (24 * 60 * 60 * 1000));
        setNight(day);
        const unitTypeName = propertyData
          .filter((el) => el.id === propertyId)
          .map((filter) => filter.unitTypeName);
        const name = unitTypeName[0]
          .filter((e) => e.lang === 'en')
          .map((name) => name.name);
        setCurrentPropertyName(name);
        form.setFieldsValue({
          groupname: [m1, m2],
          property: propertyId,
          propertyName: name,
          unit: unitName,
        });
        setUnitName(unitName);
      }
    }
  }, [
    calendarBookingDate,
    getServices,
    form,
    propertyData,
    setPropertyData,
    setVisible,
  ]);

  const onFinish = async (values) => {
    values.perNight = price;
    values.night = night;
    values.amt = amt;
    values.discountType = discountType;
    values.discount = discount;
    values.deposit = deposit;
    values.depositType = depositType;
    values.accomodation = accomodation;

    const guestData = [];
    // values.acknowledge = radio;
    values.totalAmount = serviceTotalArr.reduce((a, b) => a + (b || 0), 0) + accomodation;
    // values.total = parseInt(total) + parseInt(accomodation);

    panel.forEach((el) => {
      guestData.push(values[el]);
    });
    values.guestData = guestData;

    if (guestData.length > 0) {
      values.guest = guestData[0].fullName;
    } else {
      values.guest = 'No Guest';
    }
    values.serviceData = servicePanel;
    values.propertyName = currentPropertyName;
    values.propertyId = currentPropertyId;
    values.channel = channel;
    values.commission = channelCommission;
    values.unitName = unitName;
    if (Object.values(calendarBookingDate).length > 0) {
      if (Object.values(calendarBookingDate)[0].length > 0) {
        values.unit = unitId;
        values.unitTypeId = unitTypeId;
      }
    }
    values.affiliateId = userId;
    const response = await reservationInstance.post('/addReservation', values);
    if (response.data.code === 200) {
      getData();
      window.location.reload();
      toast.success('successfully added reservation', { containerId: 'B' });
    } else {
      toast.error('server error please try again', { containerId: 'B' });
    }

    form.resetFields();
  };

  const getPropertyData = useCallback(async () => {
    const response = await propertyInstance.post('/fetchProperty', { affiliateId: userId });
    const data = response.data.propertiesData;
    if (response.data.code === 200) {
      setPropertyData(data);
    }
  }, [userId]);

  useEffect(() => {
    getPropertyData();
  }, [getPropertyData]);

  const onSelectServices = (value, i) => {
    serviceData
      .filter((el) => el.serviceName === value)
      .map((filterService) => setCurrentService(filterService));
    servicePanel.forEach((el, j) => {
      if (i === j) {
        el.serviceName = value;
      }
    });
    setServicePanel(servicePanel);
    // unitData
    //   .filter((el) => el.propertyId === value)
    //   .map((filterUnit) => setCurrentUnit(filterUnit));
  };

  const handleServiceQuantity = (e, ele, i) => {
    servicePanel.forEach((el, j) => {
      if (i === j) {
        el.serviceQuantity = e.target.value;
        el.serviceTotal = el.servicePrice * e.target.value;
        form.setFieldsValue({
          [`serviceTotal${i}`]: el.servicePrice * e.target.value,
        });
      }
    });
    setServicePanel(servicePanel);
    update();
    const item = servicePanel.map((panel) => panel.serviceTotal);
    setServiceTotalArr(item);
  };
  const handleServicePrice = (value, i) => {
    servicePanel.forEach((el, j) => {
      if (i === j) {
        el.servicePrice = value;
      }
    });
    setServicePanel(servicePanel);
    update();
  };
  const handleServiceTax = (e, ele, i) => {
    servicePanel.forEach((el, j) => {
      if (i === j) {
        el.serviceTax = e.target.value;
        el.serviceTotal = el.servicePrice * el.serviceQuantity
        + (el.servicePrice * el.serviceQuantity * e.target.value) / 100;
        form.setFieldsValue({
          [`serviceTotal${i}`]: el.servicePrice * el.serviceQuantity
          + (el.servicePrice * el.serviceQuantity * e.target.value) / 100,
        });
      }
    });
    setServicePanel(servicePanel);
    update();
    const item = servicePanel.map((panel) => panel.serviceTotal);
    setServiceTotalArr(item);
  };

  // const calculateTotal = () => {
  //   const calculate = servicePrice * serviceAmt
  //     + servicePrice * serviceAmt * (serviceTax / 100);
  //   const sum = parseInt(total, 10) + parseInt(calculate, 10);
  //   setServiceAmount(calculate);
  //   setTotal(sum);
  // };

  const onSelectProperty = async (value, event) => {
    propertyData
      .filter((el) => el.id === parseInt(value, 10))
      .map((filter) => setUnitData(filter.unitDataV2));
    setCurrentPropertyName(event.children);
    setCurrentPropertyId(value);
    const payload = {
      reservationDate,
      propertyId: value,
    };
    const response = await userInstance.post('/getService', payload);
    const data = response.data.servicData;
    // const response2 = await userInstance.post('/getUnit', payload);
    // const data2 = response2.data.unitData;
    const response3 = await userInstance.post('/getUnittype', payload);
    const data3 = response3.data.unittypeData;
    if (response.data.code === 200) {
      setServiceData(data);
    }

    // if (response2.data.code === 200) {
    //   setUnitData(data2);
    // }

    if (response3.data.code === 200) {
      setUnitTypeData(data3);
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

  const fun3 = (value, event) => {
    const unitname = event.children;
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
      const mon = Math.round(accomodation + serviceTotalArr.reduce((a, b) => a + (b || 0), 0));
      const data = (mon * depositAmount) / 100;
      setDeposit(data);
    } else {
      setDeposit(depositAmount);
    }
  };

  const onChangeDate = (value) => {
    setReservationDate(value);
    if (value) {
      const d1 = new Date(value[0]._d);
      const d2 = new Date(value[1]._d);
      const diff = Math.abs(d1 - d2);
      const day = Math.floor(diff / (24 * 60 * 60 * 1000));
      setNight(day);
    }
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

  const createGuestDetails = (
    <>
      {panel.map((el) => (
        <div className="addi-box" id={el} key={el}>
          <Row style={{ alignItems: 'center' }}>
            <Col span={6}>
              <Form.Item
                label={t('strings.full')}
                name={[el, 'fullName']}
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
                name={[el, 'email']}
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
                name={[el, 'country']}
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
                name={[el, 'phone']}
                style={{ paddingRight: 20 }}
              >
                <Input type="number" minLength="9" maxLength="15" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <div className="additional-edit">
                <div>
                  <EditOutlined />
                  {' '}
                  {t('addreservation.heading1')}
                </div>
              </div>
            </Col>
          </Row>

          <div className="delete-data">
            <DeleteOutlined onClick={removePanel} />
          </div>
        </div>
      ))}
    </>
  );

  return (
    <Modal
      title={t('addreservation.heading15')}
      name="modal1"
      visible={visible}
      onOk={close}
      onCancel={close}
      wrapClassName="create-booking-modal"
    >
      <Helmet>
        <body className={visible ? 'ant-scrolling-effect' : ''} />
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
                disabled={selectDisable}
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
              <Select
                disabled={selectDisable}
                placeholder={t('strings.select')}
                onSelect={(value, event) => onSelectProperty(value, event)}
              >
                {propertyData.map((el) => (
                  <Select.Option value={el.id} key={el}>
                    {el.unitTypeName
                      .filter((e) => e.lang === 'en')
                      .map((name) => name.name)}
                  </Select.Option>
                ))}
              </Select>
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
                disabled={selectDisable}
                placeholder={t('strings.select')}
                onSelect={(value, event) => fun3(value, event)}
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
                      {servicePanel && servicePanel.map((ele, i) => (
                        <div className="inline-form" key={ele}>
                          <div className="delete-data">
                            <DeleteOutlined
                              onClick={() => removeServicePanel(ele)}
                            />
                          </div>
                          <Col span={4}>
                            <Form.Item name={`serviceName${i}`}>
                              <Select
                                style={{ width: '100px' }}
                                placeholder={t('bookingpop.rule7')}
                                onSelect={(value) => onSelectServices(value, i)}
                              >
                                {serviceData.map((element) => (
                                  <Select.Option value={element.serviceName}>
                                    {element.serviceName}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Form.Item name={`servicePrice${i}`}>
                              <Select
                                placeholder={t('bookingpop.rule9')}
                                onSelect={(value) => handleServicePrice(value, i)}
                              >
                                <Select.Option
                                  value={currentService.servicePrice}
                                >
                                  {currentService.servicePrice}
                                </Select.Option>
                              </Select>
                            </Form.Item>
                          </Col>

                          <label htmlFor="x">
                            <input hidden />
                            X
                          </label>
                          <Col span={4}>
                            <Form.Item name={`serviceQuantity${i}`}>
                              <Input
                                type="number"
                                placeholder={t('bookingpop.rule8')}
                                onChange={(e) => handleServiceQuantity(e, ele, i)}
                              />
                            </Form.Item>
                          </Col>

                          <label htmlFor="plus">
                            <input hidden />
                            +
                          </label>
                          <Col span={4}>
                            <Form.Item name={`serviceTax${i}`}>
                              <Input
                                type="number"
                                placeholder="Tax"
                                // onBlur={calculateTotal}
                               // value={serviceTax}
                                onChange={(e) => handleServiceTax(e, ele, i)}
                              />
                            </Form.Item>
                          </Col>

                          <label htmlFor="equal">
                            <input hidden />
                            =
                          </label>

                          <Col span={4}>
                            {/* <label htmlFor="eur">{serviceAmount}</label> */}
                            <Form.Item name={`serviceTotal${i}`}>
                              <Input
                                value={ele.serviceTotal}
                                // onBlur={calculateTotal}
                              />
                            </Form.Item>
                          </Col>

                          <label htmlFor="eur">
                            <input hidden />
                            EUR
                          </label>
                        </div>
                      ))}
                    </div>
                  </Panel>
                </Collapse>
              </Form.Item>
            </Col>

            <Col span={24}>
              <div className="amnt-total">
                <h4>
                  {t('addreservation.heading26')}
                  :
                  {accomodation + serviceTotalArr.reduce((a, b) => a + (b || 0), 0) }
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
                    {Math.round(accomodation
                     + serviceTotalArr.reduce((a, b) => a + (b || 0), 0) - deposit)}
                    {/* {Math.round(total * 100) / 100
                      + Math.round(accomodation * 100) / 100
                      - deposit} */}
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

AddReservation.propTypes = {
  getData: PropTypes.func,
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  calendarBookingDate: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  setCalendarBookingDate: PropTypes.func,
};
AddReservation.defaultProps = {
  getData: () => {},
  visible: false,
  setVisible: () => {},
  calendarBookingDate: {},
  setCalendarBookingDate: () => {},
};

export default AddReservation;
