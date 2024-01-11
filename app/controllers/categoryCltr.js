const _ = require('lodash')
const Category = require('../model/categoryModel')

const categoryCltr = {}

categoryCltr.getAll = async (req, res) => {
  try {
    const result = await Category.find()
    res.json(result)
  } catch (e) {
    res.status(400).json(e)
  }
}

categoryCltr.add = async (req, res) => {
  const body = _.pick(req.body, ['name', 'url'])
  try {
    const ctgry = new Category()
    ctgry.name = body.name
    ctgry.url = body.url
    const result = await ctgry.save()
    res.json(result)
  } catch (e) {
    res.status(400).json(e)
  }
}

categoryCltr.edit = async (req, res) => {
  const id = req.params.id
  const body = _.pick(req.body, ['name', 'url'])
  try {
    const result = await Category.findByIdAndUpdate(id, body, { new: true })
    res.json(result)
  } catch (e) {
    res.status(400).json(e)
  }
}

categoryCltr.delete = async (req, res) => {
  const id = req.params.id
  try {
    const result = await Category.findByIdAndDelete(id)
    res.json(result)
  } catch (e) {
    res.status(400).json(e)
  }
}

module.exports = categoryCltr