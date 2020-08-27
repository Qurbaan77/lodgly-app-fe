import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import noguest from '../../assets/images/guest-placeholder.png';

const NoGuest = () => (
  <div className="add-team-page">
    <div className="add-subuser">
      <img src={noguest} alt="noguest" />
      <h4>Guests</h4>
      <p>Currently there are no guests created</p>
      <Button
        type="primary"
        icon={<PlusOutlined />}
      >
        Add Guest
      </Button>
    </div>
  </div>
);

export default NoGuest;
