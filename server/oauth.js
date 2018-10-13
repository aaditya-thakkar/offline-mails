// If modifying these scopes, delete token.json.
var { google } = require('googleapis');
var OAuth2 = google.auth.OAuth2;
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
// const TOKEN_PATH = 'token.json';

// // Load client secrets from a local file.
// fs.readFile('credentials.json', (err, content) => {
//   if (err) return console.log('Error loading client secret file:', err);
//   // Authorize a client with credentials, then call the Gmail API.
//   authorize(JSON.parse(content), listLabels);
// });

const credentials = {
  "client_id": "161526488455-dpk35h1hndeic5s6c0puln4j0rs5d7j4.apps.googleusercontent.com",
  "project_id": "maah-omg",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://www.googleapis.com/oauth2/v3/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_secret": "G1AJQb-2FufLyyu_wbZVIJZj",
  "redirect_uris":[
    "http://localhost:3000/authcb"
  ],
  "javascript_origins":[
    "http://localhost:3000"
  ]
};

function getOAuthClient () {
  const {client_secret, client_id, redirect_uris} = credentials;
  return new OAuth2(client_id ,  client_secret, redirect_uris[0]);
}

function getAuthUrl () {
  var oauth2Client = getOAuthClient();
  
  var url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES // If you only need one scope you can pass it as string
  });

  return url;
}

module.exports = {
  getAuthUrl,
  getOAuthClient,
}
