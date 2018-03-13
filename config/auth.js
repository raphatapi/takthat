'use strict';

const {google} = require('googleapis');
const nconf = require('nconf');
const readline = require('readline');
const plus = google.plus('v1');
const path = require('path');
const OAuth2Client = google.auth.OAuth2;

nconf.argv().env().file(path.join(__dirname, '/oauth2.keys.json'));
const keys = nconf.get('web');

// Client ID and client secret are available at
// https://code.google.com/apis/console
const CLIENT_ID = '1068602310947-ro8qahfdaj8cau0v56tjj6kde5kljclr.apps.googleusercontent.com';
const CLIENT_SECRET = 'mVjRIAmzFZa4cPlIC-kL6RQh';
const REDIRECT_URL = 'http://takthat.com/';

const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getAccessToken (oauth2Client, callback) {
  // generate consent page url
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // will return a refresh token
    scope: 'https://www.googleapis.com/auth/plus.me' // can be a space-delimited string or an array of scopes
  });

  console.log('Visit the url: ', url);
  rl.question('Enter the code here:', code => {
    // request access token
    oauth2Client.getToken(code, (err, tokens) => {
      if (err) {
        return callback(err);
      }
      // set tokens to the client
      // TODO: tokens should be set by OAuth2 client.
      oauth2Client.setCredentials(tokens);
      callback();
    });
  });
}

// retrieve an access token
getAccessToken(oauth2Client, () => {
  // retrieve user profile
  plus.people.get({ userId: 'me', auth: oauth2Client }, (err, res) => {
    if (err) {
      throw err;
    }
    console.log(res.data.displayName, ':', res.data.tagline);
  });
});