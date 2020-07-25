import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import TopHeader from '../navbar/topheader/topheader';
import Sidenav from '../navbar/sidenav/sidenav';
import AlertBox from './alert';

const { Content } = Layout;

const Wrapper = ({
  img, name, getUserInfo, fun, children, onChange,
}) => {
  const handleChange = (newValue) => {
    onChange(newValue);
  };

  const [menutoggle, setMenuToggle] = useState(false);
  const handleMenu = (e) => {
    if (e === 'open') {
      setMenuToggle(true);
    } else if (e === 'close') {
      setMenuToggle(false);
    } else if (e === 'toggle') {
      setMenuToggle(!menutoggle);
    }
  };

  return (
    <div className={`wrapper ${menutoggle ? 'wrapper-expand' : ''}`}>
      <Layout>
        <Sidenav
          menutoggle={menutoggle}
          img={img}
          name={name}
          handleMenu={handleMenu}
          getUserInfo={getUserInfo}
        />
        <Layout className="site-layout">
          <TopHeader
            onChange={handleChange}
            fun={fun}
            setMenuToggle={setMenuToggle}
            menutoggle={menutoggle}
          />
          <AlertBox />
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <div className="content">{children}</div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

Wrapper.propTypes = {
  img: PropTypes.string,
  getUserInfo: PropTypes.func,
  name: PropTypes.string,
  fun: PropTypes.func,
  children: PropTypes.string,
  onChange: PropTypes.func,
};
Wrapper.defaultProps = {
  img: '',
  getUserInfo: () => {},
  name: '',
  fun: () => {},
  children: '',
  onChange: () => {},
};

export default Wrapper;
