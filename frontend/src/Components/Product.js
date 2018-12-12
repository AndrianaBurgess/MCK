import React, { Component } from 'react';
import Card from 'react-bootstrap/lib/Card';
import Button from 'react-bootstrap/lib/Button';
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
        <Card style={{ width: '15rem' }}>
        <Card.Header>{this.state.product.name}</Card.Header>
          <Card.Img variant="top" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" />
          <Card.Body>
            <Card.Title>{this.state.product.brand}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{this.state.product.type}</Card.Subtitle>
            <Card.Text>  {this.state.product.rating}</Card.Text>
          </Card.Body>
        </Card>
      </div>
      
      );
    }
}

export default Product;
