import axios from 'axios';

export default axios.create({
  baseURL: process.env.VUE_APP_API_HOST,
  headers: {
    'x-api-key': 'dummyapikey', // hardcoded api key here for the demo
  },
});
