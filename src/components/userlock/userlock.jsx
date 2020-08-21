import React from 'react';
import { Button } from 'antd';
import {useHistory} from 'react-router-dom';
import { LockOutlined } from '@ant-design/icons';
import './userlock.css';
import { useTranslation } from 'react-i18next';

const UserLock = () => {
  const history = useHistory();
  const { t } = useTranslation();
  return (
    <div className="user-lock">
      <div className="user-lock-content">
        <LockOutlined />
        <p>{t('userlock.label1')}</p>
        <Button onClick={history.push('/billinginformation')}>{t('userlock.label2')}</Button>
      </div>
    </div>
  );
};

export default UserLock;
