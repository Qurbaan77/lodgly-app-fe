import React, { useEffect, useState } from 'react';
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
import GSTC from '../../../node_modules/react-gantt-schedule-timeline-calendar';

const { MonthPicker, RangePicker } = DatePicker;

const AddUnitType = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log('Form Values', values);
  };
  
  const config = {
    height: 300,
    list: {
      rows: {
        '1': {
          id: '1',
          label: 'Row 1',
        },
        '2': {
          id: '2',
          label: 'Row 2',
        },
        '3': {
          id: '3',
          label: 'Row 3',
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
            end: new Date().getTime() + 24 * 60 * 60 * 1000,
          },
        },
        '2': {
          id: '2',
          rowId: '2',
          label: 'Item 2',
          time: {
            start: new Date().getTime() + 4 * 24 * 60 * 60 * 1000,
            end: new Date().getTime() + 5 * 24 * 60 * 60 * 1000,
          },
        },
        '3': {
          id: '3',
          rowId: '2',
          label: 'Item 3',
          time: {
            start: new Date().getTime() + 6 * 24 * 60 * 60 * 1000,
            end: new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
          },
        },
        '4': {
          id: '4',
          rowId: '3',
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

  function onState(state) {
    state.update('config.chart.items.1', (item1) => {
      item1.label = 'Gantt schedule timeline calendar';
      item1.time.end = item1.time.end + 2 * 24 * 60 * 60 * 1000;
      return item1;
    });
    subs.push(
      state.subscribe('config.chart.items', (items) => {
        console.log('items changed', items);
      }),
    );
    subs.push(
      state.subscribe('config.list.rows', (rows) => {
        console.log('rows changed', rows);
      }),
    );
  }

  useEffect(() => {
    return () => {
      subs.forEach((unsub) => unsub());
    };
  });

  return (
    <Wrapper>
      <div className="unit-type">
        <div className="page-header">
          <h1>
            <HomeOutlined /> Unit Type 1
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
                  name="price"
                  style={{ padding: '0px 10px' }}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Rooms to Sell"
                  name="selll"
                  style={{ padding: '0px 10px' }}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Minimum Stay"
                  name="stay"
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
          </Form>
            <div className="unittype-calendar">
              <GSTC config={config} onState={onState} />
            </div>

            <div className="assign-unit">
              <p>Assign Your Units</p>
              <span>Now add unit to unit type</span>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default AddUnitType;
