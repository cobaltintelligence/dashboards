const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const axios = require('axios');
const googleTrends =require('google-trends-api');
var async = require('async')


const app = express();

app.use(express.static(path.join(__dirname, 'build')));

const fetchTrends = (keywords, callback) => {
  var optionsObject = {
    keyword: keywords
  }
  googleTrends.interestOverTime(optionsObject, callback)
}

app.get('/upcoming', function (req, res) {
	if (!('keyword' in req.query)) {
		res.status(400).send("No keyword(s) provided")
	}

	var optionsObject = {
    keyword: req.query.keyword,
    startTime: new Date(1515817029529)
  }

  googleTrends.interestOverTime(optionsObject).then(function(data) {
  	res.send(data)
  	}
  )
});

app.get('/news', function (req, res) {
	if (!('topic' in req.query)) {
		res.status(400).send("No topic(s) specificed")
	}

	axios.get('https://newsapi.org/v2/everything', {
    params: {
      q: req.query.topic,
      apiKey: process.env.NEWS_API_KEY
    }
  })
  .then(function(response) {
    res.send(response.data)
  })
  .catch(function(error) {
    console.log(error);
  })

})

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(process.env.PORT || 8080);