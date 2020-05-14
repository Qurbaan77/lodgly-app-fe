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
  return (
    <div className="wrapper">
      <Layout>
        <Sidenav />

        <Layout className="site-layout">
          <TopHeader />

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
