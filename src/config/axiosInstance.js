// src/config/api.js
import axios from 'axios';

const BASE_URL = 'https://core-skill-test.webc.in/employee-portal';

// Create axios instance with default config
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const API_ENDPOINTS = {
  auth: {
    login: '/api/v1/auth/login',
    logout: '/api/v1/settings/logout',
  },
  employee: {
    list: '/api/v1/employee',
    show: '/api/v1/employee/show',
    update: '/api/v1/employee/update',
  },
  settings: {
    departments: '/api/v1/settings/departments',
    designations: '/api/v1/settings/designations',
    employmentTypes: '/api/v1/settings/employment-types',
  },
};

// Helper to add auth token to requests
export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};