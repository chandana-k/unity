import React from 'react';
import StockSearchItem from '../stockSearchItem';
import './stockSearchList.css';


const StockSearchList = (props) => {

  const stockItem = props.stockItems.map((stock) => {
    
      return (
        <StockSearchItem key={ stock.symbol }
                      symbol={ stock.symbol }
                      price={ stock.price }
                      timestamp={ stock.timestamp } 
        />
      );
  });

  return (
    <ul className="stock-list-container">
      { stockItem }
    </ul>
  )
}

export default StockSearchList;
