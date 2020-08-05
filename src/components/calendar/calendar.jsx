import React, { useEffect, useState, useCallback } from 'react';
import './calendar.css';
import { PlusOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import Wrapper from '../wrapper';
import UserLock from '../userlock/userlock';
// import GSTC from '../../../node_modules/react-gantt-schedule-timeline-calendar';
import GSTC from './GSTC';
import { userInstance } from '../../axios/axiosconfig';
import AddReservation from './addreservation';

const Calendar = () => {
  const { t } = useTranslation();
  const [propertyData, setPropertyData] = useState([]);
  const [reservationData, setReservationData] = useState([]);
  const [guestName, setGuestName] = useState('');
  const [unittypeData, setUnittypeData] = useState([]);
  const [unitData, setUnitData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [topNavId, setTopNavId] = useState(0);
  const [subscribed, setSubscribed] = useState();
  const [onTrial, setOnTrial] = useState(true);
  const [daysLeft, setDaysLeft] = useState();

  const isSubUser = localStorage.getItem('isSubUser') || false;
  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [{ calendarWrite, userId }] = userCred || [{}];
  const canWrite = calendarWrite;
  const rows = {};

  propertyData.forEach(() => {
    unittypeData.forEach((ele, j) => {
      const uttId = `utt${ele.id.toString()}`;
      if (topNavId > 0) {
        if (unittypeData[j].propertyId === topNavId) {
          rows[uttId] = {
            id: uttId,
            label: ele.unitTypeName,
            progress: 50,
            expanded: false,
          };
        }
      } else {
        rows[uttId] = {
          id: uttId,
          label: ele.unitTypeName,
          progress: 50,
          expanded: false,
        };
      }

      unitData.forEach((elem, k) => {
        const utId = `ut${elem.id.toString()}`;
        const a = `mt_1${ele.id.toString()}`;
        const b = `mt_2${ele.id.toString()}`;
        rows[a] = {
          id: a,
          label: 'Price per night',
          parentId: `utt${ele.id.toString()}`,
          progress: 50,
        };
        rows[b] = {
          id: b,
          label: 'Minimum stay',
          progress: 50,
          parentId: `utt${ele.id.toString()}`,
        };
        if (elem.unittypeId === ele.id) {
          rows[utId] = {
            id: utId,
            label: unitData[k].unitName,
            progress: 50,
            parentId: `utt${unittypeData[j].id.toString()}`,
            expanded: false,
          };
        }
      });
    });
  });

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
  reservationData.forEach((element) => {
    const id = element.id.toString();
    const startDate = new Date(
      element.startDate.split('T', 1).toString(),
    ).getTime();
    const endDate = new Date(
      element.endDate.split('T', 1).toString(),
    ).getTime();
    items[id] = {
      id,
      rowId: `ut${element.unitId.toString()}`,
      label: `${guestName} / ${element.totalAmount} EUR`,
      time: {
        start: startDate,
        end: endDate,
      },
      style: {
        background: 'blue',
      },
    };
  });

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

  const getProperty = useCallback(async () => {
    const response = await userInstance.post('/fetchProperty', {
      affiliateId: userId,
    });
    const data = response.data.propertiesData;
    if (response.data.code === 200) {
      setPropertyData(data);
    }
  }, [userId]);

  const getData = useCallback(async () => {
    const res = await userInstance.get('/getUserSubscriptionStatus');
    if (res.data.code === 200) {
      const [{
        days, isOnTrial, isSubscribed,
      }] = res.data.userSubsDetails;
      setDaysLeft(parseInt(days, 10));
      setSubscribed(JSON.parse(isSubscribed));
      setOnTrial(JSON.parse(isOnTrial));
    }
    const response = await userInstance.post('/getReservation', {
      affiliateId: userId,
    });
    const { reservationData: data } = response.data;
    if (response.data.code === 200) {
      setReservationData(data);
      if (response.data.guestData.length !== 0) {
        setGuestName(response.data.guestData[0][0].fullname);
      }
    }
  }, [userId]);

  const getCalendarData = useCallback(async () => {
    const response = await userInstance.post('/getReservationCalendarData', {
      affiliateId: userId,
    });
    const { unittypeData: data0 } = response.data;
    const { unitData: data1 } = response.data;
    if (response.data.code === 200) {
      setUnittypeData(data0);
      setUnitData(data1);
    }
  }, [userId]);

  useEffect(() => {
    getData();
    getProperty();
    getCalendarData();
  }, [getData, getProperty, getCalendarData]);

  useEffect(() => {
    subs.forEach((unsub) => unsub());
  });

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

  const btn = isSubUser && canWrite ? (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={show}>
        {t('addreservation.heading31')}
      </Button>
      <Button className="border-btn" icon={<TeamOutlined />}>
        {t('addreservation.heading32')}
      </Button>
    </>
  ) : (
    <>
      <Tooltip title={t('addreservation.heading33')} color="gold">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={show}
          disabled="true"
        >
          {t('addreservation.heading31')}
        </Button>
      </Tooltip>
      <Tooltip title={t('addreservation.heading33')} color="gold">
        <Button className="border-btn" icon={<TeamOutlined />}>
          {t('addreservation.heading32')}
        </Button>
      </Tooltip>
    </>
  );

  const hasAccess = onTrial && daysLeft !== 0 ? 1 : subscribed;

  return (

    <Wrapper fun={setTopNavId}>
      {
      hasAccess
        ? (
          <div className="calendar">
            <div className="calendar-btn">
              {isSubUser ? (
                btn
              ) : (
                <>
                  <Button type="primary" icon={<PlusOutlined />} onClick={show}>
                    {t('addreservation.heading31')}
                  </Button>
                  <Button className="border-btn" icon={<TeamOutlined />}>
                    {t('addreservation.heading32')}
                  </Button>
                </>
              )}
            </div>
            <div className="calendar-calendar">
              <GSTC config={config} onState={onState} />
            </div>

            <AddReservation
              title={t('addreservation.heading34')}
              visible={visible}
              onOk={handleOk}
              close={handleCancel}
              wrapClassName="create-booking-modal"
              getData={getData}
            />
          </div>
        )
        : <UserLock />
    }
    </Wrapper>
  );
};

export default Calendar;
