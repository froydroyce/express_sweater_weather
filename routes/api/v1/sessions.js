var express = require('express');
var router = express.Router();
var user = require('../../../models').User;
var bcrypt = require('bcrypt');

router.post('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json')

  user.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        payload = {
          error: 'Email or Password is Invalid.',
          status: 401
        }
        res.status(401).send(payload)
        return;
      }
      bcrypt.compare(req.body.password, user.passwordDigest, function (err, result) {
        if (result == true) {
          payload = {
            apiKey: user.apiKey
          }
          res.status(200).send(payload)
          return
        }
        payload = {
          error: 'Email or Password is Invalid.',
          status: 401
        }
        res.status(401).send(payload)
      })
    })
    .catch(error =>{
      res.status(500).send({ error })
    })
})

module.exports = router;
