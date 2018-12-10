import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import ProductContainer from '../ProductContainer/ProductContainer';



class Login extends Component {

  render() {
    return (
        <div id="firebaseui-auth-container"></div>
    );
  }
}

export default Login;
