import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './calendar.css';
import {
  Form,
  Select,
  Input,
  InputNumber,
  Switch,
  Radio,
  Slider,
  DatePicker,
  TimePicker,
  Button,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
} from 'antd';
import {
  MenuUnfoldOutlined,
  PlusSquareOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  PlusOutlined,
  SearchOutlined,
  VerticalAlignMiddleOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import Wrapper from '../wrapper';
import { Collapse } from 'antd';
import { InboxOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';
import { HelpBlock } from 'react-bootstrap';
import { userInstance } from '../../axios/axiosconfig';
import Toaster from '../toaster/toaster';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const { Option } = Select;

const { MonthPicker, RangePicker } = DatePicker;
let i = 1;
let j = 1;

const CreateBookingPopup = (props) => {
  let arr = [];
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [radio, setRadio] = useState(1);
  const [panel, setPanel] = useState([1]);
  const [servicePanel, setServicePanel] = useState([100]);
  const [arrValue, setArrValue] = useState(2);
  const [price, setPrice] = useState(0);
  const [night, setNight] = useState(0);
  const [amt, setAmt] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [accomodation, setAccomodation] = useState(0);
  const [total, setTotal] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [servicePrice, setServicePrice] = useState(0);
  const [serviceAmt, setServiceAmt] = useState(0);
  const [serviceTax, setServiceTax] = useState(0);
  const [serviceAmount, setServiceAmount] = useState(0);

  const [fullname, setFullname] = useState({});
  const [email, setEmail] = useState({});
  const [phone, setPhone] = useState({});
  const [country, setCountry] = useState({});
  const [serviceData, setServiceData] = useState([]);
  const [currentService, setCurrentService] = useState({});
  const [unitData, setUnitData] = useState([]);
  const [currentUnit, setCurrentUnit] = useState({});
  const [unitTypeData, setUnitTypeData] = useState([]);
  const [currentUnittype, setCurrentUnittype] = useState({});
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();

  const [propertyData, setPropertyData] = useState([]);
  const history = useHistory();

  const show = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };
  const close = () => {
    setNotifyType('');
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const addMore = () => {
    i = i + 1;
    setPanel([...panel, i]);
  };

  const removePanel = () => {
    const oldarray = [...panel];
    oldarray.pop();
    setPanel([...oldarray]);
  };

  const addMoreService = () => {
    j = j + 1;
    setServicePanel([...servicePanel, j]);
  };

  const removeServicePanel = (value) => {
    if (serviceAmount !== 0) {
      const sum = parseInt(total) - parseInt(serviceAmount);
      setServiceAmount(0);
      setServicePrice(0);
      setServiceTax(0);
      setServiceAmt(0);
      setTotal(sum);
    }
    console.log(value);
    const oldarray = [...servicePanel];
    oldarray.pop();
    setServicePanel([...oldarray]);
  };

  const onFinish = async (values) => {
    const guestData = [];
    const serviceData = [];
    values.acknowledge = radio;
    values.totalAmount = total;
    values.deposit = deposit;
    panel.map((el, i) => {
      guestData.push(values[el]);
    });
    values.guestData = guestData;
    servicePanel.map((ele, i) => {
      serviceData.push(values[ele]);
    });
    values.serviceData = serviceData;
    const response = await userInstance.post('/addReservation', values);
    const msg = response.data.msg;
    if (response.data.code === 200) {
      props.getData();
      props.close();
    } else {
      setNotifyType('error');
      setNotifyMsg(msg);
    }
    form.resetFields();
  };

  const handleChange = (e) => {
    console.log('handleChange', e.target.value);
  };

  const getPropertyData = async () => {
    const response = await userInstance.post('/fetchProperty');
    const data = response.data.propertiesData;
    if (response.data.code === 200) {
      setPropertyData(data);
    }
  };

  useEffect(() => {
    getPropertyData();
  }, []);

  const calculateTotal = () => {
    const calculate =
      servicePrice * serviceAmt +
      servicePrice * serviceAmt * (serviceTax / 100);
    const sum = parseInt(total) + parseInt(calculate);
    setServiceAmount(calculate);
    setTotal(sum);
    // form.setFieldsValue({
    //   serviceTotal: calculate,
    // });
  };

  const fun1 = async (value, event) => {
    const payload = {
      propertyId: value,
    };
    const response = await userInstance.post('/getService', payload);
    const data = response.data.servicData;
    const response2 = await userInstance.post('/getUnit', payload);
    const data2 = response2.data.unitData;
    const response3 = await userInstance.post('/getUnittype', payload);
    const data3 = response3.data.unitData;
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

  const fun2 = (value, event) => {
    serviceData
      .filter((el) => el.id == value)
      .map((filterService) => setCurrentService(filterService));

    unitData
      .filter((el) => el.propertyId == value)
      .map((filterUnit) => setCurrentUnit(filterUnit));
  };

  const fun3 = (value) => {
    // unitTypeData
    // .filter((el) => el.id === value)
    // .map((filterUnittype) => setCurrentUnittype(filterUnittype));
  };

  const fun4 = (value) => {
    console.log('Value', value);
  };

  return (
    <Modal
      title={props.title}
      name='modal1'
      visible={props.visible}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      wrapClassName='create-booking-modal'
    >
      <Toaster notifyType={notifyType} notifyMsg={notifyMsg} close={close} />
      <Form form={form} name='basic' onFinish={onFinish}>
        <Row style={{ alignItems: 'center', padding: '0px 20px' }}>
          <Col span={12}>
            <Form.Item
              label='Reservation Date'
              name='groupname'
              style={{ paddingRight: 20 }}
              onChange={fun4}
              rules={[
                {
                  required: true,
                  message: 'Date is required',
                },
              ]}
            >
              <RangePicker onChange={fun4} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Radio.Group
              name='radiogroup'
              defaultValue={1}
              onChange={(e) => setRadio(e.target.value)}
            >
              <Radio value={1}>Confirmed</Radio>
              <Radio value={2}>Option</Radio>
            </Radio.Group>
          </Col>
        </Row>

        <Row style={{ alignItems: 'center', padding: '0px 20px' }}>
          <Col span={8}>
            <Form.Item
              label='Property'
              name='property'
              style={{ paddingRight: 20 }}
              rules={[
                {
                  required: true,
                  message: 'Please Select Property',
                },
              ]}
            >
              <Select onSelect={(value, event) => fun1(value, event)}>
                {propertyData.map((el, i) => {
                  return (
                    <Select.Option value={el.id}>
                      {el.propertyName}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label='Unit'
              name='unit'
              style={{ paddingRight: 20 }}
              rules={[
                {
                  required: true,
                  message: 'Please Select Unit Type',
                },
              ]}
            >
              <Select onSelect={(value) => fun3(value)}>
                {unitData.map((el, i) => {
                  return (
                    <Select.Option value={el.id}>{el.unitName}</Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              className='comision'
              label='Channel, Commission(%)'
              name='channel'
            >
              <Select style={{ width: '70%', display: 'inline-block' }}>
                <Select.Option value='Airbnb'>Airbnb</Select.Option>
                <Select.Option value='Booking'>Booking</Select.Option>
              </Select>

              <Input
                style={{
                  width: '26%',
                  display: 'inline-block',
                  verticalAlign: 'sub',
                  marginLeft: '4%',
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row style={{ alignItems: 'center', padding: '0px 20px' }}>
          <Col span={8}>
            <Form.Item
              label='Adults'
              name='adults'
              style={{ paddingRight: 20 }}
              rules={[
                {
                  required: true,
                  message: 'Please Select number of adults',
                },
              ]}
            >
              <Select>
                <Select.Option value='1'>1</Select.Option>
                <Select.Option value='2'>2</Select.Option>
                <Select.Option value='3'>3</Select.Option>
                <Select.Option value='4'>4</Select.Option>
                <Select.Option value='5'>5</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label='Childrens(0-12yrs)'
              name='children1'
              style={{ paddingRight: 20 }}
            >
              <Select>
                <Select.Option value='1'>1</Select.Option>
                <Select.Option value='2'>2</Select.Option>
                <Select.Option value='3'>3</Select.Option>
                <Select.Option value='4'>4</Select.Option>
                <Select.Option value='5'>5</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label='Childrens(12+ yrs)' name='children2'>
              <Select>
                <Select.Option value='1'>1</Select.Option>
                <Select.Option value='2'>2</Select.Option>
                <Select.Option value='3'>3</Select.Option>
                <Select.Option value='4'>4</Select.Option>
                <Select.Option value='5'>5</Select.Option>
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
                  header='Add Guest Details (Optional)'
                  key='1'
                >
                  <div className='additional-guest'>
                    {panel.map((el, i) => {
                      return (
                        <div className='addi-box'>
                          <Row style={{ alignItems: 'center' }}>
                            <Form.Item name='panel'></Form.Item>
                            <Col span={6}>
                              <Form.Item
                                label='Full Name'
                                name={[el, 'fullName']}
                                style={{ paddingRight: 20 }}
                              >
                                <Input
                                  onChange={(e) => setFullname(e.target.value)}
                                />
                              </Form.Item>
                            </Col>

                            <Col span={6}>
                              <Form.Item
                                label='Email'
                                name={[el, 'email']}
                                style={{ paddingRight: 20 }}
                              >
                                <Input
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                              </Form.Item>
                            </Col>

                            <Col span={6}>
                              <Form.Item
                                label='Country'
                                name={[el, 'country']}
                                style={{ paddingRight: 20 }}
                              >
                                <Input
                                  onChange={(e) => setCountry(e.target.value)}
                                />
                              </Form.Item>
                            </Col>

                            <Col span={6}>
                              <Form.Item
                                label='Phone'
                                name={[el, 'phone']}
                                style={{ paddingRight: 20 }}
                              >
                                <Input
                                  onChange={(e) => setPhone(e.target.value)}
                                  type='number'
                                />
                              </Form.Item>
                            </Col>

                            <Col span={24}>
                              <div className='additional-edit'>
                                <a href=''>
                                  <EditOutlined /> Edit/Additional Data
                                </a>
                              </div>
                            </Col>
                          </Row>

                          <div className='delete-data'>
                            <DeleteOutlined onClick={removePanel} />
                          </div>
                        </div>
                      );
                    })}
                    <Row>
                      <Col span={24}>
                        <div className='additional-add' onClick={addMore}>
                          <PlusOutlined /> Add additional guest
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Panel>

                <Panel
                  icon={<PlusSquareOutlined />}
                  header='Add Notes (Optional)'
                  key='2'
                >
                  <div className='add-notes'>
                    <Form.Item name='notes1'>
                      <Input.TextArea />
                    </Form.Item>
                  </div>
                </Panel>

                <Panel
                  icon={<PlusSquareOutlined />}
                  header='Add Internal Notes (Optional)'
                  key='3'
                  name='notes'
                >
                  <div className='add-notes'>
                    <Form.Item name='notes2'>
                      <Input.TextArea />
                    </Form.Item>
                  </div>
                </Panel>
              </Collapse>
            </Form.Item>
          </Col>
        </Row>

        <div className='accommodation'>
          <Row style={{ alignItems: 'center', padding: '0px 20px' }}>
            <Col span={8}>
              <Form.Item>
                <p>Accommodation</p>
              </Form.Item>
            </Col>

            <Col span={16}>
              <Form.Item>
                <div className='inline-form'>
                  <label>Average price per night</label>
                  <Input
                    type='number'
                    placeholder='0,00'
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <label>X</label>
                  <Input
                    type='number'
                    placeholder='0 nights'
                    onChange={(e) => setNight(e.target.value)}
                  />
                  <label>=</label>
                  <Input
                    type='number'
                    value={night * price}
                    onBlur={(e) => setAmt(e.target.value)}
                  />
                  <label>EUR</label>
                </div>

                <div className='inline-form'>
                  <label>Discount</label>
                  <Input
                    type='number'
                    placeholder='0,00'
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                  <label>X</label>
                  <Input type='number' defaultValue='%' />
                  <label>=</label>
                  <Input
                    type='number'
                    value={amt - amt * (discount / 100)}
                    onBlur={(e) => setAccomodation(e.target.value)}
                  />
                  <label>EUR</label>
                </div>
              </Form.Item>
            </Col>
          </Row>

          <Row style={{ alignItems: 'center' }}>
            <Col span={24}>
              <div className='per-night'>
                <label>Per Night</label>
                <span>Accommondation cost:</span>
                <span className='amnt'>{accomodation} €</span>
              </div>
            </Col>

            <Col span={24}>
              <div className='srvice-heading' onClick={addMoreService}>
                <PlusOutlined /> Add Services
              </div>
            </Col>

            <Col span={24}>
              <Form.Item style={{ marginBottom: '0' }}>
                <Collapse
                  defaultActiveKey={['1']}
                  className='service-panel'
                  accordion
                >
                  <Panel
                    icon={<PlusSquareOutlined />}
                    header='Services'
                    key='1'
                  >
                    <div className='service-form'>
                      {servicePanel.map((ele, i) => {
                        return (
                          <div className='inline-form'>
                            <div className='delete-data'>
                              <DeleteOutlined
                                onClick={() => removeServicePanel(ele)}
                              />
                            </div>
                            <Col span={4}>
                              <Form.Item name={[ele, 'serviceName']}>
                                <Select
                                  style={{ width: '100px' }}
                                  onSelect={(value, event) =>
                                    fun2(value, event)
                                  }
                                >
                                  {serviceData.map((ele, i) => {
                                    return (
                                      <Select.Option value={ele.id}>
                                        {ele.serviceName}
                                      </Select.Option>
                                    );
                                  })}
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col span={4}>
                              <Form.Item name={[ele, 'servicePrice']}>
                                <Select
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

                            <label>X</label>
                            <Col span={4}>
                              <Form.Item name={[ele, 'serviceQunatity']}>
                                <Input
                                  type='number'
                                  placeholder='1'
                                  onChange={(e) =>
                                    setServiceAmt(e.target.value)
                                  }
                                />
                              </Form.Item>
                            </Col>

                            <label>+</label>
                            <Col span={4}>
                              <Form.Item>
                                <Input
                                  type='number'
                                  placeholder='%'
                                  onChange={(e) =>
                                    setServiceTax(e.target.value)
                                  }
                                />
                              </Form.Item>
                            </Col>

                            <label>=</label>
                            <Col span={4}>
                              <Form.Item name={[ele, 'serviceAmount']}>
                                <Input
                                  type='number'
                                  value={serviceAmount}
                                  onBlur={calculateTotal}
                                />
                              </Form.Item>
                            </Col>

                            <label>EUR</label>
                          </div>
                        );
                      })}
                    </div>
                  </Panel>
                </Collapse>
              </Form.Item>
            </Col>

            <Col span={24}>
              <div className='amnt-total'>
                <h4>Total: {parseInt(total) + parseInt(accomodation)} €</h4>
              </div>

              <div className='deposit'>
                <label>Deposit</label>

                <div className='inline-form'>
                  <label>Accommodation deposit</label>
                  <Input
                    type='number'
                    placeholder='0,00'
                    onChange={(e) => setDeposit(e.target.value)}
                  />
                  <Input type='input' placeholder='%' />
                </div>
              </div>
            </Col>

            <Col span={24}>
              <div className='outstanding'>
                <label>
                  Accommodation deposit: <span>{deposit}€ (0,00 %)</span>
                </label>
                <label>
                  Outstanding amount:{' '}
                  <span>
                    {parseInt(total) + parseInt(accomodation) - deposit}€ (0,00
                    %)
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
              <Button style={{ marginRight: 10 }} onClick={props.close}>
                Cancel
              </Button>
              <Button type='primary' htmlType='submit'>
                Save Reservation
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default CreateBookingPopup;
