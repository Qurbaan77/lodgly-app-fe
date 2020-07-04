import React, { useEffect, useState } from 'react';
import { Dropdown, Input } from 'antd';
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
import Form from 'antd/lib/form/Form';

const { Header } = Layout;

const TopHeader = (props) => {
  const [propertyData, setPropertyData] = useState([]);
  const [propertyName, setPropertyName] = useState();
  const [menu, setMenu] = useState();

  const [{ userId }] = JSON.parse(localStorage.getItem('userCred')) || [{}];

  useEffect(() => {
    async function getData() {
      const response = await userInstance.post('/fetchProperty', { affiliateId: userId });
      const data = response.data.propertiesData;
      if (response.data.code === 200) {
        setPropertyData(data);
      }
    }

    getData();
  }, []);

  const onChange = (value, name) => {
    localStorage.setItem('topNavId', value);
    setPropertyName(name);
    props.fun(value)
    // props.onChange(value)
  };

  const fun = () => {
    props.fun();
    localStorage.removeItem('topNavId');
    setPropertyName()
  }

  const fun1 = (e) => {
    let menu = '';
    e.preventDefault();
    menu = (
      <Menu>
        {propertyData.map((el, i) => {
          return (
            <Menu.Item
              key={el.id}
              onClick={() => onChange(el.id, el.propertyName)}
            >
              {el.propertyName}
            </Menu.Item>
          );
        })}
        <Menu.Item onClick={() =>fun()}>All Properties</Menu.Item>
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
            {propertyName ? propertyName : 'Select Property'}{' '}
            <VerticalAlignMiddleOutlined />
          </a>
        </Dropdown>
      </div>
    </Header>
  );
};

export default TopHeader;
