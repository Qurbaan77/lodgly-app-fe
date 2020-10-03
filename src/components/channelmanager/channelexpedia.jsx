import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  Steps, Button, message, Alert, Select, Form, Input,
} from 'antd';
import favicon from '../../assets/images/logo-mobile.png';
import Wrapper from '../wrapper';
import booking1 from '../../assets/images/channelmanager/booking-1.png';
import booking2 from '../../assets/images/channelmanager/booking-2.png';
import booking3 from '../../assets/images/channelmanager/booking-3.png';
import booking4 from '../../assets/images/channelmanager/booking-4.png';
import booking5 from '../../assets/images/channelmanager/booking-5.png';

import './channel.css';

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
        <div className="steps-action">
          {current > 0 && (
            <Button
              style={{ margin: '0 8px' }}
              onClick={() => setCurrent(current - 1)}
            >
              Previous
            </Button>
          )}

          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => setCurrent(current + 1)}>
              Continue
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success('Your request was recieved by our Technical Team. We will connect your properties within 48 hours and will send you a confirmation email.')}
            >
              Submit
            </Button>
          )}

        </div>
      </div>

    </Wrapper>
  );
};

export default ChannelExpedia;

const ChannelBookingContent = () => (

  <div className="channel-booking-content">

    <h2>Booking.com</h2>
    <p>Guide to connect and map booking.com to Channex</p>

    <h3>Request connection to Channex.io in booking extranet</h3>
    <p>
      Login to the admin for the property here:
      <Link to="https://account.booking.com/">https://account.booking.com</Link>
    </p>

    <Alert
      description="This step is best done by the property since booking.com have 2 step security with passcodes sent to the phone."
      type="info"
      showIcon
    />

    <img src={booking1} alt="Booking" />

    <p>
      Copy the property code at the top
      of the navigation, you will need this later inside
      Channex to connect the account
    </p>
    <p>
      Click on Account
      {'>'}
      {' '}
      Connectivity Provider
    </p>

    <h3>Choose Provider Screen</h3>

    <img src={booking2} alt="Booking" />

    <p>Click on &quot;Search&quot;</p>

    <img src={booking3} alt="Booking" />

    <p>Type &quot;Channex&quot; and it will find Channex.io on the list.</p>

    <Alert
      description="You have to type the whole word Channex since it wont find it otherwise."
      type="error"
      showIcon
    />

    <img src={booking4} alt="Booking" />

    <p>
      Once channex is selected on the
      list it will show the summary box,
      just click &quot;Next&quot;
    </p>

    <h3>Agree the XML Service Agreement</h3>

    <img src={booking5} alt="Booking" />

    <p>
      Click on the checkbox to agree the
      terms and conditions and then the
      &quot;Yes, I accept&quot; button.
    </p>

    <p>No other things needs to be done or completed on this form</p>

    <img src={booking5} alt="Booking" />

    <p>Now you will be in a waiting status, until Channex accepts the connection</p>

    <Alert
      description="You can go to map the property in Channex immediately even though Channex has not accepted the property yet. But at this stage you cannot go live (just mapping)"
      type="info"
      showIcon
    />

  </div>

);

const ChannelBookingForm = () => {
  const { Option } = Select;

  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  return (

    <div className="channel-booking-form">

      <Form>
        <Form.Item label="Email">
          <Input />
        </Form.Item>

        <Form.Item label="Properties that you want to connect">
          <Select mode="tags" style={{ width: '100%' }} onChange={handleChange}>
            {children}
          </Select>
        </Form.Item>
      </Form>

    </div>

  );
};
