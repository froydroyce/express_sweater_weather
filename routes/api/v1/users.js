var express = require('express');
var router = express.Router();
var user = require('../../../models').User;
var bcrypt = require('bcrypt');
const saltRounds = 10;
const { check, validationResult } = require('express-validator');
var uuidAPIKey = require('uuid-apikey');

router.post('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json')
  if (req.body.password !== req.body.passwordConfirmation) {
    payload = {
      error: 'Passwords do not match.',
      status: 401
    }
    res.status(401).send(payload)
    return;
  }
  user.create({
    email: req.body.email,
    passwordDigest: bcrypt.hashSync(req.body.password, saltRounds),
    apiKey: uuidAPIKey.create().apiKey
  })
    .then(user => {
      payload = {
        apiKey: user.apiKey
      }
      res.status(201).send(payload)
    })
    .catch(error => {
      res.status(500).send({ error })
  })
});

module.exports = router;
