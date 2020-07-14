import React from 'react';
import './invoice.css';
import {
  Button,
  Modal,
} from 'antd';
import {
  WarningOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const DeletePopup = (props) => {
  const { dataObject, cancel } = props;

  return (
    <Modal
      visible={props.visible}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      wrapClassName="delete-modal"
    >
      <div className="delete-popup-box">
        <WarningOutlined />
        <h5>Delete this object?</h5>

        <p>Deleting this invoice will permanently remove it from your network.</p>

        <Button style={{ marginRight: 50 }} onClick={cancel}>
          Cancel
        </Button>
        <Button icon={<DeleteOutlined />} type="primary" onClick={dataObject}>
          Delete Item
        </Button>
      </div>
    </Modal>
  );
};

export default DeletePopup;
