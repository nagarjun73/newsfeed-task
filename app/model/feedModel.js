const { Schema, model } = require('mongoose')

const feedSchema = new Schema({
  title: String,
  description: String,
  link: String,
  category: String,
  pubDate: Schema.Types.Date
}, { timestamps: true })

const Feed = model("Feed", feedSchema)

module.exports = Feed