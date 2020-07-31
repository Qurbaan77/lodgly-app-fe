import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
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

import countryList from 'react-select-country-list';
import Toaster from '../toaster/toaster';
import { userInstance } from '../../axios/axiosconfig';

const { Panel } = Collapse;

const { RangePicker } = DatePicker;
let i = 1;
let j = 1;

const AddReservation = (props) => {
  const {
    getData, close, visible, handleOk, handleCancel,
  } = props;
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

  // const [fullname, setFullname] = useState({});
  // const [email, setEmail] = useState({});
  // const [phone, setPhone] = useState({});
  // const [country, setCountry] = useState({});
  const [serviceData, setServiceData] = useState([]);
  const [currentService, setCurrentService] = useState({});
  const [unitData, setUnitData] = useState([]);
  // const [currentUnit, setCurrentUnit] = useState({});
  const [unitTypeData, setUnitTypeData] = useState([]);

  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();

  const [propertyData, setPropertyData] = useState([]);
  const [currentPropertyId, setCurrentPropertyId] = useState(null);
  // const history = useHistory();

  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [{ userId }] = userCred || [{}];

  // const show = () => {
  //   setVisible(true);
  // };

  // const close = () => {
  //   setNotifyType('');
  // };

  // const Ok = () => {
  //   setVisible1(false);
  // };

  // const Cancel = () => {
  //   setVisible(false);
  // };

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
    const response = await userInstance.post('/addReservation', values);
    const { msg } = response.data;
    if (response.data.code === 200) {
      getData();
      close();
    } else {
      setNotifyType('error');
      setNotifyMsg(msg);
    }

    form.resetFields();
  };

  // const handleChange = (e) => {
  //   console.log('handleChange', e.target.value);
  // };

  const getPropertyData = useCallback(async () => {
    const response = await userInstance.post('/fetchProperty', { affiliateId: userId });
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

  const fun1 = async (value, event) => {
    setCurrentPropertyName(event.children);
    setCurrentPropertyId(value);
    const payload = {
      propertyId: value,
    };
    const response = await userInstance.post('/getService', payload);
    const data = response.data.servicData;
    const response2 = await userInstance.post('/getUnit', payload);
    const data2 = response2.data.unitData;
    console.log(response2)
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
      .map((filterService) => setCurrentService(filterService));

    // unitData
    //   .filter((el) => el.propertyId === value)
    //   .map((filterUnit) => setCurrentUnit(filterUnit));
  };

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
      const mon = Math.round(total * 100) / 100 + Math.round(accomodation * 100) / 100;
      const data = mon * (depositAmount / 100);
      setDeposit(data);
    } else {
      setDeposit(depositAmount);
    }
  };

  const fun4 = (value) => {
    if (value) {
      const d1 = new Date(value[0]._d);
      const d2 = new Date(value[1]._d);
      const diff = Math.abs(d1 - d2);
      const day = Math.floor(diff / (24 * 60 * 60 * 1000)) + 1;
      setNight(day);
    }
  };

  const createGuestDetails = (
    <>
      {panel.map((el) => (
        <div className="addi-box" id={el}>
          <Row style={{ alignItems: 'center' }}>
            <Col span={6}>
              <Form.Item
                label="Full Name"
                name={[el, 'fullName']}
                style={{ paddingRight: 20 }}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="Email"
                name={[el, 'email']}
                style={{ paddingRight: 20 }}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="Country"
                name={[el, 'country']}
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
                label="Phone"
                name={[el, 'phone']}
                style={{ paddingRight: 20 }}
              >
                <Input
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

          <div className="delete-data">
            <DeleteOutlined onClick={removePanel} />
          </div>
        </div>
      ))}
    </>
  );

  return (
    <Modal
      title="Create Booking"
      name="modal1"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      wrapClassName="create-booking-modal"
    >
      <Toaster notifyType={notifyType} notifyMsg={notifyMsg} close={close} />
      <Form form={form} name="basic" onFinish={onFinish}>
        <Row style={{ alignItems: 'center', padding: '0px 20px' }}>
          <Col span={12}>
            <Form.Item
              label="Reservation Date"
              name="groupname"
              style={{ paddingRight: 20 }}
              onChange={fun4}
              rules={[
                {
                  required: true,
                  message: 'Reservation date is required',
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
            >
              <Radio value={1}>Confirmed</Radio>
              <Radio value={2}>Option</Radio>
            </Radio.Group>
          </Col>
        </Row>

        <Row style={{ alignItems: 'center', padding: '0px 20px' }}>
          <Col span={8}>
            <Form.Item
              label="Property"
              name="property"
              style={{ paddingRight: 20 }}
              rules={[
                {
                  required: true,
                  message: 'Property name is required',
                },
              ]}
            >
              <Select
                placeholder="Select"
                onSelect={(value, event) => fun1(value, event)}
              >
                {propertyData.map((el) => (
                  <Select.Option value={el.id}>
                    {el.propertyName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Unit"
              name="unit"
              style={{ paddingRight: 20 }}
              rules={[
                {
                  required: true,
                  message: 'Unit is required',
                },
              ]}
            >
              <Select
                placeholder="Select"
                onSelect={(value, event) => fun3(value, event)}
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
              label="Channel, Commission(%)"
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
                    message: 'Commission is required',
                  },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row style={{ alignItems: 'center', padding: '0px 20px' }}>
          <Col span={8}>
            <Form.Item
              label="Adults"
              name="adult"
              style={{ paddingRight: 20 }}
              rules={[
                {
                  required: true,
                  message: 'Required Field',
                },
              ]}
            >
              <Select placeholder="Select">
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
              label="Childrens(0-12yrs)"
              name="children1"
              style={{ paddingRight: 20 }}
            >
              <Select placeholder="Select">
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
                <Select.Option value="3">3</Select.Option>
                <Select.Option value="4">4</Select.Option>
                <Select.Option value="5">5</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Childrens(12+ yrs)" name="children2">
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
              <Collapse accordion>
                <Panel
                  icon={<PlusSquareOutlined />}
                  header="Add Guest Details (Optional)"
                  key="1"
                >
                  <div className="additional-guest">
                    {createGuestDetails}

                    <Row>
                      <Col span={24}>
                        <div className="additional-add" onClick={addMore} role="presentation">
                          <PlusOutlined />
                          {' '}
                          Add additional guest
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
                <p>Accommodation</p>
              </Form.Item>
            </Col>

            <Col span={16}>
              <Form.Item>
                <div className="inline-form">
                  <label htmlFor="abc">
                    <input hidden />
                    Average price per night
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
                          message: 'Required Field',
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
                    Discount
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
                      placeholder="Discount type"
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
                  Per Night
                </label>
                <span>Accommondation cost:</span>
                <span className="amnt">
                  {accomodation}
                  {' '}
                  €
                </span>
              </div>
            </Col>

            <Col span={24}>
              <div className="srvice-heading" onClick={addMoreService} role="presentation">
                <PlusOutlined />
                {' '}
                Add Services
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
                                placeholder="Select Service"
                                onSelect={(value, event) => fun2(value, event)}
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
                                placeholder="Rate"
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
                                placeholder="Quantity"
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
                  Total:
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
                  Deposit
                </label>

                <div className="inline-form">
                  <label htmlFor="deposit">
                    <input hidden />
                    Accommodation deposit
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
                  Accommodation deposit:
                  {' '}
                  <span>
                    {/* {deposit}€ (0,00 %) */}
                    {depositType === '%'
                      ? `${deposit}€ (${depositAmount}%)`
                      : `${deposit}€`}
                  </span>
                </label>
                <label htmlFor="amount">
                  Outstanding amount:
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
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Save Reservation
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

AddReservation.propTypes = {
  close: PropTypes.func,
  handleCancel: PropTypes.func,
  handleOk: PropTypes.func,
  getData: PropTypes.func,
  visible: PropTypes.bool,
};
AddReservation.defaultProps = {
  close: () => {},
  handleCancel: () => {},
  handleOk: () => {},
  getData: () => {},
  visible: false,
};

export default AddReservation;
