import React, { Component } from 'react';
import firebase from 'firebase';
import ProductContainer from './Containers/ProductContainer';
import CalendarContainer from './Containers/CalendarContainer';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Form from 'react-bootstrap/lib/Form';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';

class App extends Component {

  constructor() {
    super();
    this.state = { currUser: null, isCalendarVisible: false }
    this.uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
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
      this.setState({ currUser: user });
    });
  }

 
      
  render() {

    return (
      <div className="App">
            <Navbar bg="light" expand="lg">
              <Navbar.Brand href="#home">My Curls Keeper</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link onClick={() => this.setState({isCalendarVisible:true})}  >Calendar</Nav.Link>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form inline>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Navbar.Collapse>
            </Navbar>
      {this.state.currUser == null ? (<StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />) :
       this.state.isCalendarVisible ? (<CalendarContainer/>) : 
       (<ProductContainer currUser={this.state.currUser} />) 
      }
      </div>
    );
  }
}

export default App;