import React from 'react';
import Product from '../Components/Product';
import NewProductUI from '../Components/NewProductUI';
import firebase from 'firebase';
import FadeLoader from 'react-spinners/FadeLoader';
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

        this.productsRef = this.firestore.collection(USERS_COLLECTION)
        .doc(this.props.currUser.email).collection(PRODUCTS_COLLECTION);

        this.lastAddedRef = this.firestore.collection(USERS_COLLECTION)
        .doc(this.props.currUser.email).collection(META).doc(LAST_ADDED);
     }

     createLastAdded = () => {
      this.lastAddedRef.set({
        productId : 'none'
      })
      .then( () => {

      }).catch(error => {

      });
     }

     checkIfLastAddedExist = (callback) => {
       this.lastAddedRef.get()
       .then(doc => {
         if (!doc.exists){
           this.createLastAdded();
         }
       })
       .catch(error => {
         console.log(error);
       });
     }

     listenForNewProducts = () => {
       this.lastAddedRef.onSnapshot(doc => {
         var lastAdded = doc.data();
         console.log(lastAdded);
         if (lastAdded.productId == 'none'){
           return;
         }
         this.productsRef.doc(lastAdded.productId).get().then(doc => {
          if (doc.exists) {
            var product = doc.data();
            this.renderNewProduct(product);
          } else {
              console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
       });
     }

     renderNewProduct = (product) => {
       var updated = Array.from(this.state.products);
       updated.push(product);
       this.setState({
         products : updated
       })
     }

     loadProducts = () => {
      this.productsRef.get().then(snapshot => {

        var productList = []

        snapshot.forEach(doc => {
          console.log(doc);
          var product = doc.data();
          product.id = doc.id;
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
    /***
     * Retreives all the products added by the 
     * current user and stores them in an array.
     */
    componentDidMount() {
      this.checkIfLastAddedExist(this.createLastAdded);
      this.loadProducts();
      this.listenForNewProducts();
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

  

    renderProducts = () => {
      if (this.productsNotLoaded()){
        return this.renderLoadAnimation();
      }
      return this.userHasNoProducts() ?
      this.getEmptyProductsUi() :
      this.getProductListUi();
    }

     /**
     * Returns html displaying a list 
     * of products and thier information
     */
    getProductListUi = () => {
      return (
      <div>
      <button onClick= { (e) => this.setIsAdding(e) }> Add Product </button>
      <ul> 
      {
        this.state.products.map(product => {
          return (
          <li>
            <Product product={product} key={product.id} /> 
            <button>Modify</button>
            <button onClick={(e) => this.removeProduct(e, product.id)}>Delete</button>
          </li>
           ); 
          })
      }
      </ul>
      </div>
      );
    }

    setIsAdding = (e) => {
      e.preventDefault();
      this.setState({
        isAddingProduct : true
      });
    }

    setNotAdding = () => {
      this.setState({
        isAddingProduct : false
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
      console.log("heeeeey");
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

   

    modifyProduct = (product) => {
      this.productsRef.update(product).then( () => {

      })
      .catch( error => {console.log(error); } );
    }

    removeProduct = (e, productId) => {
      console.log(productId);
      e.preventDefault();

      this.productsRef.doc(productId).delete()
      .then( () => {
        console.log("Document successfully deleted!");
        var updatedArray = Array.from(this.state.products);
        updatedArray = updatedArray.filter(product => product.id !== productId)
        this.setState({products: updatedArray});

      }).catch(function(error) {

        console.error("Error removing document: ", error);

      });
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