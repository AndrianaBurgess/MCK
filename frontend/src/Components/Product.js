import React, { Component } from 'react';
import Card from 'react-bootstrap/lib/Card';
import Button from 'react-bootstrap/lib/Button';
import * as fb from '../firebasefunctions';

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
          name : this.props.product.name,
          brand : this.props.product.brand,
          rating : this.props.product.rating,
          type : this.props.product.type,
          imageUrl : this.props.product.imageUrl
        }
     }

     setProductImage = url => {
       console.log("setting",url);
      this.setState({
        imageUrl : url
      });
     }

     componentDidMount(){
       var id = this.props.product.id;
       var email = this.props.email;
       fb.getProductImageUrl(id, email)
       .then(this.setProductImage);
     }

    render() {
      return (
        <div>
        <Card style={{ width: '15rem' }}>
        <Card.Header>{this.state.name}</Card.Header>
          <Card.Img variant="top" src={this.state.imageUrl} />
          <Card.Body>
            <Card.Title>{this.state.brand}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{this.state.type}</Card.Subtitle>
            <Card.Text>  {this.state.rating}</Card.Text>
          </Card.Body>
        </Card>
      </div>
      
      );
    }
}

export default Product;
