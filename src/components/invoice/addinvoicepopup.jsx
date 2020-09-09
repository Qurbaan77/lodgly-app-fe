import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import './invoice.css';
import { toast } from 'react-toastify';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';
import {
  Form,
  Select,
  Input,
  Button,
  DatePicker,
  TimePicker,
  Modal,
  Row,
  Col,
} from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';

import moment from 'moment';
import propertyIcon from '../../assets/images/menu/property-icon-orange.png';

import deleteIcon from '../../assets/images/menu/delete-icon-red.png';
import loader from '../../assets/images/cliploader.gif';
import { userInstance } from '../../axios/axiosconfig';

const AdInvoicePopup = (props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const {
    userData, property, label, visible, handleCancel, handleOk,
  } = props;
  const [draftBtn, setDraftBtn] = useState(false);
  const [time, setTime] = useState(null);
  const [date, setDate] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [fName, setFName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [vatId, setVatId] = useState(null);
  const [pricePanel, setPricePanel] = useState([
    {
      itemDescription: '',
      itemQuantity: 0,
      itemPrice: 0,
      itemAmount: 0,
      itemDiscountPer: 0,
      itemDiscount: 0,
      itemDiscountType: '%',
      itemTotal: 0,
    },
  ]);
  const [showLoader, setShowLoader] = useState(true);
  const [impression, setImpression] = useState('');
  const [total, setTotal] = useState([0]);
  const [discountType, setDiscountType] = useState('%');
  useEffect(() => {
    const ddate = new Date();
    const ftime = `${ddate.getHours()}:${ddate.getMinutes()}:${ddate.getSeconds()}`;
    const formatedDate = `${ddate.getFullYear()}-${(
      `0${
        ddate.getMonth() + 1}`
    ).slice(-2)}-${(`0${ddate.getDate()}`).slice(-2)}`;

    const deliveryDate = moment(formatedDate);
    const date = moment(formatedDate);
    const dueDate = moment(formatedDate);
    const time0 = moment(ftime, 'HH:mm:ss');
    setTime(time0);
    form.setFieldsValue({
      deliveryDate,
      dueDate,
      date,
      time: time0,
    });
  }, []);

  const handleFinish = async (values) => {
    // setShowLoader(false);

    const valuesCopy = values;
    valuesCopy.date = moment(valuesCopy.date._d).format('YYYY/MM/DD');
    valuesCopy.deliveryDate = moment(valuesCopy.deliveryDate._d).format(
      'YYYY/MM/DD',
    );
    valuesCopy.dueDate = moment(valuesCopy.dueDate._d).format('YYYY/MM/DD');
    valuesCopy.time = moment(time._d, 'HH:mm:ss');
    pricePanel.forEach((panel) => {
      if (panel.itemDiscountType === '%') {
        panel.itemDiscount = (panel.itemAmount * panel.itemDiscountPer) / 100;
      } else {
        panel.itemDiscount = panel.itemAmount - panel.itemDiscountPer;
      }
      // panel.itemDiscount = (panel.itemAmount * panel.itemDiscount) / 100;
    });
    valuesCopy.itemData = pricePanel;
    valuesCopy.phone = userData[0].phone;
    valuesCopy.userEmail = userData[0].email;
    valuesCopy.email = email;
    valuesCopy.total = total.reduce((a, b) => a + (b || 0), 0);
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
      if (res.data.code === 200) {
        setPricePanel([]);
        const element = document.createElement('a');
        element.setAttribute('href', `${res.data.url}`);
        element.setAttribute('download', `${clientName}.pdf`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        props.getData();
        props.close();
        toast.success('Invoice issued successfully', { containerId: 'B' });
      } else {
        toast.error('server error please try again', { containerId: 'B' });
        setShowLoader(true);
      }
    } else {
      setPricePanel([]);
      valuesCopy.status = 'Draft';
      const response = await userInstance.post('/invoicedraft', valuesCopy);
      setShowLoader(true);
      if (response.data.code === 200) {
        setShowLoader(true);
        props.close();
        props.getData();
        toast.success('Invoice drafted successfully', { containerId: 'B' });
      } else {
        toast.error('server error please try again', { containerId: 'B' });
        setShowLoader(true);
      }
    }
    setShowLoader(true);
  };
  const handleDiscountType = (value, i) => {
    setDiscountType(value);
    if (value === '%') {
      pricePanel.forEach((el, j) => {
        if (i === j) {
          el.itemDiscountType = '%';
          // el.itemDiscount = el.itemAmount*el.itemDiscount/100;
          el.itemTotal = el.itemAmount - ((el.itemAmount * el.itemDiscountPer) / 100);
        }
      });
      setPricePanel(pricePanel);
      update();
      const item = pricePanel.map((panel) => panel.itemTotal);
      setTotal(item);
    } else {
      pricePanel.forEach((el, j) => {
        if (i === j) {
          el.itemDiscountType = '€';
          // el.itemDiscount =el.itemDiscount;
          el.itemTotal = el.itemAmount - el.itemDiscountPer;
        }
      });
      setPricePanel(pricePanel);
      update();
      const item = pricePanel.map((panel) => panel.itemTotal);
      setTotal(item);
    }
  };

  const handleQuantity = (e, i) => {
    pricePanel.forEach((el, j) => {
      if (i === j) {
        el.itemQuantity = e.target.value;
      }
    });
  };
  function useUpdate() {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
      setTick((tick) => tick + 1);
    }, []);
    return update;
  }

  const update = useUpdate();

  const handlePrice = (e, i) => {
    pricePanel.forEach((el, j) => {
      if (i === j) {
        el.itemPrice = e.target.value;
        el.itemAmount = e.target.value * el.itemQuantity;
        el.itemTotal = e.target.value * el.itemQuantity;
      }
    });
    setPricePanel(pricePanel);
    update();
    const item = pricePanel.map((panel) => panel.itemTotal);
    setTotal(item);
  };
  const handleDiscount = (e, i) => {
    if ((e.target.value < 1 || e.target.value > 100) && discountType === '%') {
      toast.error('Please Enter Discount in the Range of 0 to 100', { containerId: 'B', toastId: 'ABC' });
      form.setFieldsValue({
        [`discount${i}`]: 100,

      });
    } else {
      pricePanel.forEach((el, j) => {
        if (i === j) {
          el.itemDiscountPer = e.target.value;
          el.itemTotal = el.itemAmount - (el.itemAmount * e.target.value) / 100;
        }
      });
      setPricePanel(pricePanel);
      update();
      const item = pricePanel.map((panel) => panel.itemTotal);
      setTotal(item);
    }
  };

  const preventTypeE = (evt) => {
    if (
      (evt.which !== 8 && evt.which !== 0 && evt.which < 48)
      || evt.which > 57
    ) {
      evt.preventDefault();
    }
  };

  const addMorePanel = () => {
    const oldArray = [...pricePanel];
    oldArray.push({
      itemDescription: '',
      itemQuantity: 0,
      itemPrice: 0,
      itemAmount: 0,
      itemDiscount: 0,
      itemTotal: 0,
    });
    setPricePanel(oldArray);
    update();
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
  const handleDescription = (e, i) => {
    pricePanel.forEach((el, j) => {
      if (i === j) {
        el.itemDescription = e.target.value;
      }
    });
    setPricePanel(pricePanel);
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
      <Helmet>
        <body className={visible ? 'ant-scrolling-effect' : ''} />
      </Helmet>
      <div className="cross-btn">
        <CloseOutlined onClick={handleCross} />
      </div>
      <Form name="basic" form={form} onFinish={handleFinish}>
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
                      value={date}
                      selected={date}
                      onChange={(e) => {
                        const d1 = moment(e._id).format('MM/DD/YYYY');
                        setDate(d1);
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

                      selected={deliveryDate}
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
                  value={vatId}
                  onChange={(e) => setVatId(e.target.value)}
                />
              </Form.Item>
            </div>
          </Col>
        </Row>

        {pricePanel.map((ele, i) => (
          <div className="additional-fields" key={ele.itemDescription}>
            <Row style={{ alignItems: 'center' }}>
              <Col span={6}>
                <Form.Item
                  name={`itemDescription${i}`}
                  label={t('invoice.label13')}
                  rules={[
                    {
                      required: true,
                      message: t('invoice.label14'),
                    },
                  ]}
                >
                  <Input
                    value={ele.itemDescription}
                    onChange={(e) => handleDescription(e, i)}
                  />
                </Form.Item>
              </Col>

              <Col span={3}>
                <Form.Item
                  name={`quantity${i}`}
                  label="Qty."
                  rules={[
                    {
                      required: true,
                      message: t('invoice.label9'),
                    },
                  ]}
                >
                  <Input
                    type="number"
                    onKeyPress={preventTypeE}
                    // value={ele.itemQuantity}
                    // onChange={(e) => setQuantity(e.target.value.replace(/\D/, ''))}
                    onChange={(e) => handleQuantity(e, i)}
                  />
                </Form.Item>
              </Col>

              <Col span={3}>
                <Form.Item
                  name={`price${i}`}
                  label={t('strings.price')}
                  rules={[
                    {
                      required: true,
                      message: t('invoice.label8'),
                    },
                  ]}
                >
                  <Input
                    type="number"
                    onKeyPress={preventTypeE}
                    value={ele.itemPrice}
                    onChange={(e) => handlePrice(e, i)}
                  />
                </Form.Item>
              </Col>

              <Col span={3}>
                <Form.Item label="Amount">
                  <div className="amount-field">
                    <p>{ele.itemAmount}</p>
                  </div>
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item name={`discount${i}`} label="Discount">
                  <Input
                    value={ele.itemDiscount}
                    type="number"
                    onKeyPress={preventTypeE}
                    onChange={(e) => handleDiscount(e, i)}
                  />
                </Form.Item>
              </Col>

              <Col span={2} className="label-hidden">
                <Form.Item
                  name={`discountType${i}`}
                  label={t('strings.discount_type')}
                >
                  <Select
                    defaultValue="%"
                    onSelect={(value) => handleDiscountType(value, i)}
                  >
                    <Select.Option>Select</Select.Option>
                    <Select.Option value="%">%</Select.Option>
                    <Select.Option value="€">€</Select.Option>
                  </Select>

                </Form.Item>
              </Col>

              <Col span={3}>
                <Form.Item label="Total">
                  <div className="amount-field" key={ele}>
                    <p>{ele.itemTotal}</p>
                  </div>
                </Form.Item>
              </Col>

              {/* <Col span={3}>

                <Form.Item label="Total" >
                  <div className="amount-field" key={ele}>
                    <p>{total}</p>
                  </div>
                </Form.Item>
              </Col> */}

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
              className="additional-add-item"
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
                {/* {total} */}
                {t('strings.total')}
                :
                {' '}
                <span>
                  {total.reduce((a, b) => a + (b || 0), 0)}
                  {' '}
                  €
                </span>
              </h3>
            </div>
          </Col>
          <Col span={24} className="m-top-30">
            <Form.Item
              name="impression"
              label="Note"
              rules={[
                {
                  required: true,

                },
              ]}
            >
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
  getData: () => {},
  label: 0,
};

export default AdInvoicePopup;
