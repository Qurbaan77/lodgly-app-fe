import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import propertyplace from '../../assets/images/property-placeholder.png';

const NoList = ({ isSubUser, canWrite }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const enableButton = (
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={() => history.push('/addproperty')}
    >
      {t('nolist.button1')}
    </Button>
  );
  const disableButton = (
    <Tooltip title={t('nolist.tooltip1')} color="gold">
      <Button
        disabled
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => history.push('/addproperty')}
      >
        {t('nolist.button1')}
      </Button>
    </Tooltip>
  );
  const btn1 = isSubUser && canWrite ? enableButton : disableButton;
  const btn2 = isSubUser ? btn1 : enableButton;
  return (
    <div className="add-team-page">
      <div className="add-subuser">
        <img src={propertyplace} alt="subuser" />
        <h4>{t('strings.property')}</h4>
        <p>{t('nolist.heading1')}</p>
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
