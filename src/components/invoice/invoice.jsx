import React, { useEffect, useState, useCallback } from 'react';
import Helmet from 'react-helmet';
// import { useHistory } from 'react-router-dom';
import './invoice.css';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Tooltip,
  Checkbox,
  Row,
  Col,
  Pagination,
  Tag,
  // Input,
  DatePicker,
  Select,
  Form,
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  FormOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import Wrapper from '../wrapper';
import favicon from '../../assets/images/logo-mobile.png';
import loader from '../../assets/images/cliploader.gif';
// import { Table } from 'antd';
import invoice from '../../assets/images/invoice.jpg';
import invoiceIcon from '../../assets/images/menu/invoice-icon.png';
import filterIcon from '../../assets/images/menu/filter-icon.png';
// import editIcon from '../../assets/images/menu/pencil-icon.png';
import downloadIcon from '../../assets/images/menu/download-icon.png';
import refreshIcon from '../../assets/images/menu/refresh-icon.png';
// import settingIcon from '../../assets/images/menu/setting-icon.png';
import printIcon from '../../assets/images/menu/print-icon.png';
import cancelIcon from '../../assets/images/menu/cancel-icon.png';
import propertyplace from '../../assets/images/property-placeholder.png';
// import loader from '../../assets/images/loader.svg';
import nobooking from '../../assets/images/no-booking.png';
import AdInvoicePopup from './addinvoicepopup';
import EditInvoicePopup from './editInvoicePopup';
import { userInstance } from '../../axios/axiosconfig';
import DeletePopup from './deletepopup';
import UserLock from '../userlock/userlock';
import CreateProperty from '../property/createProperty';
import back from '../../assets/images/back.png';

