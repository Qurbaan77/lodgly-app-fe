import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { useHistory } from 'react-router-dom';
import {
  Button, Select, Form, Input,
} from 'antd';
import { toast } from 'react-toastify';
import Wrapper from '../wrapper';
import favicon from '../../assets/images/logo-mobile.png';
import { channelInstance, propertyInstance } from '../../axios/axiosconfig';
import loader from '../../assets/images/cliploader.gif';

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
    </div>

  </Wrapper>
);

export default ChannelAirbnb;

const ChannelAirbnbForm = () => {
  const { Option } = Select;
  const history = useHistory();
  const [properties, setProperties] = useState([]);
  const [showLoader, setshowLoader] = useState(true);

  const handleSubmit = async (values) => {
    setshowLoader(false);
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
        <Form.Item label="Email" rules={[{ required: true, message: 'Please fill the email field' }]} name="email">
          <Input />
        </Form.Item>

        <Form.Item label="Your Airbnb Username" rules={[{ required: true, message: 'Please enter your Airbnb username' }]} name="airbnbUsername">
          <Input />
        </Form.Item>

        <Form.Item label="Your Airbnb Password" rules={[{ required: true, message: 'Please enter your Airbnb password' }]} name="airbnbPassword">
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
        <div className="steps-action">

          <Button
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>

        </div>
      </Form>

    </div>

  );
};
