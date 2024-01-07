require('dotenv').config()
const express = require('express')
const cors = require("cors")
const configMongoDB = require('./app/config/mongodb')
const port = process.env.PORT

//Route imports
const userRoutes = require('./routes/userRoutes')
const feedRoutes = require('./routes/feedRoutes')

const app = express()


//converting data into json
app.use(express.json())
//cors enabled
app.use(cors())

//Connecting mongoDB
configMongoDB()

//user routes
app.use("/users", userRoutes)
app.use("/feeds", feedRoutes)


app.listen(port, () => {
  console.log(`Server running at port ${port}`);
})

module.exports = app