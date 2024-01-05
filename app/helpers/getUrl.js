

const getUrl = (category) => {

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

  return `https://timesofindia.indiatimes.com/${feedsApi[category]}.cms`
}


module.exports = getUrl