import { Request, Response } from "express";
import feedService from "../services/feed.service";
import httpStatus from "http-status";
import { IFeed } from "../interfaces/feed.interface";

const createFeed = async (req: Request, res: Response) => {
    try {
        const { title } = req.body as IFeed
        if (!title) {
            res.status(httpStatus.BAD_REQUEST).send('Invalid feed data');
            return;
        }
        const feed = await feedService.createFeed(req.body as IFeed)
        res.status(httpStatus.CREATED).send(feed)
    } catch (error) {
        res.send(error);
    }
}

const getFeeds = async (req: Request, res: Response) => {
    try {
        const feeds = await feedService.getFeeds()
        res.status(httpStatus.OK).send(feeds)
    } catch (error) {
        res.send(error);
    }
};

const getFeed = async (req: Request, res: Response) => {
    try {
        const feed = await feedService.getFeedById(req.params.feedId)
        if (!feed) {
            return res.status(httpStatus.NOT_FOUND).send()
        }
        res.status(httpStatus.OK).send(feed)
    } catch (error) {
        res.send(error);
    }
};

const updateFeed = async (req: Request, res: Response) => {
    try {
        const feed = await feedService.getFeedById(req.params.feedId)
        if (!feed) {
            return res.status(httpStatus.NOT_FOUND).send()
        }
        const { title } = req.body as IFeed
        if (!title) {
            res.status(httpStatus.BAD_REQUEST).send('Invalid feed data');
            return;
        }
        const updatedFeed = await feedService.updateFeed(req.params.feedId, req.body as IFeed)
        return res.status(httpStatus.OK).send(updatedFeed)
    } catch (error) {
        res.send(error);
    }
};

const deleteFeed = async (req: Request, res: Response) => {
    try {
        const feed = await feedService.getFeedById(req.params.feedId)
        if (!feed) {
            return res.status(httpStatus.NOT_FOUND).send()
        }
        const deletedFeed = await feedService.deleteFeed(req.params.feedId)

        return res.status(httpStatus.NO_CONTENT).send(deletedFeed)
    } catch (error) {
        res.send(error);
    }
};

export { createFeed, getFeeds, getFeed, updateFeed, deleteFeed };
