import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Helmet from 'react-helmet';
import './property.css';
import {
  Form, Select, Input, DatePicker, Button, Checkbox,
  Modal,
} from 'antd';
import {
  FolderOutlined,
  DeleteOutlined,
  FormOutlined,
  BellOutlined,
  HomeOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import Wrapper from '../wrapper';
import Toaster from '../toaster/toaster';

import people1 from '../../assets/images/people-1.png';
import people2 from '../../assets/images/people-2.png';
import people3 from '../../assets/images/people-3.jpg';
import people4 from '../../assets/images/people-4.jpg';
import favicon from '../../assets/images/logo-mobile.png';
import { userInstance } from '../../axios/axiosconfig';
import DeletePopup from './deletepopup';

const { Option } = Select;

const Groups = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [group, setGroup] = useState([]);
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();
  const [currGroupId, setCurrGroupId] = useState(null);
  const history = useHistory();

  useEffect(() => {
    getData();
  }, []);

  const show = () => {
    setNotifyType('');
    form.resetFields();
    setVisible(true);
  };

  const showDeletePopup = (groupId) => {
    setCurrGroupId(groupId);
    setVisible2(true);
  };

  const handleOk = () => {
    setVisible(false);
    setVisible2(false);
  };

  const handleCancel = () => {
    setVisible(false);
    setVisible2(false);
  };

  const close = () => {
    setNotifyType('');
  };

  const onFinish = async (values) => {
    if (currGroupId) {
      values.id = currGroupId;
    }
    const response = await userInstance.post('/addGroup', values);
    const statusCode = response.data.code;
    const { msg } = response.data;
    if (statusCode === 200) {
      setNotifyType('success');
      setNotifyMsg(msg);
      setVisible(false);
      getData();
    } else {
      setNotifyType('error');
      setNotifyMsg(msg);
    }
    form.resetFields();
  };

  const getData = async () => {
    const response = await userInstance.post('/groupList');
    if (response.data.code === 200) {
      setGroup(response.data.groupDetail);
    }
  };

  const edit = async (data) => {
    setCurrGroupId(data.id);
    form.setFieldsValue({
      id: data.id,
      groupname: data.groupName,
      count: data.checkCount,
      interval: data.checkInterval,
      month: data.month,
    });
    setVisible(true);
  };

  const remove = async () => {
    const data = {
      id: currGroupId,
    };
    const response = await userInstance.post('/deleteGroup', data);
    const statusCode = response.data.code;
    if (statusCode === 200) {
      getData();
      setVisible2(false);
    }
  };

  const addTask = (groupId) => {
    localStorage.setItem('groupId', groupId);
    history.push('/task');
  };

  return (
    <Wrapper>
      <Helmet>
        <link rel="icon" href={favicon} />
        <title>Lodgly - Comprehensive Vacation Rental Property Management</title>
        <meta name="description" content="Grow your Vacation Rental with Lodgly" />
        <body className="group-page-view" />
      </Helmet>
      <div className="group">
        <div className="page-header">
          <h1>
            <HomeOutlined />
            {' '}
            {t('group.heading')}
          </h1>

          <Button type="primary" icon={<PlusOutlined />} onClick={show}>
            {t('group.groupbtn')}
          </Button>
        </div>

        <div className="panel-container">
          <Toaster notifyType={notifyType} notifyMsg={notifyMsg} close={close} />
          {group.map((el) => (
            <div className="panel-box groups">
              <div className="group-icon">
                <FolderOutlined />
              </div>

              <div className="group-name">
                <h4 onClick={() => addTask(el.id)} role="presentation">{el.groupName}</h4>
                <span>
                  {t('group.title1')}
                  {' '}
                  {el.checkCount}
                  {' '}
                  {el.checkInterval}
                </span>
              </div>

              <div className="group-people">
                <ul>
                  <li>
                    <img src={people1} alt="people1" />
                  </li>
                  <li>
                    <img src={people2} alt="people2" />
                  </li>
                  <li>
                    <img src={people3} alt="people3" />
                  </li>
                  <li>
                    <img src={people4} alt="people4" />
                  </li>
                </ul>
              </div>

              <div className="group-action">
                <BellOutlined />
                <div className="hover-action">
                  <FormOutlined onClick={() => edit(el)} />
                  <DeleteOutlined onClick={() => showDeletePopup(el.id)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        title={t('group.title7')}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        wrapClassName="group-modal"
      >
        <Form form={form} name="basic" onFinish={onFinish}>
          <Form.Item
            label={t('group.title2')}
            name="groupname"
            rules={[
              { required: true, message: 'Please input your group name!' },
            ]}
          >
            <Input placeholder={t('group.title3')} />
          </Form.Item>

          <Form.Item>
            <div className="user-avatar">
              <PlusOutlined />
              <img src={people1} alt="people1" />
              <img src={people2} alt="people2" />
              <img src={people3} alt="people3" />
              <img src={people4} alt="people4" />
            </div>
          </Form.Item>

          <Form.Item label={t('group.title1')} style={{ marginBottom: 0 }}>
            <Form.Item
              name="count"
              style={{
                display: 'inline-block',
                width: 'calc(10% - 5px)',
                marginRight: 8,
              }}
            >
              <Input placeholder="" type="number" />
            </Form.Item>
            <Form.Item
              name="interval"
              style={{
                display: 'inline-block',
                width: 'calc(30% - 5px)',
                marginRight: 8,
              }}
            >
              <Select placeholder={t('strings.day')}>
                <Option value="Day">{t('strings.day')}</Option>
                <Option value="Week">{t('strings.week')}</Option>
                <Option value="Month">{t('strings.month')}</Option>
              </Select>
            </Form.Item>

            <Form.Item name="month" style={{ display: 'inline-block' }}>
              <Checkbox>{t('group.title4')}</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Form.Item
              name="prevCheck"
              label={t('group.title5')}
              style={{
                display: 'inline-block',
                width: 'calc(50% - 5px)',
                marginRight: 8,
              }}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              name="nextCheck"
              label={t('group.title6')}
              style={{ display: 'inline-block', width: 'calc(50% - 5px)' }}
            >
              <DatePicker />
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              className="border-btn"
              style={{ marginRight: 10 }}
              onClick={() => {
                setVisible(false);
              }}
            >
              {t('strings.cancel')}
            </Button>
            <Button type="primary" htmlType="submit">
              {t('strings.save')}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        visible={visible2}
        onOk={handleOk}
        onCancel={handleCancel}
        wrapClassName="delete-modal"
      >
        <DeletePopup
          dataObject={() => remove()}
          cancel={() => handleCancel()}
        />
      </Modal>
    </Wrapper>
  );
};

export default Groups;
