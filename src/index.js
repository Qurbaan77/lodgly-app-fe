import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import './index.css';
import App from './App';
import './i18n';
import { SENTRY_DSN } from './config/keys';

let env = process.env.REACT_APP_ENV;
Sentry.init({
  dsn: SENTRY_DSN,
  beforeSend(event) {
      if (env === 'development') {
          return null;
      } else {
          return event;
      }
  }
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
