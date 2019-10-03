var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');


describe('api', () => {
  describe('Account Creation', () => {
    test('It should return an API key', () => {
      const creds = {
        email: "my_email@example.com",
        password: "password",
        passwordConfirmation: "password"
      }
      return request(app).post("/api/v1/users").send(creds).then(response => {
        expect(response.status).toBe(201)
        expect(Object.keys(response.body)).toContain('apiKey')
      })
    })
  })
})
