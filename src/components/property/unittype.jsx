import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Helmet from 'react-helmet';
import './property.css';
import {
  Button, Tooltip, Modal, Form, Input,
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  FormOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import Wrapper from '../wrapper';
import favicon from '../../assets/images/logo-mobile.png';
import unitIcon from '../../assets/images/menu/unit-type-icon.png';
import { userInstance } from '../../axios/axiosconfig';
import DeletePopup from './deletepopup';
import UserLock from '../userlock/userlock';
import nounit from '../../assets/images/no-unit.png';

const UnitType = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [showPanel, setShowPanel] = useState(true);
  const [empty, setEmpty] = useState(true);
  const [unittypeData, setUnittypeData] = useState([]);
  const [currUnittype, setCurrUnittype] = useState(0);
  const [name, setName] = useState();
  const [editId, setEditId] = useState(null);
  const [subscribed, setSubscribed] = useState();
  const [onTrial, setOnTrial] = useState(true);
  const [daysLeft, setDaysLeft] = useState();
  const [showEdit, setShowEdit] = useState(false);
  const history = useHistory();

  const isSubUser = localStorage.getItem('isSubUser') || false;
  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [{ propertiesWrite, userId }] = userCred || [{}];
  const canWrite = propertiesWrite;

  const showUnitPanel = () => {
    setShowPanel(false);
    const input = document.querySelector('input');
    input.focus();
  };

  const show = (unittypeId) => {
    setVisible(true);
    setCurrUnittype(unittypeId);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onChange = (e) => {
    setName(e.target.value);
  };

  const onFinish = async (id) => {
      const values = {
        name,
        propertyId: localStorage.getItem('propertyId'),
        id,
        affiliateId: userId,
      };
      const response = await userInstance.post('/addUnitType', values);
      const { msg } = response.data;
      if (response.data.code === 200) {
        toast.success(msg, { containerId: 'B' });
        setEditId(null);
        setShowPanel(true);
        getData();
      } else {
        toast.error(msg, { containerId: 'B' });
        setShowPanel(true);
      }
  };

  const edit = (unittypeId) => {
    localStorage.setItem('unittypeId', unittypeId);
    history.push('/addunittype');
  };

  const editName = (unittypeId) => {
    setShowEdit(true);
    setEditId(unittypeId);
  };

  const getData = useCallback(async () => {
    const res = await userInstance.get('/getUserSubscriptionStatus');
    if (res.data.code === 200) {
      const [{
        days, isOnTrial, isSubscribed,
      }] = res.data.userSubsDetails;
      setDaysLeft(parseInt(days, 10));
      setSubscribed(JSON.parse(isSubscribed));
      setOnTrial(JSON.parse(isOnTrial));
    }
    const values = {
      propertyId: localStorage.getItem('propertyId'),
      affiliateId: userId,
    };
    const response = await userInstance.post('/getUnittype', values);
    const { unittypeData, units } = response.data;
    if (response.data.code === 200) {
      unittypeData.forEach((el) => {
        let sum = 0;
        units.forEach((ele) => {
          if (el.id === ele.unittypeId) {
            sum += 1;
          }
        });
        el.noOfUnits = sum;
      });
      setEmpty(false);
      setUnittypeData(unittypeData);
    }
  }, [userId]);

  const remove = async () => {
    const values = {
      id: currUnittype,
    };
    const response = await userInstance.post('/deleteUnitType', values);
    if (response.data.code === 200) {
      setVisible(false);
      getData();
    }
  };

  useEffect(() => {
    getData();
  }, [getData]);

  const enableButton = (
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={showUnitPanel}
    >
      {t('unittype.unitbtn')}
    </Button>
  );

  const disabledButton = (
    <Tooltip
      title={t('unittype.title1')}
      color="gold"
    >
      <Button
        disabled="true"
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setShowPanel(false)}
      >
        {t('unittype.unitbtn')}
      </Button>
    </Tooltip>
  );

  const btn1 = isSubUser && canWrite ? enableButton : disabledButton;
  const btn2 = isSubUser ? btn1 : enableButton;

  const hasAccess = onTrial && daysLeft !== 0 ? 1 : subscribed;

  const escape = (e) => {
    if (e.keyCode === 27) {
      setEditId(null);
      setShowPanel(true);
      setShowEdit(false);
    }
  };

  const checkSpace = (rule, value) => {
    if (value.replace(/\s/g, '').length === 0) {
      return Promise.reject('Name should not only contains whitespace');
    }
  }

  if (!unittypeData.length) {
    console.log('coming');
    return (
      <Wrapper>
        <div className="add-team-page">
      <div className="add-subuser">
        <img src={nounit} alt="nounit" />
        <h4>{t('nounit.heading')}</h4>
        <p>{t('nounit.text')}</p>
        {btn2}
      </div>
    </div>
      </Wrapper>
    )
  }

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
        <body className="unit-page-view" />
      </Helmet>
      {
        hasAccess
          ? (
            <>
              <div className="unit-type">
                <div className="page-header">
                  <h1>
                  <img src={unitIcon} alt="unit" />
                    {' '}
                    {t('unittype.heading')}
                  </h1>
                  {btn2}
                </div>
                {
                  !showPanel
                    ? (
                      <div className="panel-box units editunit" hidden={showPanel}>
                        <div className="group-name">
                          <Form>
                            <Form.Item
                             name="unit-type-name"
                             rules={[{ validator: checkSpace }]}
                             >
                          <Input
                            autoFocus
                            type="text"
                            id="name"
                            name="name"
                            placeholder={t('unittype.title3')}
                            onChange={onChange}
                            onPressEnter={() => onFinish()}
                            onKeyDown={escape}
                          />
                          </Form.Item>
                          </Form>
                        </div>
                        <div className="group-action">
                          <div
                            className="can-btn"
                            onClick={() => setShowPanel(true)}
                            role="button"
                            aria-hidden="true"
                          >
                            <CloseCircleOutlined />
                            {' '}
                            {t('strings.cancel')}
                          </div>
                          <div
                            disabled
                            className="sav-btn"
                            onClick={() => onFinish()}
                            role="button"
                            aria-hidden="true"
                          >
                            <CheckCircleOutlined />
                            {' '}
                            {t('strings.save')}
                          </div>
                        </div>
                      </div>
                    )
                    : ''
                }
                  <div className="panel-container">
                    {unittypeData.map((el, i) => (
                      <div
                        className={
                  editId === i
                    ? 'panel-box units editunitname'
                    : 'panel-box units'
                }
                      >
                        <div className="group-name" onClick={() => edit(el.id)} role="presentation">
                          <h4
                            hidden={editId === i}
                            role="presentation"
                            aria-hidden="true"
                          >
                            {el.unitTypeName}
                          </h4>
                          {
                            showEdit
                              ? (
                                <Input
                                  autoFocus={showEdit}
                                  type="text"
                                  name="name"
                                  placeholder="Edit Unit"
                                  onChange={onChange}
                                  onPressEnter={() => onFinish(el.id)}
                                  onKeyDown={escape}
                                  hidden={editId !== i}
                                />
                              )
                              : ''
                        }
                          <span>
                            {el.noOfUnits}
                            {' '}
                            {t('unittype.title2')}
                          </span>
                        </div>
                        {editId === i ? (
                          <div className="group-action">
                            <div
                              className="can-btn"
                              onClick={() => setEditId(null)}
                              role="button"
                              aria-hidden="true"
                            >
                              <CloseCircleOutlined />
                              {' '}
                              {t('strings.cancel')}
                            </div>
                            <div
                              className="sav-btn"
                              onClick={() => onFinish(el.id)}
                              role="button"
                              aria-hidden="true"
                            >
                              <CheckCircleOutlined />
                              {' '}
                              {t('strings.save')}
                            </div>
                          </div>
                        ) : (
                          <div className="group-action">
                            <FormOutlined onClick={() => editName(i)} />
                            <DeleteOutlined onClick={() => show(el.id)} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
              </div>
              {/* <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} hidden={empty} /> */}
              <Modal
                visible={visible}
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

export default UnitType;
