import mongoose, { Types } from "mongoose";
import { faker } from "@faker-js/faker";
import Feed from "../../src/models/feed.model";
import { IFeedFixture } from "../../src/interfaces/feed.interface";
import currentDate from "../../src/utils/date";

const feedOne: IFeedFixture = {
    _id: new mongoose.Types.ObjectId(),
    headline: faker.lorem.sentence(),
    url: faker.internet.url(),
    author: faker.name.fullName(),
    location: faker.address.cityName(),
    footer: faker.lorem.sentence(),
    publishedAt: currentDate
};

const feedTwo: IFeedFixture = {
    _id: new mongoose.Types.ObjectId(),
    headline: faker.lorem.sentence(),
    url: faker.internet.url(),
    author: faker.name.fullName(),
    location: faker.address.cityName(),
    footer: faker.lorem.sentence(),
    publishedAt: currentDate
};

const feedThree: IFeedFixture = {
    _id: new mongoose.Types.ObjectId(),
    headline: faker.lorem.sentence(),
    url: faker.internet.url(),
    author: faker.name.fullName(),
    location: faker.address.cityName(),
    footer: faker.lorem.sentence(),
    publishedAt: currentDate
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