import React, { Component } from 'react';
import firebase from 'firebase';
import ProductContainer from './Containers/ProductContainer';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

class App extends Component {

  constructor(){
    super();
    this.state = { currUser : null }
    this.uiConfig = {
      callbacks : {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          return false;
        }
      },
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({currUser : user});
    });
  }

  render() {
    return (
      <div className="App">
      {
        this.state.currUser != null ? 
        (<ProductContainer currUser={this.state.currUser} />) : 
        (<StyledFirebaseAuth  uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />)
      }
      </div>
    );
  }
}

export default App;