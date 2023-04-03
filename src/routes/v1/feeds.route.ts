import { Router } from 'express';
import { createFeed, getFeeds, getFeed, updateFeed, deleteFeed, getTodayFeeds, storeTodayFeeds } from '../../controllers/feed.controller';

const router = Router();

router.route('/').post(createFeed).get(getFeeds)
router.route('/today').post(storeTodayFeeds).get(getTodayFeeds)
router.route('/:feedId').get(getFeed).patch(updateFeed).delete(deleteFeed)

export default router