import React, { Component } from 'react';
import firebase from 'firebase';

class NewProductUI extends Component {

    constructor(){
        super();
        this.firestore = firebase.firestore();
    }

    uploadImage = (productId) => {
      var file = document.getElementById('image').files[0];
      var imageRef = this.props.storageRef.child(this.props.email + '/' + productId);
      imageRef.put(file).then( snapshot => {
          console.log(snapshot);
          //this.updatedLastAdded(productId);
          this.props.finished();
      });
    }

    updatedLastAdded = (id) => {
        this.props.lastAddedRef.update({
            productId : id
        })
        .then( () => {
            console.log('updated last added');
        })
    }

    addProduct = (e) => {
        e.preventDefault();
        this.props.productsRef.add({
            name : document.getElementById('name').value,
            brand : document.getElementById('brand').value,
            rating : document.getElementById('rating').value,
            type : document.getElementById('type').value
        }).then( doc  => {
            console.log(doc);
            this.uploadImage(doc.id);
        })
        .catch( error => { 
            console.log(error);
         });
    }

    render() {
        return (
            <form>
                Name: <input type="text" id="name" required/> <br/>
                Brand: <input type="text" id="brand" required></input> <br/>
                Rating: <input type="text" id="rating" required></input> <br/>
                Type: <select id="type">
                    <option value="gel">Gel</option>
                    <option value="conditioner">Conditioner</option>
                    <option value="cream">Cream</option>
                    <option value="shampoo">Shampoo</option>
                </select> <br/>
                <input type="file" name="fileToUpload" id="image"/> <br/>
                <button onClick={ (e) => this.addProduct(e) }> Save </button>
            </form>
        );
      }
}

export default NewProductUI;