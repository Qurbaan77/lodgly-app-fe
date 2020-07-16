import React, { useState } from 'react';
import { Layout } from 'antd';
import TopHeader from '../navbar/topheader/topheader';
import Sidenav from '../navbar/sidenav/sidenav';
import AlertBox from './alert';

const { Content } = Layout;

const Wrapper = (props) => {
  const [isAlertBoxCollapsed, setAlertBoxXollapsed] = useState(false);

  const handleChange = (newValue) => {
    props.onChange(newValue);
  };

  const handleAlertBox = (value) => {
    setAlertBoxXollapsed(value);
  };

  return (
    <div className="wrapper">
      <Layout>
        <Sidenav img={props.img} name={props.name} getUserInfo={props.getUserInfo} />

        <Layout className="site-layout">
          <TopHeader onChange={handleChange} fun={props.fun} />
          {
            isAlertBoxCollapsed ? '' : <AlertBox handleAlertBox={handleAlertBox} />
          }
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <div className="content">{props.children}</div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Wrapper;
