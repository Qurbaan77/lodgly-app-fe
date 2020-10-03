import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import Wrapper from '../wrapper';
import favicon from '../../assets/images/logo-mobile.png';
import airbnb from '../../assets/images/channelmanager/airbnb.png';
import booking from '../../assets/images/channelmanager/booking.png';
import expedia from '../../assets/images/channelmanager/expedia.png';
import './channel.css';

const Channel = () => (
  <Wrapper>

    <Helmet>
      <link rel="icon" href={favicon} />
      <title>
        Lodgly - Comprehensive Vacation Rental Property Management
      </title>
      <meta name="description" content="Grow your Vacation Rental with Lodgly" />
      <body className="channel-page-view" />
    </Helmet>

    <div className="channel-manager">

      <div className="channel-manager-content">

        <div className="channel-manager-box">
          <Link to="/channelairbnb"><img src={airbnb} alt="Airbnb" /></Link>
        </div>

        <div className="channel-manager-box">
          <Link to="/channelbooking"><img src={booking} alt="Booking" /></Link>
        </div>

        <div className="channel-manager-box">
          <Link to="/channelexpedia"><img src={expedia} alt="Expedia" /></Link>
        </div>

      </div>

    </div>

  </Wrapper>
);

export default Channel;
