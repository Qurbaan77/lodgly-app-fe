import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();

  return (
    <Modal
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      wrapClassName="delete-modal"
    >
      <div className="delete-popup-box">
        <WarningOutlined />
        <h5>{t('invoice.label15')}</h5>

        <p>{t('invoice.label16')}</p>

        <Button style={{ marginRight: 50 }} onClick={cancel}>
          {t('strings.cancel')}
        </Button>
        <Button icon={<DeleteOutlined />} type="primary" onClick={dataObject}>
          {t('invoice.label17')}
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
