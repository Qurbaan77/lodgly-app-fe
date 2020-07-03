import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './team.css';
import {
  Form,
  Select,
  Input,
  Layout,
  Menu,
  Button,
  Radio,
  Slider,
  DatePicker,
  Tooltip,
  Dropdown,
  Checkbox,
} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  PlusOutlined,
  DeleteOutlined,
  FormOutlined,
  SearchOutlined,
  VerticalAlignMiddleOutlined,
  PartitionOutlined,
  UserOutlined,
  DownOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import Wrapper from '../wrapper';
import { Modal } from 'antd';
import { Table } from 'antd';
import subuser from '../../assets/images/subuser.jpg';
import { Row, Col } from 'antd';
import SubUserPopup from './subuserpopup';

const Team = () => {
  const { Option } = Select;

  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Wrapper>
      <div className="add-team-page">
        <div className="add-subuser">
          <img src={subuser} alt='subuser'/>
          <h4>Sub Users</h4>
          <p>Currently there are no Sub users created</p>
          <Button type="primary" icon={<PlusOutlined />} onClick={show}>
            Add New Sub-User
          </Button>
        </div>
      </div>

      <Modal
        title="Add New Sub-User"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        wrapClassName="guest-modal sub-user"
      >
        <SubUserPopup close={handleCancel}/>
      </Modal>
    </Wrapper>
  );
};

export default Team;
