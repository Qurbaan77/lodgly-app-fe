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
import property1 from '../../assets/images/property-1.png';
import property2 from '../../assets/images/property-2.png';
import property3 from '../../assets/images/property-3.png';
import team from '../../assets/images/profile_user.jpg';
import { Row, Col } from 'antd';
import SubUserPopup from './subuserpopup';

const TeamListing = () => {
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
      <div className="team-page">
        <div className="page-header">
          <h1>
            <PartitionOutlined /> Team
          </h1>

          <Button type="primary" icon={<PlusOutlined />} onClick={show}>
            Add New Sub-User
          </Button>
        </div>

        <div className="team-list">
          <div className="custom-table">
            <table>
              <thead>
                <tr>
                  <th>Sub User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <div className="team-info">
                      <div className="team-pic">
                        <img src={team} />
                      </div>
                      <div className="team-title">
                        <h5>Anthony Cole</h5>
                        <span>Job Title | City of London, United Kingdom</span>
                      </div>
                    </div>
                  </td>

                  <td>mtemail@gmail.com</td>
                  <td>Sub-User</td>

                  <td>
                    <div className="team-action">
                      <FormOutlined />
                      <DeleteOutlined />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div className="team-info">
                      <div className="team-pic">
                        <img src={team} />
                      </div>
                      <div className="team-title">
                        <h5>Anthony Cole</h5>
                        <span>Job Title | City of London, United Kingdom</span>
                      </div>
                    </div>
                  </td>

                  <td>mtemail@gmail.com</td>

                  <td>Sub-User</td>

                  <td>
                    <div className="team-action">
                      <FormOutlined />
                      <DeleteOutlined />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div className="team-info">
                      <div className="team-pic">
                        <img src={team} />
                      </div>
                      <div className="team-title">
                        <h5>Anthony Cole</h5>
                        <span>Job Title | City of London, United Kingdom</span>
                      </div>
                    </div>
                  </td>

                  <td>mtemail@gmail.com</td>

                  <td>Full Access</td>

                  <td>
                    <div className="team-action">
                      <FormOutlined />
                      <DeleteOutlined />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div className="team-info">
                      <div className="team-pic">
                        <img src={team} />
                      </div>
                      <div className="team-title">
                        <h5>Anthony Cole</h5>
                        <span>Job Title | City of London, United Kingdom</span>
                      </div>
                    </div>
                  </td>

                  <td>mtemail@gmail.com</td>

                  <td>Sub-User</td>

                  <td>
                    <div className="team-action">
                      <FormOutlined />
                      <DeleteOutlined />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        title="Add New Sub-User"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        wrapClassName="guest-modal sub-user"
      >
        <SubUserPopup />
      </Modal>
    </Wrapper>
  );
};

export default TeamListing;
