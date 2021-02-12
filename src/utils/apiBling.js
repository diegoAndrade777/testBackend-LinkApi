const axios = require('axios');
const config = require('../config/blingConfs');

const apiBling = axios.create({
  baseURL: config.baseURL,
  timeout: 1000,
});

module.exports = apiBling;
