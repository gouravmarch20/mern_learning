const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
// npm
const mongoose = require('mongoose')
const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
// coustom module
require('./db/connection')
// varible
const port = process.env.PORT || 5000
// ---Middleware
app.use(express.json()) // json data --> object data
app.use(cookieParser()) //cookie of browser access

// --- Import route

const authRoutes = require('./routes/auth.route')
//  ---My route
app.use('/', authRoutes)

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('./client/build'))
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
