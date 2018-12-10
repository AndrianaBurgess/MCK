import React, { Component } from 'react';

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
          product : props.product
        }
     }

  render() {
    return (
      <div>
        {/* <img src=""/> */}
        <h5> {this.state.product.brand} </h5>
        <h5> {this.state.product.name} </h5>
        <h5> {this.state.product.rating}/10 </h5>
        <button>Modify</button>
        <button>Delete</button>
      </div>
    );
  }
}

export default Product;
