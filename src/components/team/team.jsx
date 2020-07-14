import React, { useEffect, useState } from 'react';
import './team.css';
import { Button, Tooltip } from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  FormOutlined,
  PartitionOutlined,
} from '@ant-design/icons';
import Wrapper from '../wrapper';
import team from '../../assets/images/profile_user.jpg';
import SubUserPopup from './subuserpopup';
import EditSubUserPopup from './editsubuserpopup';
import subuser from '../../assets/images/subuser.jpg';
import { userInstance } from '../../axios/axiosconfig';
import Toaster from '../toaster/toaster';

const TeamListing = () => {
  const [visible, setVisible] = useState(false);
  const [visibleSubUser, setVisibleSubUser] = useState(false);
  const [subUser, setSubUser] = useState([]);
  const [currentSubUser, setCurrentSubUser] = useState(false);
  const [notifyType, setNotifyType] = useState();
  const [notifyMsg, setNotifyMsg] = useState();

  const isSubUser = localStorage.getItem('isSubUser') || false;
  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [{ teamWrite: canWrite, userId }] = userCred || [{}];

  const show = () => {
    setVisible(true);
  };
  const close = () => {
    setNotifyType('');
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
    setVisibleSubUser(false);
  };

  const closeSubUser = () => {
    setVisible(false);
  };

  const showEditSubUser = (value) => {
    setCurrentSubUser(value);
    setVisibleSubUser(true);
  };

  const closeEditSubUser = () => {
    setVisibleSubUser(false);
  };

  const handleDeleteSubUser = async (value) => {
    const deleteId = value.id;
    // deleting sub user from databse
    const res = await userInstance.post('/deleteSubUser', { deleteId });
    if (res.status === 200) {
      // deleting sub user from state
      const data = subUser.filter((el) => el.id === deleteId);
      setSubUser([...data]);
      setNotifyType('success');
      setNotifyMsg('Sub User Deleted Successfully');
    }
  };

  const getData = async () => {
    const response = await userInstance.post('/getSubUser', {
      affiliateId: userId,
    });
    if (response.status === 200) {
      setSubUser(response.data.subUser);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Toaster notifyType={notifyType} notifyMsg={notifyMsg} close={close} />
      {subUser.length ? (
        <Wrapper>
          <div className="team-page">
            <div className="page-header">
              <h1>
                <PartitionOutlined />
                {' '}
                Team
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
                      <th />
                    </tr>
                  </thead>

                  <tbody>
                    {subUser.map((el, i) => (
                      <tr key={i}>
                        <td>
                          <div className="team-info">
                            <div className="team-pic">
                              <img src={team} alt="team" />
                            </div>
                            <div className="team-title">
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
                          <div className="team-action">
                            <FormOutlined
                              onClick={() => showEditSubUser(el, i)}
                            />
                            <DeleteOutlined
                              onClick={() => handleDeleteSubUser(el, i)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
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
          <div className="add-team-page">
            <div className="add-subuser">
              <img src={subuser} alt="subuser" />
              <h4>Sub Users</h4>
              <p>Currently there are no Sub users created</p>
              {isSubUser ? (
                canWrite ? (
                  <Button type="primary" icon={<PlusOutlined />} onClick={show}>
                    Add New Sub-User
                  </Button>
                ) : (
                  <Tooltip
                    title="You are not authorize to add new sub user"
                    color="gold"
                  >
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={show}
                      disabled="true"
                    >
                      Add New Sub-User
                    </Button>
                  </Tooltip>
                )
              ) : (
                <Button type="primary" icon={<PlusOutlined />} onClick={show}>
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
    </>
  );
};

export default TeamListing;
