import { faker } from "@faker-js/faker";
import Feed from "../../../src/models/feed.model";
import { IFeedTest } from "../../../src/interfaces/feed.interface";
import currentDate from "../../../src/utils/date";

describe('Feed model', () => {
    describe('Feed validation', () => {
        let newFeed: IFeedTest;
        beforeEach(() => {
            newFeed = {
                headline: faker.lorem.sentence(),
                url: faker.internet.url(),
                author: faker.name.fullName(),
                location: faker.address.cityName(),
                footer: faker.lorem.sentence(),
                publishedAt: currentDate
            }
        })

        test('should correctly validate a valid feed', async () => {
            await expect(new Feed(newFeed).validate()).resolves.toBeUndefined();
        });

        test('should throw a validation error if title is null', async () => {
            newFeed.headline = null;
            await expect(new Feed(newFeed).validate()).rejects.toThrow();
        });
    })
})