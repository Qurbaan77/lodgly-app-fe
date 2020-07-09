import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './invoice.css';
import {
  Select,
  Button,
  Tooltip,
} from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';
import Wrapper from '../wrapper';
import { Modal } from 'antd';
// import { Table } from 'antd';
import invoice from '../../assets/images/invoice.jpg';
// import { Row, Col } from 'antd';
import AdInvoicePopup from './addinvoicepopup';
import { userInstance } from '../../axios/axiosconfig';


const Invoice = () => {

  const { Option } = Select;
  const [topNavId, setTopNavId] = useState();
  const [visible, setVisible] = useState(false);
  const [userInfo, setUserInfo] = useState([]);

  const show = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const isSubUser = localStorage.getItem('isSubUser') || false;
  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  console.log(userCred);
  const [{ invoiceWrite, userId }] = userCred ? userCred : [{}];
  const canWrite = invoiceWrite;

  const getData = async () => {
    console.log('get data is called')
    const response = await userInstance.post('/getInfo', { affiliateId: userId });
    console.log(response);
    if (response.data.code === 200) {
      console.log(response.data.userInfo)
      setUserInfo(response.data.userInfo);
    }

  }

  console.log(userInfo);

  useEffect(() => {
    getData();
  }, []);



  return (
    <Wrapper fun={setTopNavId}>

      <div className="add-invoice-page">


        <div className="add-invoice">
          <img src={invoice} alt='invoice' />
          <h4>Invoices</h4>
          <p>Currently there are no Sub users created</p>
          {
            isSubUser ? canWrite ?
              <Button type="primary" icon={<PlusOutlined />} onClick={show}>
                Add Invoice
          </Button> :
              <Tooltip title='You are not authorize to create Invoice' color='gold'>
                <Button type="primary" icon={<PlusOutlined />} onClick={show} disabled='true'>
                  Add Invoice
          </Button>
              </Tooltip> :
              <Button type="primary" icon={<PlusOutlined />} onClick={show}>
                Add Invoice
          </Button>
          }

        </div>


      </div>





      <Modal
        title="Create new invoice"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        wrapClassName="guest-modal add-invoice-popup"
      >



        <AdInvoicePopup
          userData={userInfo}
        />


      </Modal>




    </Wrapper>

  );
};

export default Invoice;
