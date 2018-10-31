import axios from "axios";
import { csv } from "d3-request";
import { timeParse } from "d3-time-format";

export default {
  stockSearch (ticker) {
    const API_KEY = 'NSUNV8LPVSSN0247'
    const url = 'https://www.alphavantage.co/query?' +
            'function=TIME_SERIES_INTRADAY' + 
            '&symbol=' + ticker +
            '&apikey=' + API_KEY +
            '&datatype=csv';
    return axios.get(url);
  },
  companySearch (ticker) {
    const url = 'https://api.iextrading.com/1.0/stock/' + ticker + '/batch?types=quote,news&range=1m&last=5';
    return axios.get(url);
  }
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

function stockDataPromise(url) {
  return new Promise(function(resolve, reject) {
    csv(url, function(data) {
      resolve(data)
    })
  }) 
}

export function getData(ticker) {
  const data = stockSearch(ticker)
    .then(response => {
      const arr = response
      const newArr = arr.map(parseData(parseDate))
      console.log(newArr)
      return newArr
  })
  return data
}