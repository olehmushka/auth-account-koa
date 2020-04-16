import express from 'express';
import { pages } from './pages';

const router = express.Router();

/* GET home page. */
router.use('/pages', pages);

export { router };
