const express = require('express');
const app = express();
const axios = require('axios');
require('dotenv').config();
const querystring = require('querystring');

const PORT = process.env.PORT || 8888;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECTURI = process.env.REDIRECTURI;

const generateRandomString = length => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for(let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
};

const stateKey = 'spotify_auth_state';

app.get('/login', (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const scope = 'user-read-private user-read-email';

  const queryParams = querystring.stringify({
    client_id: CLIENT_ID,
    response_type:'code',
    redirect_uri: REDIRECTURI,
    state: state,
    scope: scope
  })
  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

app.get('/logged', (req, res) => {
  const code = req.query.code || null;

  axios({
    method:'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECTURI
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
    },
  })
  .then(response => {
    if(response.status === 200) {
      const {access_token, refresh_token, expires_in} = response.data;
      const queryParams = querystring.stringify({
        access_token,
        refresh_token,
        expires_in
      })

      res.redirect(`http://localhost:3000/?${queryParams}`)
    } else {
      res.redirect(`/?{querystring.stringify({error: 'invalid_token' })}`);
    }})
  .catch(error => {
    res.send(error);
  });
})

app.get('/refresh_token', (req, res) => {
  const {refresh_token} = req.query;

  axios({
    method:'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: refresh_token

    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
    },
  })
  .then(response => {
    if(response.status === 200) {
      res.send(JSON.stringify(response.data, null, 2));
    } else {
      res.send(response)
    }
  })
  .catch(error => {
    res.send(error);
  });

})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(CLIENT_ID, CLIENT_SECRET, REDIRECTURI);
});