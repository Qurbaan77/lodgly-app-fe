import React, { useEffect, useState, Fragment } from 'react';
import './invoice.css';
import {
  Select,
  Button,
  Tooltip,
  Checkbox,
  Row,
  Col,
  Pagination,
  Tag,
} from 'antd';
import { PlusOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import Wrapper from '../wrapper';

// import { Table } from 'antd';
import invoice from '../../assets/images/invoice.jpg';
import invoiceIcon from '../../assets/images/menu/invoice-icon.png';
import filterIcon from '../../assets/images/menu/filter-icon.png';
import editIcon from '../../assets/images/menu/pencil-icon.png';
import downloadIcon from '../../assets/images/menu/download-icon.png';
import refreshIcon from '../../assets/images/menu/refresh-icon.png';
import settingIcon from '../../assets/images/menu/setting-icon.png';
import printIcon from '../../assets/images/menu/print-icon.png';
import cancelIcon from '../../assets/images/menu/cancel-icon.png';
import loader from '../../assets/images/loader.svg';
import AdInvoicePopup from './addinvoicepopup';
import EditInvoicePopup from './editInvoicePopup';
import { userInstance } from '../../axios/axiosconfig';
import Toaster from '../toaster/toaster';
import DeletePopup from './deletepopup';

const Invoice = () => {
  const { Option } = Select;
  const [topNavId, setTopNavId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [propertyInfo, setPropertyInfo] = useState([]);
  const [currentPropertyInfo, setCurrentPropertyInfo] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [page, setPage] = useState(true);
  const [checkedInvoice, setCheckedInvoice] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [visibleEditInvoice, setVisibleEditInvoice] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState([]);
  const [currentInvoiceItems, setCurrentInvoiceItems] = useState([]);
  const [invoiceCurrentPropertyInfo, setInvoicePropertyInfo] = useState([]);
  const [pagination, setPagination] = useState({ minValue: 0, maxValue: 7 });
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();
  const [visibleDeletePopup, setVisibleDeletePopup] = useState(false);
  const [removeId, setDeleteId] = useState(null);

  console.log(topNavId);
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

  const getData = async () => {
    const inb = await userInstance.post('getInvoice');

    if (inb.data.code === 200) {
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
  };
  const handleCheck = (el) => {
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
  }, [topNavId]);

  useEffect(() => {
    getData();
  }, []);

  const handleDownload = () => {
    setShowLoader(false);
    const urls = [];
    checkedInvoice.map((el) => (el.pdfurl ? urls.push(el.pdfurl) : ''));
    if (urls.length) {
      const download = (pdfurls) => {
        const url = pdfurls.pop();
        console.log(url);
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
    setShowLoader(true);
  };

  const handlePrint = () => {
    const [url] = checkedInvoice.map((el) => el.pdfurl);
    window.open(url);
  };

  const enableButton = (
    <Button type="primary" icon={<PlusOutlined />} onClick={show}>
      Add Invoice
    </Button>
  );
  const disabledButton = (
    <Tooltip title="You are not authorize to create Invoice" color="gold">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={show}
        disabled
      >
        Add Invoice
      </Button>
    </Tooltip>
  );
  const propertySelectButton = (
    <Tooltip title="please select property from top navbar" color="gold">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={show}
        disabled
      >
        Add Invoice
      </Button>
    </Tooltip>
  );

  const btn = isSubUser && canWrite ? enableButton : disabledButton;
  const perm = isSubUser ? btn : enableButton;
  return (
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
              <h4>Invoices</h4>
              <p>Currently there are no Invoices created</p>
              {topNavId ? perm : propertySelectButton}
            </div>
          </div>
          {/* <Modal
            title="Create new invoice"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            wrapClassName="guest-modal add-invoice-popup"
          > */}
          <AdInvoicePopup
            handleOk={handleOk}
            visible={visible}
            getData={getData}
            userData={userInfo}
            property={currentPropertyInfo}
            label={1}
            close={close}
          />
          {/* </Modal> */}
        </Wrapper>
      ) : (
          <Wrapper fun={setTopNavId}>
            <div className="invoice-listing-page">
              <div className="page-header">
                <h1>
                  <img src={invoiceIcon} alt="" />
                  {' '}
                Invoice
              </h1>
                {topNavId ? perm : propertySelectButton}
              </div>
              <div className="invoice-list">
                <div className="custom-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Label</th>
                        <th>Type</th>
                        <th>Client</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceData
                        .slice(0)
                        .reverse()
                        .slice(pagination.minValue, pagination.maxValue)
                        .map((el, i) => (
                          <tr key={i}>
                            <td>
                              <Checkbox
                                onClick={() => handleCheck(el, i)}
                              />
                              {el.date.slice(0, 10)}
                            </td>
                            <td>
                              {el.label
                                || `INVOICE ${
                                el.id
                                } - ${new Date().getFullYear()}`}
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
                          <img src={editIcon} alt="" />
                        </li>
                        <li>
                          <img
                            role="presentation"
                            className="download-img"
                            src={refreshIcon}
                            alt=""
                            onClick={getData}
                          />
                        </li>
                        <li>
                          <img src={filterIcon} alt="" />
                        </li>
                      </ul>
                    </div>
                    <div className="invoice-filter-box">
                      {/* <Checkbox hidden={true}>Select all</Checkbox> */}
                      {/* {checkedInvoice.length ? (
                      <div className='cancel-icon' onClick={setCheckedInvoice}>
                        <img src={cancel_icon} alt=''/>
                        Cancel
                      </div>
                    ) : (
                      <div className='cancel-icon' hidden={true}>
                        <img src={cancel_icon} alt=''/>
                        Cancel
                      </div>
                    )} */}

                      {checkedInvoice.length ? (
                        <Tag color="#FB4B56">
                          {checkedInvoice.length}
                          {' '}
                        selected
                        </Tag>
                      ) : (
                          <Tag color="#FB4B56" hidden>
                            3 selected
                          </Tag>
                        )}
                      <div className="loader" hidden={showLoader}>
                        <div className="loader-box">
                          <img src={loader} alt="loader" />
                        </div>
                      </div>
                      <div className="filter-icons">
                        <ul>
                          <li>
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
};

export default Invoice;
