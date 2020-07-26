import keys from './default';
// Local services
// export const client = keys.development.webserver.clientPath;
// export const server = keys.development.webserver.serverPath;

// export const { basicPrice } = keys.development.webserver;
// export const { advancePrice } = keys.development.webserver;
// export const { discount } = keys.development.webserver;

// Live Services
export const client = keys.staging.webserver.clientPath;
export const server = keys.staging.webserver.serverPath;

// price and discount for billing
export const basicPrice = keys.staging.webserver.basicPrice;
export const advancePrice = keys.staging.webserver.advancePrice;
export const discount = keys.staging.webserver.discount;
