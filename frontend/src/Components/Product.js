import React, { Component } from 'react';
import firebase from 'firebase';

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
          product : props.product
        }
        this.storage = firebase.storage();
     }

     
   
     /**
      * Returns what button should display
      * based on if user has uploaded picture
      * before.
      */
     getButtonTextState = () => {
       // TODO
     }



    render() {
      return (
        <div>
          {/* <img src=""/> */}
          <h5> {this.state.product.brand} </h5>
          <h5> {this.state.product.name} </h5>
          <h5> {this.state.product.rating}/10 </h5>
        </div>
      );
    }
}

export default Product;
