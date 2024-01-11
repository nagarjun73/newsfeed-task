require('dotenv').config()
const express = require('express')
const cors = require("cors")
const helmet = require("helmet")
const cronFunction = require('./app/helpers/cronFunction')
const configMongoDB = require('./app/config/mongodb')
const port = process.env.PORT || 3073

//Route imports
const userRoutes = require('./routes/userRoutes')
const feedRoutes = require('./routes/feedRoutes')
const categoryRoutes = require('./routes/categoryRoutes')

const app = express()

cronFunction()

//secure HTTP headers
app.use(helmet());
//converting data into json
app.use(express.json())
//cors enabled
app.use(cors())

//Connecting mongoDB
configMongoDB()

//user routes
app.use("/users", userRoutes)
app.use("/feeds", feedRoutes)
app.use("/categories", categoryRoutes)


app.listen(port, () => {
  console.log(`Server running at port ${port}`);
})

module.exports = app