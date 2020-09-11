import React from 'react';
import PropTypes from 'prop-types';
import './rates.css';
import { toast } from 'react-toastify';
import {
  Button, Row, Col, Form, Input,
} from 'antd';
import { propertyInstance } from '../../axios/axiosconfig';

const AddSeason = (props) => {
  const [form] = Form.useForm();
  const { close, getData } = props;
  const onFinish = async (values) => {
    values.unitTypeId = localStorage.getItem('propertyV2Id');
    const response = await propertyInstance.post('/addSeasonRates', values);
    const statusCode = response.data.code;
    if (statusCode === 200) {
      toast.success('Season rate added successfully', { containerId: 'B' });
      close();
      getData();
      // form.resetFields();
    } else {
      toast.error('server error please try again', { containerId: 'B' });
    }
  };

  return (
    <div className="add-season">
      <Form form={form} onFinish={onFinish}>
        <Row style={{ alignItems: 'center' }}>
          <Col span={24}>
            <Form.Item
              label="Season Name"
              name="seasonRateName"
              rules={[
                {
                  required: true,
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="Season Name" />
            </Form.Item>
          </Col>
        </Row>

        <Row style={{ alignItems: 'center', textAlign: 'right' }}>
          <Col span={24}>
            <Form.Item style={{ marginBottom: '0px' }}>
              <Button className="border-btn" style={{ marginRight: 10 }} onClick={close}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

AddSeason.propTypes = {
  close: PropTypes.func,
  getData: PropTypes.func,
};
AddSeason.defaultProps = {
  close: () => {},
  getData: () => {},
};

export default AddSeason;
