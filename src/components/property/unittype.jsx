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
import { Empty } from 'antd';
import { userInstance } from '../../axios/axiosconfig';
import DeletePopup from './deletepopup';
import queryString from 'query-string';

const UnitType = () => {
  const [visible, setVisible] = useState(false);
  const [empty, setEmpty] = useState(true)
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
    localStorage.setItem('unittypeId', unittypeId);
    history.push('/addunittype');
  };

  const remove = async () => {
    const values = {
      id: currUnittype,
    };
    const response = await userInstance.post('/deleteUnitType', values);
    if (response.data.code === 200) {
      setVisible(false);
      getData();
      console.log('ok');
      console.log(visible);
    }
  };

  async function getData() {
    const parsed = queryString.parse(window.location.search);
    const values = {
      propertyId: localStorage.getItem('propertyId'),
    };
    setCurrProperty(parsed.propertyNo);
    const response = await userInstance.post('/getUnittype', values);
    console.log(response.data);
    const data = response.data.unittypeData;
    if (response.data.code === 200) {
      setEmpty(false);
      setUnittypeData(data);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Wrapper>
      <div className='unit-type'>
        <div className='page-header'>
          <h1>
            <HomeOutlined /> Unit Type
          </h1>

          <Button type='primary' icon={<PlusOutlined />}>
            <Link
              to={'/addunittype'}
              onClick={() => localStorage.removeItem('unittypeId')}
            >
              Add Unit Type
            </Link>
          </Button>
        </div>

        <div className='panel-container'>
          {unittypeData.map((el, i) => {
            return (
              <div className='panel-box units'>
                <div className='group-name'>
                  <h4>{el.unitTypeName}</h4>
                  <span>1 unit are assigned</span>
                </div>
                <div className='group-action'>
                  <FormOutlined onClick={() => edit(el.id)} />
                  <DeleteOutlined onClick={() => show(el.id)} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} hidden={empty} />
      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        wrapClassName='delete-modal'
      >
        <DeletePopup
          dataObject={() => remove()}
          cancel={() => handleCancel()}
        />
      </Modal>
    </Wrapper>
  );
};

export default UnitType;
