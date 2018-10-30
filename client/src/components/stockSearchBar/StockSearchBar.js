import React from 'react';
import './stockSearchBar.css';

function StockSearchBar(props) {

    return  (
      <div className="stock-search-bar">
        <form className="search-stockbar-form">
          <input className="search-stockbar-input"
                 value={ props.value }
                 onChange={ props.onChange } />
          <button className="search-stockbar-button" onClick={ props.onClick }>search</button>
        </form>
      </div>
    );
}

export default StockSearchBar;
