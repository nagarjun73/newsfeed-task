const express = require('express')
const categoryCltr = require('../app/controllers/categoryCltr')
const authentication = require('../app/middlewares/authentication')

const router = express.Router()

router.get(`/all`, authentication, categoryCltr.getAll)
router.post('/add', authentication, categoryCltr.add)
router.put('/edit/:id', authentication, categoryCltr.edit)
router.delete('/delete/:id', authentication, categoryCltr.delete)

module.exports = router