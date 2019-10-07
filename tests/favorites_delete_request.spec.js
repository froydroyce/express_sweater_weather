var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');
var user = require('../models').User;
var favorite = require('../models').Favorite;

describe('api', () => {
  describe('Favorites API', () => {
    test("It should delete the favorited location and return status of 204", () => {
      const new_user = user.create({
        email: "my_email@example.com",
        password: "password",
        apiKey: "QRQG7JV-10X42RN-NKE7NT6-421WKBV"
      })

      const denver = favorite.create({
        location: "Denver, CO",
        userId: new_user.id
      })

      const aurora = favorite.create({
        location: "Aurora, CO",
        userId: new_user.id
      })

      const creds = {
        location: "Denver, CO",
        apiKey: "QRQG7JV-10X42RN-NKE7NT6-421WKBV"
      }

      return request(app).delete("/api/v1/favorites").send(creds).then(response => {
        expect(response.status).toBe(204)
      })
      expect(user.favorites.length).toEqual(1)
    })
  })
})
