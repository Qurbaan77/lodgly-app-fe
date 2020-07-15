import React from 'react';
import { Redirect, Route } from 'react-router-dom';

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