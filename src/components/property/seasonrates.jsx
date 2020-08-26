import React, { useState } from 'react';
import Helmet from 'react-helmet';
import './rates.css';
import {
  Button, Row, Col, Table, Modal,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Wrapper from '../wrapper';
import favicon from '../../assets/images/logo-mobile.png';
import Addseason from './addseason';

const SeasonRates = () => {
  const columns = [
    {
      title: 'Season',
      dataIndex: 'season',
      key: 'season',
    },
    {
      title: 'Room Type',
      dataIndex: 'room',
      key: 'room',
    },
    {
      title: 'Prices',
      dataIndex: 'prices',
      key: 'prices',
    },
    {
      title: 'Min. stay',
      dataIndex: 'stay',
      key: 'stay',
    },
    {
      title: '',
      key: 'action',
      render: () => <DeleteOutlined />,
    },
  ];

  const data = [];
  for (let i = 0; i < 10; i = +1) {
    data.push({
      key: i,
      season: `High season ${i}`,
      room: 'Booked',
      prices: '0 USD',
      stay: '1 night(s)',
    });
  }

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
        <title>
          Lodgly - Comprehensive Vacation Rental Property Management
        </title>
        <meta
          name="description"
          content="Grow your Vacation Rental with Lodgly"
        />
        <body className="season-page-view" />
      </Helmet>

      <div className="season-rates">
        <Row>
          <Col span={24}>
            <div className="season-rates-content">
              <div className="season-first-section">
                <div className="season-header">
                  <h3>SEASON RATES</h3>
                  <div className="add-season">
                    <Button onClick={show}>Add Season</Button>
                  </div>
                </div>
                <p>
                  Set different rates for specific date periods (up to 3 years
                  in advance). Your season rates will overwrite your Default
                  Rate for those periods.
                </p>

                <div className="season-table">
                  <Table columns={columns} dataSource={data} />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <Modal
        title="Add Season"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        wrapClassName="add-season-popup"
      >
        <Addseason />
      </Modal>
    </Wrapper>
  );
};

export default SeasonRates;
