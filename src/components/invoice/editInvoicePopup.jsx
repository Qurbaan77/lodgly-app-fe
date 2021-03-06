import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Helmet from 'react-helmet';
import './invoice.css';
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
  Upload,
} from 'antd';
import {
  PlusOutlined, DeleteOutlined, CloseOutlined, UploadOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import { toast } from 'react-toastify';
import propertyIcon from '../../assets/images/menu/property-icon-orange.png';
import printIcon from '../../assets/images/menu/print-white.png';
import pdfIcon from '../../assets/images/menu/pdf-white.png';
import deleteIcon from '../../assets/images/menu/delete-icon-red.png';
import loader from '../../assets/images/cliploader.gif';
import { userInstance } from '../../axios/axiosconfig';
import { server } from '../../config/keys';

const EditInvoicePopup = (props) => {
  const { t } = useTranslation();
  const {
    userData,
    property,
    invoiceData,
    invoiceItems,
    setInvoiceItems,
    close,
    visible,
    handleOk,
    handleCancel,
    logo,
  } = props;
  function useUpdate() {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
      setTick((tick) => tick + 1);
    }, []);
    return update;
  }

  const update = useUpdate();
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
  // const [discount, setDiscount] = useState(null);
  const [showLoader, setShowLoader] = useState(true);
  const [cancellation, setCancellation] = useState(false);
  const [discountPer, setDiscountPer] = useState(null);
  const [deleteInvoiceItemId, setDeleteInvoiecItemId] = useState(null);
  // const [itemState, setItemState] = useState([]);
  const [issueState, setIssueState] = useState(false);
  const [download, setDownload] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');
  const [currency, setCurrency] = useState('€');
  // const [total, setTotal] = useState([0]);
  //  const [discountType, setDiscountType] = useState('%');
  const updateValues = useCallback(() => {
    if (visible) {
      const date0 = moment(invoiceData.date);
      const time0 = moment(`${invoiceData.time}:00`, 'HH:mm:ss');
      const deliveryDate0 = moment(invoiceData.deliveryDate);
      const dueDate0 = moment(invoiceData.dueDate);
      // setDate(date0);
      setDueDate(dueDate0);
      setDeliveryDate(deliveryDate0);
      setTime(`${invoiceData.time}:00`);
      form.setFieldsValue({
        clientName: invoiceData.clientName,
        email: invoiceData.email,
        address: invoiceData.address,
        vat: invoiceData.vat,
        date: date0,
        time: time0,
        deliveryDate: deliveryDate0,
        dueDate: dueDate0,
        paymentType: invoiceData.paymentType,
        impression: invoiceData.impression,
      });
      setFName(invoiceData.clientName);
      setEmail(invoiceData.email);
      setVatId(invoiceData.vat);
      setAddress(invoiceData.address);
      setCurrency(invoiceData.currency);
      // setItemState(invoiceItems);
      if (invoiceItems && invoiceItems.length) {
        invoiceItems.forEach((el, i) => {
          form.setFieldsValue({
            [`itemDescription${i}`]: el.itemDescription,
            [`itemQuantity${i}`]: el.quantity,
            [`itemPrice${i}`]: el.price,
            [`itemAmount${i}`]: el.amount,
            [`itemDiscount${i}`]: el.discountPer,
            [`itemDiscountType${i}`]: el.discountType,
            [`itemTotal${i}`]: el.itemTotal,
          });
        });
      }
    }
  }, [visible, form, invoiceData, invoiceItems]);

  useEffect(() => {
    updateValues();
  }, [visible, updateValues]);

  const handleFinish = async (values) => {
    setShowLoader(false);
    const valuesCopy = values;
    valuesCopy.id = invoiceData.id;
    valuesCopy.date = moment(valuesCopy.date._d).format('YYYY/MM/DD');
    valuesCopy.deliveryDate = moment(valuesCopy.deliveryDate._d).format(
      'YYYY/MM/DD',
    );
    valuesCopy.dueDate = moment(valuesCopy.dueDate._d).format('YYYY/MM/DD');
    valuesCopy.time = time.slice(0, 5);
    const itemData = [];
    let total = 0;
    if (invoiceItems.length) {
      invoiceItems.forEach((el, i) => {
        const ele = el;
        const q = 'itemQuantity';
        const p = 'itemPrice';
        const a = 'itemAmount';
        const d0 = 'itemDiscountPer';
        const d1 = 'itemDiscount';
        const it = 'itemTotal';
        ele.id = el.id || null;
        ele.itemQuantity = valuesCopy[q + i];
        ele.itemPrice = valuesCopy[p + i];
        ele.itemAmount = valuesCopy[a + i];
        ele.itemDiscountPer = valuesCopy[d0 + i];
        ele.itemDiscount = valuesCopy[d1 + i];
        ele.itemTotal = valuesCopy[it + i];
        total += ele.itemTotal;
        itemData.push(ele);
      });
    }
    valuesCopy.itemData = itemData;
    valuesCopy.phone = userData[0].phone;
    valuesCopy.userEmail = userData[0].email;
    valuesCopy.email = email;
    const { clientName } = valuesCopy;
    valuesCopy.total = total;
    valuesCopy.propertyName = property[0].unitTypeName[0].name;
    valuesCopy.propertyAddress = property[0].address;
    valuesCopy.website = property[0].website;
    valuesCopy.propertyId = property[0].id;
    valuesCopy.deleteInvoiceItemId = deleteInvoiceItemId;
    valuesCopy.label = invoiceData.label;
    if (invoiceData.logo) {
      valuesCopy.logo = invoiceData.logo;
    }
    if (issueState) valuesCopy.status = 'Issued';
    const res = issueState
      ? await userInstance.post('/invoicedraft', valuesCopy)
      : await userInstance.post('/downloadinvoice', valuesCopy);
    if (res.status === 200) {
      const element = document.createElement('a');
      element.setAttribute('href', `${res.data.url}`);
      element.setAttribute('download', `${clientName}.pdf`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      props.getData();
      props.close();
      if (!download) {
        let msg;
        if (issueState) {
          msg = 'Invoice issued';
          toast.success(msg, { containerId: 'B' });
        } else {
          toast.success('Invoice drafted successfully', { containerId: 'B' });
        }
        setShowLoader(true);
      }
    } else {
      toast.error('server error please try again', { containerId: 'B' });
      setShowLoader(true);
    }
    setShowLoader(true);
    form.resetFields();
  };
  const handleQuantity = (e, ele, i) => {
    const { price: paisa, discountPer: perDiscount } = ele;
    setQuantity(e.target.value);
    invoiceItems.forEach((el) => {
      if (ele.id === el.id) {
        el.quantity = e.target.value;
        el.discountType = '%';
      }
    });
    setInvoiceItems(invoiceItems);
    if (ele.price) {
      form.setFieldsValue({
        [`itemAmount${i}`]: e.target.value * paisa,
        // [`itemDiscount${i}`]: (e.target.value * paisa) * (perDiscount / 100),
        [`itemTotal${i}`]:
          e.target.value * paisa - e.target.value * paisa * (perDiscount / 100),
      });
      invoiceItems.forEach((el) => {
        if (el.id === ele.id) {
          el.itemTotal = e.target.value * paisa
            - e.target.value * paisa * (perDiscount / 100);
        }
      });
      setInvoiceItems(invoiceItems);
      // setItemState(invoiceItems);
    }
  };
  const handleDiscountType = (value, ele, i) => {
    // setDiscountType(value);
    if (value === '%') {
      form.setFieldsValue({
        // [`temDiscount${i}`]: (element.amount) * (e.target.value / 100),
        [`itemTotal${i}`]: ele.amount - (ele.amount * ele.discountPer) / 100,
      });
      invoiceItems.forEach((el, j) => {
        if (i === j) {
          el.discountType = '%';
          // el.itemDiscount = el.itemAmount*el.itemDiscount/100;
          el.itemTotal = el.amount - (el.amount * el.discountPer) / 100;
        }
      });
      setInvoiceItems(invoiceItems);
      // setItemState(invoiceItems);
      update();
    } else {
      form.setFieldsValue({
        // [`temDiscount${i}`]: (element.amount) * (e.target.value / 100),
        [`itemTotal${i}`]: ele.amount - ele.discountPer,
      });
      invoiceItems.forEach((el, j) => {
        if (i === j) {
          el.discountType = currency;
          // el.itemDiscount =el.itemDiscount;
          el.itemTotal = el.amount - el.discountPer;
        }
      });
      setInvoiceItems(invoiceItems);
      // setItemState(invoiceItems);
      update();
    }
  };

  const handlePrice = (e, i, ele) => {
    const { discountPer: perDiscount } = ele;
    setPrice(e.target.value);
    invoiceItems.forEach((el) => {
      if (ele.id === el.id) {
        el.price = e.target.value;
        el.amount = el.quantity * e.target.value;
      }
    });
    setInvoiceItems(invoiceItems);
    form.setFieldsValue({
      [`itemAmount${i}`]: quantity * e.target.value,
      [`itemTotal${i}`]: quantity * e.target.value,
    });
    if (ele.discountPer) {
      form.setFieldsValue({
        [`itemDiscount${i}`]: quantity * e.target.value * (perDiscount / 100),
      });
    }
    setAmount(quantity * e.target.value);
    invoiceItems.forEach((el) => {
      if (el.id === ele.id) {
        el.itemTotal = quantity * e.target.value;
      }
    });
    setInvoiceItems(invoiceItems);
    // setItemState(invoiceItems);
  };

  const handleDiscount = (e, ele, i) => {
    const element = ele;
    invoiceItems.forEach((el) => {
      if (ele.id === el.id) {
        el.discountPer = e.target.value;
      }
    });
    setInvoiceItems(invoiceItems);
    if (ele.discountPer) {
      if (ele.discountType === '%') {
        form.setFieldsValue({
          // [`temDiscount${i}`]: (element.amount) * (e.target.value / 100),
          [`itemTotal${i}`]:
            element.amount - (element.amount * e.target.value) / 100,
        });
        invoiceItems.forEach((el) => {
          if (el.id === ele.id) {
            el.discountPer = e.target.value;
            el.itemTotal = element.amount - (element.amount * e.target.value) / 100;
          }
        });
        setInvoiceItems(invoiceItems);
        // setItemState(invoiceItems);
        update();
      } else {
        form.setFieldsValue({
          // [`temDiscount${i}`]: (element.amount) * (e.target.value / 100),
          [`itemTotal${i}`]: element.amount - e.target.value,
        });
        invoiceItems.forEach((el) => {
          if (el.id === ele.id) {
            el.discountPer = e.target.value;
            el.itemTotal = element.amount - e.target.value;
          }
        });
        setInvoiceItems(invoiceItems);
        // setItemState(invoiceItems);
        update();
      }
    } else if (ele.discountType === '%') {
      setDiscountPer(e.target.value);
      // setDiscount(amount - (amount) * (e.target.value / 100));
      form.setFieldsValue({
        // [`itemDiscount${i}`]: (amount) * (e.target.value / 100),
        [`itemTotal${i}`]: amount - (amount * e.target.value) / 100,
      });
      invoiceItems.forEach((el) => {
        if (el.id === ele.id) {
          el.discountPer = e.target.value;
          el.itemTotal = amount - amount * (e.target.value / 100);
        }
      });
      // setItemState(invoiceItems);
      update();
    } else {
      setDiscountPer(e.target.value);
      // setDiscount(amount - (amount) * (e.target.value / 100));
      form.setFieldsValue({
        // [`itemDiscount${i}`]: (amount) * (e.target.value / 100),
        [`itemTotal${i}`]: amount - e.target.value,
      });
      invoiceItems.forEach((el) => {
        if (el.id === ele.id) {
          el.discountPer = e.target.value;
          el.itemTotal = amount - e.target.value;
        }
      });
      setInvoiceItems(invoiceItems);
      // setItemState(invoiceItems);
      update();
    }
  };

  const addMorePanel = () => {
    if (invoiceItems.length) {
      let i;
      invoiceItems.forEach((el) => {
        i = el.id;
      });
      setInvoiceItems(invoiceItems.concat([{ id: i + 1 }]));
    }
  };

  const removePanel = (ele) => {
    setDeleteInvoiecItemId(ele.id);
    const data = invoiceItems.filter((el) => el.id !== ele.id);
    setInvoiceItems([...data]);
    invoiceItems.forEach((el) => {
      if (el.id === ele.id) {
        el.itemTotal = 0;
      }
    });
    // setItemState(invoiceItems);
  };

  const handleCancelllation = async () => {
    setCancellation(true);
    if (cancellation) {
      const payload = {
        id: invoiceData.id,
        type: 'Cancellation',
      };
      const cancel = await userInstance.post('/cancelInvoice', payload);
      if (cancel.data.code === 200) {
        props.close();
        props.getData();
        toast.success('Invoice cancelled successfully', { containerId: 'B' });
      } else {
        toast.error('server error please try again', { containerId: 'B' });
      }
    }
  };

  const handleIssue = () => {
    setIssueState(true);
  };

  const handleDelete = () => {
    props.close();
    props.showDeleteWarning(invoiceData);
  };
  const handleCross = () => {
    props.close();
  };

  const preventTypeE = (evt) => {
    if (
      (evt.which !== 8 && evt.which !== 0 && evt.which < 48)
      || evt.which > 57
    ) {
      evt.preventDefault();
    }
  };
  const organizationid = localStorage.getItem('organizationid');
  const unitTypeV2Id = localStorage.getItem('propertyV2Id');
  const logoProps = {
    name: 'file',
    multiple: false,
    // action: `http://localhost:3001/users/propertyPicture/${id}`,
    // action: `${server}/users/propertyPicture/${id}`,
    action: `${server}/properties/propertyPicture?unitTypeV2Id=${unitTypeV2Id}&organizationid=${organizationid}`,
    onChange(info) {
      if (info.file.status === 'done') {
        setLogoUrl(info.file.response.image);
        toast.success(`${info.file.name} file uploaded successfully`, {
          containerId: 'B',
        });
      } else if (info.file.status === 'error') {
        toast.error(`${info.file.name} file upload failed.`, {
          containerId: 'B',
        });
      }
    },
  };
  return (
    <Modal
      title={t('invoice.heading2')}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      wrapClassName="guest-modal add-invoice-popup"
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
                {property.length ? property[0].unitTypeName[0].name : ''}
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
                {invoiceData.id}
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
                        {' '}
                        {t('strings.card')}
                      </Select.Option>
                      <Select.Option value="check">
                        {' '}
                        {t('strings.check')}
                        {' '}
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
                {' '}
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

              <Form.Item label={t('strings.email')} name="email">
                <Input
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

        {invoiceItems.length
          ? invoiceItems.map((ele, j) => (
            <div className="additional-fields" key={ele.id}>
              <Row style={{ alignItems: 'center' }}>
                <Col span={6}>
                  <Form.Item
                    name={`itemDescription${j}`}
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

                <Col span={2}>
                  <Form.Item
                    name={`itemQuantity${j}`}
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
                        // value={quantity}
                      onChange={(e) => handleQuantity(e, ele, j)}
                    />
                  </Form.Item>
                </Col>

                <Col span={3}>
                  <Form.Item
                    name={`itemPrice${j}`}
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
                      value={price}
                      onChange={(e) => handlePrice(e, j, ele)}
                    />
                  </Form.Item>
                </Col>

                <Col span={3}>
                  {/* <div className="amount-field">
                    <p>{ele.amount}</p>
                  </div> */}
                  <Form.Item name={`itemAmount${j}`} label="Amount">
                    <Input
                      disabled
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item name={`itemDiscount${j}`} label="Discount">
                    <Input
                      value={discountPer}
                      type="number"
                      onKeyPress={preventTypeE}
                      onChange={(e) => handleDiscount(e, ele, j)}
                    />
                  </Form.Item>
                  {/* <Form.Item name={`itemDiscount${j}`} label="Discount">
                    <Input
                     value={discountPer}
                     type="number"
                     onKeyPress={preventTypeE}
                     onChange={(e) =>handleDiscount(e, ele, j)}
                     />

                  </Form.Item> */}
                </Col>

                <Col span={2} className="label-hidden">
                  <Form.Item
                    name={`itemDiscountType${j}`}
                    label={t('strings.discount')}
                  >
                    <Select
                      defaultValue="%"
                      onSelect={(value) => handleDiscountType(value, ele, j)}
                    >
                      <Select.Option>Select</Select.Option>
                      <Select.Option value="%">%</Select.Option>
                      <Select.Option value={currency}>
                        {currency}
                      </Select.Option>
                    </Select>
                    {/* <Input
                      type="number"
                      onKeyPress={preventTypeE}
                      placeholder="%"
                      value={discountPer}
                      onChange={(e) => handleDiscount(e, ele, j)}
                    /> */}
                  </Form.Item>
                </Col>

                <Col span={3}>
                  {/* <div className="amount-field" key={ele.id}>
                    <p>{itemTotalCopy[j]}</p>
                  </div> */}
                  <Form.Item name={`itemTotal${j}`} label="Total">
                    <Input disabled />
                  </Form.Item>
                </Col>

                <Col span={2} className="deleteicon">
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
          ))
          : ''}

        <Row style={{ alignItems: 'center' }}>
          <Col span={12}>
            <div
              role="presentation"
              className="additional-add-item"
              onClick={addMorePanel}
            >
              <PlusOutlined />
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
                  {invoiceItems
                    .map((el) => el.itemTotal)
                    .reduce((a, b) => a + (b || 0), 0)
                    .toFixed(2)}
                  {' '}
                  {currency}
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
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col span={6} className="m-top-30">
            <Form.Item className="upload-image">
              <Upload.Dragger {...logoProps} className="upload">
                {
                 logoUrl
                   ? (
                     <div>
                       <img src={logoUrl} alt="logo" />
                     </div>
                   )
                   : logo
                     ? (
                       <div>
                         <img src={logo} alt="logo" />
                       </div>
                     )
                     : (

                       <p className="ant-upload-drag-icon">
                         {/* <UserOutlined /> */}

                         <UploadOutlined className="logoimage" />
                         {' '}

                       </p>

                     )
                }
                {
                  !logo
                    ? <h5 className="upload-text">Upload your own logo</h5>
                    : null
                }
              </Upload.Dragger>

            </Form.Item>

          </Col>
          <Col span={24} className="m-top-30">
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
          <Col
            span={12}
            style={{
              textAlign: 'left',
            }}
          >
            <Form.Item>
              <Button
                className="print-btn"
                type="secondry"
                htmlType="submit"
                onClick={() => setDownload(true)}
              >
                <img src={printIcon} alt="" />
                {' '}
                {t('strings.print')}
              </Button>
              <Button
                className="pdf-btn"
                type="primary"
                htmlType="submit"
                onClick={() => setDownload(true)}
              >
                <img src={pdfIcon} alt="" />
                {' '}
                PDF
              </Button>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              {invoiceData.status === 'Draft' ? (
                <>
                  <Button
                    className="delete-btn"
                    icon={<DeleteOutlined />}
                    style={{ marginRight: 10 }}
                    onClick={handleDelete}
                  >
                    {t('strings.delete')}
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={handleIssue}
                  >
                    {t('strings.issue')}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="primary"
                    onClick={close}
                    style={{ marginRight: 10 }}
                  >
                    {t('strings.close')}
                  </Button>
                  <Button
                    className="delete-btn"
                    icon={<DeleteOutlined />}
                    style={{ marginRight: 10 }}
                    onClick={handleCancelllation}
                  >
                    {t('strings.cancellation')}
                  </Button>
                </>
              )}
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

EditInvoicePopup.propTypes = {
  userData: PropTypes.arrayOf(PropTypes.object),
  property: PropTypes.arrayOf(PropTypes.object),
  invoiceData: PropTypes.arrayOf(PropTypes.object),
  invoiceItems: PropTypes.arrayOf(PropTypes.object),
  setInvoiceItems: PropTypes.func,
  close: PropTypes.func,
  status: PropTypes.string,
  visible: PropTypes.bool,
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
  showDeleteWarning: PropTypes.func,
  getData: PropTypes.func,
  logo: PropTypes.string,
};
EditInvoicePopup.defaultProps = {
  userData: {},
  property: {},
  invoiceData: {},
  invoiceItems: [],
  setInvoiceItems: () => {},
  close: () => {},
  status: '',
  visible: false,
  handleOk: () => {},
  handleCancel: () => {},
  showDeleteWarning: () => {},
  getData: () => {},
  logo: '',
};
export default EditInvoicePopup;
