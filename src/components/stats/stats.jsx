import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';
import './stats.css';
import {
  Button,
  Tooltip,
  Row,
  Col,
} from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';
import Chart from 'react-apexcharts';
import Wrapper from '../wrapper';
import { userInstance } from '../../axios/axiosconfig';
import statsIcon from '../../assets/images/menu/stats-icon.png';
import qst from '../../assets/images/menu/qst.png';
import favicon from '../../assets/images/logo-mobile.png';
import propertyplace from '../../assets/images/property-placeholder.png';
import UserLock from '../userlock/userlock';

const Stats = () => {
  const { t } = useTranslation();

  const history = useHistory();
  const [propertyData, setPropertyData] = useState([]);

  const [topNavId, setTopNavId] = useState();
  const [subscribed, setSubscribed] = useState();
  const [onTrial, setOnTrial] = useState(true);
  const [daysLeft, setDaysLeft] = useState();
  const [accomodationHasData, setAccomodationHasData] = useState(
    'no-stats-data',
  );
  const [occupancyHasData, setOccupancyHasData] = useState('no-stats-data');
  const [reservationCountryHasData, setReservationCountryHasData] = useState(
    'no-stats-data',
  );
  const [reservationChannelHasData, setReservationChannelHasData] = useState(
    'no-stats-data',
  );
  const [paceHasData, setPaceHasData] = useState('no-stats-data');
  const userCred = JSON.parse(localStorage.getItem('subUserCred'));

  const [{ userId }] = userCred || [{}];

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
      setPropertyData(data2.length > 0 ? data2 : data);
    }
  }, [userId, topNavId]);

  const getData = async () => {
    const response0 = await userInstance.get('/getUserSubscriptionStatus');
    if (response0.data.code === 200) {
      const [
        { days, isOnTrial, isSubscribed },
      ] = response0.data.userSubsDetails;
      setDaysLeft(days);
      setSubscribed(isSubscribed);
      setOnTrial(isOnTrial);
    }
  };
  useEffect(() => {
    setTopNavId(localStorage.getItem('topNavId'));
    getData();
    getProperty();
  }, [getProperty]);

  const hasAccess = onTrial && daysLeft !== 0 ? 1 : subscribed;

  if (propertyData.length < 1) {
    return (
      <Wrapper>
        <div className="add-team-page">
          <div className="add-subuser">
            <img src={propertyplace} alt="subuser" />
            <h4>{t('strings.property')}</h4>
            <p>{t('nolist.heading1')}</p>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => history.push('/addproperty')}
            >
              {t('nolist.button1')}
            </Button>
          </div>
        </div>
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
        <body className="stats-page-view" />
      </Helmet>
      {hasAccess ? (
        <div className="stats-page">
          <div className="page-header">
            <h1>
              <img src={statsIcon} alt="statsIcon" />
              {' '}
              {t('stats.label2')}
            </h1>
          </div>

          <div className="container">
            <Row>
              <Col span={24}>
                <div className={`accomandation-chart ${accomodationHasData}`}>
                  <AccommodationChart
                    topNavId={topNavId}
                    setAccomodationHasData={setAccomodationHasData}
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <div className={`occupancy-chart ${occupancyHasData}`}>
                  <OccupancyChart
                    topNavId={topNavId}
                    setOccupancyHasData={setOccupancyHasData}
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col
                span={16}
                className="no-padding-mbl"
                style={{ paddingRight: '20px' }}
              >
                <div
                  className={`reservation-chart ${reservationCountryHasData}`}
                >
                  <ReservationCountryChart
                    setReservationCountryHasData={setReservationCountryHasData}
                  />
                </div>
              </Col>
              <Col span={8}>
                <div
                  className={`reservation-chart ${reservationChannelHasData}`}
                >
                  <ReservationChannelChart
                    setReservationChannelHasData={setReservationChannelHasData}
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <div className={`pace-chart ${paceHasData}`}>
                  <PaceChart
                    topNavId={topNavId}
                    setPaceHasData={setPaceHasData}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      ) : (
        <UserLock />
      )}
    </Wrapper>
  );
};

export default Stats;

