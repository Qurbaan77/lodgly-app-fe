import React, { useEffect, useState, useCallback } from 'react';
import Helmet from 'react-helmet';
import './team.css';
import { toast } from 'react-toastify';
import Avatar from 'react-avatar';
import { useTranslation } from 'react-i18next';
import { Button, Tooltip } from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  FormOutlined,
  PartitionOutlined,
} from '@ant-design/icons';
import Wrapper from '../wrapper';
import SubUserPopup from './subuserpopup';
import EditSubUserPopup from './editsubuserpopup';
import subuser from '../../assets/images/subuser.jpg';
import favicon from '../../assets/images/logo-mobile.png';
import { userInstance } from '../../axios/axiosconfig';
import UserLock from '../userlock/userlock';
import DeletePopup from './deletepopup';
import loader from '../../assets/images/cliploader.gif';

const TeamListing = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [visibleSubUser, setVisibleSubUser] = useState(false);
  const [subUser, setSubUser] = useState([]);
  const [currentSubUser, setCurrentSubUser] = useState(false);
  const [subscribed, setSubscribed] = useState();
  const [onTrial, setOnTrial] = useState(true);
  const [daysLeft, setDaysLeft] = useState();
  const [visibleDeletePopup, setVisibleDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);

  const isSubUser = localStorage.getItem('isSubUser') || false;
  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [{ teamWrite: canWrite, userId, teamDelete }] = userCred || [{}];

  const show = () => {
    setVisible(true);
  };
  // const close = () => {
  //   setNotifyType('');
  // };

  const handleOk = () => {
    setVisible(false);
    setVisibleDeletePopup(true);
  };

  const handleDeleteCancel = () => {
    setVisibleDeletePopup(false);
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

  const handleDeleteSubUser = async () => {
    const payload = {
      deleteId,
    };
    // deleting sub user from databse
    const res = await userInstance.post('/deleteSubUser', payload);
    if (res.status === 200) {
      setVisibleDeletePopup(false);
      // deleting sub user from state
      // const data = subUser.filter((el) => el.id === deleteId);
      getData();
      toast.success('Successfully Deleted', { containerId: 'B' });
    } else {
      setVisibleDeletePopup(false);
      toast.error('server error please try again', { containerId: 'B' });
    }
  };

  // Resend Mail
  const resendMail = async (email, id) => {
    const res = await userInstance.post('/resend-email', { email, id });

    if (res.data.code === 200) {
      toast.success('Invitation Link Sent Successfully', { containerId: 'B' });
    } else {
      toast.error('server error please try again', { containerId: 'B' });
    }
  };

  // keep function reference
  const getData = useCallback(async () => {
    const response0 = await userInstance.get('/getUserSubscriptionStatus');
    if (response0.data.code === 200) {
      const [
        { days, isOnTrial, isSubscribed },
      ] = response0.data.userSubsDetails;
      setDaysLeft(parseInt(days, 10));
      setSubscribed(JSON.parse(isSubscribed));
      setOnTrial(JSON.parse(isOnTrial));
    }
    const response = await userInstance.post('/getSubUser', {
      affiliateId: userId,
    });

    if (response.status === 200) {
      setLoading(false);
      setSubUser(response.data.subUser);
    }
  }, [userId]);

  const showDeletePopup = (value) => {
    setVisibleDeletePopup(true);
    setDeleteId(value.id);
  };

  useEffect(() => {
    getData();
  }, [getData]);

  const enableButton = (
    <Button type="primary" icon={<PlusOutlined />} onClick={show}>
      {t('team.label1')}
    </Button>
  );
  const disabledButton = (
    <Tooltip title={t('team.tooltip')} color="gold">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={show}
        disabled="true"
      >
        {t('team.label1')}
      </Button>
    </Tooltip>
  );
  const btn1 = isSubUser && canWrite ? enableButton : disabledButton;
  const btn2 = isSubUser ? btn1 : enableButton;

  const hasAccess = onTrial && daysLeft !== 0 ? 1 : subscribed;

  if (loading) {
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
          <body className="stats-page-view" />
        </Helmet>
        <div className="loader">
          <div className="loader-box">
            <img src={loader} alt="loader" />
          </div>
        </div>
      </Wrapper>
    );
  }

  const pageContent = (
    <>
      {subUser.length ? (
        <Wrapper>
          <div className="team-page">
            <div className="page-header">
              <h1>
                <PartitionOutlined />
                {' '}
                {t('team.label2')}
              </h1>

              <Button type="primary" icon={<PlusOutlined />} onClick={show}>
                {t('team.label1')}
              </Button>
            </div>

            <div className="team-list">
              <div className="custom-table">
                <table>
                  <thead>
                    <tr>
                      <th>
                        {' '}
                        {t('team.label3')}
                      </th>
                      <th>
                        {' '}
                        {t('strings.email')}
                      </th>
                      <th>
                        {' '}
                        {t('team.label4')}
                      </th>
                      <th>
                        {' '}
                        {t('team.status')}
                      </th>
                      <th> </th>
                    </tr>
                  </thead>

                  <tbody>
                    {subUser.map((el, i) => (
                      <tr key={el.id}>
                        <td
                          onClick={() => showEditSubUser(el, i)}
                          role="presentation"
                        >
                          <div className="team-info">
                            <div className="team-pic">
                              <Avatar
                                color="#fab52c"
                                name={el.role}
                                round="50px"
                                size="50px"
                              />
                            </div>
                            <div className="team-title">
                              <h5>
                                {/* Sub User
                                {i + 1} */}
                                {/* {el.fullname} */}

                                {el.fullname ? el.fullname : 'Sub User'}
                              </h5>
                              <span>{t('team.label5')}</span>
                            </div>
                          </div>
                        </td>

                        <td>{el.email}</td>
                        <td>
                          {el.role === 'fullaccess'
                            ? 'Full Access'
                            : el.role === 'read'
                              ? 'Read'
                              : 'Write'}
                        </td>
                        <td>{el.status === 0 ? 'Pending' : 'Accepted'}</td>
                        {el.status === 0 ? (
                          <td>
                            <Button
                              type="primary"
                              onClick={() => resendMail(el.email, el.id)}
                            >
                              Resend
                            </Button>
                          </td>
                        ) : (
                          ''
                        )}
                        <td>
                          <div className="team-action">
                            <FormOutlined
                              onClick={() => showEditSubUser(el, i)}
                            />
                            <DeleteOutlined
                              hidden={isSubUser ? !teamDelete : false}
                              onClick={() => showDeletePopup(el, i)}
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
          <DeletePopup
            visible={visibleDeletePopup}
            dataObject={handleDeleteSubUser}
            cancel={handleDeleteCancel}
          />
        </Wrapper>
      ) : (
        <Wrapper>
          <div className="add-team-page">
            <div className="add-subuser">
              <img src={subuser} alt="subuser" />
              <h4>{t('team.label3')}</h4>
              <p>{t('team.label6')}</p>
              {btn2}
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
  return (
    <>
      <Helmet>
        <link rel="icon" href={favicon} />
        <title>
          Lodgly - Comprehensive Vacation Rental Property Management
        </title>
        <meta
          name="description"
          content="Grow your Vacation Rental with Lodgly"
        />
        <body className="team-page-view" />
      </Helmet>
      {hasAccess ? (
        pageContent
      ) : (
        <Wrapper>
          <UserLock />
        </Wrapper>
      )}
    </>
  );
};

export default TeamListing;
