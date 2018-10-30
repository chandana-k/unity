import axios from "axios";
import { tsvParse, csvParse } from  "d3-dsv";
import { csv } from "d3-request";
import { timeParse } from "d3-time-format";

export default {
  auth: (user) => {
    console.log(user)
    return axios.post('/login', user)
  },
  register: (user) => {
    console.log(user)
    return axios.post('/register', user)
  },
  // stockSearch (ticker) {
  //   const API_KEY = 'NSUNV8LPVSSN0247'
  //   const url = 'https://www.alphavantage.co/query?' +
  //           'function=TIME_SERIES_DAILY' + 
  //           '&symbol=' + ticker +
  //           '&apikey=' + API_KEY +
  //           '&outputsize=full'
  //   return axios.get(url)
  // }
};

function parseData(parse) {
  return function(d) {
    return {
      date: parse(d.timestamp),
      open: +d.open,
      high: +d.high,
      low: +d.low,
      close: +d.close,
      volume: +d.volume
    }
  }
};

const parseDate = timeParse("%Y-%m-%d %H:%M:%S");


function stockDataPromise() {
  return new Promise(function(resolve, reject) {
    csv('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=demo&datatype=csv', function(data) {
      resolve(data)
    })
  }) 
}

export function getData() {
  const data = stockDataPromise()
    .then(response => {
      const arr = response
      const newArr = arr.map(parseData(parseDate))
      return newArr
  })
  return data
}