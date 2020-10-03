import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { useHistory } from 'react-router-dom';
import {
  Steps, Button, Select, Form, Input, Row, Col,
} from 'antd';
import { toast } from 'react-toastify';
import favicon from '../../assets/images/logo-mobile.png';
import Wrapper from '../wrapper';
import expedia1 from '../../assets/images/channelmanager/expedia-1.png';
import expedia2 from '../../assets/images/channelmanager/expedia-2.png';
import loader from '../../assets/images/cliploader.gif';
import './channel.css';
import { channelInstance, propertyInstance } from '../../axios/axiosconfig';

const { Step } = Steps;

const ChannelExpedia = () => {
  const steps = [
    {
      title: 'Step 1',
      content: <ChannelBookingContent />,
    },
    {
      title: 'Step 2',
      content: <ChannelBookingForm />,
    },

  ];

  const [current, setCurrent] = useState(0);

  return (
    <Wrapper>

      <Helmet>
        <link rel="icon" href={favicon} />
        <title>
          Lodgly - Comprehensive Vacation Rental Property Management
        </title>
        <meta name="description" content="Grow your Vacation Rental with Lodgly" />
        <body className="channel-booking-page-view" />
      </Helmet>

      <div className="channel-booking">
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action1 previous">
          {current > 0 && (
            <Button
              style={{ margin: '0 8px' }}
              onClick={() => setCurrent(current - 1)}
              className=""
            >
              Previous
            </Button>
          )}
        </div>
        <div className="steps-action ">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => setCurrent(current + 1)}>
              Continue
            </Button>
          )}
          {/* {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          )} */}
        </div>
      </div>
    </Wrapper>
  );
};

export default ChannelExpedia;
const ChannelBookingContent = () => (

  <div className="channel-booking-content">

    <h2>Expedia</h2>
    <p>How to connect and map to Expedia</p>
    <hr className="line-section" />
    <h3>Request the connection with Channex</h3>
    <p>
      In the Expedia extranet please go to
      &quot;Rooms and Rates&quot; and then &quot;Connectivity Settings&quot;
    </p>
    <Row>
      <Col md={5} />
      <Col md={14}>
        <img src={expedia1} alt="Expedia" className="m-300" />
      </Col>
    </Row>

    <p>Typically Expedia will require 2 factor authentication to access this page</p>
    <Row>
      <Col md={3} />
      <Col md={18}>
        <img src={expedia2} alt="Expedia" />
      </Col>
    </Row>
    <p>
      Once this has been completed the
      user should choose Channex for both options
      of Connectivity and bookings.
    </p>

  </div>

);

const ChannelBookingForm = () => {
  const { Option } = Select;
  const history = useHistory();

  const [properties, setProperties] = useState([]);
  const [showLoader, setshowLoader] = useState(true);
  // const [disbaleBtn, setDisableBtn] = useState(true);

  const handleSubmit = async (values) => {
    setshowLoader(false);
    values.channelToMap = 'expedia';
    const res1 = await channelInstance.post('/checkRates', values);
    if (res1.data.code === 200) {
      const res = await channelInstance.post('/activateChannel', values);
      if (res.data.code === 200) {
        setshowLoader(true);
        history.push('/thankyou');
      }
    } else if (res1.data.code === 401) {
      setshowLoader(true);
      toast.error(res1.data.msg, { containerId: 'B' });
    } else {
      setshowLoader(true);
      toast.error('some error occured', { containerId: 'B' });
    }
  };

  //   function handleChange(value) {
  //     // console.log(`selected ${value}`);
  //   }

  useEffect(() => {
    const getData = async () => {
      const res = await propertyInstance.get('/getPropertyName');
      //   console.log(res);
      if (res.data.code === 200) {
        setProperties(res.data.propertyData);
      }
    };
    getData();
  }, []);

  return (

    <div className="channel-booking-form">
      <div className="loader" hidden={showLoader}>
        <div className="loader-box">
          <img src={loader} alt="loader" />
        </div>
      </div>

      <Form onFinish={handleSubmit}>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please fill the email field' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Properties that you want to connect" name="properties" rules={[{ required: true, message: 'Please select the properties you want to map' }]}>
          <Select mode="multiple" style={{ width: '100%' }}>
            {
                properties.map((property) => (
                  <Option
                    // value={property.propertyName}
                    label={property.propertyName}
                    key={property.id}
                  >
                    {property.propertyName}
                  </Option>
                ))
            }
          </Select>
        </Form.Item>
        <Form.Item className="submit-btn">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

    </div>

  );
};
