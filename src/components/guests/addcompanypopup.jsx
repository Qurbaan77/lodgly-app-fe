import React from 'react';
import Helmet from 'react-helmet';
import './guests.css';
import PropTypes from 'prop-types';
import { CloseOutlined } from '@ant-design/icons';
import {
  Form, Input, Button, Row, Col, Modal,
} from 'antd';
import { toast } from 'react-toastify';
import { userInstance } from '../../axios/axiosconfig';

const AddCompany = (props) => {
  const {
    visible, handleOk, handleCancel, getData,
  } = props;

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const response = await userInstance.post('/addCompany', values);
    if (response.data.code === 200) {
      handleCancel();
      getData();
      toast.success('Company created successfully!', { containerId: 'B' });
    } else {
      toast.error('Some error occurred!', { containerId: 'B' });
    }
    form.resetFields();
  };

  // useEffect(() => {}, []);

  return (
    <Modal
      title="Add Company"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      wrapClassName="guest-modal add-company-modal"
    >
      <Helmet>
        <body className={visible ? 'ant-scrolling-effect' : ''} />
      </Helmet>
      <div className="cross-btn">
        <CloseOutlined onClick={handleCancel} />
      </div>
      <Form form={form} name="basic" onFinish={onFinish}>
        <Row style={{ alignItems: 'center' }}>
          <Col span={24}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input company name!',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="VAT ID"
              name="vat"
              rules={[
                {
                  required: true,
                  message: 'Please input vat Id!',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row style={{ alignItems: 'center' }}>
          <Col span={24}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: 'Please input address!',
                  whitespace: true,
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>

        <Row style={{ alignItems: 'center', textAlign: 'right' }}>
          <Col span={24}>
            <Form.Item>
              <Button
                className="border-btn"
                style={{ marginRight: 10 }}
                onClick={() => {
                  handleCancel();
                }}
              >
                Clear
              </Button>
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

AddCompany.propTypes = {
  visible: PropTypes.string,
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
  getData: PropTypes.func,
};
AddCompany.defaultProps = {
  visible: false,
  handleOk: () => {},
  handleCancel: () => {},
  getData: () => {},
};

export default AddCompany;
