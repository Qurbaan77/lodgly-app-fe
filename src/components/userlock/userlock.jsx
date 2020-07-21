import React from 'react';
import { Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import './userlock.css';

const UserLock = () => (
  <div className="user-lock">

    <div className="user-lock-content">
      <LockOutlined />
      <p>You have no active subscription</p>
      <Button>Activate subscription</Button>
    </div>

  </div>
);

export default UserLock;
