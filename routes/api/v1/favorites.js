var express = require('express');
var router = express.Router();
var user = require('../../../models').User;
var favorite = require('../../../models').Favorite;

module.exports = router;

router.post('/', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json')

  user.findOne({
    where: {
      apiKey: req.body.apiKey
    }
  })
    .then(user => {
      if (!user) {
        payload = {
          error: 'Ivalid or missing API key',
          status: 401
        }
        res.status(401).send(payload)
        return;
      }

      favorite.create({
        location: req.body.location,
        userId: user.id
      })
        .then(fav => {
          payload = {
            message: `${fav.location} has been added to your favorites`
          }
          res.status(200).send(payload)
        })
    })

    .catch(error => {
      res.status(500).send({ error })
    })
})
