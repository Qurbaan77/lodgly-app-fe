import React, { useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import './calendar.css';
import { useTranslation } from 'react-i18next';
import CounterInput from 'react-counter-input';
import { toast } from 'react-toastify';
import {
  Form,
  Select,
  Input,
  Radio,
  DatePicker,
  Button,
  // Checkbox,
  Row,
  Col,
  Collapse,
  Modal,
  // Menu,
} from 'antd';
import {
  PlusSquareOutlined,
  EditOutlined,
  ClockCircleOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { userInstance } from '../../axios/axiosconfig';

const { Panel } = Collapse;

const { RangePicker } = DatePicker;

const GroupReservation = (props) => {
  const { t } = useTranslation();
  const {
    close, visible, data, getData,
  } = props;
  const [form] = Form.useForm();
  const [show, setShow] = useState(true);
  // const [rangeDate, setRangeDate] = useState(null);
  const [daysArr, setDaysArr] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [startDateMonth, setStartDateMonth] = useState('');
  // const [units, setUnits] = useState(0);
  // const [price, setPrice] = useState(0);
  // const [night, setNight] = useState(0);
  // const [total, setTotal] = useState(0);
  const [currMonthDay, setCurrMonthDay] = useState(0);
  const [showOptional, setShowOptional] = useState(true);
  const [leftDays, setLeftDays] = useState(0);

  const onFinish = async (values) => {
    const unitType = [];
    data.forEach((element, i) => {
      const k = 'array';
      const arr = [];
      element.units.forEach((ele, j) => {
        if (j <= values[k + i].units) {
          arr.push(ele);
        }
      });
      values[k + i].bookedUnits = arr;
      unitType.push(values[k + i]);
    });
    const copyValues = values;
    copyValues.availableUnits = data.units;
    copyValues.unitType = unitType;
    copyValues.propertyId = localStorage.getItem('topNavId');

    const res = await userInstance.post('/groupReservation', copyValues);
    if (res.data.code === 200) {
      getData();
      close();
      toast.success('successfully added group reservation', {
        containerId: 'B',
      });
    } else {
      toast.error('server error please try again', { containerId: 'B' });
    }

    form.resetFields();
  };

  const onCalendarChange = (value) => {
    if (value[1] !== null) {
      const now = new Date(value[0]._d);
      const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      setCurrMonthDay(days);
      // setRangeDate(value);
      setStartDate(value[0]._d.getDate());
      setStartDateMonth(`0${value[0]._d.getMonth() + 1}`.slice(-2));
      // console.log('value[0]._d.daysInMonth()', value[0]._d.daysInMonth());
      const d1 = new Date(value[0]._d);
      //  console.log(d1.daysInMonth());
      const d2 = new Date(value[1]._d);
      const diff = Math.abs(d1 - d2);
      const day = Math.floor(diff / (24 * 60 * 60 * 1000)) + 1;
      // setNight(day);
      setDaysArr(Array.from(Array(day).keys()));
      setShow(false);
    }
  };

  // const priceFunction = useCallback(
  //   (value, i) => {
  //     form.setFieldsValue({
  //       [`array${i}`]: {
  //         amount: Math.floor(night * value),
  //       },
  //     });

  //     setTotal(0);

  //     daysArr.forEach((el, j) => {
  //       form.setFieldsValue({
  //         [`array${i}`]: {
  //           [`${j}`]: {
  //             everyDayPrice: value,
  //           },
  //         },
  //       });
  //     });
  //   },
  //   [daysArr, form, night],
  // );

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

  return (
    <Modal
      title={t('calendarpop.heading4')}
      visible={visible}
      onCancel={close}
      wrapClassName="create-booking-modal group-reservation"
    >
      <Helmet>
        <body className={visible ? 'ant-scrolling-effect' : ''} />
      </Helmet>
      <Form form={form} name="basic" onFinish={onFinish}>
        <Row style={{ alignItems: 'center', padding: '0px 20px' }}>
          <Col span={12}>
            <Form.Item
              label={t('strings.reservation_date')}
              name="groupname"
              style={{ paddingRight: 20 }}
              onChange={onCalendarChange}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <RangePicker
                defaultValue={moment()}
                format="YYYY-MM-DD"
                disabledDate={(current) => current && current < moment().subtract(1, 'day')}
                onChange={onCalendarChange}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Radio.Group defaultValue={1}>
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
          <Col span={24}>
            <Form.Item
              className="comision"
              label={t('addreservation.heading6')}
              name="channel"
              style={{ width: '70%', display: 'inline-block' }}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Select"
                // onSelect={(value, event) => fun5(value, event)}
              >
                <Select.Option value="Airbnb">Airbnb</Select.Option>
                <Select.Option value="Booking">Booking</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              className="comision"
              name="commissionPercentage"
              style={{
                width: '26%',
                display: 'inline-block',
                verticalAlign: 'bottom',
                marginLeft: '4%',
              }}
            >
              <Input
                name="commission"
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

        <Row
          style={{
            alignItems: 'center',
            padding: '0px 0px',
          }}
          hidden={show}
        >
          {data.map((el, i) => (
            <Col span={24}>
              <div className="select-unit">
                <h4>Select Unit</h4>

                <Row>
                  <Col span={6}>
                    <h3>Units</h3>
                    <div className="unit-boxes">
                      <p>{el.unitTypeName}</p>
                      <h5>
                        Available:
                        {' '}
                        {el.unitsData ? el.unitsData.length : 0}
                      </h5>
                    </div>
                  </Col>
                  <Col span={6}>
                    <h3>No of units</h3>
                    <div className="unit-boxes">
                      <div className="input-counter">
                        <CounterInput min={0} max={10} />
                      </div>
                    </div>
                  </Col>
                  <Col span={6}>
                    <h3>Price per night / units</h3>
                    <div className="unit-boxes">
                      <div className="input-counter">
                        <CounterInput min={0} max={10} />
                      </div>
                    </div>
                  </Col>
                  <Col span={6}>
                    <h3>Total per unit type</h3>
                    <div className="unit-boxes">
                      <div className="input-group">
                        <Input placeholder="15,00" />
                        <span className="eur">EUR</span>
                      </div>
                    </div>
                  </Col>

                  <Col span={24}>
                    <div className="price-per-night">
                      <Collapse accordion>
                        <Panel
                          icon={<PlusSquareOutlined />}
                          header="Individual prices per night"
                          key="11"
                        >
                          <div className="night-container">
                            {daysArr.map((ele, j) => (
                              <div className="night-box">
                                <Form.Item
                                  label={
                                    startDate + j <= currMonthDay
                                      ? `${startDate + j} / ${startDateMonth}`
                                      : `${0 + j} / ${startDateMonth}`
                                  }
                                  name={[`array${i}`, ele, 'everyDayPrice']}
                                >
                                  <Input />
                                </Form.Item>
                              </div>
                            ))}
                          </div>
                        </Panel>
                      </Collapse>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          ))}
        </Row>

        <Row className="no-padding-col" hidden={show}>
          <Col span={6} className="grey-bg">
            <div className="price-discount">
              <span>Discount %</span>
              <Input placeholder="10,00" />
            </div>
          </Col>

          <Col span={6} className="blue-bg">
            <div className="price-discount-unit">
              <h4>
                Number of units:
                <span>1</span>
              </h4>
            </div>
          </Col>

          <Col span={12} className="dark-blue-bg">
            <div className="price-discount-cost">
              <h4>
                Accommondation cost:
                <span>13,50 €</span>
              </h4>
              <span>Discout: 1,50 €</span>
            </div>
          </Col>
        </Row>

        {/* <Row
          style={{
            alignItems: 'center',
            padding: '20px 20px',
            border: '1px solid #ddd',
            marginBottom: '20px',
          }}
          hidden={show}
        >
          <Col span={24}>
            <div className="discount-night">
              <Form.Item
                className="comision"
                label="Discount (%)"
                name="channel"
                style={{ width: '70%', display: 'inline-block' }}
              >
                <Input />
              </Form.Item>

              <div className="discount-box">
                <h2>
                  $
                  {total}
                </h2>
              </div>
            </div>
          </Col>
        </Row> */}

        <Row style={{ alignItems: 'center' }}>
          <Col span={24}>
            <Collapse defaultActiveKey={['3']} accordion>
              <Panel
                icon={<PlusSquareOutlined />}
                header={t('calendarpop.label7')}
                key="3"
              >
                <div className="reservation-booker">
                  <Row style={{ alignItems: 'center' }}>
                    <Col span={6}>
                      <Form.Item
                        label={t('strings.full')}
                        name="fullName"
                        style={{ paddingRight: 20 }}
                      >
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item
                        label={t('strings.email')}
                        name="email"
                        style={{ paddingRight: 20 }}
                      >
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item
                        label={t('strings.country')}
                        name="country"
                        style={{ paddingRight: 20 }}
                      >
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item
                        label={t('strings.phone')}
                        name="phone"
                        style={{ paddingRight: 20 }}
                      >
                        <Input type="number" minLength="9" maxLength="15" />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <div
                        className="additional-edit"
                        // onClick={() => guestForm(el)}
                        role="presentation"
                      >
                        <div>
                          <EditOutlined />
                          {' '}
                          {t('bookingpop.heading2')}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Panel>
            </Collapse>
          </Col>
        </Row>

        <Row style={{ alignItems: 'center' }}>
          <Col span={24}>
            <Form.Item style={{ marginBottom: '0' }}>
              <Collapse accordion>
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
              </Collapse>
            </Form.Item>
          </Col>
        </Row>

        <Row
          style={{
            alignItems: 'center',
            background: '#fbfbfc',
            padding: '0px 20px',
            paddingTop: '20px',
          }}
        >
          <Col span={24}>
            <Form.Item style={{ textAlign: 'center' }}>
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

GroupReservation.propTypes = {
  close: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.array),
  visible: PropTypes.bool,
  getData: PropTypes.func,
};
GroupReservation.defaultProps = {
  close: () => {},
  data: [],
  visible: false,
  getData: () => {},
};

export default GroupReservation;
