const axios = require('axios');
const querystring = require('querystring');

async function sendSMS(message, number) {
  try {
    const apiKey = process.env.TEXTLOCAL_API_KEY;
    const sender = process.env.TEXTLOCAL_SENDER;
    const data = querystring.stringify({
      apiKey,
      numbers: number.toString(),
      sender,
      message,
      test: process.env.TEST_SMS
    });
    const response = await axios.post('https://api.textlocal.in/send/', data);
    if (response.data.status === 'failure') {
      // eslint-disable-next-line
      console.log(response.data.errors);
      return false;
    }
    return response.data.status;
  }
  catch (err) {
    // eslint-disable-next-line
    console.log(JSON.stringify(err));
    return false;
  }
}

module.exports = { sendSMS };
