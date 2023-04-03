import Feed from "../models/feed.model";
import { IFeed } from "../interfaces/feed.interface";
import { scrapeElMundoNews, scrapeElPaisNews } from "../middlewares/scraper";

/**
 * Create a feed
 * @param {IFeed} feedBody
 * @returns {Promise<Feed>}
 */

const createFeed = async (feedBody: IFeed) => {
    return Feed.create(feedBody);
};

/**
 * stores feeds from the webscrapping after filtering possible repetitions
 * @param {String} date
 * @returns {Promise<Feeds>}
 */

const storeFeeds = async (date: string) => {
    let news: object[] = [];
    const elPaisNews = await scrapeElPaisNews();
    const elMundoNews = await scrapeElMundoNews();
    news = [...news, ...elPaisNews, ...elMundoNews];
    const currentFeeds = await Feed.find({ publishedAt: date });
    const result = news.filter((elm: IFeed) => {
        return !currentFeeds.some(
            (feed) => feed.headline === elm.headline && feed.url === elm.url
        );
    });
    const feeds = await Feed.insertMany(result);
    return feeds;
};

/**
 * Get all feeds
 * @returns {Promise<Result>}
 */

const getFeeds = async () => {
    const feeds = await Feed.find();
    return feeds;
};

/**
 * Get todays feeds, if there are no feeds those are introduced to database
 * @param {String} date
 * @returns {Promise<Result>}
 */

const getTodayFeeds = async (date: string) => {
    const todayFeeds = await Feed.find({ publishedAt: date });
    if (todayFeeds.length === 0) {
        const feeds = await storeFeeds(date);
        return feeds;
    }
    return todayFeeds;
};

/**
 * Get feed by id
 * @param {ObjectId} id
 * @returns {Promise<Feed>}
 */

const getFeedById = async (id: String) => {
    const feeds = await Feed.findById(id);
    return feeds;
};

/**
 * Update feed by id
 * @param {ObjectId} feedId
 * @param {Object} updateBody
 * @returns {Promise<Feed>}
 */

const updateFeed = async (feedId: String, updateBody: IFeed) => {
    const feeds = await Feed.findByIdAndUpdate(feedId, updateBody, { new: true });
    return feeds;
};

/**
 * Delete feed by id
 * @param {ObjectId} feedId
 * @returns {Promise<Feed>}
 */

const deleteFeed = async (feedId: String) => {
    const feeds = await Feed.findByIdAndDelete(feedId);
    return feeds;
};
export default {
    createFeed,
    storeFeeds,
    getFeeds,
    getTodayFeeds,
    getFeedById,
    updateFeed,
    deleteFeed
};
