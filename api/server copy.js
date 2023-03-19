// const express = require('express');
// const app = express();
// const axios = require('axios');
// const querystring = require('querystring');
// require('dotenv').config();

// const PORT = process.env.PORT || 8888;
// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const REDIRECT_URI = process.env.REDIRECTURI;

// app.get('/login', (req, res) => {

//   const scope = 'user-read-private user-read-email';

//   const qParams = querystring.stringify({
//     client_id: CLIENT_ID,
//     response_type:'code',
//     redirect_uri: REDIRECT_URI,
//     state: state,
//     scope: scope
//   })
//   res.redirect(`https://accounts.spotify.com/authorize?${qParams}`).then(console.log(response.data));
// });

// app.get('/callback', (req, res) => {
//   const code = req.query.code || null;

//   axios({
//     method:'post',
//     url: 'https://accounts.spotify.com/api/token',
//     data: querystring.stringify({
//       grant_type: 'authorization_code',
//       code: code,
//       redirect_uri: REDIRECT_URI
//     }),
//     headers: {
//       'content-type': 'application/x-www-form-urlencoded',
//       Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
//     },
//   })
//   .then(response => {
//     if(response.status === 200) {
//       const {access_token, token_type} = response.data;

//       axios.get('https://api.spotify.com/v1/me', {
//         headers: {
//           Authorization: `${token_type} ${access_token}`
//         }
//       })
//       .then(response => {
//         res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
//       })
//       .catch(error => {
//         console.error(error);
//       })
//     } else {
//       res.send(response)
//     }
//   })
//   .catch(error => {
//     res.send(error);
//   });
// })

// app.get('/search', async (req, res) => {

//   const response = await axios.get('https://api.spotify.com/v1/search', {
//     headers: {
//       "Authorization":"Bearer " + 
//     }
//   })
// })

// app.get('/refresh_token', (req, res) => {
//   const {refresh_token} = req.query;

//   axios({
//     method:'post',
//     url: 'https://accounts.spotify.com/api/token',
//     data: querystring.stringify({
//       grant_type: 'refresh_token',
//       refresh_token: refresh_

//     }),
//     headers: {
//       'content-type': 'application/x-www-form-urlencoded',
//       Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
//     },
//   })
//   .then(response => {
//     if(response.status === 200) {
//       res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
//     } else {
//       res.send(response)
//     }
//   })
//   .catch(error => {
//     res.send(error);
//   });

// })

// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
//   console.log(CLIENT_ID, CLIENT_SECRET, REDIRECTURI);
// });