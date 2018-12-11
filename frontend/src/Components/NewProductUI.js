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
            <form>
                Name: <input type="text" id="name"></input> <br/>
                Brand: <input type="text" id="brand"></input> <br/>
                Rating: <input type="text" id="rating"></input> <br/>
                Type: <select id="type">
                    <option value="gel">Gel</option>
                    <option value="conditioner">Conditioner</option>
                    <option value="cream">Cream</option>
                    <option value="shampoo">Shampoo</option>
                </select> <br/>
                <input type="file" name="fileToUpload" id="image"/> <br/>
                <button onClick=""> Save </button>
            </form>
        );
      }
}

export default NewProductUI;