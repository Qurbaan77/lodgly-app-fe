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
import invoice from '../../assets/images/invoice.jpg';
import { Row, Col } from 'antd';
import AdInvoicePopup from './addinvoicepopup';


const Invoice = () => {

  const { Option } = Select;

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
    <Wrapper>

    <div className="add-invoice-page">


        <div className="add-invoice">
            <img src={invoice} />
            <h4>Invoices</h4>
            <p>Currently there are no Sub users created</p>
          <Button type="primary" icon={<PlusOutlined />} onClick={show}>
             Add Invoice
          </Button>
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

export default Invoice;
