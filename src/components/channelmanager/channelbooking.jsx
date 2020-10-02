import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';
import {
  Steps, Button, Alert, Select, Form, Input,
   Row,
  Col,
} from 'antd';
import { toast } from 'react-toastify';
import favicon from '../../assets/images/logo-mobile.png';
import Wrapper from '../wrapper';
import booking1 from '../../assets/images/channelmanager/booking-1.png';
import booking2 from '../../assets/images/channelmanager/booking-2.png';
import booking3 from '../../assets/images/channelmanager/booking-3.png';
import booking4 from '../../assets/images/channelmanager/booking-4.png';
import booking5 from '../../assets/images/channelmanager/booking-5.png';
import loader from '../../assets/images/cliploader.gif';

import './channel.css';
import { channelInstance, propertyInstance } from '../../axios/axiosconfig';

const { Step } = Steps;

const ChannelBooking = () => {
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
        <meta
          name="description"
          content="Grow your Vacation Rental with Lodgly"
        />
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

export default ChannelBooking;

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
    <Row>
      <Col span={3} />
      <Col span={18}>
        <img src={booking1} alt="Booking" />
      </Col>
      <Col span={3} />
    </Row>

    <p>
      Copy the property code at the top of the navigation, you will need this
      later inside Channex to connect the account
    </p>
    <p>
      Click on Account
      {'>'} Connectivity Provider
    </p>

    <h3>Choose Provider Screen</h3>
     <Row>
      <Col span={3} />
      <Col span={18}>
    <img src={booking2} alt="Booking" />
     </Col>
     <Col span={3} />
     </Row>
    <p>Click on &quot;Search&quot;</p>
      <Row>
        <Col span={3} />
        <Col span={18} >
           <img src={booking3} alt="Booking" />
        </Col>
        <Col span={3} />
      </Row>
   

    <p>Type &quot;Channex&quot; and it will find Channex.io on the list.</p>

    <Alert
      description="You have to type the whole word Channex since it wont find it otherwise."
      type="error"
      showIcon
    />
     <Row>
        <Col span={3} />
        <Col span={18} >
       <img src={booking4} alt="Booking" />
         </Col>
          <Col span={3} />
          </Row>
    <p>
      Once channex is selected on the list it will show the summary box, just
      click &quot;Next&quot;
    </p>

    <h3>Agree the XML Service Agreement</h3>
   <Row>
        <Col span={3} />
        <Col span={18} >
    <img src={booking5} alt="Booking" />
    </Col>
       <Col span={3} />
       </Row>
    <p>
      Click on the checkbox to agree the terms and conditions and then the
      &quot;Yes, I accept&quot; button.
    </p>

    <p>No other things needs to be done or completed on this form</p>
   <Row>
     <Col span={3} />
        <Col span={18} >
          <img src={booking5} alt="Booking" />
        </Col>
        <Col span={3} />
   </Row>
   

    <p>
      Now you will be in a waiting status, until Channex accepts the connection
    </p>

    <Alert
      description="You can go to map the property in Channex immediately even though Channex has not accepted the property yet. But at this stage you cannot go live (just mapping)"
      type="info"
      showIcon
    />
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
    console.log(values);
    const res1 = await channelInstance.post('/checkRates', values);
    console.log(res1);
    if (res1.data.code === 200) {
      console.log(res1.data.msg);
      const res = await channelInstance.post('/activateChannel', values);
      console.log(res);
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
