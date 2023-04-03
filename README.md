# DailyTrends
A daily news feed using Node.js, Express, TypeScript and Mongoose

 The app comes with many built-in features, such as a unit and integration tests, docker support, API documentation, etc. For more details, check the features list below.

## Installation

Please follow these steps:

Clone the repo:

```bash
git clone https://github.com/rgonca/DailyTrends.git
cd DailyTrends
```
Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Table of Contents

- [Features](#features)
- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Error Handling](#error-handling)
- [Validation](#validation)
- [Authentication](#authentication)
- [Authorization](#authorization)
- [Logging](#logging)
- [Custom Mongoose Plugins](#custom-mongoose-plugins)
- [Linting](#linting)
- [Contributing](#contributing)

## Features

- **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Testing**: unit and integration tests using [Jest](https://jestjs.io)
- **API documentation**: with [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc) and [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) 
- **Docker support**
- **Code coverage**: using [coveralls](https://coveralls.io)
- **Code quality**: with [Codacy](https://www.codacy.com)

## Commands

Running locally:

```bash
npm run dev
```

Testing:

```bash
# run all tests
npm run test

# run all tests in watch mode
npm run test:watch
```

Docker:

```bash
# run docker container for the mongoDB image
docker-compose up

```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=3000

# URL of the Mongo DB
MONGODB_URL=mongodb://127.0.0.1:27017/DailyTrends
```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--interfaces\     # TypeScript interfaces
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--app.js          # Express app
 |--index.js        # App entry point
```

[Architecture diagram](diagram.drawio.svg)
## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:3000/api-docs` in your browser. This documentation page is automatically generated using the [swagger](https://swagger.io/) definitions written as comments in the route files.

### API Endpoints

List of available routes:

**Feed routes**:\
`POST /v1/feeds` - create a feed\
`GET /v1/feeds` - get all feeds\
`GET /v1/feeds/:feedId` - get feed\
`PATCH /v1/feeds/:feedId` - update feed\
`DELETE /v1/feeds/:feedId` - delete feed\
`POST /v1/feeds/today` - stores todays feeds\
`GET /v1/feeds/today` - get all of todays feed
```
## Custom Mongoose Plugin

The app also contains a custom mongoose plugin that you can attach to any mongoose model schema. You can find it in `src/models/plugins`.

```javascript
const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const feedSchema = new Schema<IFeed>(
  {
    /* schema definition here */
  },
  { timestamps: true }
);

feedSchema.plugin(toJSON);

const feed = mongoose.model('Feed', feedSchema);
```

### toJSON

The toJSON plugin applies the following changes in the toJSON transform call:

- removes \_\_v, createdAt, updatedAt, and any schema path that has private: true
- replaces \_id with id

## License

[MIT](LICENSE)
