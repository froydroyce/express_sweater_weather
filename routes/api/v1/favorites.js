var express = require('express');
var router = express.Router();
var user = require('../../../models').User;
var favorite = require('../../../models').Favorite;
const fetch = require('node-fetch')
const dotenv = require('dotenv').config()
const darksky = process.env.DARKSKY
const darkskyApi = process.env.DARKSKY_API
const geocode = process.env.GEOCODE
const googleApi = process.env.GOOGLE

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

router.get('/', async (req, res, next) => {
  var locations = [];
  res.setHeader('Content-Type', 'appication/json')

  await user.findOne({
    where: {
      apiKey: req.body.apiKey
    },
    include: [{
      model: favorite,
      as: 'favorites'
    }]
  })
    .then(async user => {
      if (!user) {
        payload = {
          error: 'Ivalid or missing API key',
          status: 401
        }
        res.status(401).send(payload)
        return;
      }

      let favorites = await user.favorites;
      for (let i = 0; i < favorites.length; i++) {
        let favorite = favorites[i];
        var params = `address=${favorite.location}&key=${googleApi}`
        await fetch(`${geocode}?${params}`)
          .then(async response => response.json())
          .then(async result => result.results[0].geometry.location)
          .then(async location => {
            await fetch(`${darksky}/${darkskyApi}/${location.lat},${location.lng}`)
              .then(async response => response.json())
              .then(async result => {
                locations.push({
                  location: favorite.location,
                  currentWeather: result.currently
                });
              });
          });
      }
      res.status(200).send(locations);
    })
    .catch(error => {
      res.status(500).send({ error })
    })
})

router.delete('/', function(req, res, next) {
  res.setHeader('Content-Type', 'appication/json')

  user.findOne({
    where: {
      apiKey: req.body.apiKey
    },
    include: [{
      model: favorite,
      as: 'favorites'
    }]
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

      favorite.destroy({
        where: {
          location: req.body.location,
          userId: user.id,
        }
      })
        .then(deletedRecord => {
          if(deletedRecord === 1){
            payload = {
              message: "Deleted successfully"
            }
            res.status(204).send(payload);
            return
          }
          res.status(404).send({message:"record not found"})
        })
    })
    .catch(error => {
      res.status(500).send({ error })
    })
})

module.exports = router;
