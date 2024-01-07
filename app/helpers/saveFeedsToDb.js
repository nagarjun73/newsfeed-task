const Feed = require('../model/feedModel')

//function saves array of feeds into database
const saveFeedsToDb = (feedsArr, category) => {
  feedsArr.forEach(async (feed) => {
    //cleans any html tags in description
    function removeHtmlTag(text) {
      return text.replace(/(<([^>]+)>)/gi, '');
    };
    const finalDesc = removeHtmlTag(feed.description[0])

    const newFeed = new Feed()
    newFeed.title = feed.title[0]
    newFeed.description = finalDesc
    newFeed.link = feed.link[0]
    //added category
    newFeed.category = category
    newFeed.pubDate = feed.pubDate[0]
    await newFeed.save()
  })
}

module.exports = saveFeedsToDb