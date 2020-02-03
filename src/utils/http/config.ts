import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const defaults: AxiosRequestConfig = {
  auth: {
    username: process.env.REACT_APP_API_USERNAME as string,
    password: process.env.REACT_APP_API_PASSWORD as string,
  },
};

const instance: AxiosInstance = axios.create(defaults);

export default instance;
