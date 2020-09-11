import React, { useState, useEffect, useCallback } from 'react';
import Helmet from 'react-helmet';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import './rates.css';
import {
  Button,
  Row,
  Col,
  Form,
  Select,
  Input,
  Switch,
  Checkbox,
  DatePicker,
} from 'antd';
import { toast } from 'react-toastify';
import { LeftOutlined } from '@ant-design/icons';
import moment from 'moment';
import Wrapper from '../wrapper';
import favicon from '../../assets/images/logo-mobile.png';

import { propertyInstance } from '../../axios/axiosconfig';

const CreateSeasonRates = () => {
  const { RangePicker } = DatePicker;
  const history = useHistory();

  const [form] = Form.useForm();
  const [showCustomNights, setShowCustomNights] = useState(false);
  const [disabledInput, setDisabledInput] = useState(true);
  const [nights, setNights] = useState(14);
  const [lengthOfStay, setLengthOfStay] = useState(false);
  const [pricePerDayWeek, setPricePerDayWeek] = useState(false);
  const [minStayPerWeek, setMinStayPerWeek] = useState(false);
  const [occupancy, setOccupancy] = useState(false);
  const [shortStay, setshortStay] = useState(false);
  const [restriction, setRestriction] = useState(false);

  const goBack = () => {
    history.push('/seasonrates');
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

  function customPeriodChange(e) {
    setShowCustomNights(e.target.checked);
    if (e.target.checked) {
      setDisabledInput(false);
    } else {
      setDisabledInput(true);
    }
    setNights(14);
  }
  function customInputChange(e) {
    if (!e.target.value) {
      setShowCustomNights(false);
    } else {
      setShowCustomNights(true);
    }
    setNights(e.target.value);
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
    }
    if (day === 'wednesday') {
      return checkInBox.wednesday
        ? setCheckInBox({ ...checkInBox, wednesday: false })
        : setCheckInBox({ ...checkInBox, wednesday: true });
    }
    if (day === 'thursday') {
      return checkInBox.thursday
        ? setCheckInBox({ ...checkInBox, thursday: false })
        : setCheckInBox({ ...checkInBox, thursday: true });
    }
    if (day === 'friday') {
      return checkInBox.friday
        ? setCheckInBox({ ...checkInBox, friday: false })
        : setCheckInBox({ ...checkInBox, friday: true });
    }
    if (day === 'saturday') {
      return checkInBox.saturday
        ? setCheckInBox({ ...checkInBox, saturday: false })
        : setCheckInBox({ ...checkInBox, saturday: true });
    }
    if (day === 'sunday') {
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
    }
    if (day === 'tuesday') {
      return checkOutBox.tuesday
        ? setCheckOutBox({ ...checkOutBox, tuesday: false })
        : setCheckOutBox({ ...checkOutBox, tuesday: true });
    }
    if (day === 'wednesday') {
      return checkOutBox.wednesday
        ? setCheckOutBox({ ...checkOutBox, wednesday: false })
        : setCheckOutBox({ ...checkOutBox, wednesday: true });
    }
    if (day === 'thursday') {
      return checkOutBox.thursday
        ? setCheckOutBox({ ...checkOutBox, thursday: false })
        : setCheckOutBox({ ...checkOutBox, thursday: true });
    }
    if (day === 'friday') {
      return checkOutBox.friday
        ? setCheckOutBox({ ...checkOutBox, friday: false })
        : setCheckOutBox({ ...checkOutBox, friday: true });
    }
    if (day === 'saturday') {
      return checkOutBox.saturday
        ? setCheckOutBox({ ...checkOutBox, saturday: false })
        : setCheckOutBox({ ...checkOutBox, saturday: true });
    }
    if (day === 'sunday') {
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
    const params = queryString.parse(window.location.search);
    values.id = params.seasonRateId;
    values.unitTypeId = localStorage.getItem('propertyV2Id');
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

    const response = await propertyInstance.post('/addSeasonRates', values);
    const statusCode = response.data.code;
    if (statusCode === 200) {
      toast.success('Season rates update successfully', { containerId: 'B' });
      // form.resetFields();
    } else {
      toast.error('server error please try again', { containerId: 'B' });
    }
  };

  const fetchData = useCallback(async () => {
    const values = queryString.parse(window.location.search);
    const { seasonRateId } = values;
    if (seasonRateId !== undefined) {
      const response = await propertyInstance.get(`/getSeasonRate/${seasonRateId}`);
      if (response.data.code === 200) {
        const data = response.data.seasonRateData[0];
        let m1;
        let m2;
        if (data.startDate && data.endDate) {
          m1 = moment(data.startDate);
          m2 = moment(data.endDate);
        }
        setLengthOfStay(true);
        setPricePerDayWeek(true);
        setMinStayPerWeek(true);
        setOccupancy(true);
        setshortStay(true);
        setRestriction(true);

        form.setFieldsValue({
          seasonRate: data.seasonRateName,
          groupname: [m1, m2],
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
        });
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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
        <body className="season-page-view" />
      </Helmet>

      <div className="rates-page create-season-rate">
        <Row>
          <Col span={24}>
            <div className="rates-content">
              <Form form={form} onFinish={onFinish}>
                <div className="rate-first-section">
                  <div className="go-back" onClick={goBack} role="presentation">
                    <LeftOutlined />
                    {' '}
                    Go back
                  </div>
                  <h3>Season name and date periods</h3>
                  <p>
                    Give your season a descriptive name, e.g.
                    {' '}
                    <span>&quot;</span>
                    High Season
                    <span>&quot;</span>
                    {' '}
                    or
                    <span>&quot;</span>
                    Low Season
                    <span>&quot;</span>
                    {' '}
                    and define for which date period this
                    season should apply to
                  </p>
                  <Row style={{ alignItems: 'flex-end' }}>
                    <Col span={11}>
                      <Form.Item name="seasonRate">
                        <Input placeholder="e.g. High Season or Low Season" />
                      </Form.Item>
                    </Col>
                    <Col span={2} />
                    <Col span={11}>
                      <Form.Item label="Date Periods" name="groupname">
                        <RangePicker />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>

                <div className="rate-second-section">
                  <h3>Price per night & Min stay</h3>
                  <p>
                    Set the default price per night and minimum stay guests will
                    see for your listing and check how the values are displayed
                    in your website
                  </p>
                  <Row>
                    <Col span={6}>
                      <Form.Item
                        name="pricePerNight"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter price!',
                            whitespace: true,
                          },
                        ]}
                      >
                        <Input placeholder="$ 100" />
                      </Form.Item>
                    </Col>
                    <Col span={1} />
                    <Col span={6}>
                      <Form.Item name="minStay">
                        <Input placeholder="nights 1" />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>

                <div className="toggle-box-section">
                  <h3>
                    Length-of-stay prices
                    {' '}
                    <Switch
                      checked={lengthOfStay}
                      onClick={() => setLengthOfStay(!lengthOfStay)}
                    />
                  </h3>
                  <p>
                    Set discounted prices for reservations that are 7 nights or
                    longer. Add additional prices per week and per month.
                  </p>

                  <div
                    className={`toggle-content ${lengthOfStay ? 'show' : ''}`}
                  >
                    <Row>
                      <Col span={6}>
                        <Form.Item name="weeklyPrice" label="Weekly">
                          <Input placeholder="$" />
                        </Form.Item>
                      </Col>
                      <Col span={1} />
                      <Col span={6}>
                        <Form.Item name="monthlyPrice" label="Monthly">
                          <Input placeholder="$" />
                        </Form.Item>
                      </Col>
                      <Col span={1} />
                      <Col span={6}>
                        <Form.Item
                          name="customNightsPrice"
                          label={`${nights} Nights`}
                          hidden={!showCustomNights}
                        >
                          <Input placeholder="$" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <Form.Item className="custom-period">
                          <Checkbox onChange={customPeriodChange}>
                            Custom Period
                          </Checkbox>
                          <Input
                            onChange={customInputChange}
                            disabled={disabledInput}
                            defaultValue={nights}
                          />
                          <span>Nights</span>
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                </div>

                <div className="toggle-box-section">
                  <h3>
                    Price per weekday
                    {' '}
                    <Switch
                      checked={pricePerDayWeek}
                      onClick={() => setPricePerDayWeek(!pricePerDayWeek)}
                    />
                  </h3>
                  <p>
                    Set here a different nightly rate depending on the day of
                    the week. In case you have both
                    {' '}
                    <span>&quot;</span>
                    Price per night
                    <span>&quot;</span>
                    {' '}
                    and
                    <span>&quot;</span>
                    Price per weekday
                    <span>&quot;</span>
                    {' '}
                    settings,
                    <span>&quot;</span>
                    Price per weekday
                    <span>&quot;</span>
                    {' '}
                    will be applied.
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
                                whitespace: true,
                              },
                            ]}
                          >
                            <Input placeholder="$ 100" />
                          </Form.Item>
                          <Form.Item
                            label="Tu"
                            name="priceOnTues"
                            rules={[
                              {
                                required: true,
                                message: 'Input must be valid number!',
                                whitespace: true,
                              },
                            ]}
                          >
                            <Input placeholder="$ 100" />
                          </Form.Item>
                          <Form.Item
                            label="We"
                            name="priceOnWed"
                            rules={[
                              {
                                required: true,
                                message: 'Input must be valid number!',
                                whitespace: true,
                              },
                            ]}
                          >
                            <Input placeholder="$ 100" />
                          </Form.Item>
                          <Form.Item
                            label="Th"
                            name="priceOnThu"
                            rules={[
                              {
                                required: true,
                                message: 'Input must be valid number!',
                                whitespace: true,
                              },
                            ]}
                          >
                            <Input placeholder="$ 100" />
                          </Form.Item>
                          <Form.Item
                            label="Fr"
                            name="priceOnFri"
                            rules={[
                              {
                                required: true,
                                message: 'Input must be valid number!',
                                whitespace: true,
                              },
                            ]}
                          >
                            <Input placeholder="$ 100" />
                          </Form.Item>
                          <Form.Item
                            label="Sa"
                            name="priceOnSat"
                            rules={[
                              {
                                required: true,
                                message: 'Input must be valid number!',
                                whitespace: true,
                              },
                            ]}
                          >
                            <Input placeholder="$ 100" />
                          </Form.Item>
                          <Form.Item
                            label="Su"
                            name="priceOnSun"
                            rules={[
                              {
                                required: true,
                                message: 'Input must be valid number!',
                                whitespace: true,
                              },
                            ]}
                          >
                            <Input placeholder="$ 100" />
                          </Form.Item>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>

                <div className="toggle-box-section">
                  <h3>
                    Minimum stay per weekday
                    {' '}
                    <Switch
                      checked={minStayPerWeek}
                      onClick={() => setMinStayPerWeek(!minStayPerWeek)}
                    />
                  </h3>
                  <p>
                    Set a different minimum stay depending on the day of the
                    week.
                  </p>

                  <div
                    className={`toggle-content ${minStayPerWeek ? 'show' : ''}`}
                  >
                    <Row>
                      <Col span={24}>
                        <div className="weekend-input">
                          <Form.Item
                            label="Mo"
                            name="minStayOnMon"
                            rules={[
                              {
                                required: true,
                                message: 'Input must be valid number!',
                                whitespace: true,
                              },
                            ]}
                          >
                            <Input placeholder="$ 100" />
                          </Form.Item>
                          <Form.Item
                            label="Tu"
                            name="minStayOnTues"
                            rules={[
                              {
                                required: true,
                                message: 'Input must be valid number!',
                                whitespace: true,
                              },
                            ]}
                          >
                            <Input placeholder="$ 100" />
                          </Form.Item>
                          <Form.Item
                            label="We"
                            name="minStayOnWed"
                            rules={[
                              {
                                required: true,
                                message: 'Input must be valid number!',
                                whitespace: true,
                              },
                            ]}
                          >
                            <Input placeholder="$ 100" />
                          </Form.Item>
                          <Form.Item
                            label="Th"
                            name="minStayOnThu"
                            rules={[
                              {
                                required: true,
                                message: 'Input must be valid number!',
                                whitespace: true,
                              },
                            ]}
                          >
                            <Input placeholder="$ 100" />
                          </Form.Item>
                          <Form.Item
                            label="Fr"
                            name="minStayOnFri"
                            rules={[
                              {
                                required: true,
                                message: 'Input must be valid number!',
                                whitespace: true,
                              },
                            ]}
                          >
                            <Input placeholder="$ 100" />
                          </Form.Item>
                          <Form.Item
                            label="Sa"
                            name="minStayOnSat"
                            rules={[
                              {
                                required: true,
                                message: 'Input must be valid number!',
                                whitespace: true,
                              },
                            ]}
                          >
                            <Input placeholder="$ 100" />
                          </Form.Item>
                          <Form.Item
                            label="Su"
                            name="minStayOnSun"
                            rules={[
                              {
                                required: true,
                                message: 'Input must be valid number!',
                                whitespace: true,
                              },
                            ]}
                          >
                            <Input placeholder="$ 100" />
                          </Form.Item>
                          <Form.Item>
                            <span>nights</span>
                          </Form.Item>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>

                <div className="toggle-box-section">
                  <h3>
                    Occupancy
                    {' '}
                    <Switch
                      checked={occupancy}
                      onClick={() => setOccupancy(!occupancy)}
                    />
                  </h3>
                  <p>Set an extra charge per Person per Night.</p>

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
                          <Input placeholder="$" />
                        </Form.Item>
                        <span>after</span>
                      </Col>
                      <Col span={1} />
                      <Col span={6}>
                        <Form.Item name="extraGuest">
                          <Select placeholder="1st Guest">
                            <Select.Option value="1">1st Guest</Select.Option>
                            <Select.Option value="2">2nd Guest</Select.Option>
                            <Select.Option value="3">3rd Guest</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                </div>

                <div className="toggle-box-section">
                  <h3>
                    Short stay premium
                    {' '}
                    <Switch
                      checked={shortStay}
                      onClick={() => setshortStay(!shortStay)}
                    />
                  </h3>
                  <p>
                    Increase your nightly rate if a guest stays only for a short
                    time.
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
                          <Input type="number" placeholder="nights" />
                        </Form.Item>
                        <span>A short stay has no more than</span>
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
                          <Input type="number" placeholder="$" />
                        </Form.Item>
                        <span>Extra charge per night</span>
                      </Col>
                    </Row>
                  </div>
                </div>

                <div className="toggle-box-section">
                  <h3>
                    Check-in/Check-out restrictions
                    {' '}
                    <Switch
                      checked={restriction}
                      onClick={() => setRestriction(!restriction)}
                    />
                  </h3>
                  <p>
                    Restrict check-ins and check-outs to certain days of the
                    week.
                  </p>

                  <div
                    className={`toggle-content ${restriction ? 'show' : ''}`}
                  >
                    <Row>
                      <Col span={24}>
                        <div className="checkin-box">
                          <span className="checkin-label">Check in</span>

                          <Form.Item name="monday" label="Mo">
                            <Checkbox
                              value={checkInBox.monday}
                              onChange={handleCheckInBox}
                              checked={checkInBox.monday}
                            />
                          </Form.Item>
                          <Form.Item name="tuesday" label="Tu">
                            <Checkbox
                              value={checkInBox.tuesday}
                              onChange={handleCheckInBox}
                              checked={checkInBox.tuesday}
                            />
                          </Form.Item>
                          <Form.Item name="wednesday" label="We">
                            <Checkbox
                              value={checkInBox.wednesday}
                              onChange={handleCheckInBox}
                              checked={checkInBox.wednesday}
                            />
                          </Form.Item>
                          <Form.Item name="thursday" label="Th">
                            <Checkbox
                              value={checkInBox.thursday}
                              onChange={handleCheckInBox}
                              checked={checkInBox.thursday}
                            />
                          </Form.Item>
                          <Form.Item name="friday" label="Fr">
                            <Checkbox
                              value={checkInBox.friday}
                              onChange={handleCheckInBox}
                              checked={checkInBox.friday}
                            />
                          </Form.Item>
                          <Form.Item name="saturday" label="Sa">
                            <Checkbox
                              value={checkInBox.saturday}
                              onChange={handleCheckInBox}
                              checked={checkInBox.saturday}
                            />
                          </Form.Item>
                          <Form.Item name="sunday" label="Su">
                            <Checkbox
                              value={checkInBox.sunday}
                              onChange={handleCheckInBox}
                              checked={checkInBox.sunday}
                            />
                          </Form.Item>

                          <Form.Item
                            className="check-selectall"
                            label="Select all"
                          >
                            <Checkbox
                              value={selectAll.checkIn}
                              onChange={handleSelectAllCheckIn}
                            />
                          </Form.Item>
                        </div>

                        <div className="checkin-box">
                          <span className="checkin-label">Check out</span>
                          <Form.Item name="monday" label="Mo">
                            <Checkbox
                              value={checkOutBox.monday}
                              onChange={handleCheckOutBox}
                              checked={checkOutBox.monday}
                            />
                          </Form.Item>
                          <Form.Item name="tuesday" label="Tu">
                            <Checkbox
                              value={checkOutBox.tuesday}
                              onChange={handleCheckOutBox}
                              checked={checkOutBox.tuesday}
                            />
                          </Form.Item>
                          <Form.Item name="wednesday" label="We">
                            <Checkbox
                              value={checkOutBox.wednesday}
                              onChange={handleCheckOutBox}
                              checked={checkOutBox.wednesday}
                            />
                          </Form.Item>
                          <Form.Item name="thursday" label="Th">
                            <Checkbox
                              value={checkOutBox.thursday}
                              onChange={handleCheckOutBox}
                              checked={checkOutBox.thursday}
                            />
                          </Form.Item>
                          <Form.Item name="friday" label="Fr">
                            <Checkbox
                              value={checkOutBox.friday}
                              onChange={handleCheckOutBox}
                              checked={checkOutBox.friday}
                            />
                          </Form.Item>
                          <Form.Item name="saturday" label="Sa">
                            <Checkbox
                              value={checkOutBox.saturday}
                              onChange={handleCheckOutBox}
                              checked={checkOutBox.saturday}
                            />
                          </Form.Item>
                          <Form.Item name="sunday" label="Su">
                            <Checkbox
                              value={checkOutBox.sunday}
                              onChange={handleCheckOutBox}
                              checked={checkOutBox.sunday}
                            />
                          </Form.Item>

                          <Form.Item
                            className="check-selectall"
                            label="Select all"
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

                <div className="toggle-box-button">
                  <Button className="gray-btn" onClick={goBack}>
                    Back
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </Wrapper>
  );
};

export default CreateSeasonRates;
