var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');
var user = require('../models').User;
var favorite = require('../models').Favorite;

describe('api', () => {
  describe('Favorites API', () => {
    test("It should return the user's favorited cities with each city's forecast", async () => {
      const new_user = await user.create({
        email: "my_email@example.com",
        password: "password",
        apiKey: "QRQG7JV-10X42RN-NKE7NT6-421WKBV"
      });

      await favorite.create({
        location: "Arvada, CO",
        userId: new_user.id
      });

      const creds = {
        apiKey: "QRQG7JV-10X42RN-NKE7NT6-421WKBV"
      };

      return request(app).get("/api/v1/favorites").send(creds).then(response => {
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(1);
        expect(Object.keys(response.body[0])).toContain('location');
        expect(Object.keys(response.body[0])).toContain('currentWeather');
      })
    })
  })
})
