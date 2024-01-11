const { Schema, model } = require('mongoose')

const feedSchema = new Schema({
  title: String,
  description: String,
  link: String,
  category: { type: Schema.Types.ObjectId, ref: "Category", default: null },
  pubDate: Schema.Types.Date
}, { timestamps: true })

const Feed = model("Feed", feedSchema)

module.exports = Feed