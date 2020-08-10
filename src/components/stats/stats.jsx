import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';
import './stats.css';
import { Row, Col } from 'antd';
import Chart from 'react-apexcharts';
import Wrapper from '../wrapper';
import { userInstance } from '../../axios/axiosconfig';
import statsIcon from '../../assets/images/menu/stats-icon.png';
import qst from '../../assets/images/menu/qst.png';
import favicon from '../../assets/images/logo-mobile.png';
import UserLock from '../userlock/userlock';

const Stats = () => {
  const { t } = useTranslation();
  const [topNavId, setTopNavId] = useState();
  const [subscribed, setSubscribed] = useState();
  const [onTrial, setOnTrial] = useState();
  const [daysLeft, setDaysLeft] = useState();

  const getData = async () => {
    const response0 = await userInstance.get('/getUserSubscriptionStatus');
    if (response0.data.code === 200) {
      const [{
        days, isOnTrial, isSubscribed,
      }] = response0.data.userSubsDetails;
      setDaysLeft(days);
      setSubscribed(isSubscribed);
      setOnTrial(isOnTrial);
    }
  };
  useEffect(() => {
    setTopNavId(localStorage.getItem('topNavId'));
    getData();
  }, []);
  const hasAccess = onTrial && daysLeft !== 0 ? 1 : subscribed;
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
            <div className="accomandation-chart">
              <Row>
                <Col span={24}>
                  <AccommodationChart topNavId={topNavId} />
                </Col>
              </Row>
            </div>

            <div className="occupancy-chart">
              <Row>
                <Col span={24}>
                  <OccupancyChart topNavId={topNavId} />
                </Col>
              </Row>
            </div>

            <div className="reservation-chart">
              <Row>
                <Col span={16} style={{ paddingRight: '20px' }}>
                  <ReservationCountryChart />
                </Col>
                <Col span={8}>
                  <ReservationChannelChart />
                </Col>
              </Row>
            </div>

            <div className="pace-chart">
              <Row>
                <Col span={24}>
                  <PaceChart topNavId={topNavId} />
                </Col>
              </Row>
            </div>
          </div>
        </div>
      ) : (
        <UserLock />
      )}
    </Wrapper>
  );
};

export default Stats;

const AccommodationChart = ({ topNavId }) => {
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
      }
      setCurrArr(response.data.currYearArr);
      setPrevArr(response.data.prevYearArr);
    }
    getData();
  }, [topNavId]);

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

AccommodationChart.propTypes = {
  topNavId: PropTypes.number,
};
AccommodationChart.defaultProps = {
  topNavId: 0,
};

const OccupancyChart = ({ topNavId }) => {
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
      }
      setPrevArr(response.data.prevYearArr);
      setCurrArr(response.data.currYearArr);
    }
    getData();
  }, [topNavId]);

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
        // stacked: true,
        toolbar: {
          show,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '25%',
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
        {t('stats.label3')}
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
};
OccupancyChart.defaultProps = {
  topNavId: 0,
};
const ReservationCountryChart = () => {
  const [country, setCountry] = useState([]);
  const [average, setAverage] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await userInstance.post('/getCountryReport');
      console.log(response);
      if (response.data.code === 200) {
        setCountry(response.data.country);
        setAverage(response.data.average);
      }
    }
    getData();
  }, []);

  const state = {

    series: [{
      data: average,
    }],

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
        <img src={qst} alt="qst" />
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

const ReservationChannelChart = () => {
  const state = {
    series: [20, 30, 50],
    options: {
      labels: ['Airbnb', 'Booking', 'Booking'],
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
        <img src={qst} alt="qst" />
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

const PaceChart = ({ topNavId }) => {
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
      }
      setPrevArr(response.data.prevYearArr);
      setCurrArr(response.data.currYearArr);

      setPrevYear(response.data.currYear);
      setCurrYear(response.data.prevYear);
    }
    getData();
  }, [topNavId]);

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
        <img src={qst} alt="qst" />
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
};
PaceChart.defaultProps = {
  topNavId: 0,
};
