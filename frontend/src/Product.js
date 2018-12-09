import React, { Component } from 'react';

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
           id: props.id,
           name: props.name,
           brand: props.brand,
           type: props.type
        }
     }

  render() {
    return (
      <div>
        <img src=""/>
        <h1> {this.state.name} </h1>
        <button></button>
        <button></button>
      </div>
    );
  }
}

export default Product;
