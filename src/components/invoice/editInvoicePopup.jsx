import React, { useState, useEffect } from 'react';
import './invoice.css';
import {
  Form,
  Select,
  Input,
  Button,
  DatePicker,
  TimePicker,
  Modal,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import property_icon from '../../assets/images/menu/property-icon-orange.png';
import { Row, Col } from 'antd';
import delete_icon from '../../assets/images/menu/delete-icon-red.png';
import loader from '../../assets/images/loader.svg';

import { userInstance } from '../../axios/axiosconfig';

const AdInvoicePopup = (props) => {
  console.log(props);
  const { userData, property, invoiceData, invoiceItems } = props;
  const [form] = Form.useForm();
  const [draftBtn, setDraftBtn] = useState(false);
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
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (props.visible) {
      const date = moment(invoiceData.date);

      const deliveryDate = moment(invoiceData.deliveryDate);
      const dueDate = moment(invoiceData.dueDate);
      form.setFieldsValue({
        clientName: invoiceData.clientName,
        email: invoiceData.email,
        address: invoiceData.address,
        vat: invoiceData.vat,
        date,
        deliveryDate,
        dueDate,
        paymentType: invoiceData.paymentType,
      });
      if (invoiceItems.length) {
        invoiceItems.map((el, i) => {
          form.setFieldsValue({
            [`quantity${i}`]: el.quantity,
            [`price${i}`]: el.price,
            [`discount${i}`]: el.discount,
          });
        });
      }
    }
  }, [props.visible]);

  console.log(amountCopy);
  const handleFinish = async (values) => {
    setShowLoader(false);
    const valuesCopy = values;
    valuesCopy.date = moment(valuesCopy.date._d).format('YYYY/MM/DD');
    valuesCopy.deliveryDate = moment(valuesCopy.deliveryDate._d).format(
      'YYYY/MM/DD'
    );
    valuesCopy.dueDate = moment(valuesCopy.dueDate._d).format('YYYY/MM/DD');
    valuesCopy.time = time.slice(0, 5);
    const itemData = [];
    pricePanel.map((el) => {
      console.log(valuesCopy[el]);
      console.log(valuesCopy[el].price, valuesCopy[el].quantity);
      valuesCopy[el].amount = valuesCopy[el].price * valuesCopy[el].quantity;
      valuesCopy[el].itemTotal =
        valuesCopy[el].price * valuesCopy[el].quantity -
        (valuesCopy[el].price *
          valuesCopy[el].quantity *
          valuesCopy[el].discount) /
          100;
      itemData.push(valuesCopy[el]);
    });
    valuesCopy.itemData = itemData;
    valuesCopy.userPhone = userData.userPhone;
    valuesCopy.userEmail = userData.userEmail;
    const { clientName } = valuesCopy;
    valuesCopy.total = itemTotalCopy.reduce((a, b) => a + (b || 0), 0);
    valuesCopy.propertyName = property.propertyName;
    valuesCopy.propertyAddress = property.propertyAddress;
    valuesCopy.website = property.website;
    valuesCopy.propertyId = property.propertyId;
    console.log(valuesCopy);
    // if (!draftBtn) {
    //   const res = await userInstance.post('/createInvoice', valuesCopy);
    //   console.log('pdf post response', res);
    //   if (res.status === 200) {
    //     const element = document.createElement('a');
    //     element.setAttribute('href', `${res.data}`);
    //     element.setAttribute('download', `${clientName}.pdf`);
    //     element.style.display = 'none';
    //     document.body.appendChild(element);
    //     element.click();
    //     setShowLoader(true);
    //   }
    // } else {
    //   const response = await userInstance.post('/invoicedraft', valuesCopy);
    //   console.log('draft response', response);
    //   if (response.data.code === 200) {
    //     setShowLoader(true);
    //     props.getData();
    //     props.close();
    //   }
    // }
  };

  const handleQuantity = (e, ele, i) => {
    console.log(i);
    console.log(ele);
    const d = e.target.value;
    ele.quantity = d;
    setQuantity({ quantityCopy: [...quantityCopy, ele.quantity] });
    // quantityCopy[i] = d;
    // setQuantityCopy((quantityCopy) => [...quantityCopy, d]);
  };
  console.log(quantityCopy);
  console.log(amountCopy);
  console.log(itemTotalCopy);
  const handlePrice = (e, ele, i) => {
    console.log(e.target.value);
    const d = e.target.value;
    ele.price = d;
    // priceCopy[i] = d;
    // amountCopy[i] = quantityCopy[i] * d;
    // setPriceCopy((priceCopy) => [...priceCopy, d]);
    // setAmountCopy((amountCopy) => [...amountCopy, quantityCopy[ele - 1] * d]);
  };

  const handleDiscount = (e, ele) => {
    console.log(ele);
    const d = e.target.value;
    // setDiscount(d);
    // setDiscountCopy((discountCopy) => [...discountCopy, d]);

    // setItemTotalCopy((itemTotalCopy) => [
    //   ...itemTotalCopy,
    //   amountCopy[ele - 1] - (amountCopy[ele - 1] * d) / 100,
    // ]);
    // if (discountType === '%') {
    //   console.log(amountCopy[ele - 1]);
    //   setItemTotal(amount - (amount * d) / 100);
    //   setItemTotalCopy((itemTotalCopy) => [
    //     ...itemTotalCopy,
    //     amountCopy[ele - 1] - (amountCopy[ele - 1] * d) / 100,
    //   ]);
    // } else {
    //   setItemTotal(amount - d);
    //   setItemTotalCopy((itemTotalCopy) => [
    //     ...itemTotalCopy,
    //     amountCopy[ele - 1] - d,
    //   ]);
    // }
  };

  let i = 1;

  const addMorePanel = () => {
    console.log('gsfg');
    i++;
    setPricePanel([...pricePanel, i]);
  };

  const removePanel = (ele) => {
    const oldarray = [...pricePanel];
    oldarray.pop();
    setPricePanel([...oldarray]);
  };

  const handleDraft = () => {
    setDraftBtn(true);
  };
  console.log(invoiceData);
  return (
    <Modal
      title='Edit invoice'
      visible={props.visible}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      wrapClassName='guest-modal add-invoice-popup'
    >
      <Form name='basic' form={form} onFinish={handleFinish}>
        <Row style={{ alignItems: 'center' }}>
          <Col span={12}>
            <div className='invoice-property-info'>
              <h4>
                <img src={property_icon} alt='property' />{' '}
                {property.length ? property[0].propertyName : ''}
              </h4>
              <p>{property.length ? property[0].address : ''}</p>
            </div>
          </Col>
          <div className='loader' hidden={showLoader}>
            <div className='loader-box'>
              <img src={loader} alt='loader' />
            </div>
          </div>

          <Col span={12}>
            <div className='invoice-owner-info'>
              <p>{userData.length ? userData[0].phone : ''}</p>
              <p>{userData.length ? userData[0].email : ''}</p>
              <p>{property.length ? property[0].website : ''}</p>
            </div>
          </Col>
        </Row>
        <Row className='invoice-border'>
          <Col span={10}>
            <div className='invoice-date'>
              <h4>
                Invoice {invoiceData.id}- {new Date().getFullYear()}
              </h4>
              <Row>
                <Col span={12} style={{ marginRight: 10 }}>
                  <Form.Item name='date' label='Date'>
                    <DatePicker />
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
                        const d1 = moment(e._id).format('MM/DD/YYYY');
                        setDeliveryDate(d1);
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
                        const d2 = moment(e._id).format('MM/DD/YYYY');
                        setDueDate(d2);
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={18}>
                  <Form.Item name='paymentType' label='Payment Type'>
                    <Select placeholder='Select'>
                      <Select.Option value='bank notes'>
                        BANK NOTES
                      </Select.Option>
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
              <Form.Item label='Full Name' name='clientName'>
                <Input
                  value={fName}
                  onChange={(e) => setFName(e.target.value)}
                />
              </Form.Item>

              <Form.Item label='Email' name='email'>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>

              <Form.Item label='Address' name='address'>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Item>

              <Form.Item label='Vat ID' name='vat'>
                <Input
                  value={vatId}
                  onChange={(e) => setVatId(e.target.value)}
                />
              </Form.Item>
            </div>
          </Col>
        </Row>

        {invoiceItems.length
          ? invoiceItems.map((ele, i) => {
              return (
                <div className='additional-fields'>
                  <Row style={{ alignItems: 'center' }}>
                    <Col span={6}>
                      <Form.Item
                        name={[ele, 'itemDescription']}
                        label='Item Description'
                      >
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col span={2}>
                      <Form.Item name={`quantity${i}`} label='Qty.'>
                        <Input
                          // value={quantity}
                          onBlur={(e) => handleQuantity(e, ele, i)}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={3}>
                      <Form.Item name={`price${i}`} label='Price'>
                        <Input
                          // value={price}
                          onBlur={(e) => handlePrice(e, ele, i)}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={3}>
                      <div className='amount-field'>
                        <p>{ele.quantity * ele.price}</p>
                      </div>
                    </Col>

                    <Col span={2} className='label-hidden'>
                      <Form.Item
                        name={[ele, 'discountType']}
                        label='Discount Type'
                      >
                        <Select placeholder='Discount type' defaultValue='%'>
                          <Select.Option value='€'>€</Select.Option>
                          <Select.Option value='%'>%</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col span={3}>
                      <Form.Item name={`discount${i}`} label='Discount'>
                        <Input
                          // value={discount}
                          onBlur={(e) => handleDiscount(e, ele, i)}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={3}>
                      <div className='amount-field' key={i}>
                        <p>{itemTotalCopy[i]}</p>
                      </div>
                    </Col>

                    <Col span={2} className='deleteicon'>
                      <Form.Item>
                        <img
                          src={delete_icon}
                          alt='delete'
                          onClick={() => removePanel(ele)}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              );
            })
          : ''}

        <Row style={{ alignItems: 'center' }}>
          <Col span={12}>
            <div className='additional-add-guest' onClick={addMorePanel}>
              <PlusOutlined /> Add additional guest
            </div>
          </Col>

          <Col span={12}>
            <div className='total-add'>
              <h3>
                TOTAL:{' '}
                <span>{itemTotalCopy.reduce((a, b) => a + (b || 0), 0)} €</span>
              </h3>
            </div>
          </Col>

          <Col span={24} className='m-top-30'>
            <Form.Item name='impression' label='Impression'>
              <Input.TextArea />
            </Form.Item>

            <p className='web-info'>
              {property.length ? property[0].address : ''} |{' '}
              {userData.length ? userData[0].phone : ''} |{' '}
              {userData.length ? userData[0].email : ''} |{' '}
              {property.length ? property[0].website : ''}{' '}
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
              <Button
                type='secondry'
                style={{ marginRight: 10 }}
                htmlType='submit'
                onClick={handleDraft}
              >
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
                NOTE: Issued invoice has an ordinal number assigned to it, and
                it cannot be changed. Invoice that is saved as draft can be
                changed afterwards.
              </p>
            </div>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AdInvoicePopup;
