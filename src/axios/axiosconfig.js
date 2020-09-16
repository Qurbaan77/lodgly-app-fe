import axios from 'axios';
import { server } from '../config/keys';

const token = localStorage.getItem('token');
export const userInstance = axios.create({
  baseURL: `${server}/users`,
  withCredentials: true,
  headers: { 'x-custom-header': token },
});

export const propertyInstance = axios.create({
  baseURL: `${server}/properties`,
  withCredentials: true,
  headers: { 'x-custom-header': token },
});

export const bookingInstance = axios.create({
  baseURL: `${server}/booking`,
  withCredentials: true,
  headers: { 'x-custom-header': token },
});

export const reservationInstance = axios.create({
  baseURL: `${server}/reservation`,
  withCredentials: true,
  headers: { 'x-custom-header': token },
});

export const adminInstance = axios.create({
  baseURL: `${server}/admin`,
  withCredentials: true,
});
