var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');
var user = require('../models').User;
var user = require('../models').Favorite;


describe('api', () => {
  describe('Favorites API', () => {
    test("It should return a messge indicating the location had been added", () => {
      const new_user = user.create({
        email: "my_email@example.com",
        password: "password",
        apiKey: "QRQG7JV-10X42RN-NKE7NT6-421WKBV"
      })

      const creds = {
        location: "Denver, CO",
        papiKey: "QRQG7JV-10X42RN-NKE7NT6-421WKBV"
      }

      return request(app).post("/api/v1/favorites").send(creds).then(response => {
        expect(response.status).toBe(200)
        expect(Object.keys(response.body)).toContain('message')
      })
    })
  })
})
