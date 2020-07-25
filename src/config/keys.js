import keys from './default';
// Local services
// export const client = keys.development.webserver.clientPath;
// export const server = keys.development.webserver.serverPath;

// Live Services
export const client = keys.staging.webserver.clientPath;
export const server = keys.staging.webserver.serverPath;

// price and discount for billing
export const { basicPrice } = keys.webserver.liveDev;
export const { advancePrice } = keys.webserver.liveDev;
export const { discount } = keys.webserver.liveDev;
