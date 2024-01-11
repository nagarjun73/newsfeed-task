const Feed = require('../model/feedModel')

const feedCltr = {}

feedCltr.getFeeds = async (req, res) => {
  const category = req.params.id
  try {
    const allFeeds = await Feed.find({ category: category }).sort({ pubDate: -1 })
    res.json(allFeeds)
  } catch (e) {
    res.status(400).json(e)
  }
}


module.exports = feedCltr