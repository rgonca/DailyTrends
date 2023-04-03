import mongoose, { ConnectOptions } from "mongoose";
import config from "../../src/config/config";

console.log("config.mongoose.url", config.mongoose.url);

const setupTestDB = () => {
    beforeAll(async () => {
        await mongoose.connect(
            config.mongoose.url,
            config.mongoose.options as ConnectOptions
        );
    });

    beforeEach(async () => {
        await Promise.all(
            Object.values(mongoose.connection.collections).map(
                async (collection: any) => collection.deleteMany()
            )
        );
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });
};

export default setupTestDB;
