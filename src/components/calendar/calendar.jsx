import React, { useEffect, useState } from 'react';
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
  const [propertyData, setPropertyData] = useState([]);
  const [reservationData, setReservationData] = useState([]);
  const [guestData, setGuestData] = useState([]);
  const [unittypeData, setUnittypeData] = useState([]);
  const [unitData, setUnitData] = useState([]);
  const [visible, setVisible] = useState(false);

  const rows = {};
  for (let i = 0; i < unittypeData.length; i++) {
    const id = unittypeData[i].id.toString();
    rows[id] = {
      id,
      label: unittypeData[i].unitTypeName,
    };
  }

  const columns = {
    data: {
      id: {
        id: 'id',
        data: 'id',
        width: 100,
        expander: true,
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
  };

  const items = {};
  for (let i = 0; i < unittypeData.length; i++) {
    const id = unittypeData[i].id.toString();
    items[id] = {
      id,
      rowId: id,
      label: unittypeData[i].unitTypeName,
      time: {
        start: unittypeData[i].startDay,
        end: unittypeData[i].endDay,
      },
    };
  }

  const config = {
    height: 500,
    list: {
      rows,
      columns,
    },

    chart: {
      items,
    },
  };

  let subs = [];

  const getProperty = async () => {
    const response = await userInstance.post('/fetchProperty');
    const data = response.data.propertiesData;
    console.log('jshfuy', data);
    if (response.data.code === 200) {
      setPropertyData(data);
    }
  };

  const getData = async () => {
    const response = await userInstance.post('/getReservation');
    const reservationData = response.data.reservationData;
    const guestdata = response.data.guestData;
    if (response.data.code === 200) {
      setReservationData([...reservationData]);
      setGuestData([...guestdata]);
    }
  };

  const getCalendarData = async () => {
    const response = await userInstance.post('/getReservationCalendarData');
    console.log('Response', response);
    const unittypeData = response.data.unittypeData;
    const unitData = response.data.unitData;
    if (response.data.code === 200) {
      setUnittypeData(unittypeData);
      setUnitData(unitData);
      // unittypeData.map((el,i) => {
      //   console.log('elemengt', el.unitTypeName)
      //   const id = el.id.toString();
      //   rows[id] = {
      //     id,
      //     label: el.unitTypeName,
      //   };
      //})
    }
  };

  useEffect(() => {
    getCalendarData();
    getData();
    getProperty();
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

        <Modal
          title="Add New Reservation"
          visible={visible}
          onOk={handleOk}
          close={handleCancel}
          wrapClassName="create-booking-modal"
          getData={getData}
        >
          <AddReservation
            title="Add New Reservation"
            visible={visible}
            onOk={handleOk}
            close={handleCancel}
            wrapClassName="create-booking-modal"
            getData={getData}
          />
        </Modal>
      </div>
    </Wrapper>
  );
};

export default Calendar;
