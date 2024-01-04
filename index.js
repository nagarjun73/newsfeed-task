require('dotenv').config()
const express = require('express')
const cors = require("cors")
const mongoose = require('mongoose')
const port = process.env.PORT

//Route imports
const userRoutes = require('./routes/userRoutes')

const app = express()

//converting data into json
app.use(express.json())
//cors enabled
app.use(cors())

//user routes
app.use("/user", userRoutes)


app.listen(port, () => {
  console.log(`Server running at port ${port}`);
})

module.exports = app