import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, Redirect } from 'react-router-dom';
import { Alert } from 'antd';
import { userInstance } from '../../axios/axiosconfig';

const AlertBox = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const [daysLeft, setDaysLeft] = useState(14);
  const [hideBanner, setHideBanner] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const getDays = async () => {
    const res = await userInstance.post('/trialDays');
    if (res.data.code === 400) {
      localStorage.clear();
      setRedirect(true);
    }
    if (!res.data.isOnTrial) {
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
    const isSubUser = localStorage.getItem('isSubUser') || false;
    if (isSubUser) {
      setHideBanner(true);
    }
  }, [location]);

  const handleClose = () => {
    localStorage.setItem('collapse', 1);
  };

  const isCollapsed = localStorage.getItem('collapse') || false;

  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <>
      {!parseInt(isCollapsed, 10) ? (
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
