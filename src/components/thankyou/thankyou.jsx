import React from 'react';
import './thankyou.css';
import logo from '../../assets/images/logo.jpg';

const Thankyou = () => (
  <div className="thank-you">
    <div className="container">
      <div classNmae="row">
        <div className="col-md-12">
          <div className="thank-you-logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="thank-you-box">
            <h1>Thank You for Register</h1>
            <p>One of our team members will get in touch with you shortly!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Thankyou;
