var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');
var user = require('../models').User;


describe('api', () => {
  describe('Forecast API', () => {
    test("should return forecast for a location(city,state)", () => {
      const new_user = user.create({
        email: "my_email@example.com",
        password: "password",
        apiKey: "QRQG7JV-10X42RN-NKE7NT6-421WKBV"
      })

      const creds = {
        apiKey: "QRQG7JV-10X42RN-NKE7NT6-421WKBV"
      }

      return request(app).get("/api/v1/forecast?location=denver,co").send(creds).then(response => {
        expect(response.status).toBe(200)
        console.log(Object.keys(response.body))
        expect(Object.keys(response.body)).toContain('location')
        expect(Object.keys(response.body)).toContain('currently')
        expect(Object.keys(response.body)).toContain('hourly')
        expect(Object.keys(response.body)).toContain('daily')
      })
    })
  })
})
