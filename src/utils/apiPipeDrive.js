const axios = require('axios');
const config = require('../config/pipeDriveConfs');

const apiPipeDrive = axios.create({
  baseURL: config.baseURL,
  timeout: 1000,
});

module.exports = apiPipeDrive;
