import React, { useEffect, useState, Fragment } from 'react';
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
import EditSubUserPopup from './editsubuserpopup';
import subuser from '../../assets/images/subuser.jpg';
import { userInstance } from '../../axios/axiosconfig';
import Toaster from '../toaster/toaster';

const TeamListing = () => {
  const { Option } = Select;

  const [visible, setVisible] = useState(false);
  const [visibleSubUser, setVisibleSubUser] = useState(false);
  const [subUser, setSubUser] = useState([]);
  const [currentSubUser, setCurrentSubUser] = useState(false);
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();

  const isSubUser = localStorage.getItem('isSubUser') || false;
  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  console.log(userCred);
  const [{ teamWrite: canWrite, userId }] = userCred ? userCred : [{}];

  const show = () => {
    setVisible(true);
  };
   const close = () => {
    setNotifyType('');
  };

  const handleOk = () => {
    console.log('hi');
    setVisible(false);
  };

  const handleCancel = () => {
    console.log('cancel');
    setVisible(false);
    setVisibleSubUser(false);
  };

  const closeSubUser = () => {
    setVisible(false);
  };

  const showEditSubUser = (value) => {
    console.log(value);
    setCurrentSubUser(value);
    setVisibleSubUser(true);
  };

  const closeEditSubUser = () => {
    setVisibleSubUser(false);
  };

  const handleDeleteSubUser = async (value) => {
    console.log(value);
    const deleteId = value.id;
    //deleting sub user from databse
    const res = await userInstance.post('/deleteSubUser', {deleteId});
    console.log(res);
    if(res.status === 200) {
      //deleting sub user from state
      const data = subUser.filter((el)=>el.id === deleteId);
      console.log(data);
      setSubUser([...data]);
      setNotifyType('success');
      setNotifyMsg('Sub User Deleted Successfully');
    }
  };

  const getData = async () => {
    const response = await userInstance.post('/getSubUser', {
      affiliateId: userId,
    });
    console.log(response);
    if (response.status === 200) {
      setSubUser(response.data.subUser);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Fragment>
          <Toaster notifyType={notifyType} notifyMsg={notifyMsg} close={close} />
      {subUser.length ? (
        <Wrapper>
          <div className='team-page'>
            <div className='page-header'>
              <h1>
                <PartitionOutlined /> Team
              </h1>

              <Button type='primary' icon={<PlusOutlined />} onClick={show}>
                Add New Sub-User
              </Button>
            </div>

            <div className='team-list'>
              <div className='custom-table'>
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
                    {subUser.map((el, i) => {
                      return (
                        <tr>
                          <td>
                            <div className='team-info'>
                              <div className='team-pic'>
                                <img src={team} alt='team' />
                              </div>
                              <div className='team-title'>
                                <h5>Anthony Cole</h5>
                                <span>
                                  Job Title | City of London, United Kingdom
                                </span>
                              </div>
                            </div>
                          </td>

                          <td>{el.email}</td>
                          <td>{el.role}</td>

                          <td>
                            <div className='team-action'>
                              <FormOutlined
                                onClick={() => showEditSubUser(el, i)}
                              />
                              <DeleteOutlined
                                onClick={() => handleDeleteSubUser(el, i)}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <SubUserPopup
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            close={closeSubUser}
            getData={getData}
          />
          <EditSubUserPopup
            visible={visibleSubUser}
            onOk={handleOk}
            onCancel={handleCancel}
            close={closeEditSubUser}
            subUserData={currentSubUser}
            getData={getData}
          />
        </Wrapper>
      ) : (
        <Wrapper>
          <div className='add-team-page'>
            <div className='add-subuser'>
              <img src={subuser} alt='subuser' />
              <h4>Sub Users</h4>
              <p>Currently there are no Sub users created</p>
              {isSubUser ? (
                canWrite ? (
                  <Button type='primary' icon={<PlusOutlined />} onClick={show}>
                    Add New Sub-User
                  </Button>
                ) : (
                  <Tooltip
                    title='You are not authorize to add new sub user'
                    color='gold'
                  >
                    <Button
                      type='primary'
                      icon={<PlusOutlined />}
                      onClick={show}
                      disabled='true'
                    >
                      Add New Sub-User
                    </Button>
                  </Tooltip>
                )
              ) : (
                <Button type='primary' icon={<PlusOutlined />} onClick={show}>
                  Add New Sub-User
                </Button>
              )}
            </div>
          </div>
          <SubUserPopup
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            close={closeSubUser}
            getData={getData}
          />
        </Wrapper>
      )}
    </Fragment>
  );
};

export default TeamListing;
