import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Helmet from 'react-helmet';
import './property.css';
import {
  Button, Row, Col, Modal,
} from 'antd';
import Wrapper from '../wrapper';

import check from '../../assets/images/check.png';
import client1 from '../../assets/images/item-1.jpg';
import client2 from '../../assets/images/item-2.jpg';
import client3 from '../../assets/images/item-3.jpg';
import client4 from '../../assets/images/item-4.jpg';
import client5 from '../../assets/images/item-5.jpg';
import client6 from '../../assets/images/item-6.jpg';
import client7 from '../../assets/images/item-7.jpg';
import client8 from '../../assets/images/item-8.jpg';
import client9 from '../../assets/images/item-9.jpg';
import client10 from '../../assets/images/item-10.jpg';
import client11 from '../../assets/images/item-11.jpg';
import client12 from '../../assets/images/item-12.jpg';
import client13 from '../../assets/images/item-13.jpg';
import client14 from '../../assets/images/item-14.jpg';
import client15 from '../../assets/images/item-15.jpg';
import client16 from '../../assets/images/item-16.jpg';
import client17 from '../../assets/images/item-17.jpg';
import favicon from '../../assets/images/logo-mobile.png';
import channelIcon from '../../assets/images/menu/channel-icon.png';

const ChannelManager = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Wrapper>
      <Helmet>
        <link rel="icon" href={favicon} />
        <title>Lodgly - Comprehensive Vacation Rental Property Management</title>
        <meta name="description" content="Grow your Vacation Rental with Lodgly" />
        <body className="channel-page-view" />
      </Helmet>
      <div className="channel-container">
        <div className="page-header">
          <h1>
            <img src={channelIcon} alt="channel" />
            {' '}
            {t('channel.heading')}
          </h1>
        </div>

        <div className="channel-content">
          <div className="active-channel">
            <h3>{t('channel.heading1')}</h3>
            <p>
              {t('channel.para1')}
              <span>&apos;</span>
              {t('channel.para2')}
            </p>
          </div>

          <div className="channel-step">
            <div className="step-box">
              <img src={check} alt="image1" />
              <span>{t('strings.property')}</span>
            </div>

            <div className="step-box">
              <img src={check} alt="image2" />
              <span>{t('strings.unit_t')}</span>
            </div>

            <div className="step-box">
              <img src={check} alt="image3" />
              <span>{t('strings.units')}</span>
            </div>

            <div className="step-box">
              <img src={check} alt="image4" />
              <span>{t('channel.title1')}</span>
            </div>

            <div className="step-box">
              <img src={check} alt="image5" />
              <span>{t('strings.reservations')}</span>
            </div>
          </div>

          <div className="need-help">
            <p>{t('channel.para3')}</p>
            <p>{t('channel.para4')}</p>
            <Button type="primary" onClick={show}>
              {t('channel.heading1')}
            </Button>
          </div>

          <div className="active-channel">
            <h3>{t('channel.heading3')}</h3>
            <p>
              {t('channel.para5')}
              {' '}
            </p>

            <p>
              {t('channel.para6')}
              {' '}
              <span>&quot;</span>
              {t('channel.para7')}
              <span>&quot;</span>
              {' '}
              {t('channel.para8')}
            </p>
          </div>

          <div className="our-client">
            <Row gutter={[10, 10]}>
              <Col span={6}>
                <img src={client1} alt="image8" />
              </Col>
              <Col span={6}>
                <img src={client2} alt="image9" />
              </Col>
              <Col span={6}>
                <img src={client3} alt="image10" />
              </Col>
              <Col span={6}>
                <img src={client11} alt="image11" />
              </Col>
              <Col span={6}>
                <img src={client4} alt="image12" />
              </Col>
              <Col span={6}>
                <img src={client5} alt="image13" />
              </Col>
              <Col span={6}>
                <img src={client6} alt="image14" />
              </Col>
              <Col span={6}>
                <img src={client12} alt="image15" />
              </Col>
              <Col span={6}>
                <img src={client7} alt="image16" />
              </Col>
              <Col span={6}>
                <img src={client8} alt="image17" />
              </Col>
              <Col span={6}>
                <img src={client9} alt="image18" />
              </Col>
              <Col span={6}>
                <img src={client10} alt="image19" />
              </Col>
            </Row>
          </div>
          <div className="active-channel">
            <h3>
              {' '}
              {t('channel.para9')}
            </h3>
            <p>
              {t('channel.para10')}
            </p>
          </div>

          <div className="our-client">
            <Row gutter={[10, 10]}>
              <Col span={6}>
                <img src={client13} alt="image20" />
              </Col>
              <Col span={6}>
                <img src={client14} alt="image21" />
              </Col>
              <Col span={6}>
                <img src={client15} alt="image22" />
              </Col>
              <Col span={6}>
                <img src={client16} alt="image23" />
              </Col>
              <Col span={6}>
                <img src={client17} alt="image24" />
              </Col>
              <Col span={6}>
                <img src={client5} alt="image25" />
              </Col>
            </Row>
          </div>
        </div>
      </div>

      <Modal
        title={t('channel.title3')}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        wrapClassName="help-modal"
      >
        <div className="modal-body">
          <h4>
            {' '}
            {t('strings.property')}
          </h4>
          <p>
            {t('channel.para11')}
          </p>
          <p>
            {t('channel.para12')}
            {' '}
            <span>&quot;</span>
            {t('channel.para13')}
            <span>&quot;</span>
            {' '}
            {t('channel.para14')}
          </p>

          <p>
            {t('channel.para15')}
          </p>

          <h4>
            {' '}
            {t('channel.title1')}
          </h4>

          <p>
            {t('channel.para16')}
          </p>

          <h4>{t('strings.reservations')}</h4>
          <p>
            {t('channel.para17')}
          </p>
          <p>
            {t('channel.para18')}
          </p>
        </div>
      </Modal>
    </Wrapper>
  );
};

export default ChannelManager;
