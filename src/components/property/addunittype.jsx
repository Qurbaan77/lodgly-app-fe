import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import './property.css';
import {
  Input,
  Button,
  Modal,
  Tooltip,
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  FormOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import Wrapper from '../wrapper';
import unitIcon from '../../assets/images/menu/unit-type-icon.png';
import favicon from '../../assets/images/logo-mobile.png';
import DeletePopup from './deletepopup';
import { userInstance } from '../../axios/axiosconfig';
import UserLock from '../userlock/userlock';

const AddUnitType = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [unittypeNo, setUnittypeNo] = useState(0);
  const [unitData, setUnitData] = useState([]);
  const [currentUnittype, setCurrentUnittype] = useState([]);
  const [curUnit, setCurUnit] = useState(0);
  const [showPanel, setShowPanel] = useState(true);
  const [name, setName] = useState();
  const [editId, setEditId] = useState(null);
  const [totalUnit, setTotalUnit] = useState();
  const [isOnTrial, setIsOnTrial] = useState();
  const [subscribedUnits, setSubscribedUnits] = useState();
  const [subscribed, setSubscribed] = useState();
  const [onTrial, setOnTrial] = useState(true);
  const [daysLeft, setDaysLeft] = useState();
  const [showEdit, setShowEdit] = useState(false);

  const [{ userId }] = JSON.parse(localStorage.getItem('userCred')) || [{}];

  const show = (unitId) => {
    setVisible(true);
    setCurUnit(unitId);
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

  // const onFinish = async (values) => {
  //   values.id = localStorage.getItem('unittypeId');
  //   values.propertyId = localStorage.getItem('propertyId');
  //   values.unitTypeName = `Unit Type ${unittypeNo}`;
  //   values.affiliateId = userId;
  //   const response = await userInstance.post('/addUnitType', values);
  //   if (response.data.code === 200) {
  //     // history.push('/unittype');
  //     getData();
  //   }
  // };

  const onUnitSave = async (id) => {
    const values = {
      unitName: name,
      propertyId: localStorage.getItem('propertyId'),
      unittypeId: localStorage.getItem('unittypeId'),
      id,
      affiliateId: userId,
    };
    const response = await userInstance.post('/addUnit', values);
    if (response.data.code === 200) {
      setEditId(null);
      setShowPanel(true);
      getUnitData();
    }
  };

  const getData = async () => {
    const res = await userInstance.get('/getUserSubscriptionStatus');
    if (res.data.code === 200) {
      const [{ days, isOnTrial, isSubscribed }] = res.data.userSubsDetails;
      setDaysLeft(parseInt(days, 10));
      setSubscribed(JSON.parse(isSubscribed));
      setOnTrial(JSON.parse(isOnTrial));
    }
    const unittypeId = localStorage.getItem('unittypeId');
    const values = {
      propertyId: localStorage.getItem('propertyId'),
    };
    const response = await userInstance.post('/getUnittype', values);
    const data = response.data.unittypeData;

    if (response.data.code === 200) {
      if (unittypeId) {
        data
          .filter((el) => el.id === parseInt(unittypeId, 10))
          .map((filterUnittype) => setCurrentUnittype(filterUnittype));
      } else {
        setUnittypeNo(data.length + 1);
      }
    }
  };

  const editName = (unitId) => {
    setShowEdit(true);
    setEditId(unitId);
  };

  const getUnitData = async () => {
    const arr = [];
    const values = {
      propertyId: localStorage.getItem('propertyId'),
    };
    const response = await userInstance.post('/getUnit', values);
    const { data } = response;
    if (response.data.code === 200) {
      data.unitData
        .filter(
          (el) => el.unittypeId === parseInt(localStorage.getItem('unittypeId'), 10),
        )
        .map((filterUnit) => arr.push(filterUnit));
      setUnitData(arr);
      setTotalUnit(data.unitData.length);
      setSubscribedUnits(data.units);
      setIsOnTrial(data.isOnTrial);
    }
  };

  const remove = async () => {
    const values = {
      id: curUnit,
    };
    const response = await userInstance.post('/deleteUnit', values);
    if (response.data.code === 200) {
      setVisible(false);
      getUnitData();
    }
  };

  useEffect(() => {
    getData();
    getUnitData();
  }, []);

  const isLimitReached = totalUnit + 1 > subscribedUnits;
  const normalSaveUnitBtn = (
    <Button onClick={() => setShowPanel(false)}>{t('addunity.button1')}</Button>
  );
  const disbledSaveUnitBtn = (
    <Tooltip title={t('addunity.tooltip')} color="gold">
      <Button onClick={() => setShowPanel(false)} disabled={isLimitReached}>
        {t('addunity.button1')}
      </Button>
    </Tooltip>
  );
  const btn = isLimitReached ? disbledSaveUnitBtn : normalSaveUnitBtn;
  const hasAccess = onTrial && daysLeft !== 0 ? 1 : subscribed;
  const escape = (e) => {
    if (e.keyCode === 27) {
      setEditId(null);
      setShowPanel(true);
      setShowEdit(false);
    }
  };
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
      {hasAccess ? (
        <>
          <div className="unit-type">
            <div className="page-header">
              <h1>
                <img src={unitIcon} alt="unit" />
                {' '}
                {currentUnittype.id
                  ? currentUnittype.unitTypeName
                  : `Unit type ${unittypeNo}`}
              </h1>
              {btn}
            </div>

            {!showPanel ? (
              <div className="panel-box units editunit" hidden={showPanel}>
                <div className="group-name">
                  <Input
                    autoFocus
                    type="text"
                    name="name"
                    placeholder={t('addunity.label4')}
                    onChange={onChange}
                    onPressEnter={() => onUnitSave()}
                    onKeyDown={escape}
                  />
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
                    className="sav-btn"
                    onClick={() => onUnitSave()}
                    role="button"
                    aria-hidden="true"
                  >
                    <CheckCircleOutlined />
                    {' '}
                    {t('strings.save')}
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}

            <div className="assign-unit">
              {/* <p>{t('addunity.para1')}</p>
                  <span>{t('addunity.para2')}</span> */}
              <div className="panel-container">
                {unitData.map((el, i) => (
                  <div
                    className={
                      editId === i
                        ? 'panel-box units editunitname'
                        : 'panel-box units'
                    }
                  >
                    <div className="group-name">
                      <h4 hidden={editId === i}>{el.unitName}</h4>
                      {showEdit ? (
                        <Input
                          autoFocus={showEdit}
                          type="text"
                          name="name"
                          placeholder="Edit Unit"
                          onChange={onChange}
                          onPressEnter={() => onUnitSave(el.id)}
                          onKeyDown={escape}
                          hidden={editId !== i}
                        />
                      ) : (
                        ''
                      )}
                      <span>{t('addunity.para3')}</span>
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
                          onClick={() => onUnitSave(el.id)}
                          role="button"
                          aria-hidden="true"
                        >
                          <CheckCircleOutlined />
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
              <div>
                {isOnTrial ? (
                  <Button
                    onClick={() => setShowPanel(false)}
                    className="add-unit-link"
                    icon={<PlusOutlined />}
                  >
                    Add unit
                  </Button>
                ) : (
                  btn
                )}
              </div>
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
            </div>
          </div>
        </>
      ) : (
        <UserLock />
      )}
    </Wrapper>
  );
};

export default AddUnitType;
