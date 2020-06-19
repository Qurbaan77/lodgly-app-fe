import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './calendar.css';
import Wrapper from '../wrapper';
// import GSTC from '../../../node_modules/react-gantt-schedule-timeline-calendar';
import GSTC from './GSTC';
import { PlusOutlined, TeamOutlined } from '@ant-design/icons';
import {
  Form,
  Select,
  Input,
  InputNumber,
  Switch,
  Radio,
  Slider,
  DatePicker,
  TimePicker,
  Button,
  Modal,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
} from 'antd';
import { userInstance } from '../../axios/axiosconfig';
import AddReservation from './addreservation';

const Calendar = () => {
  const today = new Date();
  const weekFromToday = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  const [propertyData, setPropertyData] = useState([]);
  const [reservationData, setReservationData] = useState([]);
  const [guestData, setGuestData] = useState([]);
  const [unittypeData, setUnittypeData] = useState([]);
  const [unitData, setUnitData] = useState([]);
  const [visible, setVisible] = useState(false);

  const rows = {};
  for (let i = 0; i < propertyData.length; i++) {
    const pt_id = 'pt' + propertyData[i].id.toString();
    rows[pt_id] = {
      id: pt_id,
      label: propertyData[i].propertyName,
      progress: 50,
      expanded: false,
    };
    for (let j = 0; j < unittypeData.length; j++) {
      const utt_id = 'utt' + unittypeData[j].id.toString();
      if (unittypeData[j].propertyId == propertyData[i].id) {
        rows[utt_id] = {
          id: utt_id,
          label: unittypeData[j].unitTypeName,
          progress: 50,
          parentId: 'pt' + propertyData[i].id.toString(),
          expanded: false,
        };
      }
      for (let k = 0; k < unitData.length; k++) {
        const ut_id = 'ut' + unitData[k].id.toString();
        const a = 'mt_1' + unittypeData[j].id.toString();
        const b = 'mt_2' + unittypeData[j].id.toString();
        rows[a] = {
          id: a,
          label: 'Price per night',
          parentId: 'utt' + unittypeData[j].id.toString(),
          progress: 50,
        };
        rows[b] = {
          id: b,
          label: 'Minimum stay',
          progress: 50,
          parentId: 'utt' + unittypeData[j].id.toString(),
        };
        if (unitData[k].unittypeId == unittypeData[j].id) {
          rows[ut_id] = {
            id: ut_id,
            label: unitData[k].unitName,
            progress: 50,
            parentId: 'utt' + unittypeData[j].id.toString(),
            expanded: false,
          };
        }
      }
    }
  }

  const columns = {
    percent: 100,
    data: {
      id: {
        id: 'id',
        width: 100,
        expander: true,
        header: {},
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
  };

  const items = {};
  // for (let i = 0; i < reservationData.length; i++) {
  //   const id = reservationData[i].id.toString();
  //   items[id] = {
  //     id,
  //     rowId: 'ut' + reservationData[i].unitId.toString(),
  //     label: reservationData[i].unitTypeName,
  //     time: {
  //       start: reservationData[i].startDate,
  //       end: reservationData[i].endDate,
  //     },
  //     style : {
  //       background: 'blue'
  //     }
  //   };
  // }

  const config = {
    height: 500,
    list: {
      rows,
      columns,
    },

    chart: {
      items,
      time: {
        from: today.getTime(),
        period: 'hour',
        to: weekFromToday.getTime(),
      },
    },
  };

  let subs = [];

  const getProperty = async () => {
    const response = await userInstance.post('/fetchProperty');
    const data = response.data.propertiesData;
    console.log('Property', data);
    if (response.data.code === 200) {
      setPropertyData(data);
    }
  };

  const getData = async () => {
    const response = await userInstance.post('/getReservation');
    const reservationData = response.data.reservationData;
    const guestdata = response.data.guestData;
    if (response.data.code === 200) {
      setReservationData(reservationData);
      setGuestData(guestdata);
    }
  };

  const getCalendarData = async () => {
    const response = await userInstance.post('/getReservationCalendarData');
    const unittypeData = response.data.unittypeData;
    const unitData = response.data.unitData;
    console.log('unittypeData', unittypeData);
    console.log('unitData', unitData);
    if (response.data.code === 200) {
      setUnittypeData(unittypeData);
      setUnitData(unitData);
    }
  };

  useEffect(() => {
    getData();
    getProperty();
    getCalendarData();
  }, []);

  useEffect(() => {
    return () => {
      subs.forEach((unsub) => unsub());
    };
  }, []);

  const show = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  function onState(state) {
    subs.push(
      state.subscribe('config.chart.items', (items) => {
        // console.log('items changed', items);
      }),
    );
    subs.push(
      state.subscribe('config.list.rows', (rows) => {
        // console.log('rows changed', rows);
      }),
    );
  }

  return (
    <Wrapper>
      <div className="calendar">
        <div className="calendar-btn">
          <Button type="primary" icon={<PlusOutlined />} onClick={show}>
            Add Reservation
          </Button>
          <Button className="border-btn" icon={<TeamOutlined />}>
            Group Reservation
          </Button>
        </div>

        <div className="calendar-calendar">
          <GSTC config={config} onState={onState} />
        </div>

        <AddReservation
          title="Add New Reservation"
          visible={visible}
          onOk={handleOk}
          close={handleCancel}
          wrapClassName="create-booking-modal"
          getData={getData}
        />
      </div>
    </Wrapper>
  );
};

export default Calendar;
