import React from 'react';
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

  return (
    <div className="wrapper">
      <Layout>
        <Sidenav img={img} name={name} getUserInfo={getUserInfo} />
        <Layout className="site-layout">
          <TopHeader onChange={handleChange} fun={fun} />
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
