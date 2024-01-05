const axios = require('axios')

const feedCltr = {}

feedCltr.recentfeeds = async (req, res) => {
  try {
    const getRecentFeeds = await axios.get('https://timesofindia.indiatimes.com/rssfeedmostrecent.cms')
    res.json(getRecentFeeds.data);
  } catch (e) {
    res.json(e)
  }
}


module.exports = feedCltr