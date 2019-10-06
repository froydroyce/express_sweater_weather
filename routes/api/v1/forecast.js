var express = require('express');
var router = express.Router();
var user = require('../../../models').User;
const fetch = require('node-fetch')
const dotenv = require('dotenv').config()
const darksky = process.env.DARKSKY
const darkskyApi = process.env.DARKSKY_API
const geocode = process.env.GEOCODE
const googleApi = process.env.GOOGLE

router.get('/', function(req, res, next) {
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

      var params = `address=${req.query.location}&key=${googleApi}`
      fetch(`${geocode}?${params}`)
        .then(response => response.json())
        .then(result => result.results[0].geometry.location)
        .then(location => {
          fetch(`${darksky}/${darkskyApi}/${location.lat},${location.lng}`)
            .then(response => response.json())
            .then(result => {
              payload = {
                location: req.query.location,
                currently: result.currently,
                hourly: result.hourly,
                daily: result.daily
              }
              res.status(200).send(payload)
            })
        })
    })
    .catch(error => {
      res.status(500).send({ error })
    })
})

module.exports = router;
