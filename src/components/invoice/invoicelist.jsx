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
  Tag,
  Tooltip,
  Dropdown,
  Checkbox,
} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  PlusOutlined,
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
import invoice_icon from '../../assets/images/menu/invoice-icon.png';
import { Row, Col } from 'antd';
import AdInvoicePopup from './addinvoicepopup';

import filter_icon from '../../assets/images/menu/filter-icon.png';
import edit_icon from '../../assets/images/menu/pencil-icon.png';
import download_icon from '../../assets/images/menu/download-icon.png';
import refresh_icon from '../../assets/images/menu/refresh-icon.png';
import setting_icon from '../../assets/images/menu/setting-icon.png';
import print_icon from '../../assets/images/menu/print-icon.png';
import cancel_icon from '../../assets/images/menu/cancel-icon.png';


import { Pagination } from 'antd';


const InvoiceList = () => {

  const [topNavId, setTopNavId] = useState();

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


  return (
    <Wrapper fun={setTopNavId}>
      <div className="invoice-listing-page">
        <div className="page-header">
          <h1><img src={invoice_icon} /> Invoice</h1>

          <Button type="primary" icon={<PlusOutlined />} onClick={show}>
            Add Invoice
          </Button>
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

                <tr>
                  <td><Checkbox></Checkbox> 19.07.2020</td>
                  <td>1-2020</td>
                  <td>Invoice</td>
                  <td>Emily Byrd</td>
                  <td>1,400,00 EUR</td>
                  <td>-</td>
                  <td>
                    <div className="invoice-action">
                      <FormOutlined />
                      <DeleteOutlined />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td><Checkbox></Checkbox> 19.07.2020</td>
                  <td>1-2020</td>
                  <td>Invoice<span className="inv">(invoice 2-2019)</span></td>
                  <td>Emily Byrd</td>
                  <td>1,400,00 EUR</td>
                  <td>-</td>
                  <td>
                    <div className="invoice-action">
                      <FormOutlined />
                      <DeleteOutlined />
                    </div>
                  </td>
                </tr>


                <tr>
                  <td><Checkbox></Checkbox> 19.07.2020</td>
                  <td>1-2020</td>
                  <td>Invoice</td>
                  <td>Emily Byrd</td>
                  <td>1,400,00 EUR</td>
                  <td>-</td>
                  <td>
                    <div className="invoice-action">
                      <FormOutlined />
                      <DeleteOutlined />
                    </div>
                  </td>
                </tr>


                <tr>
                  <td><Checkbox></Checkbox> 19.07.2020</td>
                  <td>1-2020</td>
                  <td>Invoice <span className="inv">(cancell.3-2019)</span></td>
                  <td>Emily Byrd</td>
                  <td>1,400,00 EUR</td>
                  <td>-</td>
                  <td>
                    <div className="invoice-action">
                      <FormOutlined />
                      <DeleteOutlined />
                    </div>
                  </td>
                </tr>


                <tr>
                  <td><Checkbox></Checkbox> 19.07.2020</td>
                  <td>1-2020</td>
                  <td>Invoice</td>
                  <td>Emily Byrd</td>
                  <td>1,400,00 EUR</td>
                  <td>-</td>
                  <td>
                    <div className="invoice-action">
                      <FormOutlined />
                      <DeleteOutlined />
                    </div>
                  </td>
                </tr>




              </tbody>

            </table>

          </div>




          <Row>
            <Col span={12}>
              <div className="filter-invoice">
                <ul>
                  <li>
                    <img src={edit_icon} />
                  </li>
                  <li>
                    <img src={refresh_icon} />
                  </li>
                  <li>
                    <img src={filter_icon} />
                  </li>
                </ul>
              </div>

              <div className="invoice-filter-box">
                <Checkbox>Select all</Checkbox>
                <div className="cancel-icon">
                  <img src={cancel_icon} />
                  Cancel
               </div>
                <Tag color="#FB4B56">3 selected</Tag>
                <div className="filter-icons">
                  <ul>
                    <li><img src={download_icon} /></li>
                    <li><img src={print_icon} /></li>
                  </ul>
                </div>
              </div>
            </Col>

            <Col span={12}>

              <div className="pagination">
                <Pagination
                  total={10}
                  showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                  defaultPageSize={3}
                  defaultCurrent={1}
                />

                <div className="setting-icon">
                  <img src={setting_icon} />
                </div>
              </div>

            </Col>
          </Row>


        </div>
      </div>







      <Modal
        title="Create new invoice"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        wrapClassName="guest-modal add-invoice-popup"
      >



        <AdInvoicePopup />


      </Modal>


    </Wrapper>

  );
};

export default InvoiceList;
