import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './calendar.css';
import { useTranslation } from 'react-i18next';
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
import { PlusSquareOutlined } from '@ant-design/icons';
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
  const [night, setNight] = useState(0);
  const [total, setTotal] = useState(0);
  const [currMonthDay, setCurrMonthDay] = useState(0);

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
      toast.success('successfully added group reservation', { containerId: 'B' });
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
      setStartDateMonth(value[0]._d.getMonth() + 1);
      // console.log('value[0]._d.daysInMonth()', value[0]._d.daysInMonth());
      const d1 = new Date(value[0]._d);
      //  console.log(d1.daysInMonth());
      const d2 = new Date(value[1]._d);
      const diff = Math.abs(d1 - d2);
      const day = Math.floor(diff / (24 * 60 * 60 * 1000)) + 1;
      setNight(day);
      setDaysArr(Array.from(Array(day).keys()));
      setShow(false);
    }
  };

  const priceFunction = useCallback(
    (value, i) => {
      form.setFieldsValue({
        [`array${i}`]: {
          amount: Math.floor(night * value),
        },
      });

      setTotal(0);

      daysArr.forEach((el, j) => {
        form.setFieldsValue({
          [`array${i}`]: {
            [`${j}`]: {
              everyDayPrice: value,
            },
          },
        });
      });
    },
    [daysArr, form, night],
  );

  return (
    <Modal
      title={t('calendarpop.heading4')}
      visible={visible}
      onCancel={close}
      wrapClassName="create-booking-modal group-reservation"
    >
      <Form form={form} name="basic" onFinish={onFinish}>
        <Row style={{ alignItems: 'center', padding: '0px 20px' }}>
          <Col span={24}>
            <Form.Item
              label={t('strings.reservation_date')}
              name="groupname"
              style={{ paddingRight: 20 }}
            >
              <RangePicker onCalendarChange={onCalendarChange} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="radiogroup" label="Radio.Group">
              <Radio.Group defaultValue="confirmed">
                <Radio value="confirmed">Confirmed</Radio>
                <Radio value="option">Option</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col span={24}>
            <div className="availability">
              <p>{t('calendarpop.label6')}</p>
            </div>
          </Col>
        </Row>

        <Row style={{ alignItems: 'center', padding: '0px 20px' }}>
          <Col span={24}>
            <Form.Item
              className="comision"
              label={t('addreservation.heading6')}
              name="channel"
              style={{ width: '70%', display: 'inline-block' }}
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
            padding: '0px 20px',
            // marginBottom: '20px',
            background: '#fbfbfc',
            paddingTop: '20px',
          }}
          hidden={show}
        >
          {data.map((el, i) => (
            <Col span={24} className="unit-border">
              <div
                className="reservation-booker select-unit-reservation"
                id={el}
              >
                <Row>
                  <Col span={12} className="unit-available">
                    <label htmlFor="units">
                      <input hidden />
                      Units
                    </label>
                    <p>{el.unitTypeName}</p>
                    <span>
                      Available :
                      {el.noOfUnits}
                    </span>
                  </Col>

                  <Col span={12}>
                    {/* <Form.Item label="Number of units" name={`units${i}`}> */}
                    <Form.Item
                      label="Number of units"
                      name={[`array${i}`, 'units']}
                    >
                      <Select
                        style={{ width: '50%', display: 'inline-block' }}
                        // onSelect={(value) => setUnits(value + 1)}
                      >
                        {Array.from(Array(el.noOfUnits).keys()).map((ele) => (
                          <Select.Option value={ele} key={ele + 1}>
                            {ele + 1}
                          </Select.Option>
                        ))}
                        {/* {el.units.map((ele, k) => (
                          <Select.Option value={ele} key={k+1}>
                            {k + 1}
                          </Select.Option>
                        ))} */}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={12}>
                    <Form.Item
                      label="Price per night/unit"
                      name={[`array${i}`, 'pricePer']}
                    >
                      <Input
                        style={{
                          width: '50%',
                          display: 'inline-block',
                          marginRight: '10px',
                        }}
                        onChange={(e) => priceFunction(e.target.value, i)}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Total per unit type"
                      name={[`array${i}`, 'amount']}
                    >
                      <Input
                        style={{
                          width: '50%',
                          display: 'inline-block',
                          marginRight: '10px',
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              <div className="price-per-night">
                <Collapse accordion>
                  <Panel
                    icon={<PlusSquareOutlined />}
                    header="Price per night"
                    key="11"
                  >
                    <div className="night-container">
                      {daysArr.map((ele, j) => (
                        <div className="night-box">
                          <Form.Item
                            label={startDate + j <= currMonthDay ? `${startDate + j} : ${startDateMonth}` : `${0 + j} : ${startDateMonth + 1}`}
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
          ))}
        </Row>

        <Row
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
        </Row>

        <Row style={{ alignItems: 'center', padding: '0px 20px' }}>
          <Col span={24}>
            <div className="reservation-booker">
              <h4>{t('calendarpop.label7')}</h4>

              <Row style={{ alignItems: 'center' }}>
                <Col span={12}>
                  <Form.Item
                    label={t('strings.full')}
                    name="fullName"
                    style={{ paddingRight: 20 }}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label={t('strings.email')}
                    name="email"
                    style={{ paddingRight: 20 }}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label={t('strings.country')}
                    name="country"
                    style={{ paddingRight: 20 }}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label={t('strings.phone')}
                    name="phone"
                    style={{ paddingRight: 20 }}
                  >
                    <Input type="number" minLength="9" maxLength="15" />
                  </Form.Item>
                </Col>

                {/* <Row>
                <Col span={12}>
                  <label htmlFor="name">
                    <input hidden />
                    {t('strings.full')}
                  </label>
                  <p>{userData.length > 0 ? userData[0].fullname : null}</p>
                </Col>

                <Col span={12}>
                  <label htmlFor="email">
                    <input hidden />
                    {t('strings.email')}
                  </label>
                  <p>{userData.length > 0 ? userData[0].email : null}</p>
                </Col>

                <Col span={12}>
                  <label htmlFor="phone">
                    <input hidden />
                    {t('strings.phone')}
                  </label>
                  <p>{userData.length > 0 ? userData[0].phone : null}</p>
                </Col> */}

                {/* <Col span={24}>
              <div className="additional-edit">
                <div>
                  <EditOutlined />
                  {' '}
                  {t('addreservation.heading1')}
                </div>
              </div>
            </Col> */}
              </Row>
            </div>
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
  data: PropTypes.func,
  visible: PropTypes.bool,
  getData: PropTypes.func,
};
GroupReservation.defaultProps = {
  close: () => {},
  data: () => {},
  visible: false,
  getData: () => {},
};

export default GroupReservation;
