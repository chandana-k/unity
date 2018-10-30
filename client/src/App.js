import React, { Component } from 'react';
// import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Footer from "./components/footer"
// import Jumbotron from "./components/jumbotron"
import Nav from "./components/navbar"
// import SearchForm from "./components/searchForm"
import UserDashboard from "./components/userDashboard";
// import StockItem from "./components/stockItem"
import Chart from './components/sChart';
import { getData } from "./utils/API.js"
import Auth from './utils/Auth';

import { TypeChooser } from "react-stockcharts/lib/helper";


// START OF SEARCH
import _ from 'lodash';
import axios from 'axios';
import StockSearchBar from './components/stockSearchBar';
import StockSearchList from './components/stockSearchList';
// END OF SEARCH

class ChartComponent extends React.Component {
	componentDidMount() {
		getData("FB").then(data => {
			this.setState({ data })
		})
	}
	render() {
		if (this.state == null) {
			return <div>Loading...</div>
		}
		return (
			<TypeChooser>
				{type => <Chart type={type} data={this.state.data} />}
			</TypeChooser>
		)
	}
}

class App extends Component {
  state = {
    loggedIn: false,
    user: null
  }

  //START OF SEARCH
  constructor() {
    super();

    this.state = {
      stocks: [],
      term: null,
      value: ''
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleClick(event) {
    if(event) event.preventDefault();
    this.setState({
      value: '',
      term: this.state.value
    });

    let term = this.state.value;
    const key = '4OC0HAE5XSEPU7WG';
    const url = `https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=${term}&apikey=${key}`;
    //GOOG, AAPL, MSFT, FB, AMZN, NFLX 
    axios.get(url)
    .then(res => {
      console.log(res.data);
      // flattenDeep() lodash function, which flattens nested arrays into one array.
      let stocks = _.flattenDeep( Array.from(res.data['Stock Quotes']).map((stock) => [{symbol: stock['1. symbol'], price: stock['2. price'], timestamp: stock['4. timestamp']}]) );
      console.log(stocks);
      this.setState((state, props) => {
        return {
          ...state,
        stocks
        }
      })
    })
    .catch(error => console.log(error))
  }

//END OF SEARCH

  componentDidMount() {
    Auth.getUser()
    .then(response => {
			console.log(response.data);
			if (!!response.data.user) {
				this.setState({
					loggedIn: true,
					user: response.data.user
				});
			} else {
				this.setState({
					loggedIn: false,
					user: null
				});
			}
		});
  }
	handleLogin = (user) => {
    Auth.login(user)
    .then(response => {
      console.log(response);
      if (response.status === 200) {
        this.setState({
          loggedIn: true,
          user: response.data.user
        });
      }
    });
  }
  handleLogout = (event) => {
    event.preventDefault();
    Auth.logout()
    .then(response => {
			console.log(response.data);
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				});
			}
		});
	}
  render() {
    // let stocks = this.state.stocks;
    const value = this.state.value;
    return (
      <div>
      <Nav handleLogin={this.handleLogin} handleLogout={this.handleLogout} />
        {this.state.loggedIn && (
          <div className="user-dash">
            <UserDashboard />
          </div>
        )}
        {!this.state.loggedIn && (
          <div>
            {/* <Jumbotron>
            
            </Jumbotron> */}
            {/* START OF SEARCH */}
            <div className="App">
              <StockSearchBar value={ value }
                    onChange={ this.handleChange }
                    onClick={ this.handleClick }/>
              <StockSearchList stockItems={ this.state.stocks }/>
            </div>
            {/* END OF SEARCH */}
            {/* <SearchForm /> */}
            <ChartComponent />
            {/* <StockItem /> */}
            <br></br>
            <Footer />
          </div>
        )}
        </div>
    )
  }   
};

export default App;