const Invoice = () => {
  const { RangePicker } = DatePicker;
  const { t } = useTranslation();
  // const { Option } = Select;
  // const history = useHistory();

  const [topNavId, setTopNavId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [propertyInfo, setPropertyInfo] = useState([]);
  const [currentPropertyInfo, setCurrentPropertyInfo] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [page, setPage] = useState(true);
  const [checkedInvoice, setCheckedInvoice] = useState([]);
  // const [showLoader, setShowLoader] = useState(true);
  const [visibleEditInvoice, setVisibleEditInvoice] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState([]);
  const [currentInvoiceItems, setCurrentInvoiceItems] = useState([]);
  const [invoiceCurrentPropertyInfo, setInvoicePropertyInfo] = useState([]);
  const [pagination, setPagination] = useState({ minValue: 0, maxValue: 7 });
  const [visibleDeletePopup, setVisibleDeletePopup] = useState(false);
  const [removeId, setDeleteId] = useState(null);
  const [selectAllCheck, setSelectAllCheck] = useState(false);
  const [subscribed, setSubscribed] = useState();
  const [onTrial, setOnTrial] = useState(true);
  const [daysLeft, setDaysLeft] = useState();
  const [loading, setLoading] = useState(true);
  const [inFilter, setInFilter] = useState(false);
  const [filterValues, setFilterValues] = useState({
    range: '',
    prevYear: '',
    currYear: '',
    invoice: '',
    cancellation: '',
    deposit: '',
    draft: '',
    issued: '',
    paymentMethod: '',
  });
  const [visibleProperty, setVisibleProperty] = useState(false);

  function useUpdate() {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
      setTick((tick) => tick + 1);
    }, []);
    return update;
  }

  const update = useUpdate();

  const show = () => {
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
  };

  const closeEditInvoice = () => {
    setVisibleEditInvoice(false);
  };
  const handleOk = () => {
    setVisible(false);
    setVisibleDeletePopup(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setVisibleDeletePopup(false);
  };

  let label;
  invoiceData.map((el) => {
    label = el.id;
    return label;
  });

  const showpopup = (ele) => {
    setVisibleDeletePopup(true);
    setDeleteId(ele.id);
  };
  const handleDeleteInvoice = async () => {
    const deleteId = removeId;
    // deleting sub user from databse
    const res = await userInstance.post('/deleteInvoice', { deleteId });
    if (res.status === 200) {
      setVisibleDeletePopup(false);
      // deleting sub user from state
      const data = invoiceData.filter((el) => el.id !== deleteId);
      setInvoiceData([...data]);
      toast.success(t('invoice.rule1'), { containerId: 'B' });
    } else {
      toast.error('server error please try again', { containerId: 'B' });
    }
  };

  const handlePagination = (value) => {
    if (value <= 1) {
      setPagination({ minValue: 0, maxValue: 7 });
    } else {
      setPagination({ minValue: pagination.maxValue, maxValue: value * 7 });
    }
  };

  const showEditInvoice = (value) => {
    const data0 = invoiceItems.map((el) => el.filter((ele) => ele.invoiceId === value.id));
    const data1 = data0.filter((e) => e.length);
    const [data2] = data1;
    const data = propertyInfo.filter(
      (property) => property.id === value.propertyId,
    );
    setInvoicePropertyInfo(data);
    setVisibleEditInvoice(true);
    setCurrentInvoice(value);
    setCurrentInvoiceItems(data2);
  };

  const isSubUser = localStorage.getItem('isSubUser') || false;
  const userCred = JSON.parse(localStorage.getItem('subUserCred'));

  const [{ invoicesWrite, invoicesDelete, userId }] = userCred || [{}];
  const canWrite = invoicesWrite;
  // const getProperty = useCallback(async () => {
  //   const response = await userInstance.post('/fetchProperty', {
  //     affiliateId: userId,
  //   });
  //   const data2 = [];
  //   const data = response.data.propertiesData;
  //   data
  //     .filter((el) => el.id === parseInt(topNavId, 10))
  //     .forEach((filterData) => {
  //       data2.push(filterData);
  //     });
  //   if (response.data.code === 200) {
  //     setPropertyData(data2.length > 0 ? data2 : data);
  //   }
  // }, [userId, topNavId]);

  const getData = useCallback(async () => {
    const response0 = await userInstance.get('/getUserSubscriptionStatus');
    if (response0.data.code === 200) {
      const [
        { days, isOnTrial, isSubscribed },
      ] = response0.data.userSubsDetails;
      setDaysLeft(parseInt(days, 10));
      setSubscribed(JSON.parse(isSubscribed));
      setOnTrial(JSON.parse(isOnTrial));
    }
    const inb = await userInstance.post('getInvoice', { affiliateId: userId });
    if (inb.data.code === 200) {
      inb.data.invoiceData.forEach((el, i) => {
        el[`checked${i}`] = false;
      });
      setInvoiceData(inb.data.invoiceData);
      setInvoiceItems(inb.data.invoiceItems);
      setPage(false);
    }
    const res = await userInstance.post('/fetchProperty', {
      affiliateId: userId,
    });
    if (res.data.code === 200) {
      setLoading(false);
      setPropertyInfo(res.data.propertiesData);
    }
    const response = await userInstance.post('/getInfo', {
      affiliateId: userId,
    });
    if (response.data.code === 200) {
      setUserInfo(response.data.userInfo);
    }
  }, [userId]);
  const handleCheck = (el) => {
    invoiceData.forEach((element) => {
      if (el.id === element.id && element[Object.keys(el)[21]] === true) {
        element[Object.keys(el)[21]] = false;
      } else if (
        el.id === element.id
        && element[Object.keys(el)[21]] === false
      ) {
        element[Object.keys(el)[21]] = true;
      }
    });
    setInvoiceData(invoiceData);
    const filterFromArray = checkedInvoice.filter((ele) => ele.id === el.id);
    if (filterFromArray.length === 0) {
      setCheckedInvoice([...checkedInvoice, el]);
    } else {
      const [{ id }] = filterFromArray;
      setCheckedInvoice(checkedInvoice.filter((ele) => ele.id !== id));
    }
  };
  useEffect(() => {
    setTopNavId(parseInt(localStorage.getItem('topNavId'), 10));
    const data = propertyInfo.filter(
      (property) => property.id === parseInt(localStorage.getItem('topNavId'), 10),
    );
    setCurrentPropertyInfo(data);
  }, [topNavId, propertyInfo]);

  useEffect(() => {
    getData();
    // getProperty();
  }, [getData]);

  const handleDownload = () => {
    const urls = [];
    checkedInvoice.map((el) => (el.pdfurl ? urls.push(el.pdfurl) : ''));
    if (urls.length) {
      const download = (pdfurls) => {
        const url = pdfurls.pop();
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', '');
        a.click();
        if (pdfurls.length === 0) {
          clearInterval(interval);
        }
      };
      const interval = setInterval(download, 1000, urls);
    }
  };

  const handlePrint = () => {
    const [url] = checkedInvoice.map((el) => el.pdfurl);
    window.open(url);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleSelectAll = (e) => {
    if (e.currentTarget.value === 'true') {
      setSelectAllCheck(false);
      invoiceData
        .slice(0)
        .reverse()
        .slice(pagination.minValue, pagination.maxValue)
        .forEach((el) => {
          el[Object.keys(el)[21]] = false;
        });
      setInvoiceData(invoiceData);
      setCheckedInvoice([]);
    } else {
      setSelectAllCheck(true);
      invoiceData
        .slice(0)
        .reverse()
        .slice(pagination.minValue, pagination.maxValue)
        .forEach((el) => {
          el[Object.keys(el)[21]] = true;
        });
      const data = invoiceData.filter(
        (el) => el[Object.keys(el)[21]] !== false,
      );
      setInvoiceData(invoiceData);
      setCheckedInvoice(data);
    }

    update();
  };

  const handleCancelCheck = () => {
    setSelectAllCheck(false);
    invoiceData
      .slice(0)
      .reverse()
      .slice(pagination.minValue, pagination.maxValue)
      .forEach((el) => {
        el[Object.keys(el)[21]] = false;
      });
    setInvoiceData(invoiceData);
    setCheckedInvoice([]);
  };

  // filter handling functions
  const handleFilter = (values) => {
    setInFilter(true);
    setLoading(true);
    const filterData = [];
    let startDate = 0;
    let endDate = 0;
    if (values.groupname) {
      startDate = filterValues.groupname[0]._d;
      endDate = filterValues.groupname[1]._d;
      const data = invoiceData.filter(
        (el) => new Date(el.date) >= startDate || new Date(el.date) <= endDate,
      );
      filterData.push(data);
    }
    if (filterValues.currYear) {
      const data0 = filterData.length > 0 ? filterData : invoiceData;
      const data = data0.filter(
        (el) => new Date(el.date).getFullYear() === new Date().getFullYear(),
      );
      filterData.length = 0;
      filterData.push(...data);
    }
    if (filterValues.prevYear) {
      const data0 = filterData.length > 0 ? filterData : invoiceData;
      const data = data0.filter(
        (el) => new Date(el.date).getFullYear() === new Date().getFullYear() - 1,
      );
      filterData.length = 0;
      filterData.push(...data);
    }
    if (filterValues.invoice && filterValues.cancellation) {
      const data0 = filterData.length > 0 ? filterData : invoiceData;
      const data = data0.filter(() => true);
      filterData.length = 0;
      filterData.push(...data);
    } else if (filterValues.invoice) {
      const data0 = filterData.length > 0 ? filterData : invoiceData;
      const data = data0.filter((el) => el.type !== 'Cancellation');
      filterData.length = 0;
      filterData.push(...data);
    } else if (filterValues.cancellation) {
      const data0 = filterData.length > 0 ? filterData : invoiceData;
      const data = data0.filter((el) => el.type === 'Cancellation');
      filterData.length = 0;
      filterData.push(...data);
    }
    if (filterValues.draft) {
      const data0 = filterData.length > 0 ? filterData : invoiceData;
      const data = data0.filter((el) => el.status === 'draft');
      filterData.length = 0;
      filterData.push(...data);
    }
    if (filterValues.issued) {
      const data0 = filterData.length > 0 ? filterData : invoiceData;
      const data = data0.filter((el) => el.status === 'isuued');
      filterData.length = 0;
      filterData.push(...data);
    }
    if (values.payment) {
      const data0 = filterData.length > 0 ? filterData : invoiceData;
      const data = data0.filter((el) => el.paymentMethod === values.payment);
      filterData.length = 0;
      filterData.push(...data);
    }
    setInvoiceData(filterData);
    setLoading(false);
    handleMenuSide('close');
  };

  const handleFilterCheckboxes = (e) => {
    const { name } = e.target;
    switch (name) {
      case 'prevYear':
        return filterValues.prevYear
          ? setFilterValues({ ...filterValues, prevYear: false })
          : setFilterValues({ ...filterValues, prevYear: true });
      case 'currYear':
        return filterValues.currYear
          ? setFilterValues({ ...filterValues, currYear: false })
          : setFilterValues({ ...filterValues, currYear: true });
      case 'invoice':
        return filterValues.invoice
          ? setFilterValues({ ...filterValues, invoice: false })
          : setFilterValues({ ...filterValues, invoice: true });
      case 'cancellation':
        return filterValues.cancellation
          ? setFilterValues({ ...filterValues, cancellation: false })
          : setFilterValues({ ...filterValues, cancellation: true });
      case 'deposit':
        return filterValues.deposit
          ? setFilterValues({ ...filterValues, deposit: false })
          : setFilterValues({ ...filterValues, deposit: true });
      case 'draft':
        return filterValues.draft
          ? setFilterValues({ ...filterValues, draft: false })
          : setFilterValues({ ...filterValues, draft: true });
      case 'issued':
        return filterValues.issued
          ? setFilterValues({ ...filterValues, issued: false })
          : setFilterValues({ ...filterValues, issued: true });
      default:
        break;
    }
    return true;
  };

  const [menutoggle, setMenuToggle] = useState(false);
  const handleMenuSide = (e) => {
    if (e === 'open') {
      setMenuToggle(true);
    } else if (e === 'close') {
      setMenuToggle(false);
    } else if (e === 'toggle') {
      setMenuToggle(!menutoggle);
    }
  };
  const enableButton = (
    <Button type="primary" icon={<PlusOutlined />} onClick={show}>
      {t('invoice.button1')}
    </Button>
  );
  const disabledButton = (
    <Tooltip title={t('invoice.tootltip')} color="gold">
      <Button type="primary" icon={<PlusOutlined />} onClick={show} disabled>
        {t('invoice.button1')}
      </Button>
    </Tooltip>
  );
  const propertySelectButton = (
    <Tooltip title={t('invoice.tootltip1')} color="gold">
      <Button type="primary" icon={<PlusOutlined />} onClick={show} disabled>
        {t('invoice.button1')}
      </Button>
    </Tooltip>
  );

  const closeCreateProperty = () => {
    setVisibleProperty(false);
  };

  const btn = isSubUser && canWrite ? enableButton : disabledButton;
  const perm = isSubUser ? btn : enableButton;

  const hasAccess = onTrial && daysLeft !== 0 ? 1 : subscribed;

  if (loading) {
    return (
      <Wrapper>
        <Helmet>
          <link rel="icon" href={favicon} />
          <title>
            Lodgly - Comprehensive Vacation Rental Property Management
          </title>
          <meta
            name="description"
            content="Grow your Vacation Rental with Lodgly"
          />
          <body className="invoice-page-view" />
        </Helmet>
        <div className="loader">
          <div className="loader-box">
            <img src={loader} alt="loader" />
          </div>
        </div>
      </Wrapper>
    );
  }

  if (!hasAccess) {
    return (
      <Wrapper>
        <UserLock />
      </Wrapper>
    );
  }

  if (inFilter && invoiceData && invoiceData.length < 1) {
    return (
      <Wrapper>
        <Helmet>
          <link rel="icon" href={favicon} />
          <title>
            Lodgly - Comprehensive Vacation Rental Property Management
          </title>
          <meta
            name="description"
            content="Grow your Vacation Rental with Lodgly"
          />
          <body className="invoice-page-view" />
        </Helmet>
        <div className="add-team-page">
          <div className="add-subuser">
            <img src={nobooking} alt="subuser" />
            <h4>No Results</h4>
            <p>Please select another search criteria.</p>
            <Button onClick={() => window.location.reload()}>Reset All</Button>
          </div>
        </div>
      </Wrapper>
    );
  }

  const pageContent = (
    <>
      {page ? (
        <Wrapper fun={setTopNavId}>
          <Helmet>
            <link rel="icon" href={favicon} />
            <title>
              Lodgly - Comprehensive Vacation Rental Property Management
            </title>
            <meta
              name="description"
              content="Grow your Vacation Rental with Lodgly"
            />
            <body className="invoice-page-view" />
          </Helmet>
          <div className="add-invoice-page">
            <div className="add-invoice">
              <img src={invoice} alt="invoice" />
              <h4>{t('strings.invoices')}</h4>
              <p>{t('invoice.heading3')}</p>
              {topNavId ? perm : propertySelectButton}
            </div>
          </div>
          <AdInvoicePopup
            handleOk={handleOk}
            visible={visible}
            getData={getData}
            userData={userInfo}
            property={currentPropertyInfo}
            label={1}
            close={close}
          />
        </Wrapper>
      ) : (
        <Wrapper fun={setTopNavId}>
          <Helmet>
            <link rel="icon" href={favicon} />
            <title>
              Lodgly - Comprehensive Vacation Rental Property Management
            </title>
            <meta
              name="description"
              content="Grow your Vacation Rental with Lodgly"
            />
            <body className="invoice-page-view" />
          </Helmet>
          <div
            className={`invoice-wrapper ${
              menutoggle ? 'invoice-wrapper-expand' : ''
            }`}
          >
            <div className="invoice-filter">
              <div className="filter-box">
                <h2 onClick={() => handleMenuSide('close')} role="presentation">
                  <img src={back} alt="" />
                  {' '}
                  Filters
                </h2>

                <Form name="basic" onFinish={handleFilter}>
                  <Row style={{ alignItems: 'center' }}>
                    <Col span={24}>
                      <Form.Item label="Select Date" name="groupname">
                        <RangePicker />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <div className="invoice-filter-section">
                        <Row>
                          <Col span={24}>
                            <span className="filter-title">Year</span>
                          </Col>
                          <Col span={12} className="invoice-filter-checkbox">
                            <Checkbox
                              name="prevYear"
                              value={filterValues.prevYear}
                              onClick={handleFilterCheckboxes}
                              checked={filterValues.prevYear}
                            />
                            {' '}
                            {new Date().getFullYear() - 1}
                          </Col>

                          <Col span={12} className="invoice-filter-checkbox">
                            <Checkbox
                              name="currYear"
                              value={filterValues.currYear}
                              checked={filterValues.currYear}
                              onClick={handleFilterCheckboxes}
                            />
                            {' '}
                            {new Date().getFullYear()}
                          </Col>
                        </Row>
                      </div>
                    </Col>

                    <Col span={24}>
                      <div className="invoice-filter-section">
                        <Row>
                          <Col span={24}>
                            <span className="filter-title">Type</span>
                          </Col>
                          <Col span={7} className="invoice-filter-checkbox">
                            <Checkbox
                              name="invoice"
                              value={filterValues.invoice}
                              checked={filterValues.invoice}
                              onClick={handleFilterCheckboxes}
                            />
                            {' '}
                            Invoice
                          </Col>

                          <Col span={10} className="invoice-filter-checkbox">
                            <Checkbox
                              name="cancellation"
                              value={filterValues.cancellation}
                              checked={filterValues.cancellation}
                              onClick={handleFilterCheckboxes}
                            />
                            {' '}
                            Cancellation
                          </Col>

                          <Col span={7} className="invoice-filter-checkbox">
                            <Checkbox
                              name="deposit"
                              value={filterValues.deposit}
                              checked={filterValues.deposit}
                              onClick={handleFilterCheckboxes}
                            />
                            {' '}
                            Deposit
                          </Col>
                        </Row>
                      </div>
                    </Col>

                    <Col span={24}>
                      <div className="invoice-filter-section">
                        <Row>
                          <Col span={24}>
                            <span className="filter-title">Status</span>
                          </Col>
                          <Col span={7} className="invoice-filter-checkbox">
                            <Checkbox
                              name="draft"
                              value={filterValues.draft}
                              checked={filterValues.draft}
                              onClick={handleFilterCheckboxes}
                            />
                            {' '}
                            Draft
                          </Col>

                          <Col span={10} className="invoice-filter-checkbox">
                            <Checkbox
                              name="issued"
                              value={filterValues.issued}
                              checked={filterValues.issued}
                              onClick={handleFilterCheckboxes}
                            />
                            {' '}
                            Issued
                          </Col>

                          <Col span={7} className="invoice-filter-checkbox">
                            <Checkbox />
                            {' '}
                            Fiscalised
                          </Col>
                        </Row>
                      </div>
                    </Col>

                    <Col span={24}>
                      <Form.Item label="Payment Method" name="payment">
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

                    <Col span={24} className="invoice-filter-button">
                      <Form.Item>
                        <Button
                          className="border-btn"
                          style={{ marginRight: 10 }}
                          onClick={() => {
                            setFilterValues({
                              range: '',
                              prevYear: '',
                              currYear: '',
                              invoice: '',
                              cancellation: '',
                              deposit: '',
                              draft: '',
                              issued: '',
                              paymentMethod: '',
                            });
                            window.location.reload();
                          }}
                        >
                          Reset All
                        </Button>
                        <Button type="primary" htmlType="submit">
                          Filter
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>

            <div className="invoice-listing-page">
              <div className="page-header">
                <h1>
                  <img src={invoiceIcon} alt="" />
                  {t('invoice.label1')}
                </h1>
                {topNavId ? perm : propertySelectButton}
              </div>
              <div className="invoice-list">
                <div className="custom-table">
                  <table>
                    <thead>
                      <tr>

                        <th>{t('strings.date')}</th>
                        <th>{t('strings.label')}</th>
                        <th>{t('strings.type')}</th>
                        <th>{t('strings.client')}</th>
                        <th>{t('strings.amount')}</th>
                        <th>{t('strings.status')}</th>
                        <th>{t('strings.action')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceData
                        .slice(0)
                        .reverse()
                        .slice(pagination.minValue, pagination.maxValue)
                        .map((el, i) => (
                          <tr key={el.id}>
                            <td>
                              <Checkbox
                                checked={el[Object.keys(el)[21]]}
                                onClick={() => handleCheck(el, i)}
                              />
                              {el.date.slice(0, 10)}
                            </td>
                            <td onClick={() => showEditInvoice(el, i)} role="presentation">
                              {el.label
                                || `INVOICE ${
                                  el.id
                                } - ${new Date().getFullYear()}`}
                            </td>
                            <td onClick={() => showEditInvoice(el, i)} role="presentation">{el.type || 'Invoice'}</td>
                            <td onClick={() => showEditInvoice(el, i)} role="presentation">{el.clientName}</td>
                            <td onClick={() => showEditInvoice(el, i)} role="presentation">
                              {el.total}
                              {' '}
                              EUR
                            </td>
                            <td onClick={() => showEditInvoice(el, i)} role="presentation">{el.status}</td>
                            <td>
                              <div className="action-icon">
                                <MoreOutlined />
                              </div>
                              <div className="invoice-action">
                                <FormOutlined
                                  onClick={() => showEditInvoice(el, i)}
                                />
                                <DeleteOutlined
                                  hidden={isSubUser ? !invoicesDelete : false}
                                  onClick={() => showpopup(el, i)}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <Row>
                  <Col span={12}>
                    <div className="filter-invoice">
                      <ul>
                        <li>
                          <img
                            role="presentation"
                            className="download-img"
                            src={refreshIcon}
                            alt=""
                            onClick={handleRefresh}
                          />
                        </li>
                        <li>
                          <img
                            src={filterIcon}
                            alt=""
                            onClick={() => setMenuToggle(!menutoggle)}
                            role="presentation"
                          />
                        </li>
                      </ul>
                    </div>
                    <div className="invoice-filter-box">
                      <Checkbox
                        checked={selectAllCheck}
                        value={selectAllCheck}
                        onClick={handleSelectAll}
                      >
                        {t('strings.select_all')}
                      </Checkbox>
                      {checkedInvoice.length ? (
                        <div
                          className="cancel-icon"
                          onClick={handleCancelCheck}
                          role="presentation"
                        >
                          <img src={cancelIcon} alt="" />
                          {t('strings.cancel')}
                        </div>
                      ) : (
                        <div className="cancel-icon" hidden>
                          <img src={cancelIcon} alt="" />
                          {t('strings.cancel')}
                        </div>
                      )}

                      {checkedInvoice.length ? (
                        <Tag color="#FB4B56">
                          {checkedInvoice.length}
                          {' '}
                          {t('strings.selected')}
                        </Tag>
                      ) : (
                        <Tag color="#FB4B56" hidden>
                          3
                          {' '}
                          {t('strings.selected')}
                        </Tag>
                      )}
                      <div className="filter-icons">
                        <ul>
                          <li hidden={!checkedInvoice.length}>
                            <img
                              role="presentation"
                              className="download-img"
                              src={downloadIcon}
                              alt=""
                              onClick={handleDownload}
                            />
                          </li>
                          <li hidden={checkedInvoice.length !== 1}>
                            <img
                              role="presentation"
                              className="download-img"
                              src={printIcon}
                              alt=""
                              onClick={handlePrint}
                            />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="pagination">
                      <Pagination
                        total={invoiceData.length}
                        onChange={handlePagination}
                        defaultPageSize={7}
                        defaultCurrent={1}
                      />

                      {/* <div className="setting-icon">
                        <img src={settingIcon} alt="" />
                      </div> */}
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          <AdInvoicePopup
            visible={visible}
            getData={getData}
            userData={userInfo}
            property={currentPropertyInfo}
            label={label}
            close={close}
          />

          <EditInvoicePopup
            visible={visibleEditInvoice}
            userData={userInfo}
            property={invoiceCurrentPropertyInfo}
            getData={getData}
            close={closeEditInvoice}
            invoiceData={currentInvoice}
            invoiceItems={currentInvoiceItems}
            setInvoiceItems={setCurrentInvoiceItems}
            showDeleteWarning={showpopup}
          />

          <DeletePopup
            visible={visibleDeletePopup}
            dataObject={handleDeleteInvoice}
            cancel={() => handleCancel()}
          />
        </Wrapper>
      )}
    </>
  );
  if (propertyInfo && propertyInfo.length < 1) {
    return (
      <Wrapper>
        <Helmet>
          <link rel="icon" href={favicon} />
          <title>
            Lodgly - Comprehensive Vacation Rental Property Management
          </title>
          <meta
            name="description"
            content="Grow your Vacation Rental with Lodgly"
          />
          <body className="invoice-page-view" />
        </Helmet>
        <div className="add-team-page">
          <div className="add-subuser">
            <img src={propertyplace} alt="subuser" />
            <h4>{t('strings.property')}</h4>
            <p>{t('nolist.heading1')}</p>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setVisibleProperty(true)}
            >
              {t('nolist.button1')}
            </Button>
          </div>
        </div>
        <CreateProperty visible={visibleProperty} onCancel={closeCreateProperty} />
      </Wrapper>
    );
  }
  return (
    <>
      <Helmet>
        <link rel="icon" href={favicon} />
        <title>
          Lodgly - Comprehensive Vacation Rental Property Management
        </title>
        <meta
          name="description"
          content="Grow your Vacation Rental with Lodgly"
        />
        <body className="invoice-page-view" />
      </Helmet>
      { pageContent }
    </>
  );
};

export default Invoice;
