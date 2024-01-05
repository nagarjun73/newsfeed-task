const axios = require('axios')
const { parseString } = require('xml2js')
const Feed = require('../model/feedModel')
const getUrl = require('../helpers/getUrl')
const saveFeedsToDb = require('../helpers/saveFeedsToDb')

const feedCltr = {}

feedCltr.getFeeds = async (req, res) => {
  const category = req.params.id
  console.log(category);
  try {
    const feedresult = await axios.get(getUrl(category))
    const resultInXml = feedresult.data

    //parseString callback function
    const handleParsed = async (error, result) => {
      if (error) {
        return res.status(400).json(error)
      }

      //picking only array of feeds from result
      const parsedFeed = result.rss.channel[0].item



      //check if feeds document exists in database
      const docCount = await Feed.countDocuments({ category: category })

      if (docCount == 0) { //if not present
        saveFeedsToDb(parsedFeed, category)
        const allFeeds = await Feed.find({ category: category }).sort({ pubDate: -1 })
        return res.json(allFeeds)
      } else {

        //if docs present
        //Find latest Document by category
        const latestByCat = await Feed.find({ category: category }).sort({ pubDate: -1 }).limit(1)

        //find all feeds greater than lates document from parsed result
        const feedsGrtrThnLatest = parsedFeed.filter((ele) => {
          return new Date(ele.pubDate[0]) > latestByCat[0].pubDate
        })

        //send feeds greater than latest
        saveFeedsToDb(feedsGrtrThnLatest, category)

        //find all feeds by category 
        const allFeeds = await Feed.find({ category: category }).sort({ pubDate: -1 })
        res.json(allFeeds)
      }

    }

    //parsed XML
    parseString(resultInXml, handleParsed)

  } catch (e) {
    res.status(400).json(e)
  }
}


module.exports = feedCltr