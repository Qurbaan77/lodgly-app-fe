import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import './property.css';
import {
  Button, Tooltip, Row, Col,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import Helmet from 'react-helmet';
import Wrapper from '../wrapper';
import property1 from '../../assets/images/placeholder.svg';
import uniticon from '../../assets/images/property-unit-icon.png';
import homeicon from '../../assets/images/property-home-icon.png';
import propertyicon from '../../assets/images/menu/property-icon.png';
import UserLock from '../userlock/userlock';
import loader from '../../assets/images/cliploader.gif';
import { propertyInstance, userInstance } from '../../axios/axiosconfig';
import NoList from './nolist';
import CreateProperty from './createProperty';

const PropertyList = () => {
  // const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const show = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const { t } = useTranslation();
  const [propertyData, setPropertyData] = useState([]);
  // const [topNavId, setTopNavId] = useState();
  const [subscribed, setSubscribed] = useState(true);
  const [OnTrial, setOnTrial] = useState(true);
  const [daysLeft, setDaysLeft] = useState();
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const isSubUser = localStorage.getItem('isSubUser') || false;
  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [{ propertiesWrite, userId }] = userCred || [{}];
  const canWrite = propertiesWrite;

  // useEffect(() => {
  //   setTopNavId(localStorage.getItem('topNavId'));
  // }, [topNavId]);

  // keep function reference
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
    const response = await propertyInstance.post('/fetchProperty', {
      affiliateId: userId,
    });
    // const data2 = [];
    const data = response.data.propertiesData;
    // data
    //   .filter((el) => el.id === parseInt(topNavId, 10))
    //   .forEach((filterData) => {
    //     data2.push(filterData);
    //   });
    if (response.data.code === 200) {
      setLoading(false);
      // setPropertyData(data2.length > 0 ? data2 : data);
      setPropertyData(data);
    }
    await userInstance.get('/getSubscriptionStatus');
  }, [userId]);

  // const getData = async () => {
  //   const res = await userInstance.get('/getUserSubscriptionStatus');
  //   if (res.data.code === 200) {
  //     const [{
  //       days, isOnTrial, isSubscribed,
  //     }] = res.data.userSubsDetails;
  //     setDaysLeft(parseInt(days, 10));
  //     setSubscribed(JSON.parse(isSubscribed));
  //     setOnTrial(JSON.parse(isOnTrial));
  //   }
  //   const response = await userInstance.post('/fetchProperty', {
  //     affiliateId: userId,
  //   });
  //   const data2 = [];
  //   const data = response.data.propertiesData;
  //   data
  //     .filter((el) => el.id === parseInt(localStorage.getItem('topNavId'), 10))
  //     .forEach((filterData) => {
  //       data2.push(filterData);
  //     });
  //   if (response.data.code === 200) {
  //     setPropertyData(data2.length > 0 ? data2 : data);
  //   }
  //   await userInstance.get('/getSubscriptionStatus');
  // };

  useEffect(() => {
    getData();
  }, [getData]);

  const handlePropertyClick = (id) => {
    // localStorage.setItem('propertyId', id);
    localStorage.setItem('propertyV2Id', id);
    // history.push(`/overview/?pid=${id}`);
    history.push('/overview');
  };

  // const handleSaveProperty = async () => {
  //   const payload = {
  //     propertyName: propertyName.trim(),
  //     affiliateId: userId,
  //   };
  //   const res = await userInstance.post('/addProperty', {
  //     affiliateId: userId,
  //   });
  //   if (res.data.code === 200) {
  //     localStorage.setItem('propertyV2Id', res.data.savedData);
  //     localStorage.setItem('unitTypeV2Id', res.data.unitTypeV2Id);
  //     history.push('/overview');
  //   }
  // };

  // const onFinish = async (values) => {
  //   const copyValues = values;
  //   copyValues.name = values.name.trim();
  //   copyValues.affiliateId = userId;
  //   const response = await propertyInstance.post('/addProperty', copyValues);
  //   if (response.data.code === 200) {
  //     localStorage.setItem('propertyV2Id', response.data.savedData);
  //     localStorage.setItem('unitTypeV2Id', response.data.unitTypeV2Id);
  //     history.push('/overview');
  //   }
  // };

  const enableButton = (
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={() => show()}
    >
      {t('propertylist.addbtn')}
    </Button>
  );
  const disableButton = (
    <Tooltip title={t('propertylist.heading1')} color="gold">
      <Button
        disabled="true"
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => history.push('/addproperty')}
      >
        {t('propertylist.addbtn')}
      </Button>
    </Tooltip>
  );

  const btn1 = isSubUser && canWrite ? enableButton : disableButton;
  const btn2 = isSubUser ? btn1 : enableButton;

  const trial = OnTrial && daysLeft !== 0;
  const hasAccess = trial || subscribed;

  if (loading) {
    return (
      <Wrapper>
        <div className="loader">
          <div className="loader-box">
            <img src={loader} alt="loader" />
          </div>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <Helmet>
        <body className="property-page-view" />
      </Helmet>
      {
        hasAccess ? (
          <div className="property-listing">
            <div className="page-header" hidden={!(propertyData.length > 0)}>
              <h1>
                <img src={propertyicon} alt="Property" />
                {' '}
                {t('propertylist.heading')}
              </h1>
              {btn2}
            </div>

            <div className="property-list">

              {propertyData && propertyData.length > 0 ? (
                propertyData.map((el) => (
                  <div className="property" onClick={() => handlePropertyClick(el.id)} role="presentation">
                    <div className="property-img-box">
                      <img src={el.image || property1} alt="property" />
                    </div>
                    <div className="property-info">
                      <h3>{el.unitTypeName}</h3>
                      <span>{el.created_at.split('T', 1)}</span>
                      <ul>
                        <li hidden>
                          <img src={uniticon} alt="Unit" />
                          {' '}
                          {el.noUnitType}
                          {' '}
                          {t('strings.unit_t')}
                        </li>
                        <li>
                          <img src={homeicon} alt="Unit" />
                          {' '}
                          {el.noUnit}
                          {' '}
                          {t('strings.unit')}
                        </li>
                      </ul>
                    </div>
                  </div>
                ))
              ) : (
                <Row
                  gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                  }}
                >
                  <Col span={24}>
                    <NoList isSubUser={isSubUser} canWrite={canWrite} show={show} />
                  </Col>
                </Row>
              )}

            </div>
          </div>
        ) : (
          <UserLock />
        )
      }

      <CreateProperty visible={visible} onCancel={handleCancel} />
      {/* <Modal
        visible={visible}
        onCancel={handleCancel}
        wrapClassName="add-property-popup"
      >

        <div className="add-property-popup-content">
          <Form form={form} onFinish={onFinish}>
            <img src={property1} alt="property" />
            <h3>Add a new property</h3>
            <p>You are starting the process to create a new property</p>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please enter property name!',
                  whitespace: true,
                },
              ]}
            >
              <Input
                placeholder="Property Name"
              />
            </Form.Item>
            <div className="property-btns">
              <Button onClick={handleCancel} className="border-btn">Cancel</Button>
              <Button type="primary" htmlType="submit">Save</Button>
            </div>
          </Form>
        </div>
      </Modal> */}

    </Wrapper>
  );
};

export default PropertyList;
