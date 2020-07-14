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
