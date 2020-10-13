import React, { useEffect, useState, useCallback } from 'react';
import Helmet from 'react-helmet';
import './rates.css';
import {
  Button, Row, Col, Form, Select, Input, Switch, Checkbox,
} from 'antd';
import ReactQuill from 'react-quill';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { propertyInstance } from '../../axios/axiosconfig';
import CopyRatePopup from './copyratepopup';
import Wrapper from '../wrapper';
import favicon from '../../assets/images/logo-mobile.png';
import 'react-quill/dist/quill.snow.css';

const Rates = () => {
  const [form] = Form.useForm();
  const [value, setValue] = useState('');
  const [showCustomNights, setShowCustomNights] = useState(false);
  const [disabledInput, setDisabledInput] = useState(true);
  const [customNights, setCustomNights] = useState(14);
  const [lengthOfStay, setLengthOfStay] = useState(false);
  const [pricePerDayWeek, setPricePerDayWeek] = useState(false);
  const [minStayPerWeek, setMinStayPerWeek] = useState(false);
  const [occupancy, setOccupancy] = useState(false);
  const [shortStay, setshortStay] = useState(false);
  const [restriction, setRestriction] = useState(false);
  const [vat, setVat] = useState(false);
  const [nav, setNav] = useState(false);
  const [visisbleCopyRate, setVisisbleCopyRate] = useState(false);
  const [ratesId, setRatesId] = useState(0);
  // const [pricePerNIght, setPricePerNight] = useState(0);
  const { t } = useTranslation();
  const handleCancel = () => {
    setVisisbleCopyRate(false);
  };

  const days = {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  };
  const [checkInBox, setCheckInBox] = useState(days);
  const [checkOutBox, setCheckOutBox] = useState(days);
  const [selectAll, setSelectAll] = useState({
    checkIn: false,
    checkOut: false,
  });
  const [currency, setCurrency] = useState('$');

  function customPeriodChange(e) {
    setShowCustomNights(e.target.checked);
    if (e.target.checked) {
      setDisabledInput(false);
    } else {
      setDisabledInput(true);
    }
    setCustomNights(14);
  }
  function customInputChange(e) {
    if (!e.target.value) {
      setShowCustomNights(false);
    } else {
      setShowCustomNights(true);
    }
    setCustomNights(e.target.value);
  }

  const handleCheckInBox = (e) => {
    const day = e.target.id;
    if (day === 'monday') {
      return checkInBox.monday
        ? setCheckInBox({ ...checkInBox, monday: false })
        : setCheckInBox({ ...checkInBox, monday: true });
    }
    if (day === 'tuesday') {
      return checkInBox.tuesday
        ? setCheckInBox({ ...checkInBox, tuesday: false })
        : setCheckInBox({ ...checkInBox, tuesday: true });
    } if (day === 'wednesday') {
      return checkInBox.wednesday
        ? setCheckInBox({ ...checkInBox, wednesday: false })
        : setCheckInBox({ ...checkInBox, wednesday: true });
    } if (day === 'thursday') {
      return checkInBox.thursday
        ? setCheckInBox({ ...checkInBox, thursday: false })
        : setCheckInBox({ ...checkInBox, thursday: true });
    } if (day === 'friday') {
      return checkInBox.friday
        ? setCheckInBox({ ...checkInBox, friday: false })
        : setCheckInBox({ ...checkInBox, friday: true });
    } if (day === 'saturday') {
      return checkInBox.saturday
        ? setCheckInBox({ ...checkInBox, saturday: false })
        : setCheckInBox({ ...checkInBox, saturday: true });
    } if (day === 'sunday') {
      return checkInBox.sunday
        ? setCheckInBox({ ...checkInBox, sunday: false })
        : setCheckInBox({ ...checkInBox, sunday: true });
    }
    return true;
  };

  const handleSelectAllCheckIn = () => {
    if (selectAll.checkIn) {
      deSelectAll();
    } else {
      selectall();
    }
    return selectAll.checkIn
      ? setSelectAll({ ...selectAll, checkIn: false })
      : setSelectAll({ ...selectAll, checkIn: true });
  };

  const selectall = () => {
    setCheckInBox({
      ...checkInBox,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
    });
  };
  const deSelectAll = () => {
    setCheckInBox({
      ...checkInBox,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    });
  };

  const handleCheckOutBox = (e) => {
    const day = e.target.id;
    if (day === 'monday') {
      return checkOutBox.monday
        ? setCheckOutBox({ ...checkOutBox, monday: false })
        : setCheckOutBox({ ...checkOutBox, monday: true });
    } if (day === 'tuesday') {
      return checkOutBox.tuesday
        ? setCheckOutBox({ ...checkOutBox, tuesday: false })
        : setCheckOutBox({ ...checkOutBox, tuesday: true });
    } if (day === 'wednesday') {
      return checkOutBox.wednesday
        ? setCheckOutBox({ ...checkOutBox, wednesday: false })
        : setCheckOutBox({ ...checkOutBox, wednesday: true });
    } if (day === 'thursday') {
      return checkOutBox.thursday
        ? setCheckOutBox({ ...checkOutBox, thursday: false })
        : setCheckOutBox({ ...checkOutBox, thursday: true });
    } if (day === 'friday') {
      return checkOutBox.friday
        ? setCheckOutBox({ ...checkOutBox, friday: false })
        : setCheckOutBox({ ...checkOutBox, friday: true });
    } if (day === 'saturday') {
      return checkOutBox.saturday
        ? setCheckOutBox({ ...checkOutBox, saturday: false })
        : setCheckOutBox({ ...checkOutBox, saturday: true });
    } if (day === 'sunday') {
      return checkOutBox.sunday
        ? setCheckOutBox({ ...checkOutBox, sunday: false })
        : setCheckOutBox({ ...checkOutBox, sunday: true });
    }
    return true;
  };

  const handleSelectAllCheckOut = () => {
    if (selectAll.checkOut) {
      deSelectAllCheckeOut();
    } else {
      selectallCheckOut();
    }
    return selectAll.checkOut
      ? setSelectAll({ ...selectAll, checkOut: false })
      : setSelectAll({ ...selectAll, checkOut: true });
  };

  const selectallCheckOut = () => {
    setCheckOutBox({
      ...checkOutBox,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
    });
  };
  const deSelectAllCheckeOut = () => {
    setCheckOutBox({
      ...checkOutBox,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    });
  };

  const onFinish = async (values) => {
    values.id = ratesId;
    values.unitTypeId = localStorage.getItem('unitTypeV2Id');
    values.notes = value;
    values.checkIn_on_monday = checkInBox.monday;
    values.checkIn_on_tuesday = checkInBox.tuesday;
    values.checkIn_on_wednesday = checkInBox.wednesday;
    values.checkIn_on_thursday = checkInBox.thursday;
    values.checkIn_on_friday = checkInBox.friday;
    values.checkIn_on_saturday = checkInBox.saturday;
    values.checkIn_on_sunday = checkInBox.sunday;
    values.checkOut_on_monday = checkOutBox.monday;
    values.checkOut_on_tuesday = checkOutBox.tuesday;
    values.checkOut_on_wednesday = checkOutBox.wednesday;
    values.checkOut_on_thursday = checkOutBox.thursday;
    values.checkOut_on_friday = checkOutBox.friday;
    values.checkOut_on_saturday = checkOutBox.saturday;
    values.checkOut_on_sunday = checkOutBox.sunday;
    const response = await propertyInstance.post('/addRates', values);
    const statusCode = response.data.code;
    if (statusCode === 200) {
      toast.success('Rate added successfully', { containerId: 'B' });
    } else {
      toast.error('server error please try again', { containerId: 'B' });
    }
  };

  const fetchData = useCallback(async () => {
    const payload = {
      unittypeId: localStorage.getItem('unitTypeV2Id'),
    };
    const response = await propertyInstance.post('getRates', payload);
    if (response.data.code === 200) {
      if (response.data.ratesData.length > 0) {
        const data = response.data.ratesData[0];
        setRatesId(data.id);
        setLengthOfStay(false);
        setPricePerDayWeek(false);
        setMinStayPerWeek(false);
        setOccupancy(false);
        setshortStay(false);
        setRestriction(false);
        setVat(false);
        setNav(false);

        form.setFieldsValue({
          rateName: data.rateName,
          currency: data.currency,
          pricePerNight: data.price_per_night,
          minStay: data.minimum_stay,
          weeklyPrice: data.discount_price_per_week,
          monthlyPrice: data.discount_price_per_month,
          customNightsPrice: data.discount_price_custom_nights,
          priceOnMon: data.price_on_monday,
          priceOnTues: data.price_on_tuesday,
          priceOnWed: data.price_on_wednesday,
          priceOnThu: data.price_on_thursday,
          priceOnFri: data.price_on_friday,
          priceOnSat: data.price_on_saturday,
          priceOnSun: data.price_on_sunday,
          minStayOnMon: data.minimum_stay_on_monday,
          minStayOnTues: data.minimum_stay_on_tuesday,
          minStayOnWed: data.minimum_stay_on_wednesday,
          minStayOnThu: data.minimum_stay_on_thursday,
          minStayOnFri: data.minimum_stay_on_friday,
          minStayOnSat: data.minimum_stay_on_saturday,
          minStayOnSun: data.minimum_stay_on_sunday,
          extraCharge: data.extra_charge_on_guest,
          extraGuest: data.extra_guest,
          shortStayNight: data.short_stay,
          shortStayPrice: data.extra_chage_on_stay,
          tax: data.tax_status,
          taxPer: data.tax,
        });
        if (data.notes) {
          setValue(data.notes);
        }
        setCheckInBox({
          ...checkInBox,
          monday: data.checkIn_on_monday,
          tuesday: data.checkIn_on_tuesday,
          wednesday: data.checkIn_on_wednesday,
          thursday: data.checkIn_on_thursday,
          friday: data.checkIn_on_friday,
          saturday: data.checkIn_on_saturday,
          sunday: data.checkIn_on_sunday,
        });
        setCheckOutBox({
          ...checkOutBox,
          monday: data.checkOut_on_monday,
          tuesday: data.checkOut_on_tuesday,
          wednesday: data.checkOut_on_wednesday,
          thursday: data.checkOut_on_thursday,
          friday: data.checkOut_on_friday,
          saturday: data.checkOut_on_saturday,
          sunday: data.checkOut_on_sunday,
        });
      }
    }
    // eslint-disable-next-line
  }, []);

  const onChangePricePerNight = (pricePerNight) => {
    form.setFieldsValue({
      priceOnMon: pricePerNight,
      priceOnTues: pricePerNight,
      priceOnWed: pricePerNight,
      priceOnThu: pricePerNight,
      priceOnFri: pricePerNight,
      priceOnSat: pricePerNight,
      priceOnSun: pricePerNight,
    });
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCurrencySelect = (e) => {
    setCurrency(e === 'USD' ? '$' : '€');
  };

  const negativeCheck = (e) => {
    if (e.keyCode === 109) {
      e.preventDefault();
    }
  };

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
        <body className="rates-page-view" />
      </Helmet>

      <div className="rates-page">
        <Row>
          <Col span={24}>
            <div className="rates-content">
              <Form form={form} onFinish={onFinish}>
                <div className="rate-first-section">
                  <h3>{t('rates.heading1')}</h3>
                  <Row>
                    <Col span={12}>
                      <Form.Item name="rateName">
                        <Input
                          placeholder={t('rates.placeholder1')}
                          // defaultValue="Default Rate"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={1} />
                    <Col span={8}>
                      <Form.Item name="currency">
                        <Select
                          placeholder={t('rates.placeholder2')}
                          onSelect={handleCurrencySelect}
                        >
                          <Select.Option value="USD">{t('rates.option1')}</Select.Option>
                          <Select.Option value="EUR">{t('rates.option2')}</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </div>

                <div className="rate-second-section">
                  <h3>{t('rates.heading2')}</h3>
                  <p>
                    {t('rates.paragraph1')}
                    {t('rates.paragraph2')}
                    {t('rates.paragraph3')}
                  </p>
                  <Row>
                    <Col span={6}>
                      <Form.Item
                        name="pricePerNight"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter price!',
                          },
                        ]}
                      >
                        <Input
                          placeholder={currency}
                          onChange={(e) => onChangePricePerNight(e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={1} />
                    <Col span={6}>
                      <Form.Item name="minStay">
                        <Input placeholder={t('rates.placeholder4')} />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>

                <div className="toggle-box-section">
                  <h3>
                    {t('rates.heading3')}
                    {' '}
                    <Switch
                      // checked={lengthOfStay}
                      onClick={() => setLengthOfStay(!lengthOfStay)}
                    />
                  </h3>
                  <p>
                    {t('rates.paragraph4')}
                    {t('rates.paragraph5')}
                  </p>

                  <div
                    className={`toggle-content ${lengthOfStay ? 'show' : ''}`}
                  >
                    <Row>
                      <Col span={6}>
                        <Form.Item name="weeklyPrice" label="Weekly">
                          <Input placeholder={currency} />
                        </Form.Item>
                      </Col>
                      <Col span={1} />
                      <Col span={6}>
                        <Form.Item name="monthlyPrice" label="Monthly">
                          <Input placeholder={currency} />
                        </Form.Item>
                      </Col>
                      <Col span={1} />
                      <Col span={6}>
                        <Form.Item
                          name="customNightsPrice"
                          label={`${customNights} Nights`}
                          hidden={!showCustomNights}
                        >
                          <Input placeholder={t('rates.placeholder5')} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <Form.Item className="custom-period">
                          <Checkbox onChange={customPeriodChange}>
                            {t('rates.check')}
                          </Checkbox>
                          <Input
                            onChange={customInputChange}
                            disabled={disabledInput}
                            defaultValue={customNights}
                          />
                          <span>{t('rates.span1')}</span>
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                </div>

                <div className="toggle-box-section">
                  <h3>
                    {t('rates.heading4')}
                    {' '}
                    <Switch
                      // checked={pricePerDayWeek}
                      onClick={() => setPricePerDayWeek(!pricePerDayWeek)}
                    />
                  </h3>
                  <p>
                    {t('rates.paragraph6')}
                    {t('rates.paragraph7')}
                    {' '}
                    <span>&quot;</span>
                    {t('rates.paragraph8')}
                    <span>&quot;</span>
                    {' '}
                    {t('rates.paragraph9')}
                    <span>&quot;</span>
                    {t('rates.paragraph10')}
                    <span>&quot;</span>
                    {' '}
                    {t('rates.paragraph11')}
                    <span>&quot;</span>
                    {t('rates.paragraph12')}
                    <span>&quot;</span>
                    {' '}
                    {t('rates.paragraph13')}
                  </p>

                  <div
                    className={`toggle-content ${
                      pricePerDayWeek ? 'show' : ''
                    }`}
                  >
                    <Row>
                      <Col span={24}>
                        <div className="weekend-input">
                          <Form.Item
                            label="Mo"
                            name="priceOnMon"
                            rules={[
                              {
                                required: true,
                                message: 'Input must be valid number!',
                              },
                            ]}
                          >
                            <Input placeholder={currency} />
                          </Form.Item>
                          <Form.Item
                            label={t('rates.label1')}
                            name="priceOnTues"
                            rules={[
                              {
                                required: true,
                                message: 'Input must be valid number!',
                              },
                            ]}
                          >
                            <Input placeholder={currency} />
                          </Form.Item>
                          <Form.Item
                            label={t('rates.label2')}
                            name="priceOnWed"
                            rules={[
                              {
                                required: true,
                                message: 'Input must be valid number!',
                              },
                            ]}
                          >
                            <Input placeholder={currency} />
                          </Form.Item>
                          <Form.Item
                            label={t('rates.label3')}
                            name="priceOnThu"
                            rules={[
                              {
                                required: true,
                                message: 'Input must be valid number!',
                              },
                            ]}
                          >
                            <Input placeholder={currency} />
                          </Form.Item>
                          <Form.Item
                            label={t('rates.label4')}
                            name="priceOnFri"
                            rules={[
                              {
                                required: true,
                                message: 'Input must be valid number!',
                              },
                            ]}
                          >
                            <Input placeholder={currency} />
                          </Form.Item>
                          <Form.Item
                            label={t('rates.label5')}
                            name="priceOnSat"
                            rules={[
                              {
                                required: true,
                                message: 'Input must be valid number!',
                              },
                            ]}
                          >
                            <Input placeholder={currency} />
                          </Form.Item>
                          <Form.Item
                            label={t('rates.label6')}
                            name="priceOnSun"
                            rules={[
                              {
                                required: true,
                                message: 'Input must be valid number!',
                              },
                            ]}
                          >
                            <Input placeholder={currency} />
                          </Form.Item>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>

                <div className="toggle-box-section">
                  <h3>
                    {t('rates.heading5')}
                    {' '}
                    <Switch
                      // checked={minStayPerWeek}
                      onClick={() => setMinStayPerWeek(!minStayPerWeek)}
                    />
                  </h3>
                  <p>
                    {t('rates.paragraph14')}
                    {t('rates.paragraph15')}
                  </p>

                  <div
                    className={`toggle-content ${minStayPerWeek ? 'show' : ''}`}
                  >
                    <Row>
                      <Col span={24}>
                        <div className="weekend-input">
                          <Form.Item
                            label={t('rates.label7')}
                            name="minStayOnMon"
                          >
                            <Input placeholder={t('rates.placeholder12')} />
                          </Form.Item>
                          <Form.Item
                            label={t('rates.label8')}
                            name="minStayOnTues"
                          >
                            <Input placeholder={t('rates.placeholder12')} />
                          </Form.Item>
                          <Form.Item
                            label={t('rates.label2')}
                            name="minStayOnWed"
                          >
                            <Input placeholder={t('rates.placeholder12')} />
                          </Form.Item>
                          <Form.Item
                            label={t('rates.label3')}
                            name="minStayOnThu"
                          >
                            <Input placeholder={t('rates.placeholder12')} />
                          </Form.Item>
                          <Form.Item
                            label={t('rates.label4')}
                            name="minStayOnFri"
                          >
                            <Input placeholder={t('rates.placeholder12')} />
                          </Form.Item>
                          <Form.Item
                            label={t('rates.label5')}
                            name="minStayOnSat"
                          >
                            <Input placeholder={t('rates.placeholder12')} />
                          </Form.Item>
                          <Form.Item
                            label={t('rates.label6')}
                            name="minStayOnSun"
                          >
                            <Input placeholder={t('rates.placeholder12')} />
                          </Form.Item>
                          <Form.Item>
                            <span>{t('rates.span2')}</span>
                          </Form.Item>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>

                <div className="toggle-box-section">
                  <h3>
                    {t('rates.heading6')}
                    {' '}
                    <Switch
                      // checked={occupancy}
                      onClick={() => setOccupancy(!occupancy)}
                    />
                  </h3>
                  <p>{t('rates.paragraph16')}</p>

                  <div className={`toggle-content ${occupancy ? 'show' : ''}`}>
                    <Row>
                      <Col span={6}>
                        <Form.Item
                          className="occupancy-input"
                          name="extraCharge"
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: 'Input must be valid number!',
                          //   },
                          // ]}
                        >
                          <Input placeholder={currency} />
                          <span>{t('rates.span3')}</span>
                        </Form.Item>

                      </Col>
                      <Col span={1} />
                      <Col span={6}>
                        <Form.Item name="extraGuest">
                          <Select placeholder={t('rates.placeholder13')}>
                            <Select.Option value="1">
                              {t('rates.option3')}
                            </Select.Option>
                            <Select.Option value="2">
                              {t('rates.option4')}
                            </Select.Option>
                            <Select.Option value="3">
                              {t('rates.option5')}
                            </Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                </div>

                <div className="toggle-box-section">
                  <h3>
                    {t('rates.heading7')}
                    {' '}
                    <Switch
                      // checked={shortStay}
                      onClick={() => setshortStay(!shortStay)}
                    />
                  </h3>
                  <p>
                    {t('rates.paragraph17')}
                    {t('rates.paragraph18')}
                  </p>

                  <div className={`toggle-content ${shortStay ? 'show' : ''}`}>
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          name="shortStayNight"
                          className="stay-input"
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: 'Input must be valid number!',
                          //     whitespace: true,
                          //   },
                          // ]}
                        >
                          {' '}
                          <span>{t('rates.span4')}</span>
                          <Input type="number" placeholder={t('rates.placeholder14')} />
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <Form.Item
                          name="shortStayPrice"
                          className="stay-input"
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: 'Input must be valid number!',
                          //     whitespace: true,
                          //   },
                          // ]}
                        >
                          <span>{t('rates.span5')}</span>
                          <Input type="number" placeholder={currency} />
                        </Form.Item>

                      </Col>
                    </Row>
                  </div>
                </div>

                <div className="toggle-box-section">
                  <h3>
                    {t('rates.heading8')}
                    {' '}
                    <Switch
                      // checked={restriction}
                      onClick={() => setRestriction(!restriction)}
                    />
                  </h3>
                  <p>
                    {t('rates.paragraph19')}
                    {t('rates.paragraph20')}
                  </p>

                  <div
                    className={`toggle-content ${restriction ? 'show' : ''}`}
                  >
                    <Row>
                      <Col span={24}>
                        <div className="checkin-box">
                          <span className="checkin-label">{t('rates.span6')}</span>

                          <Form.Item name="monday" label={t('rates.label7')}>
                            <Checkbox
                              value={checkInBox.monday}
                              onChange={handleCheckInBox}
                              checked={checkInBox.monday}
                            />
                          </Form.Item>
                          <Form.Item name="tuesday" label={t('rates.label8')}>
                            <Checkbox
                              value={checkInBox.tuesday}
                              onChange={handleCheckInBox}
                              checked={checkInBox.tuesday}
                            />
                          </Form.Item>
                          <Form.Item name="wednesday" label={t('rates.label2')}>
                            <Checkbox
                              value={checkInBox.wednesday}
                              onChange={handleCheckInBox}
                              checked={checkInBox.wednesday}
                            />
                          </Form.Item>
                          <Form.Item name="thursday" label={t('rates.label3')}>
                            <Checkbox
                              value={checkInBox.thursday}
                              onChange={handleCheckInBox}
                              checked={checkInBox.thursday}
                            />
                          </Form.Item>
                          <Form.Item name="friday" label={t('rates.label4')}>
                            <Checkbox
                              value={checkInBox.friday}
                              onChange={handleCheckInBox}
                              checked={checkInBox.friday}
                            />
                          </Form.Item>
                          <Form.Item name="saturday" label={t('rates.label5')}>
                            <Checkbox
                              value={checkInBox.saturday}
                              onChange={handleCheckInBox}
                              checked={checkInBox.saturday}
                            />
                          </Form.Item>
                          <Form.Item name="sunday" label={t('rates.label6')}>
                            <Checkbox
                              value={checkInBox.sunday}
                              onChange={handleCheckInBox}
                              checked={checkInBox.sunday}
                            />
                          </Form.Item>
                          <Form.Item
                            className="check-selectall"
                            label={t('rates.label9')}
                          >
                            <Checkbox
                              value={selectAll.checkIn}
                              onChange={handleSelectAllCheckIn}
                            />
                          </Form.Item>
                        </div>

                        <div className="checkin-box">
                          <span className="checkin-label">{t('rates.span7')}</span>
                          <Form.Item name="monday" label={t('rates.label7')}>
                            <Checkbox
                              value={checkOutBox.monday}
                              onChange={handleCheckOutBox}
                              checked={checkOutBox.monday}
                            />
                          </Form.Item>
                          <Form.Item name="tuesday" label={t('rates.label8')}>
                            <Checkbox
                              value={checkOutBox.tuesday}
                              onChange={handleCheckOutBox}
                              checked={checkOutBox.tuesday}
                            />
                          </Form.Item>
                          <Form.Item name="wednesday" label={t('rates.label2')}>
                            <Checkbox
                              value={checkOutBox.wednesday}
                              onChange={handleCheckOutBox}
                              checked={checkOutBox.wednesday}
                            />
                          </Form.Item>
                          <Form.Item name="thursday" label={t('rates.label3')}>
                            <Checkbox
                              value={checkOutBox.thursday}
                              onChange={handleCheckOutBox}
                              checked={checkOutBox.thursday}
                            />
                          </Form.Item>
                          <Form.Item name="friday" label={t('rates.label4')}>
                            <Checkbox
                              value={checkOutBox.friday}
                              onChange={handleCheckOutBox}
                              checked={checkOutBox.friday}
                            />
                          </Form.Item>
                          <Form.Item name="saturday" label={t('rates.label5')}>
                            <Checkbox
                              value={checkOutBox.saturday}
                              onChange={handleCheckOutBox}
                              checked={checkOutBox.saturday}
                            />
                          </Form.Item>
                          <Form.Item name="sunday" label={t('rates.label6')}>
                            <Checkbox
                              value={checkOutBox.sunday}
                              onChange={handleCheckOutBox}
                              checked={checkOutBox.sunday}
                            />
                          </Form.Item>

                          <Form.Item
                            className="check-selectall"
                            label={t('rates.label9')}
                          >
                            <Checkbox
                              value={selectAll.checkOut}
                              onChange={handleSelectAllCheckOut}
                            />
                          </Form.Item>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>

                <div className="toggle-box-section">
                  <h3>
                    {t('rates.heading9')}
                    {' '}
                    <Switch
                      // checked={vat}
                      onClick={() => setVat(!vat)}
                    />
                  </h3>
                  <p>{t('rates.paragraph21')}</p>
                  <div className={`toggle-content ${vat ? 'show' : ''}`}>
                    <Row>
                      <Col span={8}>
                        <Form.Item name="tax">
                          <Select placeholder={t('rates.placeholder15')}>
                            <Select.Option value="include">
                              {t('rates.option6')}
                            </Select.Option>
                            <Select.Option value="exclude">
                              {t('rates.option7')}
                            </Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={1} />
                      <Col span={6}>
                        <Form.Item name="taxPer">
                          <Input placeholder={t('rates.placeholder16')} onKeyDown={negativeCheck} />
                        </Form.Item>
                      </Col>
                      <Col span={24} className="sales-text">
                        <span>
                          {t('rates.span8')}
                          {t('rates.span9')}
                        </span>
                        <span>
                          {t('rates.span10')}
                          {t('rates.span11')}
                        </span>
                      </Col>
                    </Row>
                  </div>
                </div>

                <div className="toggle-box-section">
                  <h3>
                    {t('rates.heading10')}
                    {' '}
                    <Switch
                      checked={nav}
                      onClick={() => setNav(!nav)}
                    />
                  </h3>
                  <p>{t('rates.paragraph22')}</p>

                  <div className={`toggle-content ${nav ? 'show' : ''}`}>
                    <Row>
                      <Col span={24}>
                        <ReactQuill
                          defaultValue={value}
                          theme="snow"
                          value={value}
                          onChange={setValue}
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="toggle-box-button">
                  <Button
                    className="gray-btn"
                    onClick={() => setVisisbleCopyRate(true)}
                  >
                    {t('rates.button1')}
                  </Button>
                  <Button type="primary" htmlType="submit">
                    {t('rates.button2')}
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
      <CopyRatePopup visible={visisbleCopyRate} handleCancel={handleCancel} fetchData={fetchData} />
    </Wrapper>
  );
};

export default Rates;
