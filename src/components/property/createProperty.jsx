import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './property.css';
import {
  Button,
  Form,
  Input,
  Modal,
} from 'antd';
import property1 from '../../assets/images/placeholder.svg';
import { propertyInstance } from '../../axios/axiosconfig';

const CreateProperty = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [{ userId }] = userCred || [{}];

  const onFinish = async (values) => {
    const copyValues = values;
    copyValues.name = values.name.trim();
    copyValues.affiliateId = userId;
    const response = await propertyInstance.post('/addProperty', copyValues);
    if (response.data.code === 200) {
      localStorage.setItem('unitTypeV2Id', response.data.unitTypeV2Id);
      history.push('/overview');
    }
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      wrapClassName="add-property-popup"
    >
      <div className="add-property-popup-content">
        <Form form={form} onFinish={onFinish}>
          <img src={property1} alt="property" />
          <h3>Add a new property</h3>
          <p>You are starting the process to create a new property</p>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter property name!',
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Property Name" />
          </Form.Item>
          <div className="property-btns">
            <Button onClick={onCancel} className="border-btn">Cancel</Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

CreateProperty.propTypes = {
  onCancel: PropTypes.func,
  visible: PropTypes.bool,
};
CreateProperty.defaultProps = {
  onCancel: () => {},
  visible: false,
};

export default CreateProperty;
