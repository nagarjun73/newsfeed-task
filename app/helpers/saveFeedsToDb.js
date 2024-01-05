const Feed = require('../model/feedModel')

//function saves array of feeds into database
const saveFeedsToDb = (feedsArr, category) => {
  feedsArr.forEach(async (feed) => {
    const newFeed = new Feed()
    newFeed.title = feed.title[0]
    newFeed.description = feed.description[0]
    newFeed.link = feed.link[0]
    //added category
    newFeed.category = category
    newFeed.pubDate = feed.pubDate[0]
    await newFeed.save()
  })
}

module.exports = saveFeedsToDb