import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
import { userInstance } from '../../axios/axiosconfig';

const AlertBox = () => {
  const [daysLeft, setDaysLeft] = useState(null);

  useEffect(() => {
    const getDays = async () => {
      const res = await userInstance.post('trialDays');
      console.log(res);
      setDaysLeft(res.data.data);
    };
    getDays();
  }, []);

  const handleClose = () => {
    localStorage.setItem('collapse', 1);
  };
  const isCollapsed = localStorage.getItem('collapse');
  return (
    <>
      {!isCollapsed ? (
        <div className="alert-box">
          <Alert message={`Your trail period will end in ${daysLeft} days`} description={<a href="/billinginformation">Subscribe</a>} type="warning" showIcon closable />
        </div>
      )
        : ''}
    </>
  );
};

export default AlertBox;