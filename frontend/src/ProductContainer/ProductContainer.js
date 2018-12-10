import React from 'react';
import Product from '../Product/Product';
import firebase from 'firebase';
import AddButton from '../AddButton/AddButton';
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
        this.state.products.map(p => {
          return ( <li> <Product product={p} key={p.id}/> </li> ); } )
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