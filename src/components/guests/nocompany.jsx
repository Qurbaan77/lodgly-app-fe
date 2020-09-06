import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import nocompany from '../../assets/images/company-placeholder.png';

const NoCompany = () => (
  <div className="add-team-page">
    <div className="add-subuser">
      <img src={nocompany} alt="noguest" />
      <h4>Companies</h4>
      <p>Currently there are no companies created</p>
      <Button
        type="primary"
        icon={<PlusOutlined />}
      >
        Add Company
      </Button>
    </div>
  </div>
);

export default NoCompany;
