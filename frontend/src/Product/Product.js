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
        {/* <img src=""/> */}
        <h5> {this.state.brand} </h5>
        <h5> {this.state.name} </h5>
        <h5> {this.state.rating}/10 </h5>
        <button>Modify</button>
        <button>Delete</button>
      </div>
    );
  }
}

export default Product;
