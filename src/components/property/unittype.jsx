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
  CloseCircleOutlined,
  CheckCircleOutlined,
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
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [showPanel, setShowPanel] = useState(true);
  const [empty, setEmpty] = useState(true);
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

  const onFinish = async (values) => {
    values.propertyId = localStorage.getItem('propertyId');
    const response = await userInstance.post('/addUnitType', values);
    if (response.data.code === 200) {
      setShowPanel(true);
      getData();
    }
  }
  const edit = (unittypeId) => {
    localStorage.setItem('unittypeId', unittypeId);
    history.push('/addunittype');
  };

  const editName = (unittypeId) => {
    console.log('unittypeId', unittypeId)
    setShowPanel(false);
  }

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
      <div className="unit-type">
        <div className="page-header">
          <h1>
            <HomeOutlined /> Unit Type
          </h1>

          <Button type="primary" icon={<PlusOutlined />} onClick={() => setShowPanel(false)}>
            {/* <Link onClick={() => localStorage.removeItem('unittypeId')}> */}
              Add Unit Type
          </Button>
        </div>

        <div className="panel-container" hidden={showPanel}>
          <Form form={form} onFinish={onFinish}>
            <div className="panel-box units">
              <div className="group-name">
                <Form.Item name="name" style={{ padding: '0px 10px' }}>
                  <Input placeholder="Unit type Name" />
                </Form.Item>
              </div>
              <div>
              <Button onClick={() => setShowPanel(true)}>Cancel</Button>
              <Form.Item>
                <Button htmlType='submit'>Save</Button>
              </Form.Item>
              </div>
            </div>
          </Form>
        </div>

        <div className="panel-container">
          {unittypeData.map((el, i) => {
            return (
              <div className="panel-box units">
                <div className="group-name">
                  <h4 onClick={() => edit(el.id)}>{el.unitTypeName}</h4>
                  <span>1 unit are assigned</span>
                </div>
                <div className="group-action">
                  <FormOutlined onClick={() => editName(el.id)} />
                  <DeleteOutlined onClick={() => show(el.id)} />
                </div>
              </div>
            );
          })}


         <div className="panel-box units editunit">
                <div className="group-name">
                  <input type="text" placeholder="Edit Unit"/>                
                </div>
                <div className="group-action">
                  <div className="can-btn">
                    <CloseCircleOutlined /> Cancel
                  </div>
                  <div className="sav-btn">
                    <CheckCircleOutlined /> Save
                  </div>
                </div>
              </div>



        </div>
      </div>
      {/* <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} hidden={empty} /> */}
      <Modal
        visible={visible}
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

export default UnitType;
