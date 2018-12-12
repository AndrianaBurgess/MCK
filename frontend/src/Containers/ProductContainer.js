import React from 'react';
import Product from '../Components/Product';
import NewProductUI from '../Components/NewProductUI';
import firebase from 'firebase';
import FadeLoader from 'react-spinners/FadeLoader';
import * as fb from '../firebasefunctions';
const USERS_COLLECTION = 'users';
const PRODUCTS_COLLECTION = 'products';
const LAST_ADDED = 'lastAdded'
const META = 'meta';



class ProductContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
           products: null,
           isAddingProduct : false,
           isModifyingProduct : false
        }
        
        this.firestore = firebase.firestore();
        this.storage = firebase.storage();
        this.email = this.props.currUser.email;
        

        this.productsRef = this.firestore.collection(USERS_COLLECTION)
        .doc(this.email).collection(PRODUCTS_COLLECTION);

        this.lastAddedRef = this.firestore.collection(USERS_COLLECTION)
        .doc(this.email).collection(META).doc(LAST_ADDED);

     }

    
    renderProducts = () => {
      if (this.productsNotLoaded()){
        fb.getAllProducts(this.email, this.setProducts);
        return this.renderLoadAnimation();
      }
      return this.userHasNoProducts() ?
      this.getEmptyProductsUi() :
      this.getProductListUi();
    }

    setProducts = productList => {
      this.setState({
        products : productList
      });
    }


     /**
     * Returns html displaying a list 
     * of products and thier information
     */
    getProductListUi = () => {
      console.log('PRODUCTS',this.state.products);
      return (
      <div>
      <button onClick= { (e) => this.setIsAdding(e) }> Add Product </button>
      <ul> 
      {
        this.state.products.map(product => {
        
          return (
          <li key={product.id}>
            <Product product={product} key={product.id} /> 
            <button>Modify</button>
            <button onClick={(e) => this.removeProduct(e, this.email, product.id) }>Delete</button>
          </li>
           ); 
          })
      }
      </ul>
      </div>
      );
    }

    removeProduct(e, email, id){
      e.preventDefault();
      fb.removeProduct(email, id);
      var updated = this.state.products;
      updated = updated.filter(product => {
        return product.id !== id;
      });
      this.setState({
        products : updated
      });
    }

    setIsAdding = (e) => {
      e.preventDefault();
      this.setState({
        isAddingProduct : true
      });
    }

    setNotAdding = (product) => {
      this.setState({
        isAddingProduct : false,
        products : null
      });
    }

    setIsModifying = (e) => {
      e.preventDefault();
      this.setState({
        isModifyingProduct : true
      });
    }

     /**
     * Returns html showing that the user
     * has no products currently in firestore
     */
    getEmptyProductsUi = () => {
      return (
      <div>
       <p>No proudcts to show</p>
       <button onClick= { (e) => this.setIsAdding(e) }> Add Product </button>
      </div>
      )
    }

    renderLoadAnimation = () => {
      return (
      <FadeLoader
        className={'loader'}
        sizeUnit={"px"}
        size={150}
        color={'#123abc'}
        loading={true} 
        />
      )
    }

    /**
     * Determines if user has products
     */
    userHasNoProducts = () => {
      return this.state.products.length === 0;
    }

    productsNotLoaded = () => {
      return this.state.products === null;
    }

    renderModifyProducts = () => {

    }


    renderAddProduct = () => {
      return (
        
      <div>
        <NewProductUI email={this.props.currUser.email}
        storageRef={this.storage.ref()}
        productsRef={this.productsRef}
        finished={this.setNotAdding} 
        lastAddedRef={this.lastAddedRef}/>
      </div>
      );
    }


    render() { 

      if (this.state.isAddingProduct){
      
        return this.renderAddProduct();
      }

      if (this.state.isModifyingProduct){
        return this.renderModifyProducts();
      }

      return this.renderProducts();
    }

  }
  export default ProductContainer;