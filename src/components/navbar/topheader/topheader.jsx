import React, { useEffect, useState } from 'react';
import { Dropdown } from 'antd';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SearchOutlined,
  VerticalAlignMiddleOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { userInstance } from '../../../axios/axiosconfig';

const { Header } = Layout;

const TopHeader = () => {
  const [propertyData, setPropertyData] = useState([]);
  const [menu, setMenu] = useState();
  //   const menu = (
  //     <Menu>
  //       <Menu.Item key="0">Property 1</Menu.Item>
  //       <Menu.Item key="1">Property 2</Menu.Item>
  //       <Menu.Item key="3">Property 3</Menu.Item>
  //     </Menu>
  //   );

  useEffect(() => {
    async function getData() {
      const response = await userInstance.post('/fetchProperty');
      const data = response.data.propertiesData;
      if (response.data.code === 200) {
        setPropertyData(data);
      }
    }

    getData();
  }, []);

  const fun1 = (e) => {
    let menu = '';
    e.preventDefault();
    menu = (
      <Menu>
        {propertyData.map((el, i) => {
          return <Menu.Item key={el.id} >{el.propertyName}</Menu.Item>;
        })}
      </Menu>
    );

    setMenu(menu);
  };

  return (
    <Header
      theme="light"
      className="site-layout-background"
      style={{ padding: 0 }}
    >
      {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
            })} */}

      <div className="header-property">
        <div className="search-box">
          <SearchOutlined />
        </div>
        <Dropdown overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" onClick={(e) => fun1(e)}>
            All Properties <VerticalAlignMiddleOutlined />
          </a>
        </Dropdown>
      </div>
    </Header>
  );
};

export default TopHeader;
