import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './property.css';
import { Layout, Menu, Button, Tooltip, Dropdown} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  PlusOutlined,
  SearchOutlined,
  VerticalAlignMiddleOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import Wrapper from '../wrapper';
import property1 from '../../assets/images/property-1.png';
import property2 from '../../assets/images/property-2.png';
import property3 from '../../assets/images/property-3.png';
import { Row, Col } from 'antd';
import { userInstance } from '../../axios/axiosconfig';
import Toaster from '../toaster/toaster';

const PropertyList = () => {
  const [propertyData, setPropertyData] = useState([]);
  const [topNavId, setTopNavId] = useState();
  const history = useHistory();
  const isSubUser = localStorage.getItem('isSubUser');
  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  console.log(userCred);
  const  [{ propertiesWrite }] = userCred ? userCred : [{}];
  const canWrite = propertiesWrite;

  useEffect(() => {
    setTopNavId(localStorage.getItem('topNavId'));
    console.log('Function is called')
    async function getData() {
      const response = await userInstance.post('/fetchProperty');
      const data2 = [];
      const data = response.data.propertiesData;
      data
        .filter((el) => el.id == topNavId)
        .map((filterData) => {
          data2.push(filterData);
        });
      if (response.data.code === 200) {
        setPropertyData(data2.length > 0 ? data2 : data);
      }
    }

    getData();
  }, [topNavId]);

  return (
    <Wrapper fun={setTopNavId}>
      <div className="property-listing">
        <div className="page-header">
          <h1>All Properties</h1>
          {
            isSubUser ? canWrite ? 
            <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => history.push('/addproperty')}
          >
            Add Property
          </Button> :
          <Tooltip title='You are not authorize to create new property' color='gold'>
          <Button
            disabled='true'
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => history.push('/addproperty')}
          >
            Add Property
          </Button>
          </Tooltip> :
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => history.push('/addproperty')}
          >
            Add Property
          </Button> 
          }
         
        </div>

        <div className="property-list">
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {propertyData.map((el, i) => {
              return (
                <Col className="gutter-row" span={8}>
                  <div className="property">
                    <img src={property1} alt='property'/>
                    <div className="property-info">
                      <h3>{el.propertyName}</h3>
                      <span>{el.created_at.split('T', 1)}</span>
                      <ul>
                        <li>
                          <HomeOutlined /> 20 Unit Types
                        </li>
                        <li>
                          <HomeOutlined /> 200 Unit
                        </li>
                      </ul>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </Wrapper>
  );
};

export default PropertyList;
