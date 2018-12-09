// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
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
     // TODO
}