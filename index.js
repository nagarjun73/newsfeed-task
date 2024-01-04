require('dotenv').config()
const express = require('express')
const cors = require("cors")
const port = process.env.PORT


const app = express()

//converting data into json
app.use(express.json())
//cors enabled
app.use(cors())



app.listen(port, () => {
  console.log(`Server running at port ${port}`);
})