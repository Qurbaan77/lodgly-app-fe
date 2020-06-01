import React, { useEffect, useState } from 'react';
import './booking.css';
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

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const { Option } = Select;

const { MonthPicker, RangePicker } = DatePicker;
let i = 1;

const CreateBookingPopup = (props) => {
  let intialArray = [1];
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [radio, setRadio] = useState(1);
  const [panel, setPanel] = useState([1,2])
  const [arrValue, setArrValue] = useState(2);
  const [price, setPrice] = useState(0);
  const [night, setNight] = useState(0);
  const [amt, setAmt] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [accomodation, setAccomodation] = useState(0);
  const [total, setTotal] = useState(0);
  const [deposit, setDeposit] = useState(0);

  const show = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const addMore = () => {
    console.log('Panel', panel)
    let oldState = [...intialArray]
    intialArray = [...oldState, 1]
    setPanel(intialArray);
  };

  const onFinish = async (values) => {
    values.acknowledge = radio;
    console.log('Received values of form: ', values);
    // const response = await userInstance.post('/addBooking', values);
  };

  const handleChange = (e) => {
    console.log('handleChange', e.target.value);
  }

  return (
      <Modal
        title="Create Booking"
        visible={props.visible}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        wrapClassName="create-booking-modal"
      >
        <Form form={form} name="basic" onFinish={onFinish}>
          <Row style={{ alignItems: 'center', padding: '0px 20px' }}>
            <Col span={12}>
              <Form.Item
                label="Reservation Date"
                name="groupname"
                style={{ paddingRight: 20 }}
              >
                <RangePicker />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Radio.Group
                name="radiogroup"
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
                label="Property"
                name="property"
                style={{ paddingRight: 20 }}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Unit" name="unit" style={{ paddingRight: 20 }}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                className="comision"
                label="Channel, Commission(%)"
                name="channel"
              >
                <Select style={{ width: '70%', display: 'inline-block' }}>
                  <Select.Option value="demo">Airbnb</Select.Option>
                  <Select.Option value="demo">Booking</Select.Option>
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
                label="Adults"
                name="adults"
                style={{ paddingRight: 20 }}
              >
                <Select>
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
                <Select>
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
                <Select>
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
                      {panel.map((el, i) => {
                        return (
                          <div className="addi-box">
                            <Row style={{ alignItems: 'center' }}>
                              <Form.Item name={"panel" + el} hidden={true}></Form.Item>
                              <Col span={6}>
                                <Form.Item
                                  label="Full Name"
                                  name={"fullName" + el}
                                  style={{ paddingRight: 20 }}
                                >
                                  <Input />
                                </Form.Item>
                              </Col>

                              <Col span={6}>
                                <Form.Item
                                  label="Email"
                                  name={"email" + el}
                                  style={{ paddingRight: 20 }}
                                >
                                  <Input />
                                </Form.Item>
                              </Col>

                              <Col span={6}>
                                <Form.Item
                                  label="Country"
                                  name={"country" + el}
                                  style={{ paddingRight: 20 }}
                                >
                                  <Input />
                                </Form.Item>
                              </Col>

                              <Col span={6}>
                                <Form.Item
                                  label="Phone"
                                  name={"phone" + el}
                                  style={{ paddingRight: 20 }}
                                >
                                  <Input />
                                </Form.Item>
                              </Col>

                              <Col span={24}>
                                <div className="additional-edit">
                                  <a href="">
                                    <EditOutlined /> Edit/Additional Data
                                  </a>
                                </div>
                              </Col>
                            </Row>

                            <div className="delete-data">
                              <DeleteOutlined />
                            </div>
                          </div>
                        );
                      })}
                      <Row>
                        <Col span={24}>
                          <div className="additional-add" onClick={addMore}>
                              <PlusOutlined /> Add additional guest
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
                      <Input.TextArea name="notes1"/>
                    </div>
                  </Panel>

                  <Panel
                    icon={<PlusSquareOutlined />}
                    header="Add Internal Notes (Optional)"
                    key="3"
                    name="notes"
                  >
                    <div className="add-notes">
                      <Input.TextArea name="notes2"/>
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
                    <label>Average price per night</label>
                    <Input type="text" placeholder="0,00" onChange={(e)=> setPrice(e.target.value)}/>
                    <label>X</label>
                    <Input type="text" placeholder="0 nights" onChange={(e)=> setNight(e.target.value)}/>
                    <label>=</label>
                    <Input type="text" value={night * price} />
                    <label>EUR</label>
                  </div>

                  <div className="inline-form">
                    <label>Discount</label>
                    <Input type="text" placeholder="0,00" onChange={(e)=> setAmt(e.target.value)}/>
                    <label>X</label>
                    <Input type="text" placeholder="0%" onChange={(e)=> setDiscount(e.target.value)} />
                    <label>=</label>
                    <Input type="text" value={(amt) - (amt) * (discount/100)} onBlur={(e)=> setAccomodation(e.target.value)}/>
                    <label>EUR</label>
                  </div>
                </Form.Item>
              </Col>
            </Row>

            <Row style={{ alignItems: 'center' }}>
              <Col span={24}>
                <div className="per-night">
                  <label>Per Night</label>
                  <span>Accommondation cost:</span>
                  <span className="amnt">{accomodation} €</span>
                </div>
              </Col>

              <Col span={24}>
                <div className="srvice-amnt">
                  <label>Services</label>
                  <Link className="additionl-link" to={'/'}>
                    <PlusOutlined />
                    Add Services
                  </Link>
                </div>
              </Col>

              <Col span={24}>
                <div className="amnt-total">
                  <h4>Total: {accomodation} €</h4>
                </div>

                <div className="deposit">
                  <label>Deposit</label>

                  <div className="inline-form">
                    <label>Accommodation deposit</label>
                    <Input type="text" placeholder="0,00" onChange={(e)=> setDeposit(e.target.value)} />
                    <Input type="text" placeholder="%" />
                  </div>
                </div>
              </Col>

              <Col span={24}>
                <div className="outstanding">
                  <label>
                    Accommodation deposit: <span>{deposit}€ (0,00 %)</span>
                  </label>
                  <label>
                    Outstanding amount: <span>{accomodation - deposit}€ (0,00 %)</span>
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
                <Button style={{ marginRight: 10 }}>Cancel</Button>
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

export default CreateBookingPopup;
