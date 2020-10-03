import React from 'react';
import Helmet from 'react-helmet';
import {
  Button, message, Select, Form, Input,
} from 'antd';
import Wrapper from '../wrapper';
import favicon from '../../assets/images/logo-mobile.png';

import './channel.css';

const ChannelAirbnb = () => (
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

      <div className="steps-content">
        <ChannelAirbnbForm />
      </div>
      <div className="steps-action">

        <Button
          type="primary"
          onClick={() => message.success('Your request was recieved by our Technical Team. We will connect your properties within 48 hours and will send you a confirmation email.')}
        >
          Submit
        </Button>

      </div>
    </div>

  </Wrapper>
);

export default ChannelAirbnb;

const ChannelAirbnbForm = () => {
  const { Option } = Select;

  const children = [];
  for (let i = 10; i < 36; i += 1) {
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

        <Form.Item label="Your Airbnb Username">
          <Input />
        </Form.Item>

        <Form.Item label="Your Airbnb Password">
          <Input />
        </Form.Item>

        <Form.Item label="Properties that you want to map">
          <Select mode="tags" style={{ width: '100%' }} onChange={handleChange}>
            {children}
          </Select>
        </Form.Item>
      </Form>

    </div>

  );
};
