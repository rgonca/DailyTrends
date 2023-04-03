import Feed from "../models/feed.model";
import { IFeed } from "../interfaces/feed.interface";

/**
 * Create a feed
 * @param {IFeed} feedBody
 * @returns {Promise<Feed>}
 */

const createFeed = async (feedBody: IFeed) => {
    return Feed.create(feedBody)
}
/**
 * Get all feeds
 * @returns {Promise<Result>}
 */

const getFeeds = async () => {
    const feeds = await Feed.find()
    return feeds
}

/**
 * Get feed by id
 * @param {ObjectId} id
 * @returns {Promise<Feed>}
 */

const getFeedById = async (id: String) => {
    const feeds = await Feed.findById(id)
    return feeds
}

/**
 * Update feed by id
 * @param {ObjectId} feedId
 * @param {Object} updateBody
 * @returns {Promise<Feed>}
 */

const updateFeed = async (feedId: String, updateBody: IFeed) => {
    const feeds = await Feed.findByIdAndUpdate(feedId, updateBody, { new: true })
    return feeds
}

/**
 * Delete feed by id
 * @param {ObjectId} feedId
 * @returns {Promise<Feed>}
 */

const deleteFeed = async (feedId: String) => {
    const feeds = await Feed.findByIdAndDelete(feedId)
    return feeds
}
export default { createFeed, getFeeds, getFeedById, updateFeed, deleteFeed }