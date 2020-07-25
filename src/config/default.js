const keys = {
  development: {
    webserver: {
      clientPath: 'http://localhost:3000',
      serverPath: 'http://localhost:8080',
      stripeApiKey: 'pk_test_WN4YUK81X937Y9LdFX14Ts5t',
    },
  },
  staging: {
    webserver: {
      clientPath: 'https:app.lodgly.dev/',
      serverPath: 'https:api.lodgly.dev',
      stripeApiKey: 'pk_test_WN4YUK81X937Y9LdFX14Ts5t',
    },
  },
  production: {
    webserver: {
      clientPath: 'https:app.lodgly.dev/',
      serverPath: 'https:api.lodgly.dev',
      stripeApiKey: 'pk_test_WN4YUK81X937Y9LdFX14Ts5t',
    },
  },
};
export default keys;
