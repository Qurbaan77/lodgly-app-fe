import React from 'react';
import noguest from '../../assets/images/guest-placeholder.png';

const NoGuest = () => (
  <div className="add-team-page">
    <div className="add-subuser">
      <img src={noguest} alt="noguest" />
      <h4>Guests</h4>
      <p>Currently there are no guests created</p>
    </div>
  </div>
);

export default NoGuest;
