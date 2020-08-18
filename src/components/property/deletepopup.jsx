import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './property.css';
import { Button } from 'antd';
import { WarningOutlined, DeleteOutlined } from '@ant-design/icons';

const DeletePopup = ({ dataObject, cancel }) => {
  const { t } = useTranslation();
  return (
    <div className="delete-popup-box">
      <WarningOutlined />
      <h5>{t('deletepopup.heading1')}</h5>

      <p>{t('deletepopup.heading2')}</p>

      <Button style={{ marginRight: 50 }} onClick={cancel}>
        {t('strings.cancel')}
        {' '}
      </Button>
      <Button icon={<DeleteOutlined />} type="primary" onClick={dataObject}>
        {t('strings.delete_item')}
      </Button>
    </div>
  );
};

DeletePopup.propTypes = {
  dataObject: PropTypes.func,
  cancel: PropTypes.func,
};
DeletePopup.defaultProps = {
  dataObject: () => {},
  cancel: () => {},
};

export default DeletePopup;
