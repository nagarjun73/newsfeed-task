const axios = require('axios')
const { parseString } = require('xml2js')
const feedCltr = {}

feedCltr.recentfeeds = async (req, res) => {
  try {
    const getRecentFeeds = await axios.get('https://timesofindia.indiatimes.com/rssfeedmostrecent.cms')
    const resultInXml = getRecentFeeds.data

    parseString(resultInXml, (error, result) => {
      if (error) {
        res.status(400).json(error)
      } else {
        const parsedFeed = result.rss.channel[0].item
        res.json(parsedFeed)
      }
    })

  } catch (e) {
    res.status(400).json(e)
  }
}


module.exports = feedCltr