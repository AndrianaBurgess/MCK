import React from 'react';
import Product from '../Components/Product';
import NewProductUI from '../Components/NewProductUI';
import * as fb from '../firebasefunctions';
import FadeLoader from 'react-spinners/FadeLoader';
import Button from 'react-bootstrap/lib/Button';
import CardGroup from 'react-bootstrap/lib/CardGroup';
import CardDeck from 'react-bootstrap/lib/CardDeck';




class ProductContainer extends React.Component {

    constructor(props) {
        super(props);

        /**
         * Products is initially set to null
         * to signify that the products need
         * to be retrieved from firebase.
         */
        this.state = {
           products: null,
           isAddingProduct : false, 
           isModifyingProduct : false
        }
        this.email = this.props.currUser.email;
     }

    
    renderProducts = () => {
      if (this.productsNotLoaded()){
        fb.getAllProducts(this.email)
        .then(this.updateProductList);
        return this.renderLoadAnimation();
      }
      return this.userHasNoProducts() ?
      this.getEmptyProductsUi() :
      this.getProductListUi();
    }

    productsNotLoaded = () => {
      return this.state.products === null;
    }

    updateProductList = productList => {
      this.setState({
        products : productList
      });
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

    userHasNoProducts = () => {
      return this.state.products.length === 0;
    }

    getEmptyProductsUi = () => {
      return (
      <div>
       <p>No proudcts to show</p>
       <Button onClick= { (e) => this.setIsAdding(e) }> Add Product </Button>
      </div>
      )
    }

    setIsAdding = (e) => {
      e.preventDefault();
      this.setState({
        isAddingProduct : true
      });
    }

    getProductListUi = () => {
      return (
      <div>
      <Button onClick= { (e) => this.setIsAdding(e) }> Add Product </Button>
       <div class="row justify-content-center">
      {
        this.state.products.map(product => {
          return (
          <div key={product.id}>
            <Product product={product} email={this.email} /> 
            <button>Modify</button>
            <button onClick={(e) => this.removeProduct(e, this.email, product.id) }>Delete</button>
          </div>
           ); 
          })
      }
      </div>
      </div>
      );
    }
    
    removeProduct(e, email, id){
      e.preventDefault();
      fb.removeProduct(email, id).then(() => {
        this.removeProductFromUi(id);
      });
    }

    removeProductFromUi = (id) => {
      var updated = this.state.products;
      updated = updated.filter(product => {
        return product.id !== id;
      });
      this.setState({
        products : updated
      });
    }

    setIsModifying = (e) => {
      e.preventDefault();
      this.setState({
        isModifyingProduct : true
      });
    }

    renderModifyProducts = () => {

    }

    doneAdding = () => {
      console.log("done adding");
      this.setState({
        products : null,
        isAddingProduct: false
      });
    }

    render() { 

      if (this.state.isAddingProduct){
      
        return (<NewProductUI email={this.email}
          finish={this.doneAdding} />);
      }

      if (this.state.isModifyingProduct){
        return this.renderModifyProducts();
      }

      return this.renderProducts();
    }

  }
  export default ProductContainer;