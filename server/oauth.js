/* eslint-disable camelcase */
// If modifying these scopes, delete token.json.
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const plus = google.plus('v1');
const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/userinfo.email',
];
// const TOKEN_PATH = 'token.json';

// // Load client secrets from a local file.
// fs.readFile('credentials.json', (err, content) => {
//   if (err) return console.log('Error loading client secret file:', err);
//   // Authorize a client with credentials, then call the Gmail API.
//   authorize(JSON.parse(content), listLabels);
// });

const credentials = {
  client_id:
    '161526488455-dpk35h1hndeic5s6c0puln4j0rs5d7j4.apps.googleusercontent.com',
  project_id: 'maah-omg',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://www.googleapis.com/oauth2/v3/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_secret: 'G1AJQb-2FufLyyu_wbZVIJZj',
  redirect_uris: ['http://localhost:3000/authcb'],
  javascript_origins: ['http://localhost:3000'],
};

function getOAuthClient() {
  const { client_secret, client_id, redirect_uris } = credentials;
  return new OAuth2(client_id, client_secret, redirect_uris[0]);
}

function getAuthUrl() {
  const oauth2Client = getOAuthClient();

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES, // If you only need one scope you can pass it as string
  });
}

async function getProfileDetails(tokens) {
  const oauth2Client = getOAuthClient();
  oauth2Client.setCredentials(tokens);

  return new Promise(resolve => {
    plus.people.get({ userId: 'me', auth: oauth2Client }, (err, response) => {
      resolve(response || err);
    });
  });
}

module.exports = {
  getAuthUrl,
  getOAuthClient,
  getProfileDetails,
};
