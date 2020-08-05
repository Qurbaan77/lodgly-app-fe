import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Alert } from 'antd';
import { userInstance } from '../../axios/axiosconfig';

const AlertBox = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [daysLeft, setDaysLeft] = useState(14);
  const [hideBanner, setHideBanner] = useState(false);

  const getDays = async () => {
    const res = await userInstance.post('/trialDays');
    if (res.data.code === 400) {
      localStorage.clear();
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

  useEffect(() => {
    if (location.pathname === '/billinginformation') {
      setHideBanner(true);
    }
  }, [location]);

  const handleClose = () => {
    localStorage.setItem('collapse', 1);
  };

  const isCollapsed = localStorage.getItem('collapse') || false;
  return (
    <>
      {!isCollapsed ? (
        <div className="alert-box" hidden={hideBanner}>
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
