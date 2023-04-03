import { faker } from "@faker-js/faker";
import Feed from "../../../src/models/feed.model";
import { IFeedUnitTest } from "../../../src/interfaces/feed.interface";
describe('Feed model', () => {
    describe('Feed validation', () => {
        let newFeed: IFeedUnitTest;
        beforeEach(() => {
            newFeed = {
                title: faker.lorem.sentence()
            }
        })

        test('should correctly validate a valid feed', async () => {
            await expect(new Feed(newFeed).validate()).resolves.toBeUndefined();
        });

        test('should throw a validation error if title is null', async () => {
            newFeed.title = null;
            await expect(new Feed(newFeed).validate()).rejects.toThrow();
        });
    })
})