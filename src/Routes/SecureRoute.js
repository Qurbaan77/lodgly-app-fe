import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const subUserCred = JSON.parse(localStorage.getItem('subUserCred'));
const [
  {
    bookingRead,
    bookingWrite,
    calendarRead,
    calendarWrite,
    propertiesRead,
    propertiesWrite,
    teamRead,
    teamWrite,
    ownerRead,
    ownerWrite,
    invoiceRead,
    invoiceWrite,
    serviceRead,
    serviceWrite,
    statsRead,
    statsWrite,
    billingRead,
    billingWrite,
  },
] = subUserCred || [{}];

export const SecureBooking = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (bookingRead || bookingWrite ? (
      <Component {...props} {...rest} />
    ) : (
      <Redirect to="/" />
    ))}
  />
);

export const SecureCalendar = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (calendarRead || calendarWrite ? (
      <Component {...props} {...rest} />
    ) : (
      <Redirect to="/" />
    ))}
  />
);

export const SecureProperty = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (propertiesRead || propertiesWrite ? (
      <Component {...props} {...rest} />
    ) : (
      <Redirect to="/" />
    ))}
  />
);

export const SecureTeam = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (teamRead || teamWrite ? (
      <Component {...props} {...rest} />
    ) : (
      <Redirect to="/" />
    ))}
  />
);

export const SecureOwner = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (ownerRead || ownerWrite ? (
      <Component {...props} {...rest} />
    ) : (
      <Redirect to="/" />
    ))}
  />
);

export const SecureInvoice = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (invoiceRead || invoiceWrite ? (
      <Component {...props} {...rest} />
    ) : (
      <Redirect to="/" />
    ))}
  />
);
export const SecureService = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (serviceRead || serviceWrite ? (
      <Component {...props} {...rest} />
    ) : (
      <Redirect to="/" />
    ))}
  />
);

export const SecureStats = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (statsRead || statsWrite ? (
      <Component {...props} {...rest} />
    ) : (
      <Redirect to="/" />
    ))}
  />
);

export const SecureBilling = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (billingRead && billingWrite ? (
      <Component {...props} {...rest} />
    ) : (
      <Redirect to="/" />
    ))}
  />
);

SecureBilling.propTypes = {
  component: PropTypes.func,
};
SecureBilling.defaultProps = {
  component: '',
};

SecureStats.propTypes = {
  component: PropTypes.func,
};
SecureStats.defaultProps = {
  component: '',
};

SecureBooking.propTypes = {
  component: PropTypes.func,
};

SecureBooking.defaultProps = {
  component: '',
};
SecureCalendar.propTypes = {
  component: PropTypes.func,
};

SecureCalendar.defaultProps = {
  component: '',
};
SecureProperty.propTypes = {
  component: PropTypes.func,
};

SecureProperty.defaultProps = {
  component: '',
};
SecureTeam.propTypes = {
  component: PropTypes.func,
};

SecureTeam.defaultProps = {
  component: '',
};
SecureOwner.propTypes = {
  component: PropTypes.func,
};

SecureOwner.defaultProps = {
  component: '',
};
SecureInvoice.propTypes = {
  component: PropTypes.func,
};

SecureInvoice.defaultProps = {
  component: '',
};
SecureService.propTypes = {
  component: PropTypes.func,
};

SecureService.defaultProps = {
  component: '',
};