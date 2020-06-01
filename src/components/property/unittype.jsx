import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './property.css';
import {
  Form,
  Select,
  Input,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  PlusOutlined,
  SearchOutlined,
  VerticalAlignMiddleOutlined,
  DeleteOutlined,
  FormOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import Wrapper from '../wrapper';
import { Collapse } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { userInstance } from '../../axios/axiosconfig';
import DeletePopup from './deletepopup';
import queryString from 'query-string';

const UnitType = () => {
  const [visible, setVisible] = useState(false);
  const [unittypeData, setUnittypeData] = useState([]);
  const [currProperty, setCurrProperty] = useState(0);
  const [currUnittype, setCurrUnittype] = useState(0);
  const history = useHistory();

  const show = (unittypeId) => {
    setVisible(true);
    setCurrUnittype(unittypeId);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const edit = (unittypeId) => {
    console.log('unittypeId', unittypeId)
    window.location.href = '/addunittype?uniitypeId=' + unittypeId;
    // history.push('/addunittype?uniitypeId=' + unittypeId);
  }

  const remove = async () => {
    const values = {
      id: currUnittype,
    }
    const response = await userInstance.post('/deleteUnitType', values);
    if(response.data.code === 200) {
      setVisible(false);
    }
  }

  useEffect(() => {
    async function getData() {
      const parsed = queryString.parse(window.location.search);
      const values = {
        propertyNo: parsed.propertyNo,
      };
      setCurrProperty(parsed.propertyNo);
      const response = await userInstance.post('/getUnittype', values);
      const data = response.data.unittypeData;
      if (response.data.code === 200) {
        setUnittypeData(data);
      }
    }

    getData();
  }, [unittypeData]);

  return (
    <Wrapper>
      <div className="unit-type">
        <div className="page-header">
          <h1>
            <HomeOutlined /> Unit Type
          </h1>

          <Button type="primary" icon={<PlusOutlined />}>
            <Link to={'/addunittype?propertyNo=' + currProperty}>
              Add Unit Type
            </Link>
          </Button>
        </div>

        <div className="panel-container">
          {unittypeData.map((el, i) => {
            return (
              <div className="panel-box units">
                <div className="group-name">
                  <h4>Unit Type</h4>
                  <span>1 unit are assigned</span>
                </div>
                <div className="group-action">
                  <FormOutlined onClick={() => edit(el.id)}/>
                  <DeleteOutlined onClick={() => show(el.id)} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        wrapClassName="delete-modal"
      >
        <DeletePopup dataObject={() => remove()} cancel={() => handleCancel()}/>
      </Modal>
    </Wrapper>
  );
};

export default UnitType;
