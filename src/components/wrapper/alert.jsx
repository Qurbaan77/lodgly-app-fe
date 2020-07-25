import React, { useEffect, useState } from 'react';
import { Alert } from 'antd';
import { userInstance } from '../../axios/axiosconfig';

const AlertBox = () => {
  const [daysLeft, setDaysLeft] = useState(null);

  useEffect(() => {
    const getDays = async () => {
      const res = await userInstance.post('trialDays');
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
          <Alert
            message={`Your trial period will end in ${daysLeft} days`}
            description={<a href="/billinginformation">Subscribe</a>}
            type="warning"
            showIcon
            closable
            onClose={handleClose}
          />
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default AlertBox;
