import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CloseOutlined } from '@ant-design/icons';
import {
  Form, Input, Button, Row, Col, Modal,
} from 'antd';
import { toast } from 'react-toastify';
import { userInstance } from '../../axios/axiosconfig';

const EditCompany = (props) => {
  const {
    visible, handleOk, handleCancel, getData, editData,
  } = props;

  const [form] = Form.useForm();

  form.setFieldsValue({
    name: editData.name,
    vat: editData.vatId,
    email: editData.email,
    address: editData.address,
  });

  const onFinish = async (values) => {
    values.id = editData.id;
    const response = await userInstance.post('/addCompany', values);
    if (response.data.code === 200) {
      handleCancel();
      getData();
      toast.success('Company updated successfully!', { containerId: 'B', toastId: 'unique' });
    } else {
      toast.error('Some error occurred!', { containerId: 'B' });
    }
    form.resetFields();
  };

  useEffect(() => {}, []);

  return (
    <Modal
      title="Edit Company"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      wrapClassName="guest-modal add-company-modal"
    >
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

EditCompany.propTypes = {
  visible: PropTypes.string,
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
  getData: PropTypes.func,
  editData: PropTypes.objectOf(PropTypes.object),
};
EditCompany.defaultProps = {
  visible: false,
  handleOk: () => {},
  handleCancel: () => {},
  getData: () => {},
  editData: {},
};

export default EditCompany;
