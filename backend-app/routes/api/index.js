const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./usersRoute.js');
const threadRouter = require('./threadsRoute.js');
const topicRouter = require('./topicRoute.js');
const { restoreUser } = require("../../utils/auth.js");


router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/threads', threadRouter);

router.use('/topics', topicRouter);
