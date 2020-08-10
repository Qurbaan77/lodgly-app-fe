import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './invoice.css';
import { useTranslation } from 'react-i18next';
import {
  Form,
  Select,
  Input,
  Button,
  DatePicker,
  TimePicker,
  Modal,
  Row, Col,
} from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

import moment from 'moment';
import propertyIcon from '../../assets/images/menu/property-icon-orange.png';

import deleteIcon from '../../assets/images/menu/delete-icon-red.png';
import loader from '../../assets/images/loader.svg';
import { userInstance } from '../../axios/axiosconfig';

let i = 1;
const AdInvoicePopup = (props) => {
  const { t } = useTranslation();
  const {
    userData, property, label, visible, handleCancel, handleOk,
  } = props;
  // const [{ phone: userPhone, email: userEmail }] = userData || [
  //   { phone: null, email: null },
  // ];
  // const [
  //   { propertyName, address: propertyAddress, website, id: propertyId },
  // ] = property || [{ propertyName: null, address: null, website: null }];
  // console.log(userPhone, userEmail);
  const [draftBtn, setDraftBtn] = useState(false);
  // const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [fName, setFName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [vatId, setVatId] = useState(null);
  const [pricePanel, setPricePanel] = useState([1]);
  // const [quantity, setQuantity] = useState(null);
  // const [price, setPrice] = useState(null);
  // const [amount, setAmount] = useState(null);
  // const [discountType, setDiscountType] = useState('%');
  // const [discount, setDiscount] = useState(null);
  // const [itemTotal, setItemTotal] = useState(null);
  const [quantityCopy, setQuantityCopy] = useState([]);
  // const [priceCopy, setPriceCopy] = useState([]);
  const [amountCopy, setAmountCopy] = useState([]);
  // const [discountCopy, setDiscountCopy] = useState([]);
  const [itemTotalCopy, setItemTotalCopy] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [impression, setImpression] = useState('');

  const handleFinish = async (values) => {
    setShowLoader(false);
    const valuesCopy = values;
    valuesCopy.date = moment(valuesCopy.date._d).format('YYYY/MM/DD');
    valuesCopy.deliveryDate = moment(valuesCopy.deliveryDate._d).format(
      'YYYY/MM/DD',
    );
    valuesCopy.dueDate = moment(valuesCopy.dueDate._d).format('YYYY/MM/DD');
    valuesCopy.time = time.slice(0, 5);
    const itemData = [];
    pricePanel.forEach((el) => {
      valuesCopy[el].amount = valuesCopy[el].price * valuesCopy[el].quantity;
      valuesCopy[el].itemTotal = valuesCopy[el].price * valuesCopy[el].quantity
        - (valuesCopy[el].price
          * valuesCopy[el].quantity
          * valuesCopy[el].discount)
        / 100;
      valuesCopy[el].discountPer = valuesCopy[el].discount;
      valuesCopy[el].discount = ((valuesCopy[el].amount) * (valuesCopy[el].discount / 100));
      itemData.push(valuesCopy[el]);
    });
    valuesCopy.itemData = itemData;
    valuesCopy.phone = userData[0].phone;
    valuesCopy.email = userData[0].email;
    valuesCopy.total = itemTotalCopy.reduce((a, b) => a + (b || 0), 0);
    valuesCopy.propertyName = property[0].propertyName;
    valuesCopy.propertyAddress = property[0].address;
    valuesCopy.website = property[0].website;
    valuesCopy.propertyId = property[0].id;
    const { clientName } = valuesCopy;
    valuesCopy.impression = impression;
    valuesCopy.label = `INVOICE ${
      label ? label + 1 : 1
    } - ${new Date().getFullYear()}`;
    if (!draftBtn) {
      valuesCopy.status = 'Issued';
      const res = await userInstance.post('/invoicedraft', valuesCopy);
      setShowLoader(true);
      if (res.status === 200) {
        const element = document.createElement('a');
        element.setAttribute('href', `${res.data.url}`);
        element.setAttribute('download', `${clientName}.pdf`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        props.getData();
        props.close();
        props.toasterMessage('successfully issued invoice');
      } else {
        setShowLoader(true);
      }
    } else {
      valuesCopy.status = 'Draft';
      const response = await userInstance.post('/invoicedraft', valuesCopy);
      setShowLoader(true);
      if (response.data.code === 200) {
        setShowLoader(true);
        props.close();
        props.getData();
        props.toasterMessage('successfully drafted invoice');
      } else {
        setShowLoader(true);
      }
    }
    setShowLoader(true);
    setItemTotalCopy([]);
    setAmountCopy([]);
  };

  const handleQuantity = (e) => {
    const d = e.target.value;
    // setQuantity(d);
    setQuantityCopy((quantityCopy) => [...quantityCopy, d]);
  };

  const handlePrice = (e, ele) => {
    const d = e.target.value;
    // setPrice(d);
    // setPriceCopy((priceCopy) => [...priceCopy, d]);
    // setAmount(d * quantity);
    setAmountCopy((amountCopy) => [...amountCopy, quantityCopy[ele - 1] * d]);
  };
  const handleDiscount = (e, ele) => {
    const d = e.target.value;
    // setDiscount(d);
    // setDiscountCopy((discountCopy) => [...discountCopy, d]);
    // if (discountType === '%') {
    // setItemTotal(amount - (amount * d) / 100);
    setItemTotalCopy((itemTotalCopy) => [
      ...itemTotalCopy,
      amountCopy[ele - 1] - (amountCopy[ele - 1] * d) / 100,
    ]);
    // } else {
    //   setItemTotal(amount - d);
    //   setItemTotalCopy((itemTotalCopy) => [
    //     ...itemTotalCopy,
    //     amountCopy[ele - 1] - d,
    //   ]);
    // }
  };

  // const handleDiscountType = (value, ele) => {
  //   setDiscountType(value);
  //   if (discount && discountCopy.length) {
  //     if (value === '%') {
  //       setItemTotal(amount - (amount * discount) / 100);
  //       setItemTotalCopy((itemTotalCopy) => [
  //         ...itemTotalCopy,
  //         amountCopy[ele - 1]
  //         - (amountCopy[ele - 1] * discountCopy[ele - 1]) / 100,
  //       ]);
  //     } else {
  //       setItemTotal(amount - discount);
  //       setItemTotalCopy((itemTotalCopy) => [
  //         ...itemTotalCopy,
  //         amountCopy[ele - 1] - discountCopy[ele - 1],
  //       ]);
  //     }
  //   }
  // };

  const addMorePanel = () => {
    i += 1;
    setPricePanel([...pricePanel, i]);
  };

  const removePanel = () => {
    const oldarray = [...pricePanel];
    oldarray.pop();
    setPricePanel([...oldarray]);
  };

  const handleDraft = () => {
    setDraftBtn(true);
  };
  const handleCross = () => {
    props.close();
  };
  return (
    <Modal
      title={t('invoice.heading1')}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      wrapClassName="guest-modal add-invoice-popup"
      destroyOnClose
    >
      <div className="cross-btn">
        <CloseOutlined onClick={handleCross} />
      </div>
      <Form name="basic" onFinish={handleFinish}>
        <Row style={{ alignItems: 'center' }}>
          <Col span={12}>
            <div className="invoice-property-info">
              <h4>
                <img src={propertyIcon} alt="property" />
                {' '}
                {property.length ? property[0].propertyName : ''}
              </h4>
              <p>{property.length ? property[0].address : ''}</p>
            </div>
          </Col>
          <div className="loader" hidden={showLoader}>
            <div className="loader-box">
              <img src={loader} alt="loader" />
            </div>
          </div>

          <Col span={12}>
            <div className="invoice-owner-info">
              <p>{userData.length ? userData[0].phone : ''}</p>
              <p>{userData.length ? userData[0].email : ''}</p>
              <p>{property.length ? property[0].website : ''}</p>
            </div>
          </Col>
        </Row>
        <Row className="invoice-border">
          <Col span={10}>
            <div className="invoice-date">
              <h4>
                {t('invoice.label1')}
                {' '}
                {label ? label + 1 : 1}
                {' '}
                -
                {' '}
                {new Date().getFullYear()}
              </h4>

              <Row>
                <Col span={12} style={{ marginRight: 10 }}>
                  <Form.Item
                    name="date"
                    label={t('strings.date')}
                    rules={[
                      {
                        required: true,
                        message: t('invoice.label2'),
                      },
                    ]}
                  >
                    <DatePicker
                      // value={date}
                      onChange={(e) => {
                        const d1 = moment(e._id).format('MM/DD/YYYY');
                        setDeliveryDate(d1);
                      }}
                    />
                  </Form.Item>
                </Col>

                <Col span={9}>
                  <Form.Item
                    name="time"
                    label={t('strings.time')}
                    rules={[
                      {
                        required: true,
                        message: t('invoice.label3'),
                      },
                    ]}
                  >
                    <TimePicker
                      format="HH:mm:ss"
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
                  <Form.Item
                    name="deliveryDate"
                    label={t('strings.delivery_date')}
                    rules={[
                      {
                        required: true,
                        message: t('invoice.label4'),
                      },
                    ]}
                  >
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
                  <Form.Item
                    name="dueDate"
                    label="Due Date"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
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
                  <Form.Item name="paymentType" label="Payment Type">
                    <Select placeholder="Select">
                      <Select.Option value="bank notes">
                        {t('strings.bank_note')}
                      </Select.Option>
                      <Select.Option value="card">
                        {t('strings.card')}
                      </Select.Option>
                      <Select.Option value="check">
                        {t('strings.check')}
                      </Select.Option>
                      <Select.Option value="bank transfer">
                        {t('strings.bank_transfer')}
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Col>

          <Col span={4} />

          <Col span={10}>
            <div className="client-info">
              <h4>
                {t('invoice.label5')}
                :
              </h4>

              <Form.Item
                label={t('strings.full')}
                name="clientName"
                rules={[
                  {
                    required: true,
                    message: t('invoice.label6'),
                  },
                ]}
              >
                <Input
                  value={fName}
                  onChange={(e) => setFName(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label={t('strings.email')}
                name="email"
                rules={[
                  {
                    required: true,
                    message: t('invoice.label12'),
                  },
                ]}
              >
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label={t('strings.address')}
                name="address"
                rules={[
                  {
                    required: true,
                    message: t('invoice.label7'),
                  },
                ]}
              >
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Item>

              <Form.Item label="Vat ID" name="vat">
                <Input
                  type="number"
                  value={vatId}
                  onChange={(e) => setVatId(e.target.value)}
                />
              </Form.Item>
            </div>
          </Col>
        </Row>

        {pricePanel.map((ele) => (
          <div className="additional-fields" key={ele}>
            <Row style={{ alignItems: 'center' }}>
              <Col span={6}>
                <Form.Item
                  name={[ele, 'itemDescription']}
                  label={t('invoice.label13')}
                  rules={[
                    {
                      required: true,
                      message: t('invoice.label14'),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={3}>
                <Form.Item
                  name={[ele, 'quantity']}
                  label="Qty."
                  rules={[
                    {
                      required: true,
                      message: t('invoice.label9'),
                    },
                  ]}
                >
                  <Input
                    // value={quantity}
                    onBlur={(e) => handleQuantity(e, ele)}
                  />
                </Form.Item>
              </Col>

              <Col span={3}>
                <Form.Item
                  name={[ele, 'price']}
                  label={t('strings.price')}
                  rules={[
                    {
                      required: true,
                      message: t('invoice.label8'),
                    },
                  ]}
                >
                  <Input
                    // value={price}
                    onBlur={(e) => handlePrice(e, ele)}
                  />
                </Form.Item>
              </Col>

              <Col span={3}>
                <Form.Item label="Amount">
                  <div className="amount-field">
                    <p>{amountCopy[ele - 1]}</p>
                  </div>
                </Form.Item>
              </Col>

              <Col span={2} className="label-hidden">
                <Form.Item
                  name={[ele, 'discountType']}
                  label={t('strings.discount_type')}
                >
                  {/* <Select
                    placeholder="Discount type"
                    onSelect={(value) => handleDiscountType(value, ele)}
                    defaultValue="%"
                  >
                    <Select.Option value="%">%</Select.Option>
                  </Select> */}
                  <Input placeholder="%" disabled />
                </Form.Item>
              </Col>

              <Col span={3}>
                <Form.Item name={[ele, 'discount']} label="Discount">
                  <Input
                    // value={discount}
                    onBlur={(e) => handleDiscount(e, ele)}
                  />
                </Form.Item>
              </Col>

              <Col span={3}>
                <Form.Item label="Total">
                  <div className="amount-field" key={ele}>
                    <p>{itemTotalCopy[ele - 1]}</p>
                  </div>
                </Form.Item>
              </Col>

              <Col span={1} className="deleteicon">
                <Form.Item>
                  <img
                    role="presentation"
                    src={deleteIcon}
                    alt="delete"
                    onClick={() => removePanel(ele)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        ))}

        <Row style={{ alignItems: 'center' }}>
          <Col span={12}>
            <div
              role="presentation"
              className="additional-add-guest"
              onClick={addMorePanel}
            >
              <PlusOutlined />
              {' '}
              {t('invoice.label10')}
            </div>
          </Col>

          <Col span={12}>
            <div className="total-add">
              <h3>
                {t('strings.total')}
                :
                {' '}
                <span>
                  {itemTotalCopy.reduce((a, b) => a + (b || 0), 0).toFixed(2)}
                  {' '}
                  €
                </span>
              </h3>
            </div>
          </Col>

          <Col span={24} className="m-top-30">
            <Form.Item name="impression" label="Impression">
              <Input.TextArea
                value={impression}
                onChange={(e) => setImpression(e.target.value)}
              />
            </Form.Item>

            <p className="web-info">
              {property.length ? property[0].address : ''}
              {' '}
              |
              {' '}
              {userData.length ? userData[0].phone : ''}
              {' '}
              |
              {' '}
              {userData.length ? userData[0].email : ''}
              {' '}
              |
              {' '}
              {property.length ? property[0].website : ''}
              {' '}
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
                type="secondry"
                style={{ marginRight: 10 }}
                htmlType="submit"
                onClick={handleDraft}
              >
                {t('strings.save_draft')}
              </Button>
              <Button type="primary" htmlType="submit">
                {t('strings.issue')}
              </Button>
            </Form.Item>
          </Col>
          <Col span={24}>
            <div className="note">
              <p>{t('invoice.label11')}</p>
            </div>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

AdInvoicePopup.propTypes = {
  userData: PropTypes.objectOf(PropTypes.object),
  property: PropTypes.objectOf(PropTypes.object),
  close: PropTypes.func,
  visible: PropTypes.bool,
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
  toasterMessage: PropTypes.objectOf(PropTypes.Function),
  getData: PropTypes.func,
  label: PropTypes.number,
};
AdInvoicePopup.defaultProps = {
  userData: {},
  property: {},
  close: () => {},
  visible: false,
  handleOk: () => {},
  handleCancel: () => {},
  toasterMessage: () => {},
  getData: () => {},
  label: 0,
};

export default AdInvoicePopup;
