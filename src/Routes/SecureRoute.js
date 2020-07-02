import React from 'react';
import {Redirect, Route } from 'react-router-dom';

  const subUserCred = JSON.parse(localStorage.getItem('subUserCred'));
  console.log(subUserCred);
  
   const [{ bookingRead, reservationRead, guestsRead, invoicesRead, 
    propertiesRead, serviceRead, statsRead, teamRead
  }] = subUserCred ? subUserCred : [{}];


  export const SecureBooking = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        bookingRead ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );

  export const SecureReservation = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        reservationRead ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );

  export const SecureProperty = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        propertiesRead ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );

  export const SecureTeam = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        teamRead ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );