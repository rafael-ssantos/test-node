const express = require('express');

const User = require('./util/user');

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/api/login', async (req, res) => {
  await User.login(req, res);
});

app.post('/api/user', async (req, res) => {
  await User.create(req, res);
});

app.patch('/api/user/:userId', async (req, res) => {
  await User.update(req, res);
});

app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`test-node listening at http://localhost:${port}`);
});
