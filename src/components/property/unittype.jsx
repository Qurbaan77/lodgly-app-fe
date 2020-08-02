import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Helmet from 'react-helmet';
import './property.css';
import {
  Button, Tooltip, Modal, Empty,
} from 'antd';
import {
  HomeOutlined,
  PlusOutlined,
  DeleteOutlined,
  FormOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import Wrapper from '../wrapper';
import favicon from '../../assets/images/logo-mobile.png';
import { userInstance } from '../../axios/axiosconfig';
import DeletePopup from './deletepopup';

const UnitType = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [showPanel, setShowPanel] = useState(true);
  const [empty, setEmpty] = useState(true);
  const [unittypeData, setUnittypeData] = useState([]);
  const [currUnittype, setCurrUnittype] = useState(0);
  const [name, setName] = useState();
  const [editId, setEditId] = useState(null);
  const history = useHistory();

  const isSubUser = localStorage.getItem('isSubUser') || false;
  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [{ propertiesWrite, userId }] = userCred || [{}];
  const canWrite = propertiesWrite;
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
    if (response.data.code === 200) {
      setEditId(null);
      setShowPanel(true);
      getData();
    }
  };

  const edit = (unittypeId) => {
    localStorage.setItem('unittypeId', unittypeId);
    history.push('/addunittype');
  };

  const editName = (unittypeId) => {
    setEditId(unittypeId);
  };

  const getData = async () => {
    const values = {
      propertyId: localStorage.getItem('propertyId'),
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
  };

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
  }, []);

  const enableButton = (
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={() => setShowPanel(false)}
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
      <div className="unit-type">
        <div className="page-header">
          <h1>
            <HomeOutlined />
            {' '}
            {t('unittype.heading')}
          </h1>
          {btn2}
        </div>
        <div className="panel-box units editunit" hidden={showPanel}>
          <div className="group-name">
            <input
              type="text"
              name="name"
              placeholder={t('unittype.title3')}
              onChange={onChange}
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
        {unittypeData.length ? (
          <div className="panel-container">
            {unittypeData.map((el, i) => (
              <div
                className={
                  editId === i
                    ? 'panel-box units editunitname'
                    : 'panel-box units'
                }
              >
                <div className="group-name">
                  <h4
                    onClick={() => edit(el.id)}
                    hidden={editId === i}
                    role="presentation"
                    aria-hidden="true"
                  >
                    {el.unitTypeName}
                  </h4>
                  <input
                    type="text"
                    name="name"
                    placeholder="Edit Unit"
                    onChange={onChange}
                    hidden={editId !== i}
                  />
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
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} hidden={empty} />
        )}
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
    </Wrapper>
  );
};

export default UnitType;
