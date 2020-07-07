import React, { useEffect, useState } from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SearchOutlined,
  VerticalAlignMiddleOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import TopHeader from '../navbar/topheader/topheader';
import Sidenav from '../navbar/sidenav/sidenav';

const { Content } = Layout;

const Wrapper = (props) => {
  const handleChange = (newValue) => {
    props.onChange(newValue);
  };

  return (
    <div className="wrapper">
      <Layout>
        <Sidenav img={props.img} getUserInfo={props.getUserInfo}/>

        <Layout className="site-layout">
          <TopHeader onChange={handleChange} fun={props.fun}/>

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
