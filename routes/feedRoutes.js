const express = require('express')
const feedCltr = require('../app/controllers/feedCltr')

const router = express.Router()



router.get(`/:id`, feedCltr.getFeeds)

module.exports = router