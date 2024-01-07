const mongoose = require('mongoose');
const url = process.env.DB_URL
const name = process.env.DB_NAME

//database connection
const configMongoDB = async () => {
  try {
    await mongoose.connect(`${url}/${name}`)
    console.log("Connected to database");
  } catch {
    console.log("Error connecting to database");
  }
}

module.exports = configMongoDB