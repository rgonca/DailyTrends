import { Types } from "mongoose";

interface IFeed {
    title: string;
}

interface IFeedUnitTest {
    title: string | null;
}

interface IFeedIntegrationTest {
    _id: Types.ObjectId,
    title: string;
}
export {
    IFeed,
    IFeedUnitTest,
    IFeedIntegrationTest
}