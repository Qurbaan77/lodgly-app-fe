import React, { useEffect, useState } from 'react';
import './calendar.css';
import { PlusOutlined, TeamOutlined } from '@ant-design/icons';
import {
  Button,
  Tooltip,
} from 'antd';
import Wrapper from '../wrapper';
// import GSTC from '../../../node_modules/react-gantt-schedule-timeline-calendar';
import GSTC from './GSTC';
import { userInstance } from '../../axios/axiosconfig';
import AddReservation from './addreservation';

const Calendar = () => {
  const [propertyData, setPropertyData] = useState([]);
  const [reservationData, setReservationData] = useState([]);
  const [guestName, setGuestName] = useState('');
  const [unittypeData, setUnittypeData] = useState([]);
  const [unitData, setUnitData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [topNavId, setTopNavId] = useState();
  // const [topNavId, setPId] = useState();
  // const handleChange = (newValue) => {
  //   setPId(newValue);
  // };
  const isSubUser = localStorage.getItem('isSubUser') || false;
  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [{ calendarWrite, userId }] = userCred || [{}];
  const canWrite = calendarWrite;
  const rows = {};
  for (let i = 0; i < propertyData.length; i = +1) {
    // const pt_id = 'pt' + propertyData[i].id.toString();
    // rows[pt_id] = {
    //   id: pt_id,
    //   label: propertyData[i].propertyName,
    //   progress: 50,
    //   expanded: false,
    // };
    for (let j = 0; j < unittypeData.length; j = +1) {
      const uttId = `utt${unittypeData[j].id.toString()}`;
      if (unittypeData[j].propertyId === topNavId) {
        rows[uttId] = {
          id: uttId,
          label: unittypeData[j].unitTypeName,
          progress: 50,
          // parentId: 'pt' + propertyData[i].id.toString(),
          expanded: false,
        };
      }
      for (let k = 0; k < unitData.length; k = +1) {
        const utId = `ut${unitData[k].id.toString()}`;
        const a = `mt_1${unittypeData[j].id.toString()}`;
        const b = `mt_2${unittypeData[j].id.toString()}`;
        rows[a] = {
          id: a,
          label: 'Price per night',
          parentId: `utt${unittypeData[j].id.toString()}`,
          progress: 50,
        };
        rows[b] = {
          id: b,
          label: 'Minimum stay',
          progress: 50,
          parentId: `utt${unittypeData[j].id.toString()}`,
        };
        if (unitData[k].unittypeId === unittypeData[j].id) {
          rows[utId] = {
            id: utId,
            label: unitData[k].unitName,
            progress: 50,
            parentId: `utt${unittypeData[j].id.toString()}`,
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
  for (let i = 0; i < reservationData.length; i = +1) {
    const id = reservationData[i].id.toString();
    const startDate = new Date(reservationData[i].startDate.split('T', 1).toString()).getTime();
    const endDate = new Date(reservationData[i].endDate.split('T', 1).toString()).getTime();
    items[id] = {
      id,
      rowId: `ut${reservationData[i].unitId.toString()}`,
      label: `${guestName} / ${reservationData[i].totalAmount} EUR`,
      time: {
        start: startDate,
        end: endDate,
      },
      style: {
        background: 'blue',
      },
    };
  }

  const config = {
    height: 650,
    list: {
      rows,
      columns,
    },

    chart: {
      items,
    },
  };

  const subs = [];

  const getProperty = async () => {
    const response = await userInstance.post('/fetchProperty', { affiliateId: userId });
    const data = response.data.propertiesData;
    if (response.data.code === 200) {
      setPropertyData(data);
    }
  };

  const getData = async () => {
    const response = await userInstance.post('/getReservation', { affiliateId: userId });
    const { reservationData: data } = response.data;
    if (response.data.code === 200) {
      setReservationData(data);
      if (response.data.guestData.length !== 0) {
        setGuestName(response.data.guestData[0][0].fullname);
      }
    }
  };

  const getCalendarData = async () => {
    const response = await userInstance.post('/getReservationCalendarData', { affiliateId: userId });
    const { unittypeData: data0 } = response.data;
    const { unitData: data1 } = response.data;
    if (response.data.code === 200) {
      setUnittypeData(data0);
      setUnitData(data1);
    }
  };

  useEffect(() => {
    getData();
    getProperty();
    getCalendarData();
  }, []);

  useEffect(() => {
    subs.forEach((unsub) => unsub());
  }, [topNavId]);

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
    // state.update("config.chart.items", items => {
    //   items.time.end = today.getTime() + 2 * 24 * 60 * 60 * 1000;
    //   return items;
    // });
    subs.push(
      state.subscribe('config.chart.items', () => {
        // console.log('items changed', items);
      }),
    );
    subs.push(
      state.subscribe('config.list.rows', () => {
        // console.log('rows changed', rows);
      }),
    );
  }

  const btn = isSubUser && canWrite ?
  <>
   <Button type="primary" icon={<PlusOutlined />} onClick={show}>
  Add Reservation
</Button>
<Button className="border-btn" icon={<TeamOutlined />}>
  Group Reservation
</Button>
</> : 
<>
 <Tooltip title="You are not authorize for adding reservation" color="gold">
 <Button type="primary" icon={<PlusOutlined />} onClick={show} disabled="true">
   Add Reservation
 </Button>
</Tooltip>
<Tooltip title="You are not authorize for adding reservation" color="gold">
 <Button className="border-btn" icon={<TeamOutlined />}>
   Group Reservation
 </Button>
</Tooltip>
</>
  console.log('Btn', btn)

  return (
    // <Wrapper onChange={handleChange}>
    <Wrapper fun={setTopNavId}>
      <div className="calendar">
        <div className="calendar-btn">
          { 
          isSubUser ? btn : 
          <>
          <Button type="primary" icon={<PlusOutlined />} onClick={show}>
          Add Reservation
        </Button>
        <Button className="border-btn" icon={<TeamOutlined />}>
          Group Reservation
        </Button>
        </> }

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
