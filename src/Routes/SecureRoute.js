import React from 'react';
import {Redirect, Route } from 'react-router-dom';

  const subUserCred = JSON.parse(localStorage.getItem('subUserCred'));
  console.log(subUserCred);
  
   const [{ bookingRead, bookingWrite, calendarRead, calendarWrite, guestsRead, invoicesRead, 
    propertiesRead, propertiesWrite, serviceRead, statsRead, teamRead, teamWrite, ownerRead, ownerWrite
  }] = subUserCred ? subUserCred : [{}];


  export const SecureBooking = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        bookingRead || bookingWrite? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );

  export const SecureCalendar = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        calendarRead || calendarWrite ? (
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
        propertiesRead || propertiesWrite ? (
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
        teamRead || teamWrite ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
  
  export const SecureOwner = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        ownerRead || ownerWrite ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );