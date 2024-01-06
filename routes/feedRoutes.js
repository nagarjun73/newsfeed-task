const express = require('express')
const feedCltr = require('../app/controllers/feedCltr')
const authentication = require('../app/middlewares/authentication')


const router = express.Router()

router.get(`/`, authentication, feedCltr.getFeeds)

module.exports = router