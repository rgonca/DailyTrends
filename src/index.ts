import mongoose, { ConnectOptions } from "mongoose";
import "dotenv/config";
import config from "./config/config";
import app from "./app";

mongoose
    .connect(config.mongoose.url, config.mongoose.options as ConnectOptions)
    .then((x) => {
        app.listen(config.port, () => {
            console.info(`Listening to port ${config.port}`);
        });
        console.log(`Connected to Mongo! Database name: ${x.connections[0].name}`);
    });
