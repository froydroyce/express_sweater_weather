var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');
var user = require('../models').User;


describe('api', () => {
  describe('Session Creation', () => {
    test("It should return the user's API key", () => {
      const new_user = user.create({
        email: "my_email@example.com",
        password: "password",
        apiKey: "QRQG7JV-10X42RN-NKE7NT6-421WKBV"
      })
      
      const creds = {
        email: "my_email@example.com",
        password: "password"
      }

      return request(app).post("/api/v1/sessions").send(creds).then(response => {
        expect(response.status).toBe(200)
        expect(Object.keys(response.body)).toContain('apiKey')
      })
    })
  })
})
