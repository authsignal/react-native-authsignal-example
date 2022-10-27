const {Authsignal} = require('@authsignal/node');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const secret = 'YOUR_SECRET_KEY';

const authsignal = new Authsignal({secret});

app.use(bodyParser.json());

app.post('/authenticate', async (req, res) => {
  const input = {
    userId: req.body.username,
    action: 'authenticate',
    redirectUrl: 'authsignal://auth',
  };

  const result = await authsignal.track(input);

  res.send(result);
});

app.post('/validate', async (req, res) => {
  const input = {
    userId: req.body.username,
    token: req.body.token,
  };

  const result = await authsignal.validateChallenge(input);

  res.send(result);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
