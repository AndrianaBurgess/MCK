import React, { Component } from 'react';
import firebase from 'firebase';

class AddButton extends Component {

    constructor(){
        super();
        this.firestore = firebase.firestore();
    }

    uploadProduct = () => {
        var userEmail = this.props.email;
        var product = this.props.product;

        this.firestore.collection('users')
        .doc(userEmail).collection('products')
        .doc(product['id']).set(product);
    }

    render() {
        return (
            <button onClick={this.uploadProduct}> Save </button>
        );
      }
}

export default AddButton;