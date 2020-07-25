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
