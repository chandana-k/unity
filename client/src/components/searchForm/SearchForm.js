// import React, { Component } from "react";
// import "./searchForm.css";
// import API from '../../utils/API';

// export default class SearchFrom extends Component {
//   state = {
//     search: ''
//   }
//   handleChange = name => event => {
//     this.setState({
//       [name]: event.target.value,
//     });
//   };
//   handleSubmit = event => {
//     event.preventDefault();
//     API.stockSearch(this.state.search)
//     .then(response => console.log(response.data))
//     .catch(err => console.log(err))
//   }
//   render() {
//     return (
//       <div className="searchForm">
//         search me
//         <form onSubmit={this.handleSubmit}>
//           <input
//             name="search"
//             type="text"
//             value={this.state.search}
//             onChange={this.handleChange('search')} 
//           />
//           <button type="submit">Search</button>
//         </form>
//       </div>
//     );
//   }
// }
