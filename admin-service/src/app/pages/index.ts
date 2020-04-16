import express from 'express';
import { mainPage } from './main';

const pages = express.Router();

pages.get('/', mainPage);

export { pages };
