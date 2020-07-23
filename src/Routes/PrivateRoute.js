import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (localStorage.getItem('token') ? (
      <Component {...props} {...rest} />
    ) : (
      <Redirect to="/" />
    ))}
  />
);

export const LoginRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (localStorage.getItem('token') ? (
      <Redirect to="propertylist" />
    ) : (
      <Component {...props} {...rest} />
    ))}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func,
};

PrivateRoute.defaultProps = {
  component: '',
};
LoginRoute.propTypes = {
  component: PropTypes.func,
};

LoginRoute.defaultProps = {
  component: '',
};
