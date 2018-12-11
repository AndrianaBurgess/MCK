import React, { Component } from 'react';
import firebase from 'firebase';
import AddButton from './AddButton';

class NewProductUI extends Component {

    constructor(){
        super();
        this.firestore = firebase.firestore();
    }

    uploadImage = () => {
      var file = document.getElementById('image').files[0];;
      console.log(file);
      var imageRef = this.props.storageRef.child(this.props.email + '/' + file.name);
      imageRef.put(file).then( snapshot => {
          console.log(snapshot);
      });
    }

    addProduct = (product) => {
      this.props.productsRef.add(product).then( () => {
        this.setState({ isAddingProduct : false });
      })
      .catch( error => { console.log(error); } );
    }

    render() {
        return (
            <div>
               Name: <input></input>
               Brand: <input></input>
               Rating: <input></input>
               Type: <select>
               <option value="gel">Volvo</option>
               <option value="conditioner">Saab</option>
               <option value="cream">Opel</option>
               <option value="shampoo">Audi</option>
             </select>
                <AddButton/>
            </div>
        );
      }
}

export default NewProductUI;