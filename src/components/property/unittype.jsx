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
  Tooltip,
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
  const [showEdit, setShowEdit] = useState(true);
  const [empty, setEmpty] = useState(true);
  const [unittypeData, setUnittypeData] = useState([]);
  const [currProperty, setCurrProperty] = useState(0);
  const [currUnittype, setCurrUnittype] = useState(0);
  const [name, setName] = useState();
  const [editId, setEditId] = useState(null);
  const history = useHistory();

  const isSubUser = localStorage.getItem('isSubUser');
  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  console.log(userCred);
  const  [{ propertiesWrite }] = userCred ? userCred : [{}];
  const canWrite = propertiesWrite;
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

  const onChange = (e) => {
    setName(e.target.value);
  };

  const onFinish = async (id) => {
    const values = {
      name: name,
      propertyId: localStorage.getItem('propertyId'),
      id: id,
    };
    const response = await userInstance.post('/addUnitType', values);
    if (response.data.code === 200) {
      setEditId(null);
      setShowPanel(true);
      getData();
    }
  };

  const edit = (unittypeId) => {
    localStorage.setItem('unittypeId', unittypeId);
    history.push('/addunittype');
  };

  const editName = (unittypeId) => {
    console.log('unittypeId', unittypeId);
    setEditId(unittypeId);
    setShowEdit(false);
  };

  const remove = async () => {
    const values = {
      id: currUnittype,
    };
    const response = await userInstance.post('/deleteUnitType', values);
    if (response.data.code === 200) {
      setVisible(false);
      getData();
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
          {
            isSubUser ? canWrite ?
            <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setShowPanel(false)}
          >
            Add Unit Type
          </Button> :
          <Tooltip title='You are not authorize to create new unit types' color='gold'>
          <Button
            disabled='true'
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setShowPanel(false)}
          >
            Add Unit Type
          </Button>
          </Tooltip> :
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setShowPanel(false)}
          >
            Add Unit Type
          </Button>
          }
          
        </div>
        <div className="panel-box units editunit" hidden={showPanel}>
          <div className="group-name">
            <input
              type="text"
              name="name"
              placeholder="Edit Unit"
              onChange={onChange}
            />
          </div>
          <div className="group-action">
            <div className="can-btn" onClick={() => setShowPanel(true)}>
              <CloseCircleOutlined /> Cancel
            </div>
            <div className="sav-btn" onClick={() => onFinish()}>
              <CheckCircleOutlined /> Save
            </div>
          </div>
        </div>
        {unittypeData.length ? (
          <div className="panel-container">
            {unittypeData.map((el, i) => {
              return (
                <div
                  className={
                    editId === i
                      ? 'panel-box units editunitname'
                      : 'panel-box units'
                  }
                >
                  <div className="group-name">
                    <h4
                      onClick={() => edit(el.id)}
                      hidden={editId === i ? true : false}
                    >
                      {el.unitTypeName}
                    </h4>
                    <input
                      type="text"
                      name="name"
                      placeholder="Edit Unit"
                      onChange={onChange}
                      hidden={editId === i ? false : true}
                    ></input>
                    <span>1 unit are assigned</span>
                  </div>
                  {editId === i ? (
                    <div className="group-action">
                      <div className="can-btn" onClick={() => setEditId(null)}>
                        <CloseCircleOutlined /> Cancel
                      </div>
                      <div className="sav-btn" onClick={() => onFinish(el.id)}>
                        <CheckCircleOutlined /> Save
                      </div>
                    </div>
                  ) : (
                    <div className="group-action">
                      <FormOutlined onClick={() => editName(i)} />
                      <DeleteOutlined onClick={() => show(el.id)} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} hidden={empty} />
        )}
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
