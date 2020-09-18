import React, { useState, useEffect, useCallback } from 'react';
import './guests.css';
import { Table, Button, Modal } from 'antd';
import Helmet from 'react-helmet';
import { PlusOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import favicon from '../../assets/images/logo-mobile.png';
import Wrapper from '../wrapper';
import UserLock from '../userlock/userlock';
import companyicon from '../../assets/images/company-icon.png';
import actionicon from '../../assets/images/action-icon.png';
import editicon from '../../assets/images/edit-icon.png';
import deleteicon from '../../assets/images/delete-icon.png';
import AddCompany from './addcompanypopup';
import EditCompany from './editcompanypop';
import { userInstance } from '../../axios/axiosconfig';
import loader from '../../assets/images/cliploader.gif';
import DeletePopup from '../property/deletepopup';
import nocompany from '../../assets/images/company-placeholder.png';

const CompanyList = () => {
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editData, showEditData] = useState({});
  const [currId, setCurrId] = useState(0);
  const [visibiltyOFDelete, setVisibiltyOFDelete] = useState(false);
  const [subscribed, setSubscribed] = useState(true);
  const [onTrial, setOnTrial] = useState(true);
  const [daysLeft, setDaysLeft] = useState();

  const getData = useCallback(async () => {
    const res = await userInstance.get('/getUserSubscriptionStatus');
    if (res.data.code === 200) {
      const [{ days, isOnTrial, isSubscribed }] = res.data.userSubsDetails;
      setDaysLeft(parseInt(days, 10));
      setSubscribed(JSON.parse(isSubscribed));
      setOnTrial(JSON.parse(isOnTrial));
    }
    const response = await userInstance.post('/getCompanyList');
    if (response.data.code === 200) {
      setCompanyData(response.data.companyData);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const delRow = (id) => {
    setVisibiltyOFDelete(true);
    setCurrId(id);
  };

  const remove = async () => {
    const values = {
      id: currId,
    };
    const response = await userInstance.post('/deleteCompany', values);
    if (response.data.code === 200) {
      setVisibiltyOFDelete(false);
      getData();
      toast.success('Successfully deleted company', {
        containerId: 'B',
        toastId: 'unique',
      });
    } else {
      toast.error('Server error please try again', { containerId: 'B' });
    }
  };

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
      dataIndex: 'vatId',
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
      render: (record) => (
        <div className="guest-action">
          <img className="action-icon" src={actionicon} alt="" />
          <div className="edit-delete">
            <img
              className="guest-edit-icon"
              src={editicon}
              alt=""
              onClick={() => edit(record)}
              role="presentation"
            />
            <img
              className="guest-delete-icon"
              src={deleteicon}
              alt=""
              onClick={() => delRow(record.id)}
              role="presentation"
            />
          </div>
        </div>
      ),
    },
  ];

  function onChange() {
    // console.log('params', pagination, filters, sorter, extra);
  }

  const [visible, setVisible] = useState(false);
  const [visibletwo, setVisibleTwo] = useState(false);
  const show = () => {
    setVisible(true);
    showEditData({});
  };
  const edit = (record) => {
    showEditData(record);
    setVisibleTwo(true);
  };
  const handleOk = () => {
    setVisible(false);
    setVisibleTwo(false);
    setVisibiltyOFDelete(false);
  };

  const handleCancel = () => {
    setVisible(false);
    setVisibleTwo(false);
    setVisibiltyOFDelete(false);
  };

  const hasAccess = onTrial && daysLeft !== 0 ? true : subscribed;

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
          <body className="company-page-view" />
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

  if (companyData && companyData.length < 1) {
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
          <body className="company-page-view" />
        </Helmet>
        <div className="add-team-page">
          <div className="add-subuser">
            <img src={nocompany} alt="noguest" />
            <h4>Companies</h4>
            <p>Currently there are no companies created</p>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => show()}
            >
              Add Company
            </Button>
          </div>
        </div>
        <AddCompany
          visible={visible}
          handleOk={handleOk}
          handleCancel={handleCancel}
          getData={getData}
        />
      </Wrapper>
    );
  }

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
        <body className="company-page-view" />
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
            <Table
              columns={columns}
              dataSource={companyData}
              onChange={onChange}
            />
          </div>
        </div>
      </div>

      <EditCompany
        visible={visibletwo}
        handleOk={handleOk}
        handleCancel={handleCancel}
        getData={getData}
        editData={editData}
      />
      <AddCompany
        visible={visible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        getData={getData}
      />
      <Modal
        visible={visibiltyOFDelete}
        handleOk={handleOk}
        handleCancel={handleCancel}
        wrapClassName="delete-modal"
      >
        <DeletePopup
          dataObject={() => remove()}
          cancel={() => handleCancel()}
        />
      </Modal>
    </Wrapper>
  );
};

export default CompanyList;
