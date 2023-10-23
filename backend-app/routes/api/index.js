const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./usersRoute.js');
const threadRouter = require('./threadsRoute.js');
const topicRouter = require('./topicRoute.js');
//const { restoreUser } = require("../../utils/auth.js");


//router.use(restoreUser);

//router.use('/session', sessionRouter);

router.use('/user', usersRouter);

router.use('/thread', threadRouter);

router.use('/topic', topicRouter);

module.exports = router