const AccommodationChart = ({ topNavId, setAccomodationHasData }) => {
  const [currArr, setCurrArr] = useState();
  const [prevArr, setPrevArr] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function getData() {
      const values = {
        propertyId: localStorage.getItem('topNavId'),
      };
      const response = await userInstance.post('/getRevenue', values);
      const currYearSum = response.data.currYearArr.reduce((a, b) => a + b, 0);
      const prevYearSum = response.data.prevYearArr.reduce((a, b) => a + b, 0);
      if (currYearSum > 0 || prevYearSum > 0) {
        setShow(true);
        setAccomodationHasData('');
      }
      setCurrArr(response.data.currYearArr);
      setPrevArr(response.data.prevYearArr);
    }
    getData();
  }, [topNavId, setAccomodationHasData]);

  const state = {
    series: [
      {
        name: new Date().getFullYear() - 1,
        data: prevArr,
      },
      {
        name: new Date().getFullYear(),
        data: currArr,
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '25%',
          endingShape: 'rounded',
        },
      },
      legend: {
        position: 'top',
        markers: {
          strokeColor: 'transparent',
          fillColors: ['#82858C', '#FAB52C'],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      fill: {
        colors: ['#82858C', '#FAB52C'],
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
      yaxis: {
        title: {
          text: '',
        },
      },
      tooltip: {
        y: {
          formatter(val) {
            return `$ ${val} thousands`;
          },
        },
      },
    },
  };
  const { t } = useTranslation();
  return (
    <div className="chart-body">
      <h3>
        {t('stats.heading1')}
        {' '}
        <Tooltip title="This is accomodation chart" color="gold">
          <img src={qst} alt="qst" />
        </Tooltip>
      </h3>

      <div id="chart">
        <Chart
          options={state.options}
          series={state.series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

AccommodationChart.propTypes = {
  topNavId: PropTypes.number,
  setAccomodationHasData: PropTypes.string,
};
AccommodationChart.defaultProps = {
  topNavId: 0,
  setAccomodationHasData: '',
};

const OccupancyChart = ({ topNavId, setOccupancyHasData }) => {
  const [currArr, setCurrArr] = useState([]);
  const [prevArr, setPrevArr] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function getData() {
      const values = {
        propertyId: localStorage.getItem('topNavId'),
      };
      const response = await userInstance.post('/getOccupancy', values);
      const currYearSum = response.data.currYearArr.reduce((a, b) => a + b, 0);
      const prevYearSum = response.data.prevYearArr.reduce((a, b) => a + b, 0);
      if (currYearSum > 0 || prevYearSum > 0) {
        setShow(true);
        setOccupancyHasData('');
      }
      setPrevArr(response.data.prevYearArr);
      setCurrArr(response.data.currYearArr);
    }
    getData();
  }, [topNavId, setOccupancyHasData]);

  const state = {
    series: [
      {
        name: new Date().getFullYear() - 1,
        data: prevArr,
      },
      {
        name: new Date().getFullYear(),
        data: currArr,
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show,
        },
        zoom: {
          enabled: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '25%',
        },
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
      legend: {
        position: 'top',
        offsetX: 0,
        labels: {
          colors: ['#82858C', '#7FBD34'],
          useSeriesColors: false,
        },
        markers: {
          strokeColor: 'transparent',
          fillColors: ['#82858C', '#7FBD34'],
        },
      },
      fill: {
        colors: ['#82858C', '#7FBD34'],
      },
    },
  };

  return (
    <div className="chart-body">
      <h3>
        Occupancy per month
        {' '}
        <img src={qst} alt="qst" />
      </h3>

      <div id="chart">
        <Chart
          options={state.options}
          series={state.series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

OccupancyChart.propTypes = {
  topNavId: PropTypes.number,
  setOccupancyHasData: PropTypes.string,
};
OccupancyChart.defaultProps = {
  topNavId: 0,
  setOccupancyHasData: '',
};

const ReservationCountryChart = ({ setReservationCountryHasData }) => {
  const [country, setCountry] = useState([]);
  const [average, setAverage] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await userInstance.post('/getCountryReport');
      if (response.data.code === 200) {
        if (
          response.data.country.length > 0
          && response.data.average.length > 0
        ) {
          setReservationCountryHasData('');
        }
        setCountry(response.data.country);
        setAverage(response.data.average);
      }
    }
    getData();
  }, [setReservationCountryHasData]);

  const state = {
    series: [
      {
        data: average,
      },
    ],

    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      fill: {
        colors: ['#FAB52C'],
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: '10%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: country,
      },
    },
  };
  const { t } = useTranslation();
  return (
    <div className="chart-body">
      <h3>
        {t('stats.label4')}
        {' '}
        <Tooltip title="This is accomodation chart" color="gold">
          <img src={qst} alt="qst" />
        </Tooltip>
      </h3>

      <div id="chart">
        <Chart
          options={state.options}
          series={state.series}
          type="bar"
          height={300}
        />
      </div>
    </div>
  );
};

ReservationCountryChart.propTypes = {
  setReservationCountryHasData: PropTypes.string,
};
ReservationCountryChart.defaultProps = {
  setReservationCountryHasData: '',
};

const ReservationChannelChart = () => {
  const state = {
    series: [], // put data for show in statistics
    options: {
      labels: [], // put name of labels for show in statistics
      chart: {
        type: 'donut',
      },
      legend: {
        position: 'bottom',
        markers: {
          strokeColor: 'transparent',
          fillColors: ['#82858C', '#7FBD34', '#FAB52C'],
        },
      },
      fill: {
        colors: ['#82858C', '#7FBD34', '#FAB52C'],
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
              height: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  };
  const { t } = useTranslation();
  return (
    <div className="chart-body">
      <h3>
        {t('stats.label5')}
        {' '}
        <Tooltip title="This is accomodation chart" color="gold">
          <img src={qst} alt="qst" />
        </Tooltip>
      </h3>

      <div className="donut">
        <Chart
          options={state.options}
          series={state.series}
          type="donut"
          height={350}
        />
      </div>
    </div>
  );
};

const PaceChart = ({ topNavId, setPaceHasData }) => {
  const [currYear, setCurrYear] = useState();
  const [prevYear, setPrevYear] = useState();
  const [currArr, setCurrArr] = useState([]);
  const [prevArr, setPrevArr] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const values = {
      propertyId: localStorage.getItem('topNavId'),
    };
    async function getData() {
      const response = await userInstance.post('/getPace', values);
      const currYearSum = response.data.currYearArr.reduce((a, b) => a + b, 0);
      const prevYearSum = response.data.prevYearArr.reduce((a, b) => a + b, 0);
      if (currYearSum > 0 || prevYearSum > 0) {
        setShow(true);
        setPaceHasData('');
      }
      setPrevArr(response.data.prevYearArr);
      setCurrArr(response.data.currYearArr);

      setPrevYear(response.data.currYear);
      setCurrYear(response.data.prevYear);
    }
    getData();
  }, [topNavId, setPaceHasData]);

  const state = {
    series: [
      {
        name: currYear,
        data: currArr,
      },
      {
        name: prevYear,
        data: prevArr,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
        animations: {
          enabled: false,
        },
        toolbar: {
          show,
        },
      },
      legend: {
        labels: {
          colors: ['#82858C', '#FAB52C'],
          useSeriesColors: false,
        },
        markers: {
          strokeColor: 'transparent',
          fillColors: ['#82858C', '#FAB52C'],
        },
      },
      markers: {
        colors: ['#82858C', '#FAB52C'],
      },
      stroke: {
        width: [2, 2, 1],
        curve: 'straight',
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
      yaxis: {
        title: {
          text: '',
        },
      },
    },
  };
  const { t } = useTranslation();
  return (
    <div className="chart-body">
      <h3>
        {t('stats.label6')}
        {' '}
        <Tooltip title="This is accomodation chart" color="gold">
          <img src={qst} alt="qst" />
        </Tooltip>
      </h3>

      <div id="chart">
        <Chart
          options={state.options}
          series={state.series}
          type="line"
          width="100%"
          height={350}
        />
      </div>
    </div>
  );
};

PaceChart.propTypes = {
  topNavId: PropTypes.number,
  setPaceHasData: PropTypes.string,
};
PaceChart.defaultProps = {
  topNavId: 0,
  setPaceHasData: '',
};
