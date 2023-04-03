import mongoose, { Types } from "mongoose";
import { faker } from "@faker-js/faker";
import Feed from "../../src/models/feed.model";
import { IFeedIntegrationTest } from "../../src/interfaces/feed.interface";

const feedOne: IFeedIntegrationTest = {
    _id: new mongoose.Types.ObjectId(),
    title: faker.lorem.sentence(),
};

const feedTwo: IFeedIntegrationTest = {
    _id: new mongoose.Types.ObjectId(),
    title: faker.lorem.sentence(),
};

const feedThree: IFeedIntegrationTest = {
    _id: new mongoose.Types.ObjectId(),
    title: faker.lorem.sentence(),
};

const insertFeeds = async (feeds: any[]) => {
    await Feed.insertMany(feeds);
};

export {
    feedOne,
    feedTwo,
    feedThree,
    insertFeeds,
};