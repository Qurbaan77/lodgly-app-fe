import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import './property.css';
import { toast } from 'react-toastify';
import {
  Form, Button, Select, Modal,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { propertyInstance } from '../../axios/axiosconfig';

const CopyRatePopup = (props) => {
  const { t } = useTranslation();

  const [form] = Form.useForm();
  const { visible, handleCancel, fetchData } = props;
  const [unitTypeData, setUnitTypeData] = useState([]);

  const onFinish = async (values) => {
    const payload = {
      unittypeId: values.copyRate,
    };
    const response = await propertyInstance.post('getRates', payload);
    if (response.data.code === 200) {
      if (response.data.ratesData.length > 0) {
        const data = response.data.ratesData[0];
        data.newUnitType = localStorage.getItem('unitTypeV2Id');
        const res = await propertyInstance.post('copyRates', data);
        const statusCode = res.data.code;
        if (statusCode === 200) {
          toast.success('Rate added successfully', { containerId: 'B' });
          fetchData();
        } else {
          toast.error('server error please try again', { containerId: 'B' });
        }
      }
    }
  };

  const getData = useCallback(async () => {
    const response = await propertyInstance.post('/getUnitTypeRates');
    if (response.data.code === 200) {
      setUnitTypeData(response.data.unittypeData);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Modal
      title="Copy Rates"
      visible={visible}
      onCancel={handleCancel}
      wrapClassName="group-modal rate-modal"
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="copyRate"
          label="COPY RATES FROM EXISTING RENTAL"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select"
          >
            {unitTypeData.map((el) => (
              <Select.Option value={el.id}>{el.unitTypeName}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item className="rate-footer text-center">
          <Button
            style={{ marginRight: 10 }}
            className="border-btn"
            onClick={handleCancel}
          >
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
  fetchData: PropTypes.func,
};
CopyRatePopup.defaultProps = {
  visible: false,
  handleCancel: () => {},
  fetchData: () => {},
};

export default CopyRatePopup;
