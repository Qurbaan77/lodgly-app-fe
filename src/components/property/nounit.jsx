import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import nounit from '../../assets/images/no-unit.png';

const NoUnit = () => {
  const { t } = useTranslation();

  return (
    <div className="add-team-page">
      <div className="add-subuser">
        <img src={nounit} alt="nounit" />
        <h4>{t('nounit.heading')}</h4>
        <p>{t('nounit.text')}</p>
        <Button
        type="primary"
        icon={<PlusOutlined />}
        >
        {t('nounit.button')}
        </Button>
      </div>
    </div>
  );
};

export default NoUnit;
