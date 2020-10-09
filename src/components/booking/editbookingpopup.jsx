import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
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
  Collapse,
  Modal,
} from 'antd';
import {
  PlusSquareOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import countryList from 'react-select-country-list';
import moment from 'moment';
import { bookingInstance, propertyInstance, userInstance } from '../../axios/axiosconfig';

const { Panel } = Collapse;
const { RangePicker } = DatePicker;
const i = 1;

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
  const [channel, setChannel] = useState('');
  const [adult, setAdult] = useState(0);
  const [children1, setChildren1] = useState(0);
  const [children2, setChildren2] = useState(0);
  const [channelCommission, setChannelCommission] = useState(5);
  const [price, setPrice] = useState(0);
  const [night, setNight] = useState(0);
  const [amt, setAmt] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState('%');
  const [accomodation, setAccomodation] = useState(0);
  const [deposit, setDeposit] = useState(0);
  // const [servicePrice, setServicePrice] = useState(0);
  // const [serviceAmt, setServiceAmt] = useState(0);
  // const [serviceTax, setServiceTax] = useState(0);
  const [unitName, setUnitName] = useState('');
  const [depositType, setDepositType] = useState('€');
  const [depositAmount, setDepositAmount] = useState(null);
  const [discountAmount, setdiscountAmount] = useState(null);
  const [editServicePanel, setEditServicePanel] = useState([]);
  const [deleteGuestId, setDeleteGuestId] = useState(null);
  const [deleteServiceId, setDeleteServiceId] = useState(null);
  const [serviceData, setServiceData] = useState([]);
  const [unitData, setUnitData] = useState([]);
  // const [currentUnit, setCurrentUnit] = useState({});
  // const [unitTypeData, setUnitTypeData] = useState([]);
  const [unitId, setUnitId] = useState(null);
  // const [propertyData, setPropertyData] = useState([]);
  const [propertyName, setPropertyName] = useState('');
  // const history = useHistory();
  const { nights, perNight } = editBookingValues;
  const updateFields = useCallback(() => {
    if (visible) {
      console.log(editBookingValues);
      fun1((editBookingValues.unitTypeId));
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
        nights: editBookingValues.night,
        discount: editBookingValues.discount,
        discountType: editBookingValues.discountType,
        discountTotal: data,
        deposit: editBookingValues.deposit,
        depositType: editBookingValues.depositType,
      });
      // setGuest(editCurrentGuest);
      if (editCurrentGuest && editCurrentGuest.length) {
        editCurrentGuest.forEach((el, i) => {
          form.setFieldsValue({
            [`fullName${i}`]: el.fullname,
            [`email${i}`]: el.email,
            [`country${i}`]: el.country,
            [`phone${i}`]: el.phone,
          });
        });
      }
      if (currentService && currentService.length > 0) {
        currentService.forEach((el, i) => {
          form.setFieldsValue({
            [`serviceName${i}`]: el.serviceName,
            [`servicePrice${i}`]: el.servicePrice,
            [`serviceQuantity${i}`]: el.quantity,
            [`serviceTax${i}`]: el.serviceTax,
            [`serviceAmount${i}`]: el.serviceAmount,
          });
        });
      }
      // setServiceState(currentService);
      setPropertyName(editBookingValues.propertyName);
      setUnitName(editBookingValues.unitName);
      setUnitId(editBookingValues.unitId);
      setChannel(editBookingValues.channel);
      setChannelCommission(editBookingValues.commission);
      setAdult(editBookingValues.adult);
      setChildren1(editBookingValues.children1);
      setChildren2(editBookingValues.children2);
      setPrice(editBookingValues.perNight);
      setNight(editBookingValues.night);
      setDiscount(editBookingValues.discount);
      setDiscountType(editBookingValues.discountType);
      setdiscountAmount(editBookingValues.discount);
      setDeposit(editBookingValues.deposit);
      setDepositType(editBookingValues.depositType);
      setAmt(editBookingValues.nights * editBookingValues.perNight);
      setAccomodation(editBookingValues.accomodation);
      // setAccomodation(
      //   editBookingValues.nights * editBookingValues.perNight
      //     - (editBookingValues.nights
      //       * editBookingValues.perNight
      //       * editBookingValues.discount)
      //       / 100,
      // );
    }
  }, [
    currentService,
    editBookingValues,
    editCurrentGuest,
    form,
    nights,
    perNight,
    visible,
  ]);

  useEffect(() => {
    updateFields();
  }, [visible, updateFields]);

  function useUpdate() {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
      setTick((tick) => tick + 1);
    }, []);
    return update;
  }

  const update = useUpdate();

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

  const addMoreService = async () => {
    // if (currentService.length) {
    let i;
    currentService.forEach((el) => {
      i = el.id;
    });
    setCurrentService(currentService.concat([{ id: i + 1 }]));
    // const value = localStorage.getItem('propertyId');
    // fun1(value);
    // }
  };

  const onFinish = async (values) => {
    const { pathname } = window.location;
    if (pathname === '/calendar') {
      values.id = editBookingValues.id;
    } else {
      values.id = localStorage.getItem('bookingId');
    }
    values.perNight = price;
    values.nights = night;
    values.amt = amt;
    values.discountType = discountType;
    values.discount = discount;
    values.accomodation = accomodation;
    values.totalAmount = accomodation
      + currentService
        .map((service) => service.serviceAmount)
        .reduce((a, b) => a + (b || 0), 0);

    if (editCurrentGuest.length) {
      editCurrentGuest.forEach((el, i) => {
        const f = 'fullName';
        const e = 'email';
        const c = 'country';
        const p = 'phone';
        if (pathname === '/calendar') {
          el.bookingId = editBookingValues.id;
        } else {
          el.bookingId = localStorage.getItem('bookingId');
        }
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
    values.serviceData = currentService && currentService;
    values.noOfservices = currentService && currentService.length;
    values.propertyName = propertyName;
    values.channel = channel;
    values.commission = channelCommission;
    values.unitName = unitName;
    values.unit = unitId;
    values.deleteGuestId = deleteGuestId;
    values.deleteServiceId = deleteServiceId;
    const [{ userId }] = JSON.parse(localStorage.getItem('userCred')) || [{}];
    values.affiliateId = userId;
    const response = await bookingInstance.post('/changeBooking', values);
    if (response.data.code === 200) {
      if (pathname === '/calendar') {
        window.location.reload();
      }
      getData();
      setBooked(true);
      close();
      toast.success('booking changed successfully', { containerId: 'B' });
    } else {
      toast.error('some error occurred!', { containerId: 'B' });
    }

    form.resetFields();
  };
  // const calculateTotal = (servicetax, el) => {
  //   setServiceTax(servicetax);
  //   const calculate = servicePrice * serviceAmt
  //     - (servicePrice * serviceAmt * servicetax) / 100;
  //   // setServiceAmount(calculate);
  //   if (el.id) {
  //     currentService.forEach((ele) => {
  //       if (ele.id === el.id) {
  //         el.serviceAmount = calculate;
  //         // setServiceAmount(el.serviceAmount);
  //       }
  //     });
  //     // setServiceState(currentService);
  //   } else {
  //     // const sum = parseFloat(total) + calculate;
  //     // setServiceAmount(calculate);

  //     // setServiceAmount(calculate);
  //     // setTotal(sum);
  //   }
  // };

  // const calculateTotal = (el) => {
  //   setServiceTax(el.servicetax);
  //   console.log("el==>",el);
  //   const calculate =
  // (servicePrice * serviceAmt) -
  // ((servicePrice * serviceAmt *
  // el.servicetax) / 100);
  //   console.log(calculate);
  //   setServiceAmount(calculate);
  //   if (el.id) {
  //     currentService.forEach((ele) => {
  //       if (ele.id === el.id) {
  //         el.serviceAmount = calculate;
  //       }
  //     });
  //     setServiceState(currentService);
  //   } else {
  //     const sum = parseFloat(total) + calculate;
  //     setServiceAmount(calculate);
  //     // setServiceAmount(calculate);
  //     // setTotal(sum);
  //   }
  // };
  const fun1 = async (value) => {
    const payload = {
      propertyId: value,
    };
    const response = await userInstance.post('/getService', payload);
    const data = response.data.servicData;
    // const response2 = await userInstance.post('/getUnit', payload);
    // const data2 = response2.data.unitData;
    // console.log('unit data', data2);
    const response3 = await propertyInstance.post('/getUnittype', payload);
    console.log('response3', response3);
    if (response.data.code === 200) {
      setServiceData(data);
    }
    if (response3.data.code === 200) {
      const dataUnit = response3.data.unitData;
      setUnitData(dataUnit);
    }
  };
  const preventTypeE = (evt) => {
    if (
      evt.which === 64
      || evt.which === 35
      || evt.which === 36
      || evt.which === 37
      || evt.which === 94
      || evt.which === 38
      || evt.which === 42
      || evt.which === 40
      || evt.which === 41
      || evt.which === 95
      || evt.which === 45
      || evt.which === 61
      || evt.which === 43
      || evt.which === 126
      || evt.which === 96
      || evt.which === 48
      || evt.which === 49
      || evt.which === 50
      || evt.which === 51
      || evt.which === 52
      || evt.which === 53
      || evt.which === 54
      || evt.which === 55
      || evt.which === 56
      || evt.which === 57
      || evt.which === 91
      || evt.which === 92
      || evt.which === 93
      || evt.which === 123
      || evt.which === 124
      || evt.which === 125
      || evt.which === 33
      || evt.which === 34
      || evt.which === 44
      || evt.which === 47
      || evt.which === 60
      || evt.which === 62
    ) {
      evt.preventDefault();
    }
  };

  // const handleServiceName = (value) => {
  //   serviceData
  //     .filter((el) => el.serviceName === value)
  //     .map((filterService) => setEditServicePanel(filterService));

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
    // // const [unit] = unitData
    //   .filter((el) => el.unitName === unitname)
    //   .map((el) => el.unittypeId);
    // unitTypeData.forEach((el) => {
    //   if (el.id === unit) {
    //     setPrice(el.perNight);
    //     form.setFieldsValue({ perNight: el.perNight });
    //     setAmt(night * el.perNight);
    //     setAccomodation(night * el.perNight);
    //   }
    // });
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
      const data = (night * price * discountAmount) / 100;
      setDiscount(data);
      setAccomodation(night * price - data);
    } else {
      setDiscount(discountAmount);
      setAccomodation(night * price - discountAmount);
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
      const day = Math.floor(diff / (24 * 60 * 60 * 1000)) + 1;
      setNight(day);
    }
  };

  const addMore = () => {
    if (editCurrentGuest && editCurrentGuest.length > 0) {
      let i;
      editCurrentGuest.forEach((el) => {
        i = el.id;
      });
      setEditCurrentGuest(editCurrentGuest.concat([{ id: i + 1 }]));
    }
    // i += 1;
    // setEditCurrentGuest(editCurrentGuest.concat([{}]));
    // setPanel([...panel, i]);
  };

  const removePanel = (panel) => {
    setDeleteGuestId(panel.id);
    const data = editCurrentGuest.filter((el) => el.id !== panel.id);
    setEditCurrentGuest([...data]);
    // const id = e.currentTarget.parentNode.getAttribute('data-key');
    // editCurrentGuest.forEach((el, j) => {
    //   if (parseInt(id, 10) === j) {
    //     setDeleteGuestId(el.id);
    //   }
    // });
    // const data0 = editCurrentGuest.filter((el, j) => j !== parseInt(id, 10));
    // console.log('data0', data0);
    // setEditCurrentGuest([...data0]);
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

  /**
   * New service handler functions because why not
   */
  const handleServiceName = (value, el) => {
    serviceData
      .filter((el) => el.serviceName === value)
      .map((filterService) => setEditServicePanel(filterService));
    currentService.forEach((ele) => {
      if (ele.id === el.id) {
        ele.serviceName = value;
      }
    });
    setCurrentService(currentService);
  };

  const handleServicePrice = (value, el, i) => {
    currentService.forEach((ele) => {
      if (ele.id === el.id) {
        ele.servicePrice = value;
        ele.serviceAmount = value * ele.quantity
         + (value * ele.quantity * ele.serviceTax) / 100;
      }
    });
    setCurrentService(currentService);
    form.setFieldsValue({
      [`serviceAmount${i}`]:
         value * el.quantity
         + (value * el.quantity * el.serviceTax) / 100,
    });
    update();
  };
  const handleServiceQuantity = (e, el, i) => {
    currentService.forEach((ele) => {
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
    setCurrentService(currentService);
    update();
  };
  const handleServiceTax = (e, el, i) => {
    currentService.forEach((ele) => {
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
    setCurrentService(currentService);
    update();
  };

  return (
    <Modal
      title={t('editbookingpopup.heading1')}
      name="modal2"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      wrapClassName="create-booking-modal"
    >
      <Helmet>
        <body className="ant-scrolling-effect" />
      </Helmet>
      <Form form={form} name="basic" onFinish={onFinish}>
        <Row style={{ alignItems: 'center', padding: '0px 20px' }}>
          <Col span={12}>
            <Form.Item
              label={t('editbookingpopup.heading16')}
              name="groupname"
              style={{ paddingRight: 20 }}
              onChange={onChangeDate}
              rules={[
                {
                  required: true,
                  message: t('editbookingpopup.heading17'),
                },
              ]}
            >
              <RangePicker onChange={onChangeDate} />
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
                onSelect={(value) => fun3(value)}
                value={unitName}
              >
                {unitData && unitData.map((el) => (
                  <Select.Option value={el} key={el}>
                    {el}
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
                <Select.Option value="0">0</Select.Option>
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
                <Select.Option value="0">0</Select.Option>
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
                <Select.Option value="0">0</Select.Option>
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
                                  onKeyPress={preventTypeE}
                                />
                              </Form.Item>
                            </Col>

                            <Col span={6}>
                              <Form.Item
                                id={el.id}
                                label={t('strings.email')}
                                name={`email${j}`}
                                style={{ paddingRight: 20 }}
                              >
                                <Input type="email" />
                              </Form.Item>
                            </Col>

                            <Col span={6}>
                              <Form.Item
                                id={el.id}
                                label={t('strings.country')}
                                name={`country${j}`}
                                style={{ paddingRight: 20 }}
                              >
                                <Select showSearch>
                                  {countryList()
                                    .getData()
                                    .map((ele) => (
                                      <Select.Option
                                        value={ele.label}
                                        key={ele.label}
                                      >
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
                                <Input
                                    // onChange={(e) => setPhone(e.target.value)}
                                  type="number"
                                  minLength="9"
                                  maxLength="15"
                                />
                              </Form.Item>
                            </Col>

                            {/* <Col span={24}>
                              <div className="additional-edit">
                                <div>
                                  <EditOutlined />
                                  {' '}
                                  Edit/Additional Data
                                </div>
                              </div>
                            </Col> */}
                          </Row>

                          <div className="delete-data" data-key={i}>
                            <DeleteOutlined onClick={() => removePanel(el)} />
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
                          setAccomodation(night * price - e.target.value);
                        } else {
                          setAccomodation(
                            night * price
                              - (night * price * e.target.value) / 100,
                          );
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
                      defaultValue="%"
                      // defaultValue={discountType}
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
                          : (night * price * discountAmount) / 100
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
                  {accomodation
                    + currentService
                      .map((service) => service.serviceAmount)
                      .reduce((a, b) => a + (b || 0), 0)}
                  {/* {serviceState.length === 0 ? (
                    <> */}
                  {/* Total:
                      {' '}
                      {accomodation + currentService
                        && currentService
                          .map((service) => service.serviceAmount)
                          .reduce((a, b) => a + (b || 0), 0)} */}
                  {/* {Math.round(accomodation) + Math.round(serviceAmount)} */}
                  {/* {Math.round(total * 100) / 100
                        + Math.round(accomodation * 100) / 100} */}
                  {' '}
                  {/* €
                    </>
                  ) : (
                    <> */}
                  {/* Total:
                      {' '}
                      {accomodation + currentService
                        && currentService
                          .map((service) => service.serviceAmount)
                          .reduce((a, b) => a + (b || 0), 0)} */}
                  {/* {Math.round(total * 100) / 100
                        + Math.round(accomodation * 100) / 100
                        + serviceState
                          .map((el) => el.serviceAmount)
                          .reduce((a, b) => a + (b || 0), 0)} */}
                  {/* {' '}
                      €
                    </>
                  )} */}
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
                    {Math.round(
                      accomodation
                        + currentService
                          .map((service) => service.serviceAmount)
                          .reduce((a, b) => a + (b || 0), 0)
                        - deposit,
                    )}
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
