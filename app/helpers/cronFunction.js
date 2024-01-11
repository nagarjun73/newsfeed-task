const { parseString } = require('xml2js')
const cron = require('node-cron');
const Feed = require('../model/feedModel')
const Category = require('../model/categoryModel')
const saveFeedsToDb = require('./saveFeedsToDb')
const axios = require('axios')

const cronFunction = () => {
  cron.schedule('*/30 * * * * *', async () => {
    try {

      const categories = await Category.find()

      for (const cat of categories) {

        const feedresult = await axios.get(cat.url)
        const resultInXml = feedresult.data

        //parseString callback function
        const handleParsed = async (error, result) => {
          if (error) {
            console.log(error)
          }

          //picking only array of feeds from result
          const parsedFeed = result.rss.channel[0].item

          //check if feeds document exists in database
          const docCount = await Feed.countDocuments({ category: cat._id })

          if (docCount == 0) { //if not present
            saveFeedsToDb(parsedFeed, cat._id)
          } else {

            //if docs present
            //Find latest Document by category
            const latestByCat = await Feed.find({ category: cat._id }).sort({ pubDate: -1 }).limit(1)

            //find all feeds greater than lates document from parsed result
            const feedsGrtrThnLatest = parsedFeed.filter((ele) => {
              return new Date(ele.pubDate[0]) > latestByCat[0].pubDate
            })

            //send feeds greater than latest
            saveFeedsToDb(feedsGrtrThnLatest, cat._id)
          }
        }
        //parsed XML
        parseString(resultInXml, handleParsed)
      }
      console.log('nodecron--->');
    } catch (e) {
      console.log(e);
    }

  });
}

module.exports = cronFunction