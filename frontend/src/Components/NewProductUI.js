import React, { Component } from 'react';
import firebase from 'firebase';
import Button from 'react-bootstrap/lib/Button';

class NewProductUI extends Component {

    constructor(){
        super();
        this.firestore = firebase.firestore();
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
                <button onClick=""> Save </button>
            </form>
        );
      }
}

export default NewProductUI;