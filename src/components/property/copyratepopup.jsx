import React from 'react';
import PropTypes from 'prop-types';

import './property.css';

import {
  Form, Button, Select, Modal,
} from 'antd';
import { useTranslation } from 'react-i18next';

const CopyRatePopup = (props) => {
  const { visible, handleCancel } = props;

  const { t } = useTranslation();
  return (
    <Modal title="Copy Rates" visible={visible} onCancel={handleCancel} wrapClassName="group-modal rate-modal">
      <Form name="basic">
        <Form.Item
          name="copyRate"
          label="COPY RATES FROM EXISTING RENTAL"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select>
            <Select.Option value="Holiday House">Holiday House</Select.Option>
            <Select.Option value="Holiday Apartment">
              Holiday Apartment
            </Select.Option>
            <Select.Option value="Pousada">Pousada</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item className="rate-footer text-center">
          <Button style={{ marginRight: 10 }} className="border-btn" onClick={handleCancel}>
            {t('strings.cancel')}
          </Button>
          <Button type="primary" htmlType="submit">
            {t('strings.save')}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

CopyRatePopup.propTypes = {
  visible: PropTypes.bool,
  handleCancel: PropTypes.func,
};
CopyRatePopup.defaultProps = {
  visible: false,
  handleCancel: () => {},
};

export default CopyRatePopup;
