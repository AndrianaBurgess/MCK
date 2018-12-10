// Initialize Cloud Firestore through Firebase
import firebase from 'firebase';

const db = firebase.firestore();

  db.settings({
    timestampsInSnapshots: true
  });

function addProduct(product, callback){
     // TODO
}

function removeProduct(id, callback){
     // TODO
}

function modifyProduct(attribtues, callback){
     // TODO
}

function getProducts(email){
     console.log('Hello, World!');
}