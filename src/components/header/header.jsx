import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './header.css';
import { userInstance } from '../../axios/axiosconfig';

const Header = ({ getFeature }) => {
  useEffect(() => {
    const getData = async () => {
      const res = await userInstance.post('/getFeature');
      getFeature(res.data.featureData);
    };
    getData();
  }, [getFeature]);
  return (
    <div className="header" />
  );
};
Header.propTypes = {
  getFeature: PropTypes.func,
};
Header.defaultProps = {
  getFeature: () => {},
};
export default Header;
