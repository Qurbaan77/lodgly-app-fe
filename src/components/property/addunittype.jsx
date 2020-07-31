import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { useHistory } from 'react-router-dom';
import './property.css';
import {
  Form, Input, DatePicker, Button, Row, Col,
  Modal,
  Tooltip,
} from 'antd';
import {
  HomeOutlined,
  DeleteOutlined,
  FormOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import Wrapper from '../wrapper';
import favicon from '../../assets/images/logo-mobile.png';
import DeletePopup from './deletepopup';
import { userInstance } from '../../axios/axiosconfig';
import GSTC from './GSTC';

const { RangePicker } = DatePicker;

const AddUnitType = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [unittypeNo, setUnittypeNo] = useState(0);
  const [unitData, setUnitData] = useState([]);
  const [currentUnittype, setCurrentUnittype] = useState([]);
  const [curUnit, setCurUnit] = useState(0);
  const [showPanel, setShowPanel] = useState(true);
  const [name, setName] = useState();
  const [editId, setEditId] = useState(null);
  const [totalUnit, setTotalUnit] = useState();
  const [isOnTrial, setIsOnTrial] = useState();
  const [subscribedUnits, setSubscribedUnits] = useState();
  const history = useHistory();

  const [{ userId }] = JSON.parse(localStorage.getItem('userCred')) || [{}];

  const show = (unitId) => {
    setVisible(true);
    setCurUnit(unitId);
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

  const onFinish = async (values) => {
    values.id = localStorage.getItem('unittypeId');
    values.propertyId = localStorage.getItem('propertyId');
    values.unitTypeName = `Unit Type ${unittypeNo}`;
    values.affiliateId = userId;
    const response = await userInstance.post('/addUnitType', values);
    if (response.data.code === 200) {
      history.push('/unittype');
    }
  };

  const onUnitSave = async (id) => {
    const values = {
      unitName: name,
      propertyId: localStorage.getItem('propertyId'),
      unittypeId: localStorage.getItem('unittypeId'),
      id,
      affiliateId: userId,
    };
    const response = await userInstance.post('/addUnit', values);
    if (response.data.code === 200) {
      setEditId(null);
      setShowPanel(true);
      getUnitData();
    }
  };

  const getData = async () => {
    const unittypeId = localStorage.getItem('unittypeId');
    const values = {
      propertyId: localStorage.getItem('propertyId'),
    };
    const response = await userInstance.post('/getUnittype', values);
    const data = response.data.unittypeData;

    if (response.data.code === 200) {
      if (unittypeId) {
        data
          .filter((el) => el.id === parseInt(unittypeId, 10))
          .map((filterUnittype) => setCurrentUnittype(filterUnittype));
      } else {
        setUnittypeNo(data.length + 1);
      }
    }
  };

  const editName = (unitId) => {
    setEditId(unitId);
  };

  const getUnitData = async () => {
    const arr = [];
    const values = {
      propertyId: localStorage.getItem('propertyId'),
    };
    const response = await userInstance.post('/getUnit', values);
    console.log(response);
    const { data } = response;
    console.log(data);
    if (response.data.code === 200) {
      data.unitData
        .filter((el) => el.unittypeId === parseInt(localStorage.getItem('unittypeId'), 10))
        .map((filterUnit) => arr.push(filterUnit));
      setUnitData(arr);
      setTotalUnit(data.unitData.length);
      setSubscribedUnits(data.units);
      setIsOnTrial(data.isOnTrial);
    }
  };

  const remove = async () => {
    const values = {
      id: curUnit,
    };
    const response = await userInstance.post('/deleteUnit', values);
    if (response.data.code === 200) {
      setVisible(false);
      getUnitData();
    }
  };

  const config = {
    height: 300,
    list: {
      rows: {
        1: {
          id: '1',
          label: 'Rooms to Sell',
        },
        2: {
          id: '2',
          label: 'Price per night',
        },
        3: {
          id: '3',
          label: 'Minimum stay',
        },
      },
      columns: {
        data: {
          id: {
            id: 'id',
            data: 'id',
            width: 50,
            header: {
              content: 'ID',
            },
          },
          label: {
            id: 'label',
            data: 'label',
            width: 200,
            header: {
              content: 'Label',
            },
          },
        },
      },
    },
    chart: {
      items: {
        1: {
          id: '1',
          rowId: '1',
          label: 'Item 1',
          time: {
            start: new Date().getTime(),
            end: new Date().getTime(),
          },
        },
        2: {
          id: '2',
          rowId: '2',
          label: 'Item 2',
          time: {
            start: new Date().getTime(),
            end: new Date().getTime(),
          },
        },
        3: {
          id: '3',
          rowId: '3',
          label: 'Item 3',
          time: {
            start: new Date().getTime(),
            end: new Date().getTime(),
          },
        },
        4: {
          id: '4',
          rowId: '4',
          label: 'Item 4',
          time: {
            start: new Date().getTime() + 10 * 24 * 60 * 60 * 1000,
            end: new Date().getTime() + 12 * 24 * 60 * 60 * 1000,
          },
        },
        5: {
          id: '5',
          rowId: '4',
          label: 'Item 5',
          time: {
            start: new Date().getTime() + 12 * 24 * 60 * 60 * 1000,
            end: new Date().getTime() + 14 * 24 * 60 * 60 * 1000,
          },
        },
      },
    },
  };

  const subs = [];

  async function onState(state) {
    const unittypeId = localStorage.getItem('unittypeId');
    const values = {
      propertyId: localStorage.getItem('propertyId'),
    };
    const response = await userInstance.post('/getUnittype', values);
    const data = response.data.unittypeData;

    const [filterData] = data.filter((el) => el.id === parseInt(unittypeId, 10));
    const {
      startDay, endDay, minimumStay, perNight, roomsToSell,
    } = filterData;
    //
    state.update('config.chart.items.1', (item1) => {
      item1.label = roomsToSell;
      item1.time.start = new Date(startDay).getTime();
      item1.time.end = new Date(endDay).getTime();
      return item1;
    });
    state.update('config.chart.items.2', (item2) => {
      item2.label = perNight;
      item2.time.start = new Date(startDay).getTime();
      item2.time.end = new Date(endDay).getTime();
      return item2;
    });
    state.update('config.chart.items.3', (item3) => {
      item3.label = minimumStay;
      item3.time.start = new Date(startDay).getTime();
      item3.time.end = new Date(endDay).getTime();
      return item3;
    });
    subs.push(
      state.subscribe('config.chart.items', () => {
      }),
    );
    subs.push(
      state.subscribe('config.list.rows', () => {
      }),
    );
  }

  useEffect(() => () => {
    subs.forEach((unsub) => unsub());
  });

  useEffect(() => {
    getData();
    getUnitData();
  }, []);

  const isLimitReached = totalUnit + 1 > subscribedUnits;
  const normalSaveUnitBtn = (
    <Button onClick={() => setShowPanel(false)}>Add unit</Button>
  );
  const disbledSaveUnitBtn = (
    <Tooltip title="You are not allowed to create more units, Please upgrade your plan" color="gold">
      <Button onClick={() => setShowPanel(false)} disabled={isLimitReached}>Add unit</Button>
    </Tooltip>
  );
  const btn = isLimitReached ? disbledSaveUnitBtn : normalSaveUnitBtn;
  return (
    <Wrapper>
      <Helmet>
        <link rel="icon" href={favicon} />
        <title>Lodgly - Comprehensive Vacation Rental Property Management</title>
        <meta name="description" content="Grow your Vacation Rental with Lodgly" />
      </Helmet>
      <div className="unit-type">
        <div className="page-header">
          <h1>
            <HomeOutlined />
            {' '}
            {currentUnittype.id
              ? currentUnittype.unitTypeName
              : `Unit type ${unittypeNo}`}
          </h1>
        </div>

        <div className="panel-container">
          <div className="unit-filter">
            <Form form={form} onFinish={onFinish}>
              <Row style={{ alignItems: 'center' }}>
                <Col span={7}>
                  <Form.Item label="Date" name="groupname">
                    <RangePicker />
                  </Form.Item>
                </Col>

                <Col span={9} className="d-flex">
                  <Form.Item
                    label="Price per Night"
                    name="perNight"
                    style={{ padding: '0px 10px' }}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Rooms to Sell"
                    name="roomsToSell"
                    style={{ padding: '0px 10px' }}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Minimum Stay"
                    name="minimumStay"
                    style={{ padding: '0px 10px' }}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={8} className="d-flex update-cal">
                  <Form.Item name="date-picker" label="DatePicker">
                    <DatePicker />
                  </Form.Item>
                  <Button type="primary">Update Calendar</Button>
                </Col>
              </Row>

              <div className="unittype-calendar">
                {currentUnittype.id ? (
                  <GSTC config={config} onState={onState} />
                ) : null}
              </div>
              <Form.Item>
                <Button htmlType="submit" style={{ marginTop: '20px' }}>Save</Button>
              </Form.Item>
            </Form>
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
                <div
                  className="can-btn"
                  onClick={() => setShowPanel(true)}
                  role="button"
                  aria-hidden="true"
                >
                  <CloseCircleOutlined />
                  {' '}
                  Cancel
                </div>
                <div
                  className="sav-btn"
                  onClick={() => onUnitSave()}
                  role="button"
                  aria-hidden="true"
                >
                  <CheckCircleOutlined />
                  {' '}
                  Save
                </div>
              </div>
            </div>

            <div className="assign-unit">
              <p>Assign Your Units</p>
              <span>Now add unit to unit type</span>
              <div className="panel-container">
                {unitData.map((el, i) => (
                  <div
                    className={
                        editId === i
                          ? 'panel-box units editunitname'
                          : 'panel-box units'
                      }
                  >
                    <div className="group-name">
                      <h4 hidden={editId === i}>
                        {el.unitName}
                      </h4>
                      <input
                        type="text"
                        name="name"
                        placeholder="Edit Unit"
                        onChange={onChange}
                        hidden={editId !== i}
                      />
                      <span>1 unit are assigned</span>
                    </div>

                    {editId === i ? (
                      <div className="group-action">
                        <div
                          className="can-btn"
                          onClick={() => setEditId(null)}
                          role="button"
                          aria-hidden="true"
                        >
                          <CloseCircleOutlined />
                          {' '}
                          Cancel
                        </div>
                        <div
                          className="sav-btn"
                          onClick={() => onUnitSave(el.id)}
                          role="button"
                          aria-hidden="true"
                        >
                          <CheckCircleOutlined />
                          {' '}
                          Save
                        </div>
                      </div>
                    ) : (
                      <div className="group-action">
                        <FormOutlined onClick={() => editName(i)} />
                        <DeleteOutlined onClick={() => show(el.id)} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div>
                {
                isOnTrial
                  ? <Button onClick={() => setShowPanel(false)}>Add unit</Button>
                  : btn
              }

              </div>
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
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default AddUnitType;
