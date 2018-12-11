import React, { Component } from 'react';
import firebase from 'firebase';
import AddButton from './AddButton';

class NewProductUI extends Component {

    constructor(){
        super();
        this.firestore = firebase.firestore();
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