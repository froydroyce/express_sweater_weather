### Introduction
---
Sweater Weather is a Turing Back End Engineering project designed to teach the fundamentals of building an API with Node.js and Express framework. This project is an API with endpoints that produce forecast data for a specific location. It consumes APIs from Google and DarkSky to gather information to be parsed for consumption. 

### Initial Setup
---
```
git clone git@github.com:froydroyce/express_sweater_weather.git
npm install
npx sequelize db:create
npx sequelize db:migrate
```

To set your enviroment variables for your API keys, create a `.env` file in your root directory with the following variables:
```
GEOCODE=https://maps.googleapis.com/maps/api/geocode/json
DARKSKY=https://api.darksky.net/forecast
DARKSKY_API=<YOUR DARKSKY API KEY>
GOOGLE=<YOUR GOOGLE GEOCODE API KEY>

```
### How to USe
---

### Known Issues
---

### Running Tests
---

### How to Contribute
---

### Core Contributors
---

### Schema Design
---

### Tech Stack
---
