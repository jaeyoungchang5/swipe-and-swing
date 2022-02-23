/**
 * @fileoverview router.ts
 * This file provides all the API endpoint routes for the server.
 */

/* import dependencies */
import express, { Response, Request, Router } from 'express';
const router: Router = express.Router(); // activate router
import { debuglog } from '../helpers';
// import { upload } from '../config';

/* link controllers */

/* ROUTE ENDPOINTS */

// test
router.get('/test', (req: Request, res: Response): void => {
    debuglog('LOG', 'router - test', 'Router Test Success');
    res.json({'result': 'router test success'});
});

export {
    router
};