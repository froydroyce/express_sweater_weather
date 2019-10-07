# Sweater Weather Express

## Introduction

- Sweater Weather is a Turing Back End Engineering project designed to teach the fundamentals of building an API with Node.js and Express framework. This project is an API with endpoints that produce forecast data for a specific location. It consumes APIs from Google and DarkSky to gather information to be parsed for consumption. 

## Initial Setup

```
git clone git@github.com:froydroyce/express_sweater_weather.git
npm install
npx sequelize db:create
npx sequelize db:migrate
```

- To set your enviroment variables for your API keys, create a `.env` file in your root directory with the following variables:
```
GEOCODE=https://maps.googleapis.com/maps/api/geocode/json
DARKSKY=https://api.darksky.net/forecast
DARKSKY_API=<YOUR DARKSKY API KEY>
GOOGLE=<YOUR GOOGLE GEOCODE API KEY>

```
## How to Use

- To run the server:
```
npm start
```
- Endpoints can ccessed through `http://localhost:3000` 

**Account Creation**
- Request: 
```
POST /api/v1/users
Content-Type: application/json
Accept: application/json

{
  "email": "my_email@example.com",
  "password": "password"
  "password_confirmation": "password"
}
```
- Response:
```
status: 201
body:

{
  "api_key": "jgn983hy48thw9begh98h4539h4",
}
```

**Login**
- Request: 
```
POST /api/v1/sessions
Content-Type: application/json
Accept: application/json

{
  "email": "my_email@example.com",
  "password": "password"
}
```
- Response:
```
status: 200
body:

{
  "api_key": "jgn983hy48thw9begh98h4539h4",
}
```
**Forecast for a City**
- Request:
```
GET /api/v1/forecast?location=denver,co
Content-Type: application/json
Accept: application/json

body:
{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
- Response:
```
{
  "location": "Denver, C0",
  "currently": {
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.91,
      "humidity": 0.65,
      "pressure": 1020.51,
      "windSpeed": 11.91,
      "windGust": 23.39,
      "windBearing": 294,
      "cloudCover": 1,
      "visibility": 9.12,
    },
  "hourly": {
    "summary": "Partly cloudy throughout the day and breezy this evening.",
    "icon": "wind",
    "data": [
      {
      "time": 1555016400,
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.9,
      "humidity": 0.65,
      "pressure": 1020.8,
      "windSpeed": 11.3,
      "windGust": 22.64,
      "windBearing": 293,
      "cloudCover": 1,
      "visibility": 9.02,
      },
    ]
  },
  "daily": {
    "summary": "No precipitation throughout the week, with high temperatures bottoming out at 58°F on Monday.",
    "icon": "clear-day",
    "data": [
      {
        "time": 1554966000,
        "summary": "Partly cloudy throughout the day and breezy in the evening.",
        "icon": "wind",
        "sunriseTime": 1554990063,
        "sunsetTime": 1555036947,
        "precipIntensity": 0.0001,
        "precipIntensityMax": 0.0011,
        "precipIntensityMaxTime": 1555045200,
        "precipProbability": 0.11,
        "precipType": "rain",
        "temperatureHigh": 57.07,
        "temperatureLow": 51.47,
        "humidity": 0.66,
        "pressure": 1020.5,
        "windSpeed": 10.94,
        "windGust": 33.93,
        "cloudCover": 0.38,
        "visibility": 9.51,
        "temperatureMin": 53.49,
        "temperatureMax": 58.44,
      },
    ]
  }
}
```
(Your response will contain more hourly and daily data)

**Favoriting Locations**
- Request:
```
POST /api/v1/favorites
Content-Type: application/json
Accept: application/json

body:

{
  "location": "Denver, CO",
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
- Response:
```
status: 200
body:

{
  "message": "Denver, CO has been added to your favorites",
}
```

**Listing Favorite Locations**
- Request:
```
GET /api/v1/favorites
Content-Type: application/json
Accept: application/json

body:

{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
- Response:
```
status: 200
body:
[
  {
    "location": "Denver, CO",
    "current_weather": {
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.91,
      "humidity": 0.65,
      "pressure": 1020.51,
      "windSpeed": 11.91,
      "windGust": 23.39,
      "windBearing": 294,
      "cloudCover": 1,
      "visibility": 9.12,
    },
    "location": "Golden, CO",
    "current_weather": {
      "summary": "Sunny",
      "icon": "sunny",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 71.00,
      "humidity": 0.50,
      "pressure": 1015.10,
      "windSpeed": 10.16,
      "windGust": 13.40,
      "windBearing": 200,
      "cloudCover": 0,
      "visibility": 8.11,
    }
  }
]
```

**Removing Favorite Locations**
- Request:
```
DELETE /api/v1/favorites
Content-Type: application/json
Accept: application/json

body:

{
  "location": "Denver, CO",
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
- Response:
```
status: 204
```
## Known Issues

- Validations: Application is currently not set up with validations for user registration.

## Running Tests

- All endpoints are currently tested for only happy paths. 
- To run all tests:
```
npm test
```
## Schema Design

![Schema Diagram](https://live.staticflickr.com/65535/48857447528_5852d7dbe2_b.jpg)
## Tech Stack

**Core**
- Primary Language: Javascript
- Framework: Express v4.16.4
- Database: PostgrSQL v7.12.1
- ORM: Sequelize v5.19.1
- Testing Suite: Jest v24.9.0

**Packages**
- bcrypt
- dotenv
- node-fetch
- uuid-apikey

