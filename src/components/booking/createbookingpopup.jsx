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
import { InboxOutlined } from '@ant-design/icons';
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

const CreateBookingPopup = () => {
  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    // const response = await userInstance.post('/addBooking', values);
  };

  return (
    <Wrapper>
      <div className="page-header">
        <h1>
          <HomeOutlined /> Booking
        </h1>

        <Button type="primary" icon={<PlusOutlined />} onClick={show}>
          Create Booking
        </Button>
      </div>

      <Modal
        title="Create Booking"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
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
              <Radio.Group name="radiogroup" defaultValue={1}>
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
                <Select>
                  <Select.Option value="demo">Holiday House</Select.Option>
                  <Select.Option value="demo">Holiday House</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                className="comision"
                label="Channel, Commission(%)"
                name="channel"
              >
                <Select style={{ width: '70%', display: 'inline-block' }}>
                  <Select.Option value="demo">Holiday House</Select.Option>
                  <Select.Option value="demo">Holiday House</Select.Option>
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
                  <Select.Option value="demo">Holiday House</Select.Option>
                  <Select.Option value="demo">Holiday House</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Childrens(0-12yrs)"
                name="unit"
                style={{ paddingRight: 20 }}
              >
                <Select>
                  <Select.Option value="demo">Holiday House</Select.Option>
                  <Select.Option value="demo">Holiday House</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Childrens(12+ yrs)" name="channel">
                <Select>
                  <Select.Option value="demo">Holiday House</Select.Option>
                  <Select.Option value="demo">Holiday House</Select.Option>
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
                    {text}
                  </Panel>

                  <Panel
                    icon={<PlusSquareOutlined />}
                    header="Add Notes (Optional)"
                    key="2"
                  >
                    {text}
                  </Panel>

                  <Panel
                    icon={<PlusSquareOutlined />}
                    header="Add Notes (Optional)"
                    key="3"
                  >
                    {text}
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
                    <Input type="text" placeholder="0,00" />
                    <label>X</label>
                    <Input type="text" placeholder="0 nights" />
                    <label>=</label>
                    <Input type="text" placeholder="0,00" />
                    <label>EUR</label>
                  </div>

                  <div className="inline-form">
                    <label>Discount</label>
                    <Input type="text" placeholder="0,00" />
                    <label>X</label>
                    <Input type="text" placeholder="0%" />
                    <label>=</label>
                    <Input type="text" placeholder="0,00" />
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
                  <span className="amnt">0,00 €</span>
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
                  <h4>Total: 0,00 €</h4>
                </div>

                <div className="deposit">
                  <label>Deposit</label>

                  <div className="inline-form">
                    <label>Accommodation deposit</label>
                    <Input type="text" placeholder="0,00" />
                    <Input type="text" placeholder="%" />
                  </div>
                </div>
              </Col>

              <Col span={24}>
                <div className="outstanding">
                  <label>
                    Accommodation deposit: <span>0,00€ (0,00 %)</span>
                  </label>
                  <label>
                    Outstanding amount: <span>0,00€ (0,00 %)</span>
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
    </Wrapper>
  );
};

export default CreateBookingPopup;
