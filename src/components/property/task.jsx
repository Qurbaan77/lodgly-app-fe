import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Helmet from 'react-helmet';
import './property.css';
import { toast } from 'react-toastify';
import {
  Form,
  Select,
  Input,
  DatePicker,
  Button,
  Checkbox,
  Row,
  Col,
  Table, Tag, Modal,
} from 'antd';
import {
  DeleteOutlined,
  FormOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import Wrapper from '../wrapper';
import UserLock from '../userlock/userlock';
import people1 from '../../assets/images/people-1.png';
import people2 from '../../assets/images/people-2.png';
import people3 from '../../assets/images/people-3.jpg';
import people4 from '../../assets/images/people-4.jpg';
import favicon from '../../assets/images/logo-mobile.png';
import { userInstance } from '../../axios/axiosconfig';
import DeletePopup from './deletepopup';
import taskIcon from '../../assets/images/menu/task-icon.png';

const { Option } = Select;

const Task = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [group, setGroup] = useState([]);
  const [currTaskId, setCurrTaskId] = useState(0);
  const [isGroup, sertIsGroup] = useState(true);
  const [subscribed, setSubscribed] = useState();
  const [onTrial, setOnTrial] = useState(true);
  const [daysLeft, setDaysLeft] = useState();

  const isSubUser = localStorage.getItem('isSubUser') || false;
  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [{ userId, propertiesDelete }] = userCred || [{}];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'taskName',
      key: 'taskName',
    },
    {
      title: 'Notes',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags, record) => {
        let color = '';
        if (tags === 'Decline') {
          color = 'red';
        } else if (tags === 'Approved') {
          color = 'green';
        } else if (tags === 'In Review') {
          color = 'orange';
        } else if (tags === 'Waiting') {
          color = 'blue';
        }
        return (
          <div>
            <Tag color={color} key={tags}>
              {tags.toUpperCase()}
            </Tag>
            <span className="group-action">
              <FormOutlined onClick={() => edit(record)} />
              <DeleteOutlined
                hidden={isSubUser ? !propertiesDelete : false}
                onClick={() => showDeletePopup(record.id)}
              />
            </span>
          </div>
        );
      },
    },
  ];

  const show = () => {
    form.resetFields();
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    setVisible2(false);
  };

  const handleCancel = () => {
    setVisible(false);
    setVisible2(false);
  };

  const getData = async () => {
    const res = await userInstance.post('/getUserSubscriptionStatus');
    if (res.data.code === 200) {
      const [{
        days, isOnTrial, isSubscribed,
      }] = res.data.userSubsDetails;
      setDaysLeft(parseInt(days, 10));
      setSubscribed(JSON.parse(isSubscribed));
      setOnTrial(JSON.parse(isOnTrial));
    }
    const values = {
      groupId: localStorage.getItem('groupId'),
    };
    const response = await userInstance.post('/taskList', values);
    if (response.data.code === 200) {
      setTasks(response.data.taskDetail);
    }
  };

  const getGroupData = async () => {
    const response = await userInstance.post('/groupList');
    if (response.data.code === 200) {
      response.data.groupDetail
        .filter((el) => el.id === parseInt(localStorage.getItem('groupId'), 10))
        .forEach((filter) => {
          setGroup(filter);
        });
    }
  };

  const onFinish = async (values) => {
    saveData(values);
  };

  const saveData = async (values) => {
    if (currTaskId) {
      values.id = currTaskId;
    }
    values.groupId = localStorage.getItem('groupId');
    values.affiliateId = userId;
    const response = await userInstance.post('/addTask', values);
    const statusCode = response.data.code;
    if (statusCode === 200) {
      toast.success('task added successfully', { containerId: 'B' });
      setVisible(false);
      getData();
    } else {
      toast.error('server error please try again', { containerId: 'B' });
    }
    form.resetFields();
  };

  const showDeletePopup = (taskId) => {
    setCurrTaskId(taskId);
    setVisible2(true);
  };

  const remove = async () => {
    const data = {
      id: currTaskId,
    };
    const response = await userInstance.post('/deleteTask', data);
    const statusCode = response.data.code;
    if (statusCode === 200) {
      setVisible2(false);
      getData();
    }
  };

  const edit = async (data) => {
    form.setFieldsValue({
      taskName: data.taskName,
      note: data.note,
      tags: data.tags,
    });
    setVisible(true);
  };

  useEffect(() => {
    if (localStorage.getItem('groupId')) {
      sertIsGroup(false);
    }
    getData();
    getGroupData();
  }, []);

  const hasAccess = onTrial && daysLeft !== 0 ? 1 : subscribed;

  return (
    <Wrapper>
      <Helmet>
        <link rel="icon" href={favicon} />
        <title>
          Lodgly - Comprehensive Vacation Rental Property Management
        </title>
        <meta
          name="description"
          content="Grow your Vacation Rental with Lodgly"
        />
        <body className="task-page-view" />
      </Helmet>
      {
        hasAccess
          ? (
            <>
              <div className="cleaning-group">
                <div className="page-header">
                  <h1>
                    <img src={taskIcon} alt="task" />
                    {' '}
                    {localStorage.getItem('groupId')
                      ? group.groupName
                      : t('task.heading')}
                  </h1>

                  <div className="cleaning-button">
                    <div className="user-avatar">
                      <PlusOutlined />
                      <img src={people1} alt="people1" />
                      <img src={people2} alt="people2" />
                      <img src={people3} alt="people3" />
                      <img src={people4} alt="people4" />
                    </div>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={show}
                      disabled={isGroup}
                    >
                      {t('task.groupbtn')}
                    </Button>
                  </div>
                </div>

                <div className="panel-container">
                  <Table columns={columns} dataSource={tasks} />
                </div>

                <div className="clean-filter">
                  <Row>
                    <Col span={12}>
                      <Form.Item
                        label={t('task.title1')}
                        style={{ marginBottom: 0, textAlign: 'left' }}
                      >
                        <Form.Item
                          name="year"
                          style={{
                            display: 'inline-block',
                            width: 'calc(10% - 5px)',
                            marginRight: 8,
                          }}
                        >
                          <Input placeholder="" />
                        </Form.Item>
                        <Form.Item
                          name="month"
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
                          <Checkbox>{t('task.title4')}</Checkbox>
                        </Form.Item>
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item>
                        <Form.Item
                          name="date-picker"
                          label={t('task.title5')}
                          style={{
                            display: 'inline-block',
                            width: 'calc(40% - 5px)',
                            marginRight: 8,
                          }}
                        >
                          <DatePicker />
                        </Form.Item>

                        <Form.Item
                          name="date-picker"
                          label={t('task.title6')}
                          style={{ display: 'inline-block', width: 'calc(40% - 5px)' }}
                        >
                          <DatePicker />
                        </Form.Item>
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              </div>

              <Modal
                title={t('task.title7')}
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                wrapClassName="task-modal"
              >
                <Form form={form} name="basic" onFinish={onFinish}>

                  <Form.Item
                    label="Task"
                    name="taskName"
                    rules={[{ required: true, message: t('task.rules') }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Note"
                    name="note"
                    rules={[{ required: true, message: t('task.rules1') }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item name="tags">
                    <Select defaultValue="Select" style={{ width: 120 }}>
                      <Option value="Approved">
                        {' '}
                        {t('task.option1')}
                      </Option>
                      <Option value="Waiting">
                        {' '}
                        {t('task.option2')}
                      </Option>
                      <Option value="Decline">
                        {' '}
                        {t('task.option3')}
                      </Option>
                      <Option value="In Review">
                        {' '}
                        {t('task.option4')}
                      </Option>
                    </Select>
                  </Form.Item>

                  <Form.Item className="text-center">
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
            </>
          )
          : <UserLock />
      }
    </Wrapper>
  );
};

export default Task;
