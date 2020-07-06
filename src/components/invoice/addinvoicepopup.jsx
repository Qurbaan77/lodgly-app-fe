import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './invoice.css';
import {
  Form,
  Select,
  Input,
  Layout,
  Menu,
  Button,
  Radio,
  Slider,
  DatePicker,
  Tooltip,
  Dropdown,
  Checkbox,
  TimePicker,
} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  PlusOutlined,
  PlusSquareOutlined,
  DeleteOutlined,
  FormOutlined,
  SearchOutlined,
  VerticalAlignMiddleOutlined,
  PartitionOutlined,
  UserOutlined,
  DownOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import Wrapper from '../wrapper';
import { Modal } from 'antd';
import { Table } from 'antd';
import property_icon from '../../assets/images/menu/property-icon-orange.png';
import { Row, Col } from 'antd';
import { Collapse } from 'antd';
import delete_icon from '../../assets/images/menu/delete-icon-red.png';
import moment from 'moment';

const { Panel } = Collapse;

const AdInvoicePopup = () => {
  const [form] = Form.useForm();
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [fName, setFName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [vatId, setVatId] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [price, setPrice] = useState(null);
  const [amount, setAmount] = useState(null);
  const [discountType, setDiscountType] = useState('%');
  const [discount, setDiscount] = useState(null);
  const [itemTotal, setItemTotal] = useState(null);
  const [grandTotal, setGrandToal] = useState(null);
  const { Option } = Select;

  const { MonthPicker, RangePicker } = DatePicker;

  const handleFinish = (values) => {
    values.date = date;
    values.deliveryDate = deliveryDate;
    values.dueDate = dueDate;
    values.time = time;
    console.log(values);
  };

  const handlePrice = (e) => {
    const d = parseFloat(e.target.value);
    console.log(typeof d);
    setPrice(d);
    const d1 = d * quantity;
    setAmount(d1);
  };

  const handleDiscount = (e) => {
    const d = e.target.value;
    setDiscount(d);
    if (discountType === '%') {
      setItemTotal(amount - (amount * d) / 100);
    } else {
      setItemTotal(amount - d);
    }
  };

  const handleDiscountType = (value) => {
    setDiscountType(value);
    if (discount) {
      console.log('a');
      if (value === '%') {
        console.log('b');
        setItemTotal(amount - (amount * discount) / 100);
      } else {
        setItemTotal(amount - discount);
        console.log('c');
      }
    }
  };

  console.log(quantity, price, amount, discountType, discount, itemTotal);

  return (
    <Form name='basic' onFinish={handleFinish}>
      <Row style={{ alignItems: 'center' }}>
        <Col span={12}>
          <div className='invoice-property-info'>
            <h4>
              <img src={property_icon} alt='property' /> Property Name 1
            </h4>
            <p>City of London, United Kingdom, 4915 St Anthony Ave</p>
          </div>
        </Col>

        <Col span={12}>
          <div className='invoice-owner-info'>
            <p>t: +385 01 123 456</p>
            <p>owner@gmail.com</p>
            <p>www.mywebsite.com </p>
          </div>
        </Col>
      </Row>
      <Row className='invoice-border'>
        <Col span={10}>
          <div className='invoice-date'>
            <h4>Invoice 1 - 2019</h4>

            <Row>
              <Col span={12} style={{ marginRight: 10 }}>
                <Form.Item name='date' label='Date'>
                  <DatePicker
                    value={date}
                    onChange={(e) => {
                      const d = moment().format(e._id);
                      setDate(d.slice(0, 10));
                    }}
                  />
                </Form.Item>
              </Col>

              <Col span={9}>
                <Form.Item name='time' label='Time'>
                  <TimePicker
                    format='HH:mm:ss'
                    value={time}
                    onChange={(e) => {
                      const d = moment(e).format('HH:mm:ss');
                      setTime(d);
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item name='deliveryDate' label='Delivery Date'>
                  <DatePicker
                    value={deliveryDate}
                    onChange={(e) => {
                      const d = moment().format(e._id);
                      setDeliveryDate(d.slice(0, 10));
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <Form.Item name='dueDate' label='Due Date'>
                  <DatePicker
                    value={dueDate}
                    onChange={(e) => {
                      const d = moment().format(e._id);
                      setDueDate(d.slice(0, 10));
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={18}>
                <Form.Item name='paymentType' label='Payment Type'>
                  <Select placeholder='Select'>
                    <Select.Option value='bank notes'>BANK NOTES</Select.Option>
                    <Select.Option value='card'>CARD</Select.Option>
                    <Select.Option value='check'>CHECK</Select.Option>
                    <Select.Option value='bank transfer'>
                      BANKTRANSFER
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Col>

        <Col span={4}></Col>

        <Col span={10}>
          <div className='client-info'>
            <h4>Client:</h4>

            <Form.Item label='Full Name' name='fname'>
              <Input value={fName} onChange={(e) => setFName(e.target.value)} />
            </Form.Item>

            <Form.Item label='Email' name='email'>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>

            <Form.Item label='Address' name='address'>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Item>

            <Form.Item label='Vat ID' name='vat'>
              <Input value={vatId} onChange={(e) => setVatId(e.target.value)} />
            </Form.Item>
          </div>
        </Col>
      </Row>

      <div className='additional-fields'>
        <Row style={{ alignItems: 'center' }}>
          <Col span={6}>
            <Form.Item name='itemDescription' label='Item Description'>
              <Input />
            </Form.Item>
          </Col>

          <Col span={2}>
            <Form.Item name='Quantity' label='Qty.'>
              <Input
                value={quantity}
                onChange={(e) => setQuantity(parseFloat(e.target.value))}
              />
            </Form.Item>
          </Col>

          <Col span={3}>
            <Form.Item name='price' label='Price'>
              <Input value={price} onChange={(e) => handlePrice(e)} />
            </Form.Item>
          </Col>

          <Col span={3}>
            <div className='amount-field'>
              <p>{amount}</p>
            </div>
          </Col>

          <Col span={2} className='label-hidden'>
            <Form.Item name='discountType' label='Discount Type'>
              <Select
                placeholder='Discount type'
                onSelect={(value) => handleDiscountType(value)}
                defaultValue='%'
              >
                <Select.Option value='€'>€</Select.Option>
                <Select.Option value='%'>%</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={3}>
            <Form.Item name='discount' label='Discount'>
              <Input value={discount} onChange={(e) => handleDiscount(e)} />
            </Form.Item>
          </Col>

          <Col span={3}>
            <div className='amount-field'>
              <p>{itemTotal}</p>
            </div>
          </Col>

          <Col span={2} className='deleteicon'>
            <Form.Item>
              <img src={delete_icon} alt='delete' />
            </Form.Item>
          </Col>
        </Row>
      </div>

      <Row style={{ alignItems: 'center' }}>
        <Col span={12}>
          <div className='additional-add-guest'>
            <PlusOutlined /> Add additional guest
          </div>
        </Col>

        <Col span={12}>
          <div className='total-add'>
            <h3>
              {/* TODO: change this to grandTotal */}
              TOTAL: <span>{itemTotal} €</span>
            </h3>
          </div>
        </Col>

        <Col span={24} className='m-top-30'>
          <Form.Item name='notes1' label='Impression'>
            <Input.TextArea />
          </Form.Item>

          <p className='web-info'>
            United Kingdom | 4915 St Anthony Ave | t: +385 01 123 456 |
            owner@gmail.com | www.mywebsite.com{' '}
          </p>
        </Col>
      </Row>

      <Row
        style={{
          alignItems: 'center',
          textAlign: 'right',
          marginTop: '10px',
          marginBottom: '20px',
        }}
      >
        <Col span={24}>
          <Form.Item>
            <Button type='secondry' style={{ marginRight: 10 }}>
              Save Draft
            </Button>
            <Button type='primary' htmlType='submit'>
              Issue
            </Button>
          </Form.Item>
        </Col>
        <Col span={24}>
          <div className='note'>
            <p>
              NOTE: Issued invoice has an ordinal number assigned to it, and it
              cannot be changed. Invoice that is saved as draft can be changed
              afterwards.
            </p>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default AdInvoicePopup;
