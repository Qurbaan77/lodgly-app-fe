import React, { useEffect, useState } from 'react';
import './property.css';
import {
  Form,
  Select,
  Input,
  InputNumber,
  Switch,
  Radio,
  Slider,
  DatePicker,
  TimePicker,
  Button,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  PlusOutlined,
  SearchOutlined,
  VerticalAlignMiddleOutlined,
  WarningOutlined,
  UserOutlined,
  DeleteOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import Wrapper from '../wrapper';
import { Collapse } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

const DeletePopup = ({ dataObject, cancel }) => {
  console.log(dataObject);

  return (
    <div class='delete-popup-box'>
      <WarningOutlined />
      <h5>Delete this object?</h5>

      <p>Deleting this items will permanently remove it from your network.</p>

      <Button style={{ marginRight: 50 }} onClick={cancel}>
        Cancel
      </Button>
      <Button icon={<DeleteOutlined />} type='primary' onClick={dataObject}>
        Delete Item
      </Button>
    </div>
  );
};

export default DeletePopup;
