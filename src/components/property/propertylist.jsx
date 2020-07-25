import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './property.css';
import {
  Button, Tooltip, Row, Col,
} from 'antd';
import { HomeOutlined, PlusOutlined } from '@ant-design/icons';
import Wrapper from '../wrapper';
import property1 from '../../assets/images/property-1.png';

import { userInstance } from '../../axios/axiosconfig';

const PropertyList = () => {
  const [propertyData, setPropertyData] = useState([]);
  const [topNavId, setTopNavId] = useState();
  const history = useHistory();
  const isSubUser = localStorage.getItem('isSubUser') || false;
  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [{ propertiesWrite, userId }] = userCred || [{}];
  const canWrite = propertiesWrite;

  useEffect(() => {
    setTopNavId(localStorage.getItem('topNavId'));
  }, []);

  const getData = async () => {
    const response = await userInstance.post('/fetchProperty', {
      affiliateId: userId,
    });
    const data2 = [];
    const data = response.data.propertiesData;
    data
      .filter((el) => el.id === parseInt(localStorage.getItem('topNavId'), 10))
      .forEach((filterData) => {
        data2.push(filterData);
      });
    if (response.data.code === 200) {
      setPropertyData(data2.length > 0 ? data2 : data);
    }
  };

  useEffect(() => {
    getData();
  }, [topNavId]);

  const enableButton = (
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={() => history.push('/addproperty')}
    >
      Add Property
    </Button>
  );
  const disableButton = (
    <Tooltip title="You are not authorize to create new property" color="gold">
      <Button
        disabled="true"
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => history.push('/addproperty')}
      >
        Add Property
      </Button>
    </Tooltip>
  );

  const btn1 = isSubUser && canWrite ? enableButton : disableButton;
  const btn2 = isSubUser ? btn1 : enableButton;
  return (
    <Wrapper fun={setTopNavId}>
      <div className="property-listing">
        <div className="page-header">
          <h1>All Properties</h1>
          {btn2}
        </div>

        <div className="property-list">
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32,
            }}
          >
            {propertyData.map((el) => (
              <Col className="gutter-row" span={8}>
                <div className="property">
                  <img src={el.image || property1} alt="property" />
                  <div className="property-info">
                    <h3>{el.propertyName}</h3>
                    <span>{el.created_at.split('T', 1)}</span>
                    <ul>
                      <li>
                        <HomeOutlined />
                        {' '}
                        {el.noUnitType}
                        {' '}
                        Unit Types
                      </li>
                      <li>
                        <HomeOutlined />
                        {' '}
                        {el.noUnit}
                        {' '}
                        Unit
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </Wrapper>
  );
};

export default PropertyList;
