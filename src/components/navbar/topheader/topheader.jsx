import React, { useEffect, useState } from 'react';
import { Dropdown, Layout, Menu } from 'antd';

import { SearchOutlined, VerticalAlignMiddleOutlined } from '@ant-design/icons';
import { userInstance } from '../../../axios/axiosconfig';

const { Header } = Layout;

const TopHeader = (props) => {
  console.log(props);
  const [propertyData, setPropertyData] = useState([]);
  const [propertyName, setPropertyName] = useState();
  const [menu, setMenu] = useState();

  const [{ userId }] = JSON.parse(localStorage.getItem('userCred')) || [{}];

  const onChange = (value, name) => {
    localStorage.setItem('topNavId', value);
    setPropertyName(name);
    props.fun(value);
    // props.onChange(value)
  };

  const fun = () => {
    props.fun();
    localStorage.removeItem('topNavId');
    setPropertyName();
  };

  const fun1 = (e) => {
    let menu1 = '';
    e.preventDefault();
    menu1 = (
      <Menu>
        {propertyData.map((el) => (
          <Menu.Item
            key={el.id}
            onClick={() => onChange(el.id, el.propertyName)}
          >
            {el.propertyName}
          </Menu.Item>
        ))}
        <Menu.Item onClick={() => fun()}>All Properties</Menu.Item>
      </Menu>
    );

    setMenu(menu1);
  };

  useEffect(() => {
    async function getData() {
      const response = await userInstance.post('/fetchProperty', {
        affiliateId: userId,
      });
      const data = response.data.propertiesData;
      if (response.data.code === 200) {
        if (localStorage.getItem('topNavId')) {
          data
            .filter(
              (el) => el.id === parseInt(localStorage.getItem('topNavId'), 10)
            )
            .map((filter) => setPropertyName(filter.propertyName));
        }
        setPropertyData(data);
      }
    }

    getData();
  }, []);

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
            {propertyName || 'Select Property'} <VerticalAlignMiddleOutlined />
          </a>
        </Dropdown>
      </div>
    </Header>
  );
};

export default TopHeader;
