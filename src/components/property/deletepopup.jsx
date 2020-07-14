import React from 'react';
import './property.css';
import { Button } from 'antd';
import { WarningOutlined, DeleteOutlined } from '@ant-design/icons';

const DeletePopup = ({ dataObject, cancel }) => (
  <div className="delete-popup-box">
    <WarningOutlined />
    <h5>Delete this object?</h5>

    <p>Deleting this items will permanently remove it from your network.</p>

    <Button style={{ marginRight: 50 }} onClick={cancel}>
      Cancel
    </Button>
    <Button icon={<DeleteOutlined />} type="primary" onClick={dataObject}>
      Delete Item
    </Button>
  </div>
);

export default DeletePopup;
