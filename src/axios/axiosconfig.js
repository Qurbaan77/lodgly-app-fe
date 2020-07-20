import axios from 'axios';
import { server } from '../config/keys';

const token = localStorage.getItem('token');
export const userInstance = axios.create({
  baseURL: `${server}/users`,
  withCredentials: true,
  headers: { 'x-custom-header': token },
});

export const adminInstance = axios.create({
  baseURL: `${server}/admin`,
  withCredentials: true,
});

export const stripeKey = "pk_test_WN4YUK81X937Y9LdFX14Ts5t";
