const express = require('express')
const feedCltr = require('../app/controllers/feedCltr')

const router = express.Router()



router.get('/recentfeeds', feedCltr.recentfeeds)



module.exports = router