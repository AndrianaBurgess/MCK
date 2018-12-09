import React, { Component } from 'react';
import Product from './Product';

class ProductContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           products: props.products
           
        }
     }
  
    componentDidMount() {
      fetchSomeComments(products =>
        this.setState({ products: products }));
    }
    render() {
      return (
        <ul>
          {this.state.products.map(p => (
            <li><Product id={p.id} name = {p.name} type = {p.type} brand={p.brand}/></li>
          ))}
        </ul>
      );
    }
  }

  ReactDOM.render(<ProductContainer />, document.getElementById('list'));