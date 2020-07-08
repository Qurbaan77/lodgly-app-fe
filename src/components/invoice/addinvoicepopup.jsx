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
import { userInstance } from '../../axios/axiosconfig';

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
  const [pricePanel, setPricePanel] = useState([1]);
  const [quantity, setQuantity] = useState(null);
  const [price, setPrice] = useState(null);
  const [amount, setAmount] = useState(null);
  const [discountType, setDiscountType] = useState('%');
  const [discount, setDiscount] = useState(null);
  const [itemTotal, setItemTotal] = useState(null);
  const [quantityCopy, setQuantityCopy] = useState([]);
  const [priceCopy, setPriceCopy] = useState([]);
  const [amountCopy, setAmountCopy] = useState([]);
  const [discountCopy, setDiscountCopy] = useState([]);
  const [itemTotalCopy, setItemTotalCopy] = useState([]);
  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [grandTotal, setGrandToal] = useState(null);
  const { Option } = Select;

  const { MonthPicker, RangePicker } = DatePicker;

  const handleFinish = async (values) => {
    values.date = date;
    values.deliveryDate = deliveryDate;
    values.dueDate = dueDate;
    values.time = time;
    pricePanel.map((el) => {
      console.log(values[el])
    })
    console.log(values);

    const res = await userInstance.post('/createInvoice', values);
  };


  const handleQuantity = (e, ele) => {
    const d = e.target.value;
    console.log(d);
    setQuantity(d);
    setQuantityCopy(quantityCopy => [...quantityCopy, d]);

  }
  console.log(quantity);
  console.log(quantityCopy);

  const handlePrice = (e, ele) => {
    console.log(e.target.value);
    const d = e.target.value;
    setPrice(d);
    setPriceCopy(priceCopy => [...priceCopy, d]);
    setAmount(d * quantity);
    setAmountCopy(amountCopy => [...amountCopy, quantityCopy[ele - 1] * d]);

  };
  console.log(price);
  console.log(quantityCopy);
  console.log(priceCopy)

  const handleDiscount = (e, ele) => {
    const d = e.target.value;
    setDiscount(d);
    setDiscountCopy(discountCopy => [...discountCopy, d]);
    if (discountType === '%') {
      console.log(amountCopy[ele - 1]);
      setItemTotal(amount - (amount * d) / 100);
      setItemTotalCopy(itemTotalCopy => [...itemTotalCopy, amountCopy[ele - 1] - (amountCopy[ele - 1] * d) / 100]);
    } else {
      setItemTotal(amount - d);
      setItemTotalCopy(itemTotalCopy => [...itemTotalCopy, amountCopy[ele - 1] - d]);
    }
  };


  const handleDiscountType = (value, ele) => {
    setDiscountType(value);
    if (discount && discountCopy.length) {
      console.log('a');
      if (value === '%') {
        console.log('b');
        console.log(amountCopy[ele - 1] - (amountCopy[ele - 1] * discountCopy[ele - 1]) / 100);
        setItemTotal(amount - (amount * discount) / 100);
        setItemTotalCopy(itemTotalCopy => [...itemTotalCopy, amountCopy[ele - 1] - (amountCopy[ele - 1] * discountCopy[ele - 1]) / 100]);
      } else {
        setItemTotal(amount - discount);
        setItemTotalCopy(itemTotalCopy => [...itemTotalCopy, amountCopy[ele - 1] - discountCopy[ele - 1]]);
        console.log(amountCopy[ele - 1] - discountCopy[ele - 1]);
        console.log('c');
      }
    }
  };

  console.log(itemTotalCopy)
  let i = 1;

  const addMorePanel = () => {
    setOne(false);
    console.log('gsfg');
    i++;
    setPricePanel([...pricePanel, i]);
  }

  const removePanel = (ele) => {
    const oldarray = [...pricePanel];
    oldarray.pop();
    setPricePanel([...oldarray]);
  }

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

      {pricePanel.map((ele, i) => {
        let d;
        switch (i) {
          case 1:
            d = one;
            break;
          case 2:
            d = two;
            break;
          case 3:
            d = three;
            break;
          default:
            d = false;
        }
        {/* d.replace(/^"(.*)"$/, '$1'); */ }
        console.log(d);
        return (
          <div className='additional-fields'>
            <Row style={{ alignItems: 'center' }}>
              <Col span={6}>
                <Form.Item name={[ele, 'itemDescription']} label='Item Description'>
                  <Input />
                </Form.Item>
              </Col>

              <Col span={2}>
                <Form.Item name={[ele, 'quantity']} label='Qty.'>
                  <Input
                    // value={quantity}
                    onBlur={(e) => handleQuantity(e, ele)}
                  />
                </Form.Item>
              </Col>

              <Col span={3}>
                <Form.Item name={[ele, 'price']} label='Price'>
                  <Input
                    // value={price} 
                    onBlur={(e) => handlePrice(e, ele)} />
                </Form.Item>
              </Col>

              <Col span={3}>
                <div className='amount-field'>
                  <p>{amountCopy[ele - 1]}</p>
                </div>
              </Col>

              <Col span={2} className='label-hidden'>
                <Form.Item name={[ele, 'discountType']} label='Discount Type'>
                  <Select
                    placeholder='Discount type'
                    onSelect={(value) => handleDiscountType(value, ele)}
                    defaultValue='%'
                  >
                    <Select.Option value='€'>€</Select.Option>
                    <Select.Option value='%'>%</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={3}>
                <Form.Item name={[ele, 'discount']} label='Discount'>
                  <Input
                    // value={discount} 
                    onBlur={(e) => handleDiscount(e, ele)} />
                </Form.Item>
              </Col>

              <Col span={3}>
                <div className='amount-field' key={i}>
                  <p>{itemTotalCopy[ele - 1]}
                  </p>
                </div>
              </Col>

              <Col span={2} className='deleteicon'>
                <Form.Item>
                  <img src={delete_icon} alt='delete' onClick={() => removePanel(ele)} />
                </Form.Item>
              </Col>
            </Row>
          </div>
        );
      })}



      <Row style={{ alignItems: 'center' }}>
        <Col span={12}>
          <div className='additional-add-guest' onClick={addMorePanel}>
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
