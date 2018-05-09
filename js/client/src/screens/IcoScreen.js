import React, { Component } from 'react';
import axios from 'axios'
import autoBind from 'react-autobind';
import googleTrends from 'google-trends-api';
import moment from 'moment'
import {
  Area,
  AreaChart, 
  Bar,
  BarChart,
  Brush, 
  CartesianGrid,
  Label,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

const fetchUpcoming = (callback) => {
  axios.get('https://api.icowatchlist.com/public/v1/upcoming')
    .then(function(response) {
      callback(response.data.ico.upcoming)
    })
    .catch(function(error) {
      console.log(error);
    })
}

const fetchTrends = (keywords, callback) => {

  axios.get('/upcoming', {
    params: {
      keyword: keywords
    }
  })
  .then(function(response) {
    callback(response.data.default.timelineData)
  })
  .catch(function(error) {
    console.log(error);
  })
}

const fetchNews = (topic, callback) => {
  axios.get('/news', {
    params: {
      topic: topic
    }
  })
  .then(function(response) {
    callback(response.data)
  })
  .catch(function(error) {
    console.log(error);
  })
}

const hline = (color) => {
  return (
    <div 
      style={{
        backgroundColor: color, 
        flex: 1,
        display: 'flex',
        minHeight: 2,
        maxHeight: 2,
        width: 100
      }}/>
  )
}

const cobaltBlue = (opacity) => {
  return 'rgba(0, 0, 153,' + opacity + ')'
}

const green = (opacity) => {
  return 'rgba(40, 163, 134,' + opacity + ')'
}

export default class IcoScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      upcoming: [],
      news: [],
      keyword: 'Kasko2go'
    }
    // this.setState = this.setState.bind(this)
    autoBind(this);
  }

  componentDidMount() {
    fetchUpcoming(this.loadUpcoming)
    fetchTrends(this.state.keyword, this.loadTrends)
    fetchNews(this.state.keyword, this.loadNews)
  }

  loadUpcoming(upcoming) {
    this.setState({ upcoming })
  }

  loadTrends(trends) {
    if (trends.length < 1) {
      trends = [
        {
          value: 0,
          formattedTime: 'No Data'
        }
      ]
    }
    this.setState({ trends })
  }

  loadNews(news) {
    console.log('news', news)
    this.setState({ news: news.articles })
  }

  changeKeyword(newKeyword) {
    this.setState({ 
      keyword: newKeyword
    })
    fetchTrends(newKeyword, this.loadTrends)
  }



  render() {
    return (
      <div style={styles.container}>
        <div style={{
          ...styles.col, 
          ...styles.sidebar
          }}>
          <h1>
            Upcoming ICOs
          </h1>
          {hline('black')}
          <br/>

          {
            this.state.upcoming.map(
              (item, index) => 
                <a 
                  style={{
                    ...styles.icoBox,
                    ...{
                      backgroundColor: this.state.keyword == item.name ? cobaltBlue(0.2) : cobaltBlue(1)
                    }
                  }}
                  key={item.name}
                  style={styles.icoLink}
                  href="#"
                  onClick={()=>this.changeKeyword(item.name)}>
                  <p style={{
                    ...styles.p,
                    ...{color: this.state.keyword == item.name ? green(0.5) : cobaltBlue(0.5)}}}>
                    {moment(item.end_time).format('MMM Do')}
                  </p>
                  <h3 style={{
                    ...styles.h3,
                    ...{color: this.state.keyword == item.name ? green(1) : cobaltBlue(1)}}}>
                    {item.name}
                  </h3>
                </a>
              )
              
          }
        </div>

        <div style={{
          ...styles.col, 
          ...{flex: 3}}}>
          <h1 style={{color: green(1)}}>
            {this.state.keyword}
          </h1>
          {hline(green(1))}
          <br/>

          <h3>
            {"Global Interest in " + this.state.keyword}
          </h3>
          <BarChart width={730} height={250} data={this.state.trends}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              tickSize={6}
              dataKey="formattedTime"/>
            <YAxis dataKey="value">
              <Label 
                position="left"
                offset={0}
                value="Interest"/>
            </YAxis>
            <Brush 
              dataKey='formattedTime' 
              height={30} 
              stroke={cobaltBlue(1)}/>
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Bar type='monotone' dataKey='value' stackId="1" stroke='#000099' fill='#000099' />
          </BarChart>

          <br/>
          <h3>
            News
          </h3>
          {
            this.state.news.map(
              (item, index) => 
                <a 
                  style={{
                    ...styles.icoBox,
                    ...{
                      backgroundColor: cobaltBlue(0.2)
                    }
                  }}
                  key={item.url}
                  style={styles.icoLink}
                  href={item.url}
                  onClick={()=>this.changeKeyword(item.name)}>
                  <p style={styles.p}>
                    {moment(item.publishedAt).format('MMM Do HH:mm')}
                  </p>
                  <h3 style={styles.h3}>
                    {item.description}
                  </h3>
                </a>
              )
              
          }
        </div>
      </div>
    );
  }
}

let styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'stretch'
  },
  sidebar: {
    minWidth: 240,
  },
  col: {
    display: 'flex',
    margin: 10,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  icoLink: {
    color: '#000099',
    textDecoration: 'none'
  },
  icoBox: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    display: 'flex',
    margin: 10,
    flex: 0,
    padding: 5,
  },
  h3: {
    textAlign: 'start',
    margin: 0,
    marginBottom: 15
  },
  p: {
    marginBottom: 5,
    textAlign: 'start',
    marginTop: 15,
    margin: 0,
    opacity: 0.5
  }

}
