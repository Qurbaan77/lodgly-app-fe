import React from 'react';
import PropTypes from 'prop-types';
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
  const {
    dataObject, cancel, visible, handleOk, handleCancel,
  } = props;

  return (
    <Modal
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
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

DeletePopup.propTypes = {
  dataObject: PropTypes.func,
  cancel: PropTypes.func,
  visible: PropTypes.bool,
  handleCancel: PropTypes.func,
  handleOk: PropTypes.func,
};
DeletePopup.defaultProps = {
  dataObject: () => {},
  cancel: () => {},
  visible: false,
  handleCancel: () => {},
  handleOk: () => {},
};
export default DeletePopup;
