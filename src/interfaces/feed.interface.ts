import { Types } from "mongoose";

interface IFeed {
    headline?: string;
    url?: string;
    author?: string;
    location?: string;
    footer?: string;
    publishedAt?: string;
}

interface IFeedTest {
    headline: string | null;
    url?: string;
    author: string;
    location: string;
    footer: string;
    publishedAt?: string;
}

interface IFeedFixture {
    _id: Types.ObjectId,
    headline: string;
    url?: string;
    author: string;
    location: string;
    footer: string;
    publishedAt: string;
}

export {
    IFeed,
    IFeedTest,
    IFeedFixture
}