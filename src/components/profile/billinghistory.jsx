import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './profile.css';
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
import property1 from '../../assets/images/property-1.png';
import property2 from '../../assets/images/property-2.png';
import property3 from '../../assets/images/property-3.png';
import team from '../../assets/images/profile_user.jpg';
import { Row, Col } from 'antd';




const BillingHistory = () => {

  const { Option } = Select;

  return (
      <div className="billing-page">
        <div className="page-header">
          <h1>Billing History</h1>
        </div>

        <div className="billing-list">

     <div className="custom-table">
        <table>

        <thead>
          <tr>
            <th>Date</th>
            <th>Payment Plan</th>
            <th style={{ width: "50%" }}>Total Usage</th>
            <th>Balance</th>
          </tr>
        </thead>

        <tbody>

          <tr>
            <td>June 28</td>
            <td>Monthly Subscription</td>
            <td>14,000<span>EUR</span></td>
            <td>
            <a href="#">Download Invoice</a>
            </td>
          </tr>

          <tr>
            <td>June 28</td>
            <td>Monthly Subscription</td>
            <td>14,000<span>EUR</span></td>
            <td>
            <a href="#">Download Invoice</a>
            </td>
          </tr>

          <tr>
            <td>June 28</td>
            <td>Monthly Subscription</td>
            <td>14,000<span>EUR</span></td>
            <td>
            <a href="#">Download Invoice</a>
            </td>
          </tr>

          <tr>
            <td>June 28</td>
            <td>Monthly Subscription</td>
            <td>14,000<span>EUR</span></td>
            <td>
            <a href="#">Download Invoice</a>
            </td>
          </tr>

          <tr>
            <td>June 28</td>
            <td>Monthly Subscription</td>
            <td>14,000<span>EUR</span></td>
            <td>
            <a href="#">Download Invoice</a>
            </td>
          </tr>

          <tr>
            <td>June 28</td>
            <td>Monthly Subscription</td>
            <td>14,000<span>EUR</span></td>
            <td>
            <a href="#">Download Invoice</a>
            </td>
          </tr>




         




        </tbody>

        </table>

        </div>



          
        </div>
      </div>



  );
};

export default BillingHistory;
