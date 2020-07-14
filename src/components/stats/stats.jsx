import React, { useEffect, useState } from 'react';
import './stats.css';
import { Row, Col } from 'antd';
import Chart from 'react-apexcharts';
import Wrapper from '../wrapper';
import { userInstance } from '../../axios/axiosconfig';
import statsIcon from '../../assets/images/menu/stats-icon.png';
import qst from '../../assets/images/menu/qst.png';

const Stats = () => (
  <Wrapper>
    <div className="stats-page">
      <div className="page-header">
        <h1>
          <img src={statsIcon} alt="statsIcon" /> Stats
        </h1>
      </div>

      <div className="container">
        <div className="accomandation-chart">
          <Row>
            <Col span={24}>
              <AccommodationChart />
            </Col>
          </Row>
        </div>

        <div className="occupancy-chart">
          <Row>
            <Col span={24}>
              <OccupancyChart />
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
              <PaceChart />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  </Wrapper>
);

export default Stats;

const AccommodationChart = () => {
  const [currYear, setCurrYear] = useState();
  const [prevYear, setPrevYear] = useState();
  const [currArr, setCurrArr] = useState();
  const [prevArr, setPrevArr] = useState();

  useEffect(() => {
    async function getData() {
      const response = await userInstance.post('/getRevenue');
      console.log(response)
      setCurrArr(response.data.currYearArr);
      setPrevArr(response.data.prevYearArr);
      setPrevYear(response.data.currYear);
      setCurrYear(response.data.prevYear);
    }
    getData();
  }, []);

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
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '25%',
          endingShape: 'rounded',
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
      fill: {
        opacity: 1,
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

  return (
    <div className="chart-body">
      <h3>
        Accommodation revenue
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

const OccupancyChart = () => {
  const [currYear, setCurrYear] = useState();
  const [prevYear, setPrevYear] = useState();
  const [currArr, setCurrArr] = useState();
  const [prevArr, setPrevArr] = useState();

  useEffect(() => {
    async function getData() {
      const response = await userInstance.post('/getOccupancy');
      console.log(response);
      setCurrArr(response.data.currYearArr);
      setPrevArr(response.data.prevYearArr);
      setPrevYear(response.data.currYear);
      setCurrYear(response.data.prevYear);
    }
    getData();
  }, []);

  const state = {
    series: [
      {
        name: currYear,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: prevYear,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: false,
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
        offsetX: 40,
      },
      fill: {
        opacity: 1,
      },
    },
  };

  return (
    <div className="chart-body">
      <h3>
        Occupancy per month
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

const ReservationCountryChart = () => {
  const state = {
    series: [
      {
        name: 'Bob',
        data: [
          {
            x: 'United State',
            y: [
              new Date('2019-03-05').getTime(),
              new Date('2019-03-08').getTime(),
            ],
          },
          {
            x: 'Belgium',
            y: [
              new Date('2019-03-02').getTime(),
              new Date('2019-03-05').getTime(),
            ],
          },
          {
            x: 'Ireland',
            y: [
              new Date('2019-03-03').getTime(),
              new Date('2019-03-09').getTime(),
            ],
          },
          {
            x: 'Norway',
            y: [
              new Date('2019-03-11').getTime(),
              new Date('2019-03-16').getTime(),
            ],
          },
        ],
      },
      {
        name: 'Joe',
        data: [
          {
            x: 'United State',
            y: [
              new Date('2019-03-02').getTime(),
              new Date('2019-03-05').getTime(),
            ],
          },
          {
            x: 'Ireland',
            y: [
              new Date('2019-03-06').getTime(),
              new Date('2019-03-16').getTime(),
            ],
          },
          {
            x: 'Belgium',
            y: [
              new Date('2019-03-03').getTime(),
              new Date('2019-03-07').getTime(),
            ],
          },
          {
            x: 'China',
            y: [
              new Date('2019-03-20').getTime(),
              new Date('2019-03-22').getTime(),
            ],
          },
          {
            x: 'United State',
            y: [
              new Date('2019-03-10').getTime(),
              new Date('2019-03-16').getTime(),
            ],
          },
        ],
      },
      {
        name: 'Dan',
        data: [
          {
            x: 'Belgium',
            y: [
              new Date('2019-03-10').getTime(),
              new Date('2019-03-17').getTime(),
            ],
          },
          {
            x: 'Norway',
            y: [
              new Date('2019-03-05').getTime(),
              new Date('2019-03-09').getTime(),
            ],
          },
        ],
      },
    ],
    options: {
      chart: {
        height: 450,
        type: 'rangeBar',
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '40%',
        },
      },
      xaxis: {
        type: 'datetime',
      },
      stroke: {
        width: 1,
      },
      fill: {
        type: 'solid',
        opacity: 0.6,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
      },
    },
  };

  return (
    <div className="chart-body">
      <h3>
        Reservations per country
        <img src={qst} alt="qst" />
      </h3>

      <div id="chart">
        <Chart
          options={state.options}
          series={state.series}
          type="rangeBar"
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
      chart: {
        type: 'donut',
      },
      legend: {
        position: 'bottom',
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  };

  return (
    <div className="chart-body">
      <h3>
        Reservations per channel
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

const PaceChart = () => {
  const state = {
    series: [
      {
        name: 'Optimal',
        data: [5, 25, 15, 20, 40, 30, 35, 35, 45, 50],
      },
      {
        name: 'Average',
        data: [10, 35, 20, 25, 50, 35, 40, 45, 50, 55],
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
      },
      stroke: {
        width: [2, 2, 1],
        curve: 'straight',
      },
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      title: {
        text: '',
      },
      xaxis: {},
    },
  };

  return (
    <div className="chart-body">
      <h3>
        Pace report
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
