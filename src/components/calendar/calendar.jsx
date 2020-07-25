import React, { useEffect, useState } from 'react';
import './calendar.css';
import { PlusOutlined, TeamOutlined } from '@ant-design/icons';
import {
  Button,
  Modal,
} from 'antd';
import Wrapper from '../wrapper';
// import GSTC from '../../../node_modules/react-gantt-schedule-timeline-calendar';
import GSTC from './GSTC';
import { userInstance } from '../../axios/axiosconfig';
import AddReservation from './addreservation';

const Calendar = () => {
  // const [propertyData, setPropertyData] = useState([]);
  // const [reservationData, setReservationData] = useState([]);
  // const [guestData, setGuestData] = useState([]);
  const [visible, setVisible] = useState(false);
  const config = {
    height: 500,
    list: {
      rows: {
        1: {
          id: '1',
          label: 'Unit Type 1',
        },
      },
      columns: {
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
            end: new Date().getTime() + 24 * 60 * 60 * 1000,
          },
        },
      },
    },
  };

  const subs = [];

  function onState(state) {
    state.update('config.chart.items.1', (item1) => {
      item1.label = 'Gantt schedule timeline calendar';
      item1.time.end = +2 * 24 * 60 * 60 * 1000;
      return item1;
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
  }, []);

  const getProperty = async () => {
    await userInstance.post('/fetchProperty');
    // const data = response.data.propertiesData;
    // if (response.data.code === 200) {
    //   setPropertyData(data);
    // }
  };

  const getData = async () => {
    await userInstance.post('/getReservation');
    // const { reservationData } = response.data;
    // const guestdata = response.data.guestData;
    // if (response.data.code === 200) {
    //   setReservationData([...reservationData]);
    //   setGuestData([...guestdata]);
    // }
  };

  const getCalendarData = async () => {
    await userInstance.post('/getReservationCalendarData');
  };

  useEffect(() => {
    getData();
    getProperty();
    getCalendarData();
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
