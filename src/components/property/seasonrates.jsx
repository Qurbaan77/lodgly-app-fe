import React, { useEffect, useState, useCallback } from 'react';
import Helmet from 'react-helmet';
import { useHistory } from 'react-router-dom';
import './rates.css';
import {
  Button, Row, Col, Table, Modal,
} from 'antd';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { propertyInstance } from '../../axios/axiosconfig';
import Wrapper from '../wrapper';
import favicon from '../../assets/images/logo-mobile.png';
import Addseason from './addseason';
import DeletePopup from './deletepopup';

const SeasonRates = () => {
  const history = useHistory();
  const columns = [
    {
      title: 'Season',
      dataIndex: 'seasonRateName',
      key: 'seasonRateName',
    },
    {
      title: 'Room Type',
      // dataIndex: 'room',
      // key: '',
    },
    {
      title: 'Prices',
      dataIndex: 'price_per_night',
      key: 'price_per_night',
    },
    {
      title: 'Min. stay',
      dataIndex: 'minimum_stay',
      key: 'minimum_stay',
    },
    {
      title: '',
      key: 'action',
      // render: () => <DeleteOutlined />,
      render: (text, record) => (
        <div className="service-margin">
          <div onClick={() => edit(record.id)} role="presentation">
            Edit
          </div>
          <div
            // hidden={isSubUser ? !propertiesDelete : false}
            onClick={() => delRow(record.id)}
            role="presentation"
          >
            Delete
          </div>
        </div>
      ),
    },
  ];

  const delRow = (id) => {
    setVisibiltyOFDelete(true);
    setSeasonRateId(id);
  };

  const edit = (id) => {
    history.push(`/createseasonrates?seasonRateId=${id}`);
  };

  const [visible, setVisible] = useState(false);
  const [visibiltyOFDelete, setVisibiltyOFDelete] = useState(false);
  const [seasonRateId, setSeasonRateId] = useState(0);
  const [seasonRatesData, setSeasonRatesData] = useState([]);
  const [showTable, setShowTable] = useState(true);
  const { t } = useTranslation();

  const show = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisibiltyOFDelete(false);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisibiltyOFDelete(false);
    setVisible(false);
  };

  const remove = async () => {
    const values = {
      id: seasonRateId,
    };
    const response = await propertyInstance.post('/deleteSeasonRate', values);
    if (response.data.code === 200) {
      setVisibiltyOFDelete(false);
      getData();
      toast.success('Successfully deleted Season', { containerId: 'B' });
    } else {
      toast.error('Server error please try again', { containerId: 'B' });
    }
  };

  const getData = useCallback(async () => {
    const values = {
      unitTypeId: localStorage.getItem('propertyV2Id'),
    };
    const response = await propertyInstance.post('/getSeasonRates', values);
    if (response.data.code === 200) {
      if (response.data.seasonRateData.length > 0) {
        setShowTable(false);
        setSeasonRatesData(response.data.seasonRateData);
      }
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

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
                  <h3>{t('seasonrates.heading1')}</h3>
                  <div className="add-season">
                    <Button onClick={show}>{t('seasonrates.button1')}</Button>
                  </div>
                </div>
                <p>
                  {t('seasonrates.paragraph1')}
                  {t('seasonrates.paragraph2')}
                  {t('seasonrates.paragraph3')}
                </p>

                <div className="season-table" hidden={showTable}>
                  <Table columns={columns} dataSource={seasonRatesData} />
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
        <Addseason close={handleCancel} getData={getData} />
      </Modal>
      <Modal
        visible={visibiltyOFDelete}
        onOk={handleOk}
        onCancel={handleCancel}
        wrapClassName="delete-modal"
      >
        <DeletePopup
          dataObject={() => remove()}
          cancel={() => handleCancel()}
        />
      </Modal>
    </Wrapper>
  );
};

export default SeasonRates;
