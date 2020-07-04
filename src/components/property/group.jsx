import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './property.css';
import {
  Form,
  Select,
  Input,
  InputNumber,
  Switch,
  Radio,
  Slider,
  DatePicker,
  TimePicker,
  Button,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
} from 'antd';
import {
  MenuUnfoldOutlined,
  FolderOutlined,
  DeleteOutlined,
  FormOutlined,
  CheckOutlined,
  BellOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  PlusOutlined,
  SearchOutlined,
  VerticalAlignMiddleOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import Wrapper from '../wrapper';
import Toaster from '../toaster/toaster';
import { Collapse } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { Avatar } from 'antd';
import people1 from '../../assets/images/people-1.png';
import people2 from '../../assets/images/people-2.png';
import people3 from '../../assets/images/people-3.jpg';
import people4 from '../../assets/images/people-4.jpg';
import { userInstance } from '../../axios/axiosconfig';
import { Redirect } from 'react-router-dom';
import DeletePopup from './deletepopup';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const { Option } = Select;

const { MonthPicker, RangePicker } = DatePicker;

const genExtra = () => (
  <FolderOutlined
    onClick={(event) => {
      event.stopPropagation();
    }}
  />
);

const tExtra = () => (
  <BellOutlined
    onClick={(event) => {
      event.stopPropagation();
    }}
  />
);

const Groups = (props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [group, setGroup] = useState([]);
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();
  const [currGroupId ,setCurrGroupId] = useState(0);
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
    setCurrGroupId(groupId)
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
    const response = await userInstance.post('/addGroup', values);
    const statusCode = response.data.code;
    const msg = response.data.msg;
    if (statusCode == 200) {
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
    form.setFieldsValue({
      id: data.id,
      groupname: data.groupName,
      count: data.checkCount,
      interval: data.checkInterval,
      month: data.month,
    })
    setVisible(true);
  };

  const remove = async () => {
    const data = {
      id: currGroupId,
    };
    const response = await userInstance.post('/deleteGroup', data);
    const statusCode = response.data.code;
    const msg = response.data.msg;
    if (statusCode == 200) {
      getData();
      setVisible2(false);
    }
  };

  const addTask = (groupId) => {
    localStorage.setItem('groupId', groupId)
    history.push('/task');
  };


  return (
    <Wrapper>
      <div className="group">
        <div className="page-header">
          <h1>
            <HomeOutlined /> Groups
          </h1>

          <Button type="primary" icon={<PlusOutlined />} onClick={show}>
            Add Group
          </Button>
        </div>

        <div className="panel-container">
          {group.map((el, i) => {
            return (
              <div className="panel-box groups">
                <div className="group-icon">
                  <FolderOutlined />
                </div>

                <div className="group-name">
                  <h4 onClick={() => addTask(el.id)}>{el.groupName}</h4>
                  <span>
                    Check every {el.checkCount} {el.checkInterval}
                  </span>
                </div>

                <div className="group-people">
                  <ul>
                    <li>
                      <img src={people1} />
                    </li>
                    <li>
                      <img src={people2} />
                    </li>
                    <li>
                      <img src={people3} />
                    </li>
                    <li>
                      <img src={people4} />
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
            );
          })}
        </div>
      </div>

      <Modal
        title="Add/Edit Groups"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        wrapClassName="group-modal"
      >
        <Toaster notifyType={notifyType} notifyMsg={notifyMsg} close={close} />
        <Form form={form} name="basic" onFinish={onFinish}>
          <Form.Item label="Id" name="id" hidden={true}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Group Name"
            name="groupname"
            rules={[
              { required: true, message: 'Please input your group name!' },
            ]}
          >
            <Input placeholder="Inventory Check" />
          </Form.Item>

          <Form.Item>
            <div className="user-avatar">
              <PlusOutlined />
              <img src={people1} />
              <img src={people2} />
              <img src={people3} />
              <img src={people4} />
            </div>
          </Form.Item>

          <Form.Item label="Check Every" style={{ marginBottom: 0 }}>
            <Form.Item
              name="count"
              style={{
                display: 'inline-block',
                width: 'calc(10% - 5px)',
                marginRight: 8,
              }}
            >
              <Input placeholder="" />
            </Form.Item>
            <Form.Item
              name="interval"
              style={{
                display: 'inline-block',
                width: 'calc(30% - 5px)',
                marginRight: 8,
              }}
            >
              <Select placeholder="Day">
                <Option value="Day">Day</Option>
                <Option value="Week">Week</Option>
                <Option value="Month">Month</Option>
              </Select>
            </Form.Item>

            <Form.Item name="month" style={{ display: 'inline-block' }}>
              <Checkbox>Check only on free days</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Form.Item
              name="prevCheck"
              label="Previous Checking"
              style={{
                display: 'inline-block',
                width: 'calc(40% - 5px)',
                marginRight: 8,
              }}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item
              name="nextCheck"
              label="Next Checking"
              style={{ display: 'inline-block', width: 'calc(40% - 5px)' }}
            >
              <DatePicker />
            </Form.Item>
          </Form.Item>

          <Form.Item>
          <Button
            style={{ marginRight: 10 }}
            onClick={() => {
              setVisible(false)
            }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Save
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
