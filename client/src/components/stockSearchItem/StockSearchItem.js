import React from 'react';
import './stockSearchItem.css';

const StockSearchItem = (stock, props) => {

  return (
    <li className="stock-search-item">
      <div><span>Stock Symbol: </span>{ stock.symbol }</div>
      {/* parseInt is used to convert the number to an integer and then used toFixed(2) to convert it to a number with 2 decimal places. Adding 2 decimal places to an integer will always result in .00 */}
      <div><span>Price: </span>${ parseInt(stock.price).toFixed(2) }</div>
      <div><span>Time: </span>{ stock.timestamp }</div>
    </li>
  )
}
export default StockSearchItem;
