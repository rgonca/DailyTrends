import { Router } from 'express';
import { createFeed, getFeeds, getFeed, updateFeed, deleteFeed } from '../../controllers/feed.controller';

const router = Router();

router.post('/', createFeed)
router.get('/', getFeeds)
router.get('/:feedId', getFeed)
router.patch('/:feedId', updateFeed)
router.delete('/:feedId', deleteFeed)

export default router