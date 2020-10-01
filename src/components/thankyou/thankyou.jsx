import React from 'react';
import Helmet from 'react-helmet';
import './thankyou.css';
import Wrapper from '../wrapper';
import logo from '../../assets/images/logo.jpg';
import favicon from '../../assets/images/logo-mobile.png';

const Thankyou = () => (
  <Wrapper>
    <Helmet>
      <link rel="icon" href={favicon} />
      <title>Lodgly - Comprehensive Vacation Rental Property Management</title>
      <meta name="description" content="Grow your Vacation Rental with Lodgly" />
    </Helmet>
    <div className="thank-you">
      <div className="container">
        <div classNmae="row">
          <div className="col-md-12">
            <div className="thank-you-logo">
              <img src={logo} alt="Logo" />
            </div>
            <div className="thank-you-box">
              <h1>Your request was received by our Technical Team</h1>
              <p>
                We will connect your properties
                within 48 hours and will send you the
                confirmation email
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Wrapper>
);

export default Thankyou;
