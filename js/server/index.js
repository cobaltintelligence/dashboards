// content of index.js
const googleTrends =require('google-trends-api');
const http = require('http')
const express = require('express')
const exphbs = require('express-handlebars')

const port = 3001

const app = express()

// const requestHandler = (request, response) => {
//   console.log(request.url)
//   fetchTrends('bitcoin', console.log)
//   response.end('Hello Node.js Server!')
// }

const fetchTrends = (keywords, callback) => {
  var optionsObject = {
    keyword: keywords
  }
  googleTrends.interestOverTime(optionsObject, callback)
}

// const server = http.createServer(requestHandler)

// server.listen(port, (err) => {
//   if (err) {
//     return console.log('something bad happened', err)
//   }

//   console.log(`server is listening on ${port}`)
// })

app.use((request, response, next) => {
  console.log(request.headers)
  next()
})

app.use((request, response, next) => {
  request.chance = Math.random()
  next()
})

app.get('/', (request, response) => {
  response.json({
    chance: request.chance
  })
})

app.listen(3000)