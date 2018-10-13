/* eslint consistent-return:0 */

const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const express = require('express');
const axios = require('axios');
const logger = require('./logger');

const argv = require('./argv');
const port = require('./port');
const sendOtp = require('./send_otp');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');
const app = express();

const smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'thakkar.aadi1@gmail.com',
    pass: '@@d!th@kk@r1997',
  },
});

let randomToken;
let mailOptions;
let reqHost;

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/send', (req, res) => {
  const { to, host } = req.body;
  reqHost = host;
  randomToken = Math.floor(Math.random() * 10000 + 54);

  const link = `${host}/verify?id=${randomToken}`;

  mailOptions = {
    to,
    subject: 'Please confirm your Email account',
    html: `Hello,<br> Please Click on the link to verify your email.<br><a href=${link}>Click here to verify</a>`,
  };
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.log(error);
      res.send('error');
    } else {
      console.log(`Message sent: ${response.message}`);
      res.send('sent');
    }
  });
});

app.get('/verify', (req, res) => {
  if (`${req.protocol}://${req.get('host')}` === reqHost) {
    console.log('Domain is matched. Information is from Authentic email');
    if (req.query.id === randomToken.toString()) {
      console.log(`email ${mailOptions.to} is verified`);
      res.redirect('http://localhost:3000/otp');
    } else {
      console.log('email is not verified');
      res.send('<h1>Bad Request</h1>');
    }
  } else {
    res.send('<h1>Request is from unknown source</h1>');
  }
});

app.post('/sendOtp', (req, res) => {
  sendOtp(req, res);
});

app.post('/verifyOtp', async (req, res) => {
  const { otp, phoneNumber } = req.body;

  const storedOTP = await axios.get(
    `http://localhost:8082/getOtp?phoneNumber=${phoneNumber}`,
  );
  if (storedOTP.data.otp.toString() === otp.toString()) {
    res.send('OTP verified');
    axios({
      url: 'http://localhost:8082/userVerified',
      method: 'PUT',
      data: { phoneNumber },
    });
  } else {
    res.send('enter valid otp');
  }
});

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});
