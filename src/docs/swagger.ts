import config from "../config/config"
import { SwaggerOptions } from 'swagger-ui-express';
import { feedPaths, feedSchema, feedDefinitions, feedParameters } from "./feeds.swagger"
const swaggerDocument: SwaggerOptions = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'DailyTrends API documentation',
        description: 'your descriptxzxzion here',
        termsOfService: '',
        contact: {
            name: 'Roberto Gonzalez',
            email: 'rob.gonzalez3@gmail.com'
        },
        license: {
            name: 'MIT',
            url: 'https://github.com/rgonca/DailyTrends/blob/main/LICENSE'
        },
    },
    servers: [
        {
            url: `http://localhost:${config.port}/api/v1`,
            description: 'Local server'
        }
    ],
    tags: [
        {
            name: "Feeds",
            description: "APIs for managing news Feeds",
        },
    ],
    paths: {
        "/feeds": feedPaths.feeds,
        "/feeds/{id}": feedPaths.feedsId,
        "/feeds/today": feedPaths.todayFeeds
    },
    definitions: {
        Feed: feedDefinitions
    },
    schemas: {
        Feed: feedSchema

    },
    parameters: {
        Feed: feedParameters
    },
};
export default swaggerDocument 