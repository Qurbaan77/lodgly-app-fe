import config from './config.json';

const configData = config[process.env.REACT_APP_ENV] || config.staging;
export const translationBucket = configData.Webserver.translationBucketPath;
export const server = configData.Webserver.serverPath;
export const client = configData.Webserver.clientPath;
export const { marketingPath } = configData.Webserver;
export const { STRIPE_APP_KEY } = configData.Webserver;
export const SENTRY_DSN = configData.sentry.sentryDsn;

// price and discount for billing
export const { basicPrice } = configData.Billing.basicPrice;
export const { advancePrice } = configData.Billing.advancePrice;
export const { discount } = configData.Billing.discount;
