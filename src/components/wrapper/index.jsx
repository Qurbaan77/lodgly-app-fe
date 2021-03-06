import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import TopHeader from '../navbar/topheader/topheader';
import Sidenav from '../navbar/sidenav/sidenav';
import AlertBox from './alert';

const { Content } = Layout;

const Wrapper = ({
  fun, children, onChange, userName, imgState, propertyImage,
}) => {
  const handleChange = (newValue) => {
    onChange(newValue);
  };

  const [menutoggle, setMenuToggle] = useState(false);
  const handleMenuSide = (e) => {
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
      <AlertBox />
      <Layout>
        <Sidenav
          userName={userName}
          imgState={imgState}
          propertyImage={propertyImage}
          menutoggle={menutoggle}
          handleMenuSide={handleMenuSide}
        />
        <Layout className="site-layout">
          <TopHeader
            onChange={handleChange}
            fun={fun}
            setMenuToggle={setMenuToggle}
            menutoggle={menutoggle}
          />
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
  imgState: PropTypes.string,
  propertyImage: PropTypes.string,
  // getUserInfo: PropTypes.func,
  userName: PropTypes.string,
  fun: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
    PropTypes.func,
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
    PropTypes.symbol,
    PropTypes.node,
    PropTypes.element,
    PropTypes.elementType,
  ]),
  onChange: PropTypes.func,
};
Wrapper.defaultProps = {
  imgState: '',
  propertyImage: '',
  // getUserInfo: () => {},
  userName: '',
  fun: () => {},
  children: '',
  onChange: () => {},
};

export default Wrapper;
