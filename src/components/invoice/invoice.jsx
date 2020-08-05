import React, {
  useEffect, useState, useCallback,
} from 'react';
import Helmet from 'react-helmet';
import './invoice.css';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Tooltip,
  Checkbox,
  Row,
  Col,
  Pagination,
  Tag,
} from 'antd';
import {
  PlusOutlined, DeleteOutlined, FormOutlined, MoreOutlined,
} from '@ant-design/icons';
import Wrapper from '../wrapper';
import favicon from '../../assets/images/logo-mobile.png';

// import { Table } from 'antd';
import invoice from '../../assets/images/invoice.jpg';
import invoiceIcon from '../../assets/images/menu/invoice-icon.png';
import filterIcon from '../../assets/images/menu/filter-icon.png';
// import editIcon from '../../assets/images/menu/pencil-icon.png';
import downloadIcon from '../../assets/images/menu/download-icon.png';
import refreshIcon from '../../assets/images/menu/refresh-icon.png';
import settingIcon from '../../assets/images/menu/setting-icon.png';
import printIcon from '../../assets/images/menu/print-icon.png';
import cancelIcon from '../../assets/images/menu/cancel-icon.png';
// import loader from '../../assets/images/loader.svg';
import AdInvoicePopup from './addinvoicepopup';
import EditInvoicePopup from './editInvoicePopup';
import { userInstance } from '../../axios/axiosconfig';
import Toaster from '../toaster/toaster';
import DeletePopup from './deletepopup';
import UserLock from '../userlock/userlock';

const Invoice = () => {
  const { t } = useTranslation();
  // const { Option } = Select;
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
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();
  const [visibleDeletePopup, setVisibleDeletePopup] = useState(false);
  const [removeId, setDeleteId] = useState(null);
  const [selectAllCheck, setSelectAllCheck] = useState(false);
  const [subscribed, setSubscribed] = useState();
  const [onTrial, setOnTrial] = useState(true);
  const [daysLeft, setDaysLeft] = useState();

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

  const closeToaster = () => {
    setNotifyType('');
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
  invoiceData.map((el) => { (label = el.id); return label; });

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
      setNotifyType('success');
      setNotifyMsg('Invoice Deleted Successfully');
    } else {
      setNotifyType('error');
      setNotifyMsg('some error occured');
    }
  };

  const toasterMessage = (msg) => {
    setNotifyType('success');
    setNotifyMsg(msg);
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

  const [{ invoiceWrite, userId }] = userCred || [{}];
  const canWrite = invoiceWrite;

  const getData = useCallback(async () => {
    const response0 = await userInstance.get('/getUserSubscriptionStatus');
    if (response0.data.code === 200) {
      const [{
        days, isOnTrial, isSubscribed,
      }] = response0.data.userSubsDetails;
      setDaysLeft(parseInt(days, 10));
      setSubscribed(JSON.parse(isSubscribed));
      setOnTrial(JSON.parse(isOnTrial));
    }
    const inb = await userInstance.post('getInvoice');
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
      if (el.id === element.id && element[Object.keys(el)[20]] === true) {
        element[Object.keys(el)[20]] = false;
      } else if (el.id === element.id && element[Object.keys(el)[20]] === false) {
        element[Object.keys(el)[20]] = true;
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
    const data = propertyInfo.filter((property) => property.id === topNavId);
    setCurrentPropertyInfo(data);
  }, [topNavId, propertyInfo]);

  useEffect(() => {
    getData();
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
      invoiceData.slice(0).reverse().slice(pagination.minValue, pagination.maxValue)
        .forEach((el) => {
          el[Object.keys(el)[20]] = false;
        });
      setInvoiceData(invoiceData);
      setCheckedInvoice([]);
    } else {
      setSelectAllCheck(true);
      invoiceData.slice(0).reverse().slice(pagination.minValue, pagination.maxValue)
        .forEach((el) => {
          el[Object.keys(el)[20]] = true;
        });
      const data = invoiceData.filter((el) => el[Object.keys(el)[20]] !== false);
      setInvoiceData(invoiceData);
      setCheckedInvoice(data);
    }

    update();
  };

  const handleCancelCheck = () => {
    setSelectAllCheck(false);
    invoiceData.slice(0).reverse().slice(pagination.minValue, pagination.maxValue)
      .forEach((el) => {
        el[Object.keys(el)[20]] = false;
      });
    setInvoiceData(invoiceData);
    setCheckedInvoice([]);
  };

  const enableButton = (
    <Button type="primary" icon={<PlusOutlined />} onClick={show}>
      {t('invoice.button1')}
    </Button>
  );
  const disabledButton = (
    <Tooltip title={t('invoice.tootltip')} color="gold">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={show}
        disabled
      >
        {t('invoice.button1')}
      </Button>
    </Tooltip>
  );
  const propertySelectButton = (
    <Tooltip title={t('invoice.tootltip1')} color="gold">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={show}
        disabled
      >
        {t('invoice.button1')}
      </Button>
    </Tooltip>
  );

  const btn = isSubUser && canWrite ? enableButton : disabledButton;
  const perm = isSubUser ? btn : enableButton;

  const hasAccess = onTrial && daysLeft !== 0 ? 1 : subscribed;
  const pageContent = (
    <>
      <Toaster
        notifyType={notifyType}
        notifyMsg={notifyMsg}
        close={closeToaster}
      />
      {page ? (
        <Wrapper fun={setTopNavId}>
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
                              checked={el[Object.keys(el)[20]]}
                              onClick={() => handleCheck(el, i)}
                            />
                            {el.date.slice(0, 10)}
                          </td>
                          <td>
                            {el.label
                              || `INVOICE ${el.id} - ${new Date().getFullYear()}`}
                          </td>
                          <td>{el.type || 'Invoice'}</td>
                          <td>{el.clientName}</td>
                          <td>
                            {el.total}
                            {' '}
                            EUR
                          </td>
                          <td>{el.status}</td>
                          <td>
                            <div className="action-icon">
                              <MoreOutlined />
                            </div>

                            <div className="invoice-action">
                              <FormOutlined
                                onClick={() => showEditInvoice(el, i)}
                              />
                              <DeleteOutlined
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
                        <img src={filterIcon} alt="" />
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

                    <div className="setting-icon">
                      <img src={settingIcon} alt="" />
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>

          <AdInvoicePopup
            visible={visible}
            getData={getData}
            userData={userInfo}
            property={currentPropertyInfo}
            label={label}
            close={close}
            toasterMessage={toasterMessage}
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
            toasterMessage={toasterMessage}
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
  return (
    <>
      <Helmet>
        <link rel="icon" href={favicon} />
        <title>Lodgly - Comprehensive Vacation Rental Property Management</title>
        <meta name="description" content="Grow your Vacation Rental with Lodgly" />
        <body className="invoice-page-view" />
      </Helmet>
      {
      hasAccess ? pageContent
        : (
          <Wrapper>
            <UserLock />
          </Wrapper>
        )
        }
    </>
  );
};

export default Invoice;
