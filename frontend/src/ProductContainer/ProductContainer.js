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
        
        this.firestore = firebase.firestore();
        this.storage = firebase.storage();
        this.usersRef = this.firestore.collection(USERS_COLLECTION);
        this.userEmail = this.props.currUser.email;
     }

    /***
     * Retreives all the products added by the 
     * current user and stores them in an array.
     */
    componentDidMount() {
      
      var productsRef = this.usersRef.doc(this.userEmail)
      .collection(PRODUCTS_COLLECTION);

      productsRef.get().then(snapshot => {

        var productList = []

        snapshot.forEach(doc => {
          console.log(doc);
          var product = doc.data();
          product.id = doc.id;
         // this.setProductImageSrc(product);
          productList.push(product);
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

    /**
     * Retreives image src link from firebase 
     * storage and sets the products imageSrc
     * field to it.
     */
    setProductImageSrc = (product) => {
      var imagePath = product.imagePath;
      var storageRef = this.storage.ref();
      var imageRef = storageRef.child(imagePath);
      imageRef.getDownloadURL().then(function(url) {
        product.imageSrc = url;
      }).catch(function(error) {
        console.log(error);
      });
    }

    /**
     * Returns html displaying a list 
     * of products and thier information
     */
    getProductListUi = () => {
      return (
      <ul> 
      {
        this.state.products.map(product => {
          return (
          <li>
            <Product product={product} key={product.id} /> 
            <button>Modify</button>
            <button onClick={(e) => this.removeProduct(e, product.id)}>Delete</button>
          </li> ); 
          })
      }
      </ul>
      );
    }

    removeProduct = (e, productId) => {
      console.log(productId);
      e.preventDefault();
      this.usersRef.doc(this.userEmail)
      .collection(PRODUCTS_COLLECTION).doc(productId).delete().then( () => {
        console.log("Document successfully deleted!");
        var updatedArray = Array.from(this.state.products);
        console.log(updatedArray)
        updatedArray = updatedArray.filter(product => product.id !== productId)
        console.log(updatedArray);
        this.setState({products: updatedArray});
      }).catch(function(error) {
        console.error("Error removing document: ", error);
      });
    }

    /**
     * Returns html showing that the user
     * has no products currently in firestore
     */
    getEmptyProductsUi = () => {
      return <div>No products to display</div>
    }

    /**
     * Determines if user has products
     */
    userHasNoProducts = () => {
      return this.state.products.length === 0;
    }

    render() {
      return (
        <div>
        {
          this.userHasNoProducts() ?
          this.getEmptyProductsUi() :
          this.getProductListUi()
        }
        </div>
      );
    }
  }
  export default ProductContainer;