import React, { useState } from 'react';
import Helmet from 'react-helmet';
import './rates.css';
import {
  Button, Row, Col, Form, Select, Input, Switch, Checkbox,
} from 'antd';
import ReactQuill from 'react-quill';
import CopyRatePopup from './copyratepopup';
import Wrapper from '../wrapper';
import favicon from '../../assets/images/logo-mobile.png';
import 'react-quill/dist/quill.snow.css';

const Rates = () => {
  const [form] = Form.useForm();
  const [value, setValue] = useState('');
  const [showCustomNights, setShowCustomNights] = useState(false);
  const [disabledInput, setDisabledInput] = useState(true);
  const [nights, setNights] = useState(14);
  const [lengthOfStay, setLengthOfStay] = useState(false);
  const [pricePerDayWeek, setPricePerDayWeek] = useState(false);
  const [minStayPerWeek, setMinStayPerWeek] = useState(false);
  const [occupancy, setOccupancy] = useState(false);
  const [shortStay, setshortStay] = useState(false);
  const [restriction, setRestriction] = useState(false);
  const [vat, setVat] = useState(false);
  const [nav, setNav] = useState(false);
  const [visisbleCopyRate, setVisisbleCopyRate] = useState(false);

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

  function onChange() {}

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

  // console.log('checkInBox', checkInBox);
  // console.log('checkOutBox', checkOutBox);
  const onFinish = () => {
    // console.log(value);
    // console.log(values);
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
                  <h3>Rates</h3>
                  <Row>
                    <Col span={12}>
                      <Form.Item name="rateName">
                        <Input
                          placeholder="Default Rate"
                          defaultValue="Default Rate"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={1} />
                    <Col span={8}>
                      <Form.Item name="currency">
                        <Select defaultValue="usd">
                          <Select.Option value="usd">USD</Select.Option>
                          <Select.Option value="euro">EURO</Select.Option>
                        </Select>
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
                        name="price"
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
                      <Form.Item name="night">
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
                      onChange={onChange}
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
                        <Form.Item name="weekly" label="Weekly">
                          <Input placeholder="$" />
                        </Form.Item>
                      </Col>
                      <Col span={1} />
                      <Col span={6}>
                        <Form.Item name="monthly" label="Monthly">
                          <Input placeholder="$" />
                        </Form.Item>
                      </Col>
                      <Col span={1} />
                      <Col span={6}>
                        <Form.Item
                          name="nights"
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
                      onChange={onChange}
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
                            name="mon"
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
                            name="tues"
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
                            name="wed"
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
                            name="thu"
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
                            name="fri"
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
                            name="sat"
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
                            name="sun"
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
                      onChange={onChange}
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
                      onChange={onChange}
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
                          <Input type="number" placeholder="$" />
                          <span>after</span>
                        </Form.Item>
                      </Col>
                      <Col span={1} />
                      <Col span={6}>
                        <Form.Item name="extraGuest">
                          <Select placeholder="1st Guest">
                            <Select.Option value="guest1">
                              1st Guest
                            </Select.Option>
                            <Select.Option value="guest2">
                              2nd Guest
                            </Select.Option>
                            <Select.Option value="guest3">
                              3rd Guest
                            </Select.Option>
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
                      onChange={onChange}
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
                          name="shortStay"
                          className="stay-input"
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: 'Input must be valid number!',
                          //     whitespace: true,
                          //   },
                          // ]}
                        >
                          <span>A short stay has no more than</span>
                          <Input type="number" placeholder="nights" />
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
                          <span>Extra charge per night</span>
                          <Input type="number" placeholder="$" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                </div>

                <div className="toggle-box-section">
                  <h3>
                    Check-in/Check-out restrictions
                    {' '}
                    <Switch
                      onChange={onChange}
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
                            name="currency"
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
                            name="currency"
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

                <div className="toggle-box-section">
                  <h3>
                    Sales tax / VAT
                    {' '}
                    <Switch onChange={onChange} onClick={() => setVat(!vat)} />
                  </h3>
                  <p>Set the sales tax / VAT for your room rate.</p>

                  <div className={`toggle-content ${vat ? 'show' : ''}`}>
                    <Row>
                      <Col span={8}>
                        <Form.Item name="tax">
                          <Select placeholder="Prices incl. sales tax / VAT">
                            <Select.Option value="include">
                              Prices incl. sales tax / VAT
                            </Select.Option>
                            <Select.Option value="exclude">
                              Prices excl. sales tax / VAT
                            </Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={1} />
                      <Col span={6}>
                        <Form.Item name="taxPer">
                          <Input placeholder="% 0" />
                        </Form.Item>
                      </Col>
                      <Col span={24} className="sales-text">
                        <span>
                          If you chose included: the guest pays your nightly
                          cost
                        </span>
                        <span>
                          If you chose excluded: the guest pays your nightly
                          cost + tax
                        </span>
                      </Col>
                    </Row>
                  </div>
                </div>

                <div className="toggle-box-section">
                  <h3>
                    Rates notes
                    {' '}
                    <Switch onChange={onChange} onClick={() => setNav(!nav)} />
                  </h3>
                  <p>Provide more information about your rates and policies.</p>

                  <div className={`toggle-content ${nav ? 'show' : ''}`}>
                    <Row>
                      <Col span={24}>
                        <ReactQuill
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
                    Copy Rates
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
      <CopyRatePopup visible={visisbleCopyRate} handleCancel={handleCancel} />
    </Wrapper>
  );
};

export default Rates;
