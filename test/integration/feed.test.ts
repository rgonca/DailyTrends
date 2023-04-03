import "jest";
import request from "supertest";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import app from "../../src/app";
import setupTestDB from "../utils/setupTestDB";
import Feed from "../../src/models/feed.model";
import {
    feedOne,
    feedTwo,
    feedThree,
    insertFeeds
} from "../fixtures/feed.fixture";
import { IFeedTest } from "../../src/interfaces/feed.interface";
import currentDate from "../../src/utils/date";
setupTestDB();

describe("Feed routes", () => {
    describe("POST /api/v1/feeds", () => {
        let newFeed: IFeedTest;
        beforeEach(() => {
            newFeed = {
                headline: faker.lorem.sentence(),
                url: faker.internet.url(),
                author: faker.name.fullName(),
                location: faker.address.cityName(),
                footer: faker.lorem.sentence()
            };
        });
        test("should return 201 and successfully create new feed if data is ok", async () => {
            await insertFeeds([feedOne]);

            const res = await request(app)
                .post("/api/v1/feeds")
                .send(newFeed)
                .expect(httpStatus.CREATED);

            expect(res.body).toEqual({
                id: expect.anything(),
                headline: newFeed.headline,
                url: newFeed.url,
                author: newFeed.author,
                location: newFeed.location,
                footer: newFeed.footer,
                publishedAt: currentDate
            });

            const dbFeed = await Feed.findById(res.body.id);
            expect(dbFeed).toBeDefined();
            expect(dbFeed).toMatchObject({ headline: newFeed.headline });
        });
        test("should return 400 error if feed data is not correct", async () => {
            newFeed.headline = null;
            console.log("newFeed", newFeed);
            await request(app)
                .post("/api/v1/feeds")
                .send(newFeed)
                .expect(httpStatus.BAD_REQUEST);
        });
    });

    describe("POST /api/v1/feeds/today", () => {
        test("should return 200 and successfully store the new feeds", async () => {
            const res = await request(app)
                .post("/api/v1/feeds/today")
                .expect(httpStatus.OK);
        });
    });

    describe("GET /api/v1/feeds/today", () => {
        test("should return 200 and return a list of feeds", async () => {
            const res = await request(app)
                .get("/api/v1/feeds/today")
                .expect(httpStatus.OK);
        });
    });
    describe("GET /api/v1/feeds", () => {
        test("hould return 200 and an array of feeds", async () => {
            await insertFeeds([feedOne, feedTwo, feedThree]);

            const res = await request(app)
                .get("/api/v1/feeds")
                .send()
                .expect(httpStatus.OK);

            expect(res.body).toEqual(expect.any(Array));
            expect(res.body).toHaveLength(3);
            expect(res.body[0]).toEqual({
                id: feedOne._id.toHexString(),
                headline: feedOne.headline,
                url: feedOne.url,
                author: feedOne.author,
                location: feedOne.location,
                footer: feedOne.footer,
                publishedAt: feedOne.publishedAt
            });
        });
    });

    describe("GET /api/v1/feeds/:feedId", () => {
        test("should return 200 and the feed object if data is ok", async () => {
            await insertFeeds([feedOne]);

            const res = await request(app)
                .get(`/api/v1/feeds/${feedOne._id}`)
                .send()
                .expect(httpStatus.OK);

            expect(res.body).toEqual({
                id: feedOne._id.toHexString(),
                headline: feedOne.headline,
                url: feedOne.url,
                author: feedOne.author,
                location: feedOne.location,
                footer: feedOne.footer,
                publishedAt: feedOne.publishedAt
            });
        });

        test("should return 404 error if feed is not found", async () => {
            await insertFeeds([feedOne]);

            await request(app)
                .get(`/api/v1/feeds/${feedTwo._id}`)
                .send()
                .expect(httpStatus.NOT_FOUND);
        });
    });
    describe("DELETE /api/v1/feeds/:feedId", () => {
        test("should return 204 if data is ok", async () => {
            await insertFeeds([feedOne]);

            await request(app)
                .delete(`/api/v1/feeds/${feedOne._id}`)
                .send()
                .expect(httpStatus.NO_CONTENT);

            const dbFeed = await Feed.findById(feedOne._id);
            expect(dbFeed).toBeNull();
        });

        test("should return 404 error if feed already is not found", async () => {
            await insertFeeds([feedTwo]);

            await request(app)
                .delete(`/api/v1/feeds/${feedOne._id}`)
                .send()
                .expect(httpStatus.NOT_FOUND);
        });
    });
    describe("PATCH /api/v1/feeds/:feedId", () => {
        test("should return 200 and successfully update feed if data is ok", async () => {
            await insertFeeds([feedOne]);
            const updateBody: IFeedTest = {
                headline: faker.lorem.sentence(),
                url: faker.internet.url(),
                author: faker.name.fullName(),
                location: faker.address.cityName(),
                footer: faker.lorem.sentence()
            };

            const res = await request(app)
                .patch(`/api/v1/feeds/${feedOne._id}`)
                .send(updateBody)
                .expect(httpStatus.OK);

            expect(res.body).toEqual({
                id: feedOne._id.toHexString(),
                headline: updateBody.headline,
                url: updateBody.url,
                author: updateBody.author,
                location: updateBody.location,
                footer: updateBody.footer,
                publishedAt: feedOne.publishedAt
            });

            const dbFeed = await Feed.findById(feedOne._id);
            expect(dbFeed).toBeDefined();
            expect(dbFeed).toMatchObject({ headline: updateBody.headline });
        });

        test("should return 404 if admin is updating another feed that is not found", async () => {
            await insertFeeds([feedTwo]);
            const updateBody: IFeedTest = {
                headline: faker.lorem.sentence(),
                url: faker.internet.url(),
                author: faker.name.fullName(),
                location: faker.address.cityName(),
                footer: faker.lorem.sentence()
            };
            await request(app)
                .patch(`/api/v1/feeds/${feedOne._id}`)
                .send(updateBody)
                .expect(httpStatus.NOT_FOUND);
        });
    });
});
