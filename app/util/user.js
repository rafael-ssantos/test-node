const jsonwebtoken = require('jsonwebtoken');
const crypto = require('crypto-js');
const Postgres = require('./postgres');

const postgres = new Postgres();

class User {
  static async login(req, res) {
    const { user, pwd } = req.query;

    try {
      const result = await postgres.User.findOne({ where: { user } });
      if (result) {
        if (pwd === crypto.AES.decrypt(result.password, 'test-node').toString(crypto.enc.Utf8)) {
          const token = jsonwebtoken.sign({ data: result.user }, 'test-node');
          res.status(200).send({ token });
        } else {
          res.status(401).send('Unauthorized');
        }
      } else {
        res.status(401).send('Unauthorized');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  static async create(req, res) {
    const body = req.body || {};

    try {
      const password = body.password ? crypto.AES.encrypt(body.password, 'test-node').toString() : null;
      const result = await postgres.User.create({
        user: body.user, name: body.name, status: body.status, password,
      });
      res.status(201).send(result);
    } catch (error) {
      if (error && error.errors && Array.isArray(error.errors)) {
        const message = error.errors.map((err) => err.message.replace('User.', '')).join(', ');
        res.status(400).send(message);
      } else {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    }
  }

  static async update(req, res) {
    const { userId } = req.params;
    const body = req.body || {};

    try {
      const password = body.password ? crypto.AES.encrypt(body.password, 'test-node').toString() : null;
      const result = await postgres.User.update({
        user: body.user, name: body.name, status: body.status, password,
      }, { where: { id: userId } });
      if (result[0]) {
        const user = await postgres.User.findOne({ where: { id: userId } });
        res.status(200).send(user);
      } else {
        res.status(404).send('user Not Found');
      }
    } catch (error) {
      if (error && error.errors && Array.isArray(error.errors)) {
        const message = error.errors.map((err) => err.message.replace('User.', '')).join(', ');
        res.status(400).send(message);
      } else {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    }
  }
}

module.exports = User;
