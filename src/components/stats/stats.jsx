import React, { useEffect, useState } from 'react';
import './stats.css';
import { Row, Col } from 'antd';
import Chart from 'react-apexcharts';
import Wrapper from '../wrapper';
import { userInstance } from '../../axios/axiosconfig';
import statsIcon from '../../assets/images/menu/stats-icon.png';
import qst from '../../assets/images/menu/qst.png';

const Stats = () => {
  const [topNavId, setTopNavId] = useState();
  useEffect(() => {
    setTopNavId(localStorage.getItem('topNavId'));
  }, []);
  return (
    <Wrapper fun={setTopNavId}>
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
  </Wrapper>
  );
};

export default Stats;

const AccommodationChart = (props) => {
  const [currYear, setCurrYear] = useState();
  const [prevYear, setPrevYear] = useState();
  const [currArr, setCurrArr] = useState();
  const [prevArr, setPrevArr] = useState();

  useEffect(() => {
    async function getData() {
      const values = {
        propertyId: localStorage.getItem('topNavId')
      };
      const response = await userInstance.post('/getRevenue', values);
      setCurrArr(response.data.currYearArr);
      setPrevArr(response.data.prevYearArr);
      setPrevYear(response.data.currYear);
      setCurrYear(response.data.prevYear);
    }
    getData();
  }, [props.topNavId]);

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
        colors: ['#82858C', '#FAB52C']
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

const OccupancyChart = (props) => {
  const [currArr, setCurrArr] = useState([]);
  const [prevArr, setPrevArr] = useState([]);

  useEffect(() => {
    async function getData() {
      const values = {
        propertyId: localStorage.getItem('topNavId')
      };
      const response = await userInstance.post('/getOccupancy', values);
      setPrevArr(response.data.prevYearArr);
      setCurrArr(response.data.currYearArr);
    }
    getData();
  }, [props.topNavId]);

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
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      legend: {
        markers: {
          strokeColor: 'transparent',
          fillColors: ['#82858C', '#7FBD34'],
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
        Occupancy per month <img src={qst} />
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
  const [country, setCountry] = useState([]);
  const [average, setAverage] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await userInstance.post('/getCountryReport');
      if (response.data.code === 200) { 
        setCountry(response.data.country)
        setAverage(response.data.average)
      }
    }
    getData();
  }, []);

  const state = {
 
    series: [{
    data: average
  }],

  options: {
    chart: {
    type: 'bar',
    height: 350
  },
  fill: {
    colors: ['#FAB52C']
  },
  plotOptions: {
    bar: {
      horizontal: true,
      columnWidth: '10%',
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: country,
  }
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
        colors: ['#82858C', '#7FBD34', '#FAB52C']
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

const PaceChart = (props) => {
  const [currYear, setCurrYear] = useState();
  const [prevYear, setPrevYear] = useState();
  const [currArr, setCurrArr] = useState([]);
  const [prevArr, setPrevArr] = useState([]);

  useEffect(() => {
    const values = {
      propertyId: localStorage.getItem('topNavId')
    };
    async function getData() {
      const response = await userInstance.post('/getPace', values);
      setPrevArr(response.data.prevYearArr);
      setCurrArr(response.data.currYearArr);

      setPrevYear(response.data.currYear);
      setCurrYear(response.data.prevYear);
    }
    getData();
  }, [props.topNavId]);

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
      },
      legend: {
        labels: {
          colors: ['#82858C', '#FAB52C'],
          useSeriesColors: false
      },
      markers: {
        strokeColor: 'transparent',
        fillColors: ['#82858C', '#FAB52C'],

      },
      },
      markers: {
        colors: ['#82858C', '#FAB52C']
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
