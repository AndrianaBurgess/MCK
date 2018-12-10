import React from 'react';
import Product from '../Product/Product';
import firebase from 'firebase';

const USERS_COLLECTION = 'users';
const PRODUCTS_COLLECTION = 'products';


class ProductContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
           products: []
        }
        console.log(props);
        this.userEmail = this.props.currUser.email;
        this.firestore = firebase.firestore();
        this.usersRef = this.firestore.collection(USERS_COLLECTION);
     }
  
    componentDidMount() {
      
      var productsRef = this.usersRef.doc(this.userEmail)
      .collection(PRODUCTS_COLLECTION);

      productsRef.get().then(snapshot => {

        var productList = []

        snapshot.forEach(doc => {
          productList.push(doc.data());
        });

        this.setState({
          products : productList
        });
        
        console.log('PRODUCT LIST', productList);
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
    }

    getProductListUi = () => {
      return (
      <ul> 
      {
        this.state.products.map(p => (
          <li><Product id={p.id} name = {p.name} type = {p.type} brand={p.brand} key={p.id} rating={p.rating}/></li> ) 
          )
      }
      </ul>
      );
    }

    getEmptyProductsUi = () => {
      return <div>No products</div>
    }

    render() {
      return (
        <div>
        {
          this.state.products.length == 0 ?
          this.getEmptyProductsUi() :
          this.getProductListUi()
        }
        </div>
        
      );
    }
  }


  export default ProductContainer;