import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
import moment from 'moment';
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
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import countryList from 'react-select-country-list';
import { userInstance } from '../../axios/axiosconfig';

const { Panel } = Collapse;

const { RangePicker } = DatePicker;
let i = 1;
let j = 1;

const CreateBookingPopup = (props) => {
  const {
    getData, close, visible, handleOk, handleCancel,
  } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  // const [visible1, setVisible1] = useState(false);
  // const [radio, setRadio] = useState(1);
  const [channel, setChannel] = useState('');
  // const [children1, setChildren1] = useState(0);
  // const [children2, setChildren2] = useState(0);
  const [channelCommission, setChannelCommission] = useState(null);
  const [panel, setPanel] = useState([1]);
  const [servicePanel, setServicePanel] = useState([100]);
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
  const [currentPropertyName, setCurrentPropertyName] = useState('');
  const [unitName, setUnitName] = useState('');
  const [depositType, setDepositType] = useState('€');
  const [depositAmount, setDepositAmount] = useState(null);
  const [discountAmount, setdiscountAmount] = useState(null);
  const [selectDate, setSelectDate] = useState({});
  const [seasonRatesData, setSeasonRatesData] = useState([]);

  // const [fullname, setFullname] = useState({});
  // const [email, setEmail] = useState({});
  // const [phone, setPhone] = useState({});
  // const [country, setCountry] = useState({});
  const [serviceData, setServiceData] = useState([]);
  const [currentService, setCurrentService] = useState({});
  const [unitData, setUnitData] = useState([]);
  // const [currentUnit, setCurrentUnit] = useState({});
  // const [unitTypeData, setUnitTypeData] = useState([]);
  const [propertyData, setPropertyData] = useState([]);
  const [currentPropertyId, setCurrentPropertyId] = useState(null);
  const [noOfAdult, setNoOfAdult] = useState(0);
  const [ratesData, setRatesData] = useState({});
  // const history = useHistory();

  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [{ userId }] = userCred || [{}];

  const hidePopUp = () => {
    close();
    form.resetFields();
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
    j += 1;
    setServicePanel([...servicePanel, j]);
  };

  const removeServicePanel = () => {
    if (serviceAmount !== 0) {
      const sum = parseInt(total, 10) - parseInt(serviceAmount, 10);
      setServiceAmount(0);
      setServicePrice(0);
      setServiceTax(0);
      setServiceAmt(0);
      setTotal(sum);
    }
    const oldarray = [...servicePanel];
    oldarray.pop();
    setServicePanel([...oldarray]);
  };

  const onFinish = async (values) => {
    values.perNight = price;
    values.nights = night;
    values.amt = amt;
    values.discountType = discountType;
    values.discount = discount;
    values.deposit = deposit;
    values.depositType = depositType;
    values.accomodation = accomodation;

    const guestData = [];
    const serviceDataNew = [];
    // values.acknowledge = radio;
    values.totalAmount = parseInt(total, 10) + parseInt(accomodation, 10);
    // values.total = parseInt(total) + parseInt(accomodation);

    panel.forEach((el) => {
      guestData.push(values[el]);
    });
    values.guestData = guestData;
    if (guestData.length > 1) {
      values.guest = guestData[0].fullName;
    } else {
      values.guest = 'No Guest';
    }

    servicePanel.forEach((ele) => {
      const data = values[ele].servicePrice * values[ele].serviceQuantity
        + (values[ele].servicePrice
          * values[ele].serviceQuantity
          * values[ele].serviceTax)
          / 100;
      values[ele].serviceAmount = data;
      serviceDataNew.push(values[ele]);
    });
    values.serviceData = serviceDataNew;
    values.propertyName = currentPropertyName;
    values.propertyId = currentPropertyId;
    values.channel = channel;
    values.commission = channelCommission;
    values.unitName = unitName;
    values.affiliateId = userId;
    const response = await userInstance.post('/addBooking', values);
    if (response.data.code === 200) {
      getData();
      close();
      toast.success('Booking created successfully!', { containerId: 'B' });
    } else {
      toast.error('Some error occurred!', { containerId: 'B' });
    }

    form.resetFields();
  };

  // const handleChange = (e) => {
  //   console.log('handleChange', e.target.value);
  // };

  const getPropertyData = useCallback(async () => {
    const response = await userInstance.post('/fetchProperty', {
      affiliateId: userId,
    });
    const data = response.data.propertiesData;
    if (response.data.code === 200) {
      setPropertyData(data);
    }
  }, [userId]);

  useEffect(() => {
    getPropertyData();
  }, [getPropertyData]);

  const calculateTotal = () => {
    const calculate = servicePrice * serviceAmt
      + servicePrice * serviceAmt * (serviceTax / 100);
    const sum = parseInt(total, 10) + parseInt(calculate, 10);
    setServiceAmount(calculate);
    setTotal(sum);
  };

  const onSelectProperty = async (value, event) => {
    setCurrentPropertyName(event.children);
    setCurrentPropertyId(value);
    const payload = {
      propertyId: value,
    };
    const response = await userInstance.post('/getService', payload);
    const data = response.data.servicData;
    const response2 = await userInstance.post('/getUnit', payload);
    const data2 = response2.data.unitData;
    await userInstance.post('/getUnittype', payload);
    // const data3 = response3.data.unittypeData;
    if (response.data.code === 200) {
      setServiceData(data);
    }

    if (response2.data.code === 200) {
      setUnitData(data2);
    }

    // if (response3.data.code === 200) {
    //   setUnitTypeData(data3);
    // }
  };

  const onSelectServices = (value) => {
    serviceData
      .filter((el) => el.serviceName === value)
      .map((filterService) => setCurrentService(filterService));

    // unitData
    //   .filter((el) => el.propertyId === value)
    //   .map((filterUnit) => setCurrentUnit(filterUnit));
  };

  // const enumerateDaysBetweenDates = (startDate, endDate) => {
  //   const dates = [];
  //   const currDate = moment(startDate).startOf('day');
  //   const lastDate = moment(endDate).startOf('day');

  //   do {
  //     dates.push(currDate.clone().toDate());
  //   } while (currDate.add(1, 'days').diff(lastDate) < 1);

  //   return dates;
  // };

  const onSelectAdult = (value) => {
    setNoOfAdult(value);

    seasonRatesData.forEach((el) => {
      const selectStartDate = moment(selectDate[0]._d);
      const selectEndDate = moment(selectDate[1]._d);
      const startDate = moment(el.startDate);
      const endDate = moment(el.endDate);
      const firstDate = (selectStartDate.isBefore(endDate)
          && selectStartDate.isAfter(startDate))
        || selectStartDate.isSame(startDate)
        || selectStartDate.isSame(endDate);
      const secondDate = (selectEndDate.isBefore(endDate) && selectEndDate.isAfter(startDate))
        || selectEndDate.isSame(startDate)
        || selectEndDate.isSame(endDate);
      if (firstDate && secondDate) {
        setRatesData(el);
      } else if (!firstDate && !secondDate) {
        // setRatesData(response.data.ratesData[0]);
      } else {
        // const d1 = new Date(startDate).getDate();
        // const d2 = new Date(selectStartDate).getDate();
        // const d3 = new Date(selectEndDate).getDate();
        // const diff = Math.abs(d1 - d2);
        // const ratesOne = calculatePerNight(diff, el, value);
        // const diff2 = 30 - Math.abs(d3 - d1);
        // const ratesSecond = calculatePerNight(diff2, ratesData, value);
      }
    });
  };

  const onSelectUnit = async (value, event) => {
    const unitname = event.children;
    const [unit] = unitData
      .filter((el) => el.unitName === unitname)
      .map((el) => el.unittypeId);

    const payload = {
      unittypeId: unit,
    };

    const response = await userInstance.post('/getRates', payload);
    // const ratesData = response.data.ratesData[0];
    setRatesData(response.data.ratesData[0]);
    setSeasonRatesData(response.data.seasonRatesData);

    // const selectStartDate = moment(selectDate[0]._d);
    // const selectEndDate = moment(selectDate[1]._d);
    // const days = enumerateDaysBetweenDates(selectDate[0]._d, selectDate[1]._d);
    // console.log(days);
    // days.forEach((element) => {
    //   console.log(moment(element).format('dddd'));
    // });

    // const { seasonRatesData } = response.data;

    // seasonRatesData.forEach((el) => {
    //   const selectStartDate = moment(selectDate[0]._d);
    //   const selectEndDate = moment(selectDate[1]._d);
    //   const startDate = moment(el.startDate);
    //   const endDate = moment(el.endDate);
    //   const firstDate =
    //     (selectStartDate.isBefore(endDate) &&
    //       selectStartDate.isAfter(startDate)) ||
    //     selectStartDate.isSame(startDate) ||
    //     selectStartDate.isSame(endDate);
    //   const secondDate =
    //     (selectEndDate.isBefore(endDate) && selectEndDate.isAfter(startDate)) ||
    //     selectEndDate.isSame(startDate) ||
    //     selectEndDate.isSame(endDate);
    //   if (firstDate && secondDate) {
    //     console.log('Normal Rates');
    //     setRatesData(el);
    //   } else if (firstDate) {
    //     console.log('Pehli date aati hai range me');
    //     const d1 = new Date(startDate);
    //     const d2 = new Date(selectStartDate);
    //     const diff = Math.abs(d1 - d2);
    //     const day = Math.floor(diff / (24 * 60 * 60 * 1000)) + 1;
    //     console.log(day);
    //     console.log(calculatePerNight(day, el));
    //   } else if (secondDate) {
    //     console.log('Dusri date aati hai range me');
    //   } else {
    //     console.log('Season Rates');
    //     setRatesData(response.data.ratesData[0]);
    //   }
    // });

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

  const onChangeDate = (value) => {
    if (value) {
      setSelectDate(value);
      const d1 = new Date(value[0]._d);
      const d2 = new Date(value[1]._d);
      const diff = Math.abs(d1 - d2);
      const day = Math.floor(diff / (24 * 60 * 60 * 1000)) + 1;
      setNight(day);
    }
  };

  // const calculatePerNight = (nights, ratesData, numOfAdult) => {
  //   // console.log(nights)
  //   // console.log(ratesData)
  //   // console.log(selectDate)
  //   // console.log(unitName)
  //   // console.log(numOfAdult)
  //   if (selectDate && unitName && numOfAdult > 0) {
  //     let pricePerNight = (
  //       Math.floor(
  //         ratesData.price_on_monday
  //           + ratesData.price_on_tuesday
  //           + ratesData.price_on_wednesday
  //           + ratesData.price_on_thursday
  //           + ratesData.price_on_friday
  //           + ratesData.price_on_saturday
  //           + ratesData.price_on_sunday,
  //       ) / 7
  //     ).toFixed(2);

  //     // console.log('pricePerNight', pricePerNight);
  //     if (parseInt(numOfAdult, 10) > ratesData.extra_guest) {
  //       pricePerNight = parseInt(pricePerNight, 10) + ratesData.extra_charge_on_guest;
  //     }

  //     // console.log('extra_guest', pricePerNight);
  //     if (nights < ratesData.short_stay) {
  //       pricePerNight = parseInt(pricePerNight, 10) + ratesData.extra_chage_on_stay;
  //     }

  //     // console.log('short_stay', pricePerNight);
  //     if (ratesData.tax_status === 'include') {
  //       const tax = Math.floor(
  //         (parseInt(pricePerNight, 10) * ratesData.tax) / 100,
  //       );
  //       pricePerNight = parseInt(pricePerNight, 10) + tax;
  //     }

  //     // console.log('tax_status', pricePerNight);

  //     let amt;
  //     if (nights >= 7) {
  //       const noOfWeeks = Math.floor(nights / 7);
  //       amt = nights * pricePerNight
  //         - noOfWeeks * ratesData.discount_price_per_week;
  //     } else if (nights === ratesData.customNights) {
  //       amt = nights * pricePerNight - ratesData.discount_price_custom_nights;
  //     } else if (nights >= 30) {
  //       const noOfMonths = Math.floor(nights / 30);
  //       amt = nights * pricePerNight
  //         - noOfMonths * ratesData.discount_price_per_month;
  //     } else {
  //       amt = nights * pricePerNight;
  //     }
  //     // console.log('amt', amt)
  //     const data = {
  //       pricePerNight,
  //       amt,
  //     };
  //     return data;
  //   }
  // };

  useEffect(() => {
    if (selectDate && unitName && noOfAdult > 0) {
      let pricePerNight = (
        Math.floor(
          ratesData.price_on_monday
            + ratesData.price_on_tuesday
            + ratesData.price_on_wednesday
            + ratesData.price_on_thursday
            + ratesData.price_on_friday
            + ratesData.price_on_saturday
            + ratesData.price_on_sunday,
        ) / 7
      ).toFixed(2);
      if (parseInt(noOfAdult, 10) > ratesData.extra_guest) {
        pricePerNight = parseInt(pricePerNight, 10) + ratesData.extra_charge_on_guest;
      }
      if (night < ratesData.short_stay) {
        pricePerNight = parseInt(pricePerNight, 10) + ratesData.extra_chage_on_stay;
      }
      if (ratesData.tax_status === 'include') {
        const tax = Math.floor(
          (parseInt(pricePerNight, 10) * ratesData.tax) / 100,
        );
        pricePerNight = parseInt(pricePerNight, 10) + tax;
      }
      setPrice(pricePerNight);
      form.setFieldsValue({ perNight: pricePerNight });
      if (night >= 7) {
        const noOfWeeks = Math.floor(night / 7);
        setAmt(
          night * pricePerNight - noOfWeeks * ratesData.discount_price_per_week,
        );
        setAccomodation(
          night * pricePerNight - noOfWeeks * ratesData.discount_price_per_week,
        );
      } else if (night === ratesData.customNights) {
        setAmt(night * pricePerNight - ratesData.discount_price_custom_nights);
        setAccomodation(
          night * pricePerNight - ratesData.discount_price_custom_nights,
        );
      } else if (night >= 30) {
        const noOfMonths = Math.floor(night / 30);
        setAmt(
          night * pricePerNight
            - noOfMonths * ratesData.discount_price_per_month,
        );
        setAccomodation(
          night * pricePerNight
            - noOfMonths * ratesData.discount_price_per_month,
        );
      } else {
        setAmt(night * pricePerNight);
        setAccomodation(night * pricePerNight);
      }
    }
  }, [selectDate, unitName, noOfAdult, ratesData, form, night]);

  const createGuestDetails = (
    <>
      {panel.map((el) => (
        <div className="addi-box" id={el}>
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
                      <Select.Option value={ele.label} key={ele.label}>
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
                  {t('bookingpop.heading2')}
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
      title={t('bookingpop.heading')}
      name="modal1"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      wrapClassName="create-booking-modal"
    >
      <Helmet>
        <body className={visible ? 'ant-scrolling-effect' : ''} />
      </Helmet>
      <Form form={form} name="basic" onFinish={onFinish}>
        <Row style={{ alignItems: 'center', padding: '0px 20px' }}>
          <Col span={12}>
            <Form.Item
              label={t('bookingpop.label1')}
              name="groupname"
              style={{ paddingRight: 20 }}
              onChange={onChangeDate}
              rules={[
                {
                  required: true,
                  message: t('bookingpop.rule1'),
                },
              ]}
            >
              <RangePicker onChange={onChangeDate} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Radio.Group name="radiogroup" defaultValue={1}>
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
                  message: t('bookingpop.rule2'),
                },
              ]}
            >
              <Select
                placeholder={t('strings.select')}
                onSelect={(value, event) => onSelectProperty(value, event)}
              >
                {propertyData.map((el) => (
                  <Select.Option value={el.id}>{el.propertyName}</Select.Option>
                ))}
              </Select>
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
                  message: t('bookingpop.rule3'),
                },
              ]}
            >
              <Select
                placeholder={t('strings.select')}
                onSelect={(value, event) => onSelectUnit(value, event)}
              >
                {unitData.map((el) => (
                  <Select.Option value={el.id}>{el.unitName}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              className="comision"
              label={t('strings.chanel_commission')}
              name="channel"
            >
              <Select
                placeholder={t('strings.select')}
                onSelect={(value, event) => fun5(value, event)}
                style={{ width: '70%', display: 'inline-block' }}
              >
                <Select.Option value="Airbnb">Airbnb</Select.Option>
                <Select.Option value="Booking">Booking</Select.Option>
              </Select>

              <Input
                placeholder="0,00"
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
                    message: t('bookingpop.rule4'),
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
                  message: t('bookingpop.rule5'),
                },
              ]}
            >
              <Select
                placeholder={t('strings.select')}
                onSelect={(value, event) => onSelectAdult(value, event)}
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
              label={t('bookingpop.label16')}
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
            <Form.Item label={t('bookingpop.label17')} name="children2">
              <Select placeholder={t('strings.select')}>
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
              <Collapse accordion>
                <Panel
                  icon={<PlusSquareOutlined />}
                  header={t('bookingpop.label18')}
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
                          {t('bookingpop.label2')}
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Panel>

                <Panel
                  icon={<PlusSquareOutlined />}
                  header={t('bookingpop.label19')}
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
                  header={t('bookingpop.label20')}
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
                <p>{t('bookingpop.label3')}</p>
              </Form.Item>
            </Col>

            <Col span={16}>
              <Form.Item>
                <div className="inline-form">
                  <label htmlFor="abc">
                    <input hidden />
                    {t('bookingpop.label4')}
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
                          message: t('bookingpop.rule5'),
                        },
                      ]}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Form.Item>
                  <label htmlFor="number">
                    <input hidden />
                    X
                  </label>
                  <Input
                    type="number"
                    placeholder="0 nights"
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
                    {t('bookingpop.label5')}
                  </label>
                  <Input
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
                  <label htmlFor="discount">
                    <input hidden />
                    X
                  </label>
                  <Form.Item name="discountType">
                    <Select
                      placeholder={t('bookingpop.rule6')}
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
                      discountType === '€'
                        ? amt - discountAmount
                        : amt - amt * (discountAmount / 100)
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
                  {t('bookingpop.label6')}
                </label>
                <span>
                  {t('bookingpop.label7')}
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
                {t('bookingpop.label8')}
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
                      {servicePanel.map((ele) => (
                        <div className="inline-form">
                          <div className="delete-data">
                            <DeleteOutlined
                              onClick={() => removeServicePanel(ele)}
                            />
                          </div>
                          <Col span={4}>
                            <Form.Item name={[ele, 'serviceName']}>
                              <Select
                                style={{ width: '100px' }}
                                placeholder={t('bookingpop.rule7')}
                                onSelect={(value, event) => onSelectServices(value, event)}
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
                            <Form.Item name={[ele, 'servicePrice']}>
                              <Select
                                placeholder={t('bookingpop.rule9')}
                                onSelect={(value) => setServicePrice(value)}
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
                            <Form.Item name={[ele, 'serviceQuantity']}>
                              <Input
                                type="number"
                                placeholder={t('bookingpop.rule8')}
                                onChange={(e) => setServiceAmt(e.target.value)}
                              />
                            </Form.Item>
                          </Col>

                          <label htmlFor="plus">
                            <input hidden />
                            +
                          </label>
                          <Col span={4}>
                            <Form.Item name={[ele, 'serviceTax']}>
                              <Input
                                type="number"
                                placeholder="%"
                                onChange={(e) => setServiceTax(e.target.value)}
                              />
                            </Form.Item>
                          </Col>

                          <label htmlFor="equal">
                            <input hidden />
                            =
                          </label>
                          <Col span={4}>
                            <Form.Item name={[ele, 'serviceAmount']}>
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
                      ))}
                    </div>
                  </Panel>
                </Collapse>
              </Form.Item>
            </Col>

            <Col span={24}>
              <div className="amnt-total">
                <h4>
                  {t('bookingpop.label10')}
                  :
                  {' '}
                  {Math.round(total * 100) / 100
                    + Math.round(accomodation * 100) / 100}
                  {' '}
                  €
                </h4>
              </div>

              <div className="deposit">
                <label htmlFor="discount">
                  <input hidden />
                  {t('bookingpop.label11')}
                </label>

                <div className="inline-form">
                  <label htmlFor="deposit">
                    <input hidden />
                    {t('bookingpop.label12')}
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
                      placeholder={t('bookingpop.label13')}
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
                  {t('bookingpop.label12')}
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
                  {t('bookingpop.label14')}
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
                  hidePopUp();
                }}
              >
                {t('strings.cancel')}
              </Button>
              <Button type="primary" htmlType="submit">
                {t('strings.save')}
                {' '}
                {t('strings.reservations')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

CreateBookingPopup.propTypes = {
  close: PropTypes.func,
  handleCancel: PropTypes.func,
  handleOk: PropTypes.func,
  getData: PropTypes.func,
  visible: PropTypes.bool,
};
CreateBookingPopup.defaultProps = {
  close: () => {},
  handleCancel: () => {},
  handleOk: () => {},
  getData: () => {},
  visible: false,
};

export default CreateBookingPopup;
