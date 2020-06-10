import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './property.css';
import {
  Form,
  Select,
  Input,
  InputNumber,
  DatePicker,
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
import DeletePopup from './deletepopup';
import queryString from 'query-string';
import { userInstance } from '../../axios/axiosconfig';
import { dbAdress } from '../../config/keys';
import GSTC from './GSTC';

const { MonthPicker, RangePicker } = DatePicker;

const AddUnitType = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [unittypeNo, setUnittypeNo] = useState(0);
  const [unitData, setUnitData] = useState([]);
  const [currentUnittype, setCurrentUnittype] = useState([]);

  const parsed = queryString.parse(window.location.search);
  const history = useHistory();

  const show = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = async (values) => {
    values.propertyId = localStorage.getItem('propertyId');
    values.unitTypeName = 'Unit Type ' + unittypeNo;
    const response = await userInstance.post('/addUnitType', values);
    if (response.data.code === 200) {
      // window.location.href = '/unittype?propertyNo=' + parsed.propertyNo;
      history.push('/unittype?propertyNo=' + parsed.propertyNo);
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
          .filter((el) => el.id == unittypeId)
          .map((filterUnittype) => setCurrentUnittype(filterUnittype));
      } else {
        setUnittypeNo(data.length + 1);
      }
    }
  };

  const addUnit = async () => {
    const values = {
      propertyId: localStorage.getItem('propertyId'),
      unittypeId: localStorage.getItem('unittypeId'),
      unitName: currentUnittype.unitTypeName,
    };
    const response = await userInstance.post('/addUnit', values);
    if (response.data.code === 200) {
      getUnitData();
    }
  };

  const getUnitData = async () => {
    const arr = [];
    const values = {
      propertyId: localStorage.getItem('propertyId'),
    };
    const response = await userInstance.post('/getUnit', values);
    const data = response.data.unitData;
    if (response.data.code === 200) {
      data.filter(el => el.unittypeId == localStorage.getItem('unittypeId')).map(filterUnit => (
        arr.push(filterUnit)
      ))
      setUnitData(arr);
    }
  };

  const config = {
    height: 300,
    list: {
      rows: {
        '1': {
          id: '1',
          label: 'Rooms to Sell',
        },
        '2': {
          id: '2',
          label: 'Price per night',
        },
        '3': {
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
        '1': {
          id: '1',
          rowId: '1',
          label: 'Item 1',
          time: {
            start: new Date().getTime(),
            end: new Date().getTime(),
          },
        },
        '2': {
          id: '2',
          rowId: '2',
          label: 'Item 2',
          time: {
            start: new Date().getTime(),
            end: new Date().getTime(),
          },
        },
        '3': {
          id: '3',
          rowId: '3',
          label: 'Item 3',
          time: {
            start: new Date().getTime(),
            end: new Date().getTime(),
          },
        },
        '4': {
          id: '4',
          rowId: '4',
          label: 'Item 4',
          time: {
            start: new Date().getTime() + 10 * 24 * 60 * 60 * 1000,
            end: new Date().getTime() + 12 * 24 * 60 * 60 * 1000,
          },
        },
        '5': {
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

  let subs = [];

  async function onState(state) {
    const unittypeId = localStorage.getItem('unittypeId');
    const values = {
      propertyId: localStorage.getItem('propertyId'),
    };
    const response = await userInstance.post('/getUnittype', values);
    const data = response.data.unittypeData;

    const [filterData] = data.filter((el) => el.id == unittypeId);
    const {
      startDay,
      endDay,
      minimumStay,
      noOfUnits,
      perNight,
      roomsToSell,
      unitTypeName,
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
      state.subscribe('config.chart.items', (items) => {
        console.log('items changed', items);
      })
    );
    subs.push(
      state.subscribe('config.list.rows', (rows) => {
        console.log('rows changed', rows);
      })
    );
  }

  useEffect(() => {
    return () => {
      subs.forEach((unsub) => unsub());
    };
  });

  useEffect(() => {
    getData();
    getUnitData();
  }, []);

  return (
    <Wrapper>
      <div className='unit-type'>
        <div className='page-header'>
          <h1>
            <HomeOutlined />{' '}
            {currentUnittype.id
              ? currentUnittype.unitTypeName
              : 'Unit type ' + unittypeNo}
          </h1>
        </div>

        <div className='panel-container'>
          <div className='unit-filter'>
            <Form form={form} onFinish={onFinish}>
              <Row style={{ alignItems: 'center' }}>
                <Col span={7}>
                  <Form.Item label='Date' name='groupname'>
                    <RangePicker />
                  </Form.Item>
                </Col>

                <Col span={9} className='d-flex'>
                  <Form.Item
                    label='Price per Night'
                    name='perNight'
                    style={{ padding: '0px 10px' }}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label='Rooms to Sell'
                    name='roomsToSell'
                    style={{ padding: '0px 10px' }}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label='Minimum Stay'
                    name='minimumStay'
                    style={{ padding: '0px 10px' }}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={8} className='d-flex update-cal'>
                  <Form.Item name='date-picker' label='DatePicker'>
                    <DatePicker />
                  </Form.Item>
                  <Button type='primary'>Update Calendar</Button>
                </Col>
              </Row>

              <div className='unittype-calendar'>
                {currentUnittype.id ? (
                  <GSTC config={config} onState={onState} />
                ) : null}
              </div>
              <Form.Item>
                <Button htmlType='submit'>Save</Button>
              </Form.Item>
            </Form>

            <div className='assign-unit'>
              <p>Assign Your Units</p>
              <span>Now add unit to unit type</span>
              <div className='panel-container'>
                {unitData.map((el, i) => {
                  return (
                    <div className='panel-box units'>
                      <div className='group-name'>
                        <h4>Unit Type</h4>
                        <span>1 unit are assigned</span>
                      </div>
                      <div className='group-action'>
                        <FormOutlined />
                        <DeleteOutlined onClick={show} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div>
                <Button onClick={() => addUnit()}>Add unit</Button>
              </div>
              <Modal
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                wrapClassName='delete-modal'
              >
                <DeletePopup />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default AddUnitType;
