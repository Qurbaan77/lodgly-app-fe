import React, { useEffect, useState } from "react";
import { Dropdown } from 'antd';
import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, SearchOutlined, VerticalAlignMiddleOutlined,UserOutlined, VideoCameraOutlined, UploadOutlined, } from '@ant-design/icons';




const { Header} = Layout;



const menu = (
    <Menu>
        <Menu.Item key="0">
            Property 1
        </Menu.Item>
        <Menu.Item key="1">
            Property 2
        </Menu.Item>
        <Menu.Item key="3">
            Property 3
        </Menu.Item>
    </Menu>
);

const TopHeader = () => {




    return (
        
        <Header theme="light" className="site-layout-background" style={{ padding: 0 }}>
            {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
            })} */}

            <div className="header-property">
                <div className="search-box">
                    <SearchOutlined />
                </div>
                <Dropdown overlay={menu} trigger={['click']}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    All Properties <VerticalAlignMiddleOutlined />
                    </a>
                </Dropdown>
                
            </div>
        </Header>

    );
  };
  
  export default TopHeader;