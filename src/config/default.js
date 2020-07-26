const keys = {
  development: {
    webserver: {
      clientPath: 'http://localhost:3000',
      serverPath: 'http://localhost:3001',
      stripeApiKey: 'pk_test_WN4YUK81X937Y9LdFX14Ts5t',
      basicPrice: 4,
      advancePrice: 8,
      discount: 20,
    },
  },
  staging: {
    webserver: {
      clientPath: 'https:app.lodgly.dev/',
      serverPath: 'https:api.lodgly.dev',
      stripeApiKey: 'pk_test_WN4YUK81X937Y9LdFX14Ts5t',
      basicPrice: 4,
      advancePrice: 8,
      discount: 20,
    },
  },
  production: {
    webserver: {
      clientPath: 'https:app.lodgly.dev/',
      serverPath: 'https:api.lodgly.dev',
      stripeApiKey: 'pk_test_WN4YUK81X937Y9LdFX14Ts5t',
      basicPrice: 4,
      advancePrice: 8,
      discount: 20,
    },
  },
};
export default keys;
