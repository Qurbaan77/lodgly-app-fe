import React, { useEffect, useState, useCallback } from 'react';
import Helmet from 'react-helmet';
import './calendar.css';
import { PlusOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

import GSTC from 'gantt-schedule-timeline-calendar/dist/gstc.esm.min';
import { Plugin as ItemMovement } from 'gantt-schedule-timeline-calendar/dist/plugins/item-movement.esm.min';
import { Plugin as ItemResizing } from 'gantt-schedule-timeline-calendar/dist/plugins/item-resizing.esm.min';
import { Plugin as TimelinePointer } from 'gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min';
import { Plugin as Selection } from 'gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min';
import { Plugin as CalendarScroll } from 'gantt-schedule-timeline-calendar/dist/plugins/calendar-scroll.esm.min';
import { Plugin as HighlightWeekends } from 'gantt-schedule-timeline-calendar/dist/plugins/highlight-weekends.esm.min';
import { Plugin as TimeBookmarks } from 'gantt-schedule-timeline-calendar/dist/plugins/time-bookmarks.esm.min';

import Wrapper from '../wrapper';
import UserLock from '../userlock/userlock';
import CreateProperty from '../property/createProperty';
import loader from '../../assets/images/cliploader.gif';
import propertyplace from '../../assets/images/property-placeholder.png';
import GSTCWrapper from './GSTC';
import {
  userInstance,
  reservationInstance,
  propertyInstance,
} from '../../axios/axiosconfig';
import AddReservation from './addreservation';
import GroupReservation from './groupreservation';
import favicon from '../../assets/images/logo-mobile.png';
import getUnitTypes from './api.mock';
import serialize from './serializer';

const Calendar = () => {
  const { t } = useTranslation();
  const [propertyData, setPropertyData] = useState([]);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleGroupReserv, setVisibleGroupReserv] = useState(false);
  const [topNavId, setTopNavId] = useState(0);
  const [subscribed, setSubscribed] = useState();
  const [onTrial, setOnTrial] = useState(true);
  const [daysLeft, setDaysLeft] = useState();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleProperty, setVisibleProperty] = useState(false);
  const isSubUser = localStorage.getItem('isSubUser') || false;
  const userCred = JSON.parse(localStorage.getItem('subUserCred'));
  const [{ calendarWrite, userId }] = userCred || [{}];
  const canWrite = calendarWrite;
  // const rows = {};
  // const items = {};
  const [ratesData, setRatesData] = useState({});
  const [itemsData, setItemsData] = useState({});
  const [rowsData, setRowsData] = useState({});

  const { GSTCID } = GSTC.api;

  const rows = {};
  for (let i = 0; i < 5; i++) {
    const withParent = i > 0 && i % 2 === 0;
    const id = GSTCID(i);
    rows[id] = {
      id,
      label: `Lorem ipsum ${i}`,
      parentId: withParent ? GSTCID(i - 1) : undefined,
      expanded: false,
    };
  }
  const columns = {
    percent: 100,
    resizer: {
      inRealTime: false,
      dots: 0,
    },
    data: {
      [GSTCID('label')]: {
        id: GSTCID('label'),
        data: 'label',
        sortable: 'label',
        expander: true,
        isHTML: false,
        width: 200,
        header: {
          content: 'Select Unit Type',
        },
      },
    },
  };
  const bookmarks = {
    now: {
      time: GSTC.api.date().valueOf(),
      color: '#3498DB',
      label: 'Now',
    },
  };
  const config = {
    licenseKey:
      '====BEGIN LICENSE KEY====\nPSrbPlWbN+L6Q8B4bFCeEDK7VBbGc3TYF3jktFHPhMkV88gAPVJskFHl7pb74RLyOWGaVU+OPmYSObp6YGRMdp2vd5h/xw1DCliYFwvQfjGxAToTFIKZLP2DhtHb1l7M8NBrH5ddx5ObRt+BC6NG7kkkyeHgcYpl8pXDcN/7g4Bkx/ftb9U+FJmQtMabRm/hrwR/816M17Q+7z/1txlUHU1k44+bEdFRrthxUWU1qHfS1SV5mpGln45VTEXUWgFSa5rEd1OOmQlpN+iFRa9ccUx/QhigyPIDnLa67QrqwHg9QK7S0wpVmRCDTwOFUEDlxv5hQ8/B3jc99qti+AaYlw==||U2FsdGVkX1/xP3UKRdywvlLBAtCno8MP87jBvymNPreULM/q7jTnfPPRJOd8WH6MpHdxqtek3Tel3140YqKx9XemBzb3UJg/Gy5JQBQlla3KCq4lQl6Oup4HMFKTFy+n7Vzqex0DDeFEhQ+JDvNe7T4Ujc9YE8d0HdBlVMRKNvRRm3z8SVMzs0C5tXJ4C2dn\nAvm4yWPjVHzPAJgPDQwN3k07gYJ1CL0yj9zkB4+urvvyfBDat3+CM/ZrLrO4ec+ywXqD3fYTSp1RrAoyyXT0x7DXT7hRbN4OyV5u7u8CeTsFP53qXAdm5ficGxDu9ewLEPse/Qzj8LZ3aN8OwtweUpDRw/LbOeWajgeXHaWPpZ0lsEwoHmfTuyyYE7wMKgL23wDjRBVn6tcnkG5+J6KOpJtiXBbPW+o8L0wHVrCgF7qBOwC2LV/KKv+SZysKU0zfWr9fOAuNgTqxR4WRXGIXiBu30zo8qzWwKKE6QTUVV+15duG+H8d8wtkuZ4X8idGWlewE2y9afufPCxxKnQTguQ==\n====END LICENSE KEY====',
    plugins: [
      HighlightWeekends(),
      TimelinePointer(),
      Selection(),
      ItemMovement(),
      ItemResizing(),
      CalendarScroll(),
      TimeBookmarks({
        bookmarks,
      }),
    ],
    list: {
      toggle: {
        display: false,
      },
      row: {
        height: 50,
      },
      rows: rowsData,
      columns: {
        percent: 100,
        resizer: {
          inRealTime: false,
          dots: 0,
        },
        data: {
          label: {
            id: 'label',
            data: 'label',
            expander: true,
            width: 160,
            minWidth: 120,
            header: {
              content: 'Select unit types',
            },
          },
        },
      },
    },
    chart: {
      item: {
        height: 50,
      },
      items: itemsData,
      time: {
        from: GSTC.api
          .date()
          .startOf('month')
          .valueOf(),
        to: GSTC.api
          .date()
          .add(2, 'months')
          .endOf('month')
          .valueOf(),
        zoom: 21,
      },
      grid: {
        cell: {
          onCreate: [
            ({ time, row, vido: { html } }) => {
              if (row.meta && row.meta.context === 'rate') {
                const onCellClick = (row, time) => {
                  alert(
                    `Cell for row ${
                      GSTC.api.sourceID(row.id)
                    } ${
                      time.leftGlobalDate.format('YYYY-MM-DD')
                    } clicked!`,
                  );
                };

                let cellValue = '-';

                if (ratesData[row.parentId]) {
                  const unitTypeRates = ratesData[row.parentId].find(
                    ({ date }) => date >= time.leftGlobal && date <= time.rightGlobal,
                  );

                  if (unitTypeRates) {
                    switch (row.meta.id) {
                      case 1:
                        cellValue = unitTypeRates.pricePerNight;
                        break;
                      case 2:
                        cellValue = unitTypeRates.minStay;
                        break;
                      default:
                    }
                  }
                }

                return html`
                  <div
                    class="gstc__chart-timeline-grid-row-cell--content"
                    @click=${() => onCellClick(row, time)}
                  >
                    ${cellValue}
                  </div>
                `;
              } if (row && row.meta && row.meta.context === 'type') {
                // show how many events are in Unit Types

                const items = itemsData;

                let count = 0;
                for (const itemId in items) {
                  const item = items[itemId];

                  if (row.$data.children.includes(item.rowId)) {
                    if (
                      (item.time.start >= time.leftGlobal
                        && item.time.start <= time.rightGlobal)
                      || (item.time.end >= time.leftGlobal
                        && item.time.end <= time.rightGlobal)
                      || (item.time.start <= time.leftGlobal
                        && item.time.end >= time.rightGlobal)
                    ) {
                      count = +1;
                    }
                  }
                }

                return html`
                  <div class="gstc__chart-timeline-grid-row-cell--content">
                    ${count}
                  </div>
                `;
              }
            },
          ],
        },
      },
    },
    scroll: {
      vertical: { precise: false },
    },
  };

  const subs = [];
  useEffect(() => {
    subs.forEach((unsub) => unsub());
  });

  const getProperty = useCallback(async () => {
    const response = await userInstance.post('/fetchProperty', {
      affiliateId: userId,
    });
    const data2 = [];
    const data = response.data.propertiesData;
    data
      .filter((el) => el.id === parseInt(topNavId, 10))
      .forEach((filterData) => {
        data2.push(filterData);
      });
    if (response.data.code === 200) {
      // setLoading(false);
      setPropertyData(data2.length > 0 ? data2 : data);
    }
  }, [userId, topNavId]);

  const getData = useCallback(async () => {
    const res = await userInstance.get('/getUserSubscriptionStatus');
    if (res.data.code === 200) {
      const [{ days, isOnTrial, isSubscribed }] = res.data.userSubsDetails;
      setDaysLeft(parseInt(days, 10));
      setSubscribed(JSON.parse(isSubscribed));
      setOnTrial(JSON.parse(isOnTrial));
      setLoading(false);
    }
  }, []);

  const getCalendarData = useCallback(async () => {
    const response = await reservationInstance.post(
      '/getReservationCalendarData',
      {
        affiliateId: userId,
      },
    );
    const [rows, rates, items] = await getUnitTypes().then(serialize);
    setRowsData(rows);
    setRatesData(rates);
    setItemsData(items);

    if (response.data.code === 200) {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    getData();
    getProperty();
    getCalendarData();
  }, [getData, getProperty, getCalendarData]);

  const show = () => {
    setVisible(true);
  };

  const showGropuRes = () => {
    setVisibleGroupReserv(true);
  };

  const handleOk = () => {
    setVisible(false);
    setVisibleGroupReserv(false);
  };

  const handleCancel = () => {
    setVisible(false);
    setVisibleGroupReserv(false);
  };

  const closeCreateProperty = () => {
    setVisibleProperty(false);
  };

  function onState(state) {
    state.subscribe('config.list.rows', (rows) => {
      console.log('[DEBUG] rows changed', rows);
    });

    state.subscribe(
      'config.chart.items.:id',
      (bulk, eventInfo) => {
        if (eventInfo.type === 'update' && eventInfo.params.id) {
          const itemId = eventInfo.params.id;
          console.log(
            `[DEBUG] item ${itemId} changed`,
            state.get(`config.chart.items.${itemId}`),
          );
        }
      },
      { bulk: true },
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

  const enableButton = (
    <Button
      className="border-btn"
      icon={<TeamOutlined />}
      onClick={showGropuRes}
    >
      {t('addreservation.heading32')}
    </Button>
  );
  const disabledButton = (
    <Tooltip title={t('groupreservation.heading1')} color="gold">
      <Button className="border-btn nopadding" icon={<TeamOutlined />} disabled>
        {t('addreservation.heading32')}
      </Button>
    </Tooltip>
  );

  const getUserInfo = async () => {
    const response = await userInstance.post('/getuserData');
    const data = response.data.userData;
    if (data.length > 0) {
      setUserData(data);
    }
  };

  const availableUnits = useCallback(async () => {
    const values = {
      propertyId: topNavId,
      affiliateId: userId,
    };
    const response = await propertyInstance.post('/getUnittype', values);
    console.log(response.data.unittypeData);
    // const { unittypeData } = response.data;
    if (response.data.code === 200) {
      // response.data.unittypeData.forEach((element) => {
      //   setData(JSON.parse(element.unitsData) || []);
      // });
      setData(response.data.unittypeData);
      // unittypeData.forEach((el) => {
      //   let sum = 0;
      //   const arr = [];
      //   units.forEach((ele) => {
      //     if (el.id === ele.unittypeId) {
      //       sum += 1;
      //       arr.push(ele.id);
      //     }
      //   });
      //   el.noOfUnits = sum;
      //   el.units = arr;
      // });
      // setData(JSON.parse(unittypeData[0].unitsData));
    }
  }, [topNavId, userId]);

  useEffect(() => {
    setTopNavId(localStorage.getItem('topNavId'));
    getUserInfo();
    availableUnits();
  }, [topNavId, availableUnits]);

  const hasAccess = onTrial && daysLeft !== 0 ? 1 : subscribed;

  if (loading) {
    return (
      <Wrapper>
        <Helmet>
          <link rel="icon" href={favicon} />
          <title>
            Lodgly - Comprehensive Vacation Rental Property Management
          </title>
          <meta
            name="description"
            content="Grow your Vacation Rental with Lodgly"
          />
          <body className="calendar-page-view" />
        </Helmet>
        <div className="loader">
          <div className="loader-box">
            <img src={loader} alt="loader" />
          </div>
        </div>
      </Wrapper>
    );
  }

  if (!hasAccess) {
    return (
      <Wrapper>
        <UserLock />
      </Wrapper>
    );
  }

  if (propertyData && propertyData.length < 1) {
    return (
      <Wrapper>
        <Helmet>
          <link rel="icon" href={favicon} />
          <title>
            Lodgly - Comprehensive Vacation Rental Property Management
          </title>
          <meta
            name="description"
            content="Grow your Vacation Rental with Lodgly"
          />
          <body className="calendar-page-view" />
        </Helmet>
        <div className="add-team-page">
          <div className="add-subuser">
            <img src={propertyplace} alt="subuser" />
            <h4>{t('strings.property')}</h4>
            <p>{t('nolist.heading1')}</p>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setVisibleProperty(true)}
            >
              {t('nolist.button1')}
            </Button>
          </div>
        </div>
        <CreateProperty
          visible={visibleProperty}
          onCancel={closeCreateProperty}
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper fun={setTopNavId}>
      <Helmet>
        <link rel="icon" href={favicon} />
        <title>
          Lodgly - Comprehensive Vacation Rental Property Management
        </title>
        <meta
          name="description"
          content="Grow your Vacation Rental with Lodgly"
        />
        <body className="calendar-page-view" />
      </Helmet>
      <div className="calendar">
        <div className="calendar-btn">
          {isSubUser ? (
            btn
          ) : (
            <>
              <Button type="primary" icon={<PlusOutlined />} onClick={show}>
                {t('addreservation.heading31')}
              </Button>
              {topNavId ? enableButton : disabledButton}
            </>
          )}
        </div>

        <div className="calendar-calendar">
          <GSTCWrapper config={config} onState={onState} />
        </div>

        <AddReservation
          title={t('addreservation.heading34')}
          visible={visible}
          onOk={handleOk}
          close={handleCancel}
          wrapClassName="create-booking-modal"
          getData={getData}
        />

        <GroupReservation
          title={t('calendarpop.heading4')}
          visible={visibleGroupReserv}
          onOk={handleOk}
          close={handleCancel}
          userData={userData}
          data={data}
          getData={getData}
        />
      </div>
    </Wrapper>
  );
};

export default Calendar;
