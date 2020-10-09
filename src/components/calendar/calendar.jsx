import React, {
  useEffect, useState, useCallback,
} from 'react';
import Helmet from 'react-helmet';
import './calendar.css';
import { PlusOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

import GSTC from 'gantt-schedule-timeline-calendar/dist/gstc.esm.min';
import { Plugin as ItemMovement } from 'gantt-schedule-timeline-calendar/dist/plugins/item-movement.esm.min';
import { Plugin as ItemResizing } from 'gantt-schedule-timeline-calendar/dist/plugins/item-resizing.esm.min';
import { Plugin as TimelinePointer } from 'gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min';
import { Plugin as CalendarScroll } from 'gantt-schedule-timeline-calendar/dist/plugins/calendar-scroll.esm.min';
import { Plugin as HighlightWeekends } from 'gantt-schedule-timeline-calendar/dist/plugins/highlight-weekends.esm.min';
import { Plugin as TimeBookmarks } from 'gantt-schedule-timeline-calendar/dist/plugins/time-bookmarks.esm.min';
import { Plugin as Selection } from 'gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min';
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
import CreateBookingPopup from '../booking/createbookingpopup';
// import AddReservation from './addreservation';
import GroupReservation from './groupreservation';
import Reservation from './reservation';
import favicon from '../../assets/images/logo-mobile.png';

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
  const [unitTypes, setUnitTypes] = useState([]);
  const [calendarBookingDate, setCalendarBookingDate] = useState([]);
  const [GSTCobj, setGSTCobj] = useState({});
  const [currentDate, setCurrenData] = useState(GSTC.api.date().format('MMMM YYYY'));
  const formatToId = (ids) => GSTC.api.GSTCID(ids.toString());
  const rows = {};
  const items = {};
  const rates = {};
  unitTypes.forEach((unitType) => {
    const context = 'type';
    const unitTypeId = formatToId([context, unitType.id]);

    rates[unitTypeId] = unitType.rates.data;

    rows[unitTypeId] = {
      id: unitTypeId,
      label: ({ vido: { html } }) => unitType.name.filter((e) => e.lang === 'en').map((name) => html`<strong>${name.name}</strong>`),
      meta: {
        id: unitType.id,
        context,
      },
      expanded: true,
      height: 26,
      classNames: [`gstc__list-column-row--${context}`],
    };

    ['Price per night', 'Minimum stay'].forEach((label, index) => {
      const context = 'rate';
      const rateId = formatToId([context, unitTypeId, index + 1]);

      rows[rateId] = {
        id: rateId,
        meta: {
          id: index + 1,
          context,
        },
        parentId: unitTypeId,
        label,
        height: 26,
        classNames: [`gstc__list-column-row--${context}`],
      };
    });

    unitType.units.data.forEach((unit) => {
      const context = 'unit';
      const unitId = formatToId([context, unit.id]);

      unit.bookings.data.forEach((booking) => {
        const bookingId = formatToId(['booking', booking.id]);

        items[bookingId] = {
          id: bookingId,
          top: 4,
          label: ({ vido: { html } }) => html`<strong>${booking.guestName}</strong> - ${booking.price}`,
          rowId: unitId,
          height: 26,
          time: {
            start: booking.from,
            end: booking.to,
          },
          style: {
            background: unit.color,
          },
        };
      });

      rows[unitId] = {
        id: unitId,
        meta: {
          id: unit.id,
          context,
        },
        parentId: unitTypeId,
        label: unit.name,
        classNames: [`gstc__list-column-row--${context}`],
      };
    });
  });

  const bookmarks = {
    now: {
      time: GSTC.api.date().valueOf(),
      color: '#3498DB',
      label: 'Now',
    },
  };

  const config = {
    licenseKey:
        '====BEGIN LICENSE KEY====\noddF5NdcBlSfkABvo+pwAz232z2xS7joDn3BeGFpJ3XfrMRM45zs/s520icFTHUdv3nNBI5u6zPiurB4hDDXxAnRSvkCJIeSYq9Ta/+mzLuC0/jqmxPEs4bWavgrS6oYya854uwx9OY11Reevs2EGcNZr+wMezDTYtMCgg4S3YysSzzXcCWhP7hS6tMEQk7/e5tyNV+4ja+Gj83fGp/3p0svtGEvvGCN3RPR423jzhCUY9vChapm747ZqrSKq4CMcMO1W7JRimrLelafp6u0IAulqtvs5Tc8CriBVD7p5onyfsNnfUrlo2kJ7TUGqXmG7OhX1GU6TVAVpSdVj79L7Q==||U2FsdGVkX18e5jL65t6rCn7qJVQcyScpf+pTL+NW9wufZD5VNylnAj2uFj80jSK8eoj5dcshslkzshDkemWkwovgjx7VTLUIWb0nBolCm/PKd9/nqQ4alhyDt5G/MFrSzJNJUY25kIZlraYY3oKlSHkQLS8kv/EaTE5n8E67yw+W9fPSlffrBKh+t4fYmfQ+\ngDJ616Dy5YW3MZWfRD7wnMtjhB9gJJA+omJ7GTf9q6/NIlgGxPAjDH0f9+1Zm0jjcSfrMS7q8Ekq1AmYxrbX6J89o466APwxA6lv+oZdR0IOf/tunEhvyFwf2E1NC9ZNKnuC13xszHACnFKVTqE6K9MagYqqIiMJugAWpSptZQLZohSQZarm019iLqLCy9GvgCwj0Q552fA1iExlzD6wu6Up/PPJcUJwHrGrH96j5mBAzhEIj2Maos32LxD2secJAbVfZuJEQ+wl1OE4zopO5ut+fV7s5Uwsob5V+nFwG2gMC3gGu71J+UZIs2WTQ9Gs4wl77eNYsD5rH5wkUOIwMw==\n====END LICENSE KEY====',
    plugins: [
      HighlightWeekends(),
      TimelinePointer(),
      Selection({
        items: true,
        showOverlay: false,
        onSelected: (selected) => {
          setCalendarBookingDate(selected);
          return selected;
        },
        // events: {
        //   onEnd: (selected, last) => {
        //     console.log('onSelect', { selected, last });
        //     setCalendarBookingDate(selected);
        //     return last;
        //   },
        // },
      }),
      ItemResizing(),
      ItemMovement(),
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
      rows,
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
              content: ({ vido: { html } }) => html`<div class="gstc__list-column-header--search">
                  Select unit types
                </div>`,
            },
          },
        },
      },
    },
    chart: {
      item: {
        height: 50,
      },
      items,
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

                if (rates[row.parentId]) {
                  const unitTypeRates = rates[row.parentId].find(
                    ({ date }) => date >= time.leftGlobal && date <= time.rightGlobal,
                  );

                  if (unitTypeRates) {
                    switch (row.meta.id) {
                      default: break;
                      case 1:
                        cellValue = unitTypeRates.pricePerNight;
                        break;
                      case 2:
                        cellValue = unitTypeRates.minStay;
                        break;
                    }
                  }
                }

                return html`<div
                  class="gstc__chart-timeline-grid-row-cell--content"
                  @click=${() => onCellClick(row, time)}
                >
                  ${cellValue}
                </div>`;
              } if (row && row.meta && row.meta.context === 'type') {
                // show how many events are in Unit Types
                let count = 0;
                if (items.length > 0) {
                  items.forEach((itemId) => {
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
                  });
                }

                return html` <div
                  class="gstc__chart-timeline-grid-row-cell--content"
                >
                  ${count}
                </div>`;
              }
              return undefined;
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

  function onLoad(gstc) {
    setGSTCobj(gstc);
    if (JSON.stringify(rows) !== '{}') {
      subs.push(
        gstc.state.subscribe('config.chart.items', (items) => {
          console.log('items changed', items);
        }),
      );
      subs.push(
        gstc.state.subscribe('config.list.rows', (rows) => {
          console.log('rows changed', rows);
        }),
      );
    }
  }

  const previousMonth = () => {
    if (!GSTCobj.state) return;
    let date;
    GSTCobj.state.update('config.chart.time', (time) => {
      date = GSTC.api.date(time.from).subtract(1, 'month').startOf('day');
      setCurrenData(date.format('MMMM YYYY'));
      return {
        ...time,
        from: date.valueOf(),
        to: date.add(12, 'month').endOf('day').valueOf(),
      };
    });
    GSTCobj.api.scrollToTime(date.valueOf());
  };

  const nextMonth = () => {
    if (!GSTCobj.state) return;
    let date;
    GSTCobj.state.update('config.chart.time', (time) => {
      date = GSTC.api.date(time.from).add(1, 'month').endOf('day');
      setCurrenData(date.format('MMMM YYYY'));
      return {
        ...time,
        from: date.valueOf(),
        to: date.add(12, 'month').endOf('day').valueOf(),
      };
    });
    GSTCobj.api.scrollToTime(date.valueOf());
  };

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
    if (response.data.code === 200) {
      if (response.data.data && response.data.data.length > 0) {
        setLoading(false);
        setUnitTypes(response.data.data);
      }
    }
  }, [userId]);

  useEffect(() => {
    getData();
    getCalendarData();
    getProperty();
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
    if (response.data.code === 200) {
      setData(response.data.unittypeData);
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
          <div className="year-select">
            <Button className="year-btn" onClick={previousMonth}>❮</Button>
            <span>
              {currentDate}
            </span>
            <Button className="year-btn" onClick={nextMonth}>❯</Button>
          </div>
        </div>

        <div className="calendar-calendar">
          {JSON.stringify(rows) !== '{}' ? (
            <GSTCWrapper config={config} onLoad={onLoad} />
          )
            : (
              <></>
            )}
          {/* <GSTCWrapper config={config} onLoad={onLoad} /> */}
        </div>

        {/* <div className="calendar-calendar">
            <GSTCWrapperV2 />
        </div> */}

        {/* <AddReservation
          title={t('addreservation.heading34')}
          visible={visible}
          setVisible={setVisible}
          onOk={handleOk}
          close={handleCancel}
          wrapClassName="create-booking-modal"
          getData={getData}
          calendarBookingDate={calendarBookingDate}
          setCalendarBookingDate={setCalendarBookingDate}
        /> */}

        <CreateBookingPopup
          visible={visible}
          setVisible={setVisible}
          handleCancel={handleCancel}
          handleOk={handleOk}
          close={handleCancel}
          wrapClassName="create-booking-modal"
          getData={getData}
          calendarBookingDate={calendarBookingDate}
          setCalendarBookingDate={setCalendarBookingDate}
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

        <Reservation
          calendarBookingDate={calendarBookingDate}
        />
      </div>
    </Wrapper>
  );
};

export default Calendar;
