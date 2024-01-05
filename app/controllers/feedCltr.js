const axios = require('axios')
const { parseString } = require('xml2js')
const Feed = require('../model/feedModel')

const feedCltr = {}

feedCltr.getFeeds = async (req, res) => {
  const category = req.params.id
  try {
    const feedsApi = {
      recentStories: "rssfeedmostrecent",
      topStories: "rssfeedstopstories",
      india: "rssfeeds/-2128936835",
      world: "rssfeeds/296589292",
      nri: "rssfeeds/7098551",
      business: "rssfeeds/1898055",
      us: "rssfeeds_us/72258322",
      cricket: "rssfeeds/54829575",
      sports: "rssfeeds/4719148"
    }

    const feedresult = await axios.get(`https://timesofindia.indiatimes.com/${feedsApi[category]}.cms`)
    const resultInXml = feedresult.data


    const handleParsed = async (error, result) => {
      if (error) {
        return res.status(400).json(error)
      }

      //picking only array of feeds from result
      const parsedFeed = result.rss.channel[0].item


      //function saves array of feeds into database
      const saveFeedsToDb = (feedsArr) => {
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

      //check if feeds document exists in database
      const docCount = await Feed.countDocuments()

      if (docCount == 0) { //if not present
        saveFeedsToDb(parsedFeed)
        const allFeeds = await Feed.find()
        return res.json(allFeeds)
      }

      //if docs present

      const findFeedsByCat = await Feed.find({ category: category })
      res.json(findFeedsByCat)

      // saveFeedsToDb(parsedFeed)
    }

    //parsed XML
    parseString(resultInXml, handleParsed)

  } catch (e) {
    res.status(400).json(e)
  }
}


module.exports = feedCltr