import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Alert } from 'antd';
import { userInstance } from '../../axios/axiosconfig';

const AlertBox = () => {
  const { t } = useTranslation();
  const [daysLeft, setDaysLeft] = useState(14);

  const getDays = async () => {
    const res = await userInstance.post('trialDays');
    if (res.data.code === 400) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      window.location.reload();
    }
    if (!JSON.parse(res.data.isOnTrial)) {
      localStorage.setItem('collapse', 1);
    }
    setDaysLeft(res.data.remainingDays);
  };
  useEffect(() => {
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
            message={`${t('propertylist.alert')} ${daysLeft} ${t(
              'strings.days',
            )}`}
            description={(
              <Link to="/billinginformation">
                {t('propertylist.link-heading')}
              </Link>
            )}
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
