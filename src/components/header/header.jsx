import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './header.css';
import { userInstance } from '../../axios/axiosconfig';

const Header = ({ getFeature }) => {
  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [{ userId }] = userCred || [{}];
  useEffect(() => {
    const getData = async () => {
      const res = await userInstance.post('/getFeature', { affiliateId: userId });
      getFeature(res.data.featureData);
    };
    getData();
  }, [getFeature, userId]);
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
