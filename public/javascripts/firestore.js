
  // Initialize Cloud Firestore through Firebase
  var db = firebase.firestore();
  
  // Disable deprecated features
  db.settings({
    timestampsInSnapshots: true
  });


  var USERS_COLLECTION = 'users';
  var PRODUCTS_COLLECTION = 'products';

  /**
   * Product = name, brand, type, rating, id
   * 
   */


function addProduct(product, callback){
    var user = firebase.auth().currentUser;
    db.collection(USERS_COLLECTION).doc(user.email)
    .collection(PRODUCTS_COLLECTION).doc(product['id'])
    .set(product).then(function() {
        callback(product);
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

function getAllProducts(callback){
    var user = firebase.auth().currentUser;
    db.collection(USERS_COLLECTION).doc(user.email)
    .collection(PRODUCTS_COLLECTION).get().then(function(snapshot){
        var productList = []
        snapshot.forEach(function(doc){
            doc.push(doc.data());
        });
        callback(productList);
    });
}

function removeProduct(productId, callback){
    var user = firebase.auth().currentUser;
    db.collection(USERS_COLLECTION).doc(user.email)
    .collection(PRODUCTS_COLLECTION).doc(productId)
    .delete().then(function() {
        callback(productId);
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}


function modifyProduct(newValues, callback){
    var user = firebase.auth().currentUser;
    var productDoc = db.collection(USERS_COLLECTION).doc(user.email)
    .collection(PRODUCTS_COLLECTION).doc(newValues['id']);

    productDoc.update(newValues)
    .then(function() {
        callback(newValues);
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}