import React, { useState } from 'react';
import './guests.css';
import {
  Table, Button, Modal,
} from 'antd';
import Helmet from 'react-helmet';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import favicon from '../../assets/images/logo-mobile.png';
import Wrapper from '../wrapper';
import companyicon from '../../assets/images/company-icon.png';
import actionicon from '../../assets/images/action-icon.png';
import editicon from '../../assets/images/edit-icon.png';
import deleteicon from '../../assets/images/delete-icon.png';
import AddCompany from './addcompanypopup';

const CompanyList = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: {
        compare: (a, b) => a.french - b.french,
        multiple: 4,
      },
    },
    {
      title: 'Vat ID',
      dataIndex: 'vat',
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: 'Address',
      dataIndex: 'address',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <div className="guest-action">
          <img className="action-icon" src={actionicon} alt="" />
          <div className="edit-delete">
            <img className="guest-edit-icon" src={editicon} alt="" />
            <img className="guest-delete-icon" src={deleteicon} alt="" />
          </div>
        </div>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'Name of Company',
      vat: '1234567',
      email: 'namecompany@gmail.com',
      address: 'Company Address St. 348',
    },
    {
      key: '2',
      name: 'Name of Company',
      vat: '1234567',
      email: 'namecompany@gmail.com',
      address: 'Company Address St. 348',
    },

    {
      key: '3',
      name: 'Name of Company',
      vat: '1234567',
      email: 'namecompany@gmail.com',
      address: 'Company Address St. 348',
    },

    {
      key: '4',
      name: 'Name of Company',
      vat: '1234567',
      email: 'namecompany@gmail.com',
      address: 'Company Address St. 348',
    },
  ];

  function onChange() {
    // console.log('params', pagination, filters, sorter, extra);
  }

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
      <Helmet>
        <link rel="icon" href={favicon} />
        <title>
          Lodgly - Comprehensive Vacation Rental Property Management
        </title>
        <meta
          name="description"
          content="Grow your Vacation Rental with Lodgly"
        />
        <body className="rates-page-view" />
      </Helmet>

      <div className="guest-list company-list">
        <div className="page-header">
          <h1>
            <img src={companyicon} alt="unit" />
            {' '}
            Companies
          </h1>
          <Button type="primary" icon={<PlusOutlined />} onClick={show}>
            Add Company
          </Button>
        </div>

        <div className="guest-table company-table">
          <div className="custom-table">
            <Table columns={columns} dataSource={data} onChange={onChange} />
          </div>
        </div>
      </div>

      <Modal
        title="Add Company"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        wrapClassName="guest-modal add-company-modal"
      >
        <div className="cross-btn">
          <CloseOutlined onClick={handleCancel} />
        </div>

        <AddCompany />
      </Modal>
    </Wrapper>
  );
};

export default CompanyList;
