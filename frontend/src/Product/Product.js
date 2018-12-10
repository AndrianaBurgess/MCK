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

     
     uploadImage = (event) => {
       event.preventDefault();
       var storageRef = this.storage.ref();
       var userEmail = this.props.email;
       var fileName = 'testName';
       var imageRef = storageRef(userEmail + fileName + '.jpg');
       var testFile = 'testFile';
       imageRef.put(testFile).then(snapshot => {
         console.log(snapshot);
         this.setProductUrl(imageRef);
       });
     }
    

     setProductUrl = (imageRef) => {
       imageRef.getDownloadURL().then(url =>{
        var updatedProduct = this.state.product;
        updatedProduct.imageSrc = url;
        this.setState({product: updatedProduct});
       });
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
          <button>Modify</button>
          <button>Delete</button>
          <button>Choose file</button>
          <button>Upload File</button>
        </div>
      );
    }
}

export default Product;
