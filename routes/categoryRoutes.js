const express = require('express')
const categoryCltr = require('../app/controllers/categoryCltr')
const authentication = require('../app/middlewares/authentication')
const { checkSchema } = require('express-validator')
const { categoryValidationSchema } = require('../app/helpers/categoryValidation')

const router = express.Router()

router.get(`/all`, authentication, categoryCltr.getAll)
router.post('/add', authentication, checkSchema(categoryValidationSchema), categoryCltr.add)
router.put('/edit/:id', authentication, checkSchema(categoryValidationSchema), categoryCltr.edit)
router.delete('/delete/:id', authentication, categoryCltr.delete)

module.exports = router