import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import Wrapper from '../wrapper';
import UserLock from '../userlock/userlock';
import favicon from '../../assets/images/logo-mobile.png';
import airbnb from '../../assets/images/channelmanager/airbnb.png';
import booking from '../../assets/images/channelmanager/booking.png';
import expedia from '../../assets/images/channelmanager/expedia.png';
import './channel.css';
import { userInstance } from '../../axios/axiosconfig';
import loader from '../../assets/images/cliploader.gif';

const Channel = () => {
  const [subscribed, setSubscribed] = useState();
  const [onTrial, setOnTrial] = useState(true);
  const [daysLeft, setDaysLeft] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const res = await userInstance.get('/getUserSubscriptionStatus');
      if (res.data.code === 200) {
        const [{ days, isOnTrial, isSubscribed }] = res.data.userSubsDetails;
        setDaysLeft(parseInt(days, 10));
        setSubscribed(JSON.parse(isSubscribed));
        setOnTrial(JSON.parse(isOnTrial));
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) {
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
          <body className="calendar-page-view" />
        </Helmet>
        <div className="loader">
          <div className="loader-box">
            <img src={loader} alt="loader" />
          </div>
        </div>
      </Wrapper>
    );
  }
  const hasAccess = onTrial && daysLeft !== 0 ? 1 : subscribed;
  if (!hasAccess) {
    return (
      <Wrapper>
        <UserLock />
      </Wrapper>
    );
  }
  return (
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
            <Link to="/channelairbnb">
              <img src={airbnb} alt="Airbnb" />
              {/* {' '}
              <p>enabled</p> */}
            </Link>
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
};

export default Channel;
