import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import propertyplace from '../../assets/images/property-placeholder.png';

const NoList = ({ isSubUser, canWrite }) => {
  const history = useHistory();
  const enableButton = (
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={() => history.push('/addproperty')}
    >
      Add Property
    </Button>
  );
  const disableButton = (
    <Tooltip title="You are not authorize to create new property" color="gold">
      <Button
        disabled
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => history.push('/addproperty')}
      >
        Add Property
      </Button>
    </Tooltip>
  );
  const btn1 = isSubUser && canWrite ? enableButton : disableButton;
  const btn2 = isSubUser ? btn1 : enableButton;
  return (
    <div className="add-team-page">
      <div className="add-subuser">
        <img src={propertyplace} alt="subuser" />
        <h4>Property</h4>
        <p>There is no property yet</p>
        {btn2}
      </div>
    </div>
  );
};
NoList.propTypes = {
  isSubUser: PropTypes.bool,
  canWrite: PropTypes.bool,
};
NoList.defaultProps = {
  isSubUser: false,
  canWrite: true,
};
export default NoList;
