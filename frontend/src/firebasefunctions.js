import firebase from 'firebase';
import {FIREBASE_CONFIG} from './config/firebaseconfig';

firebase.initializeApp(FIREBASE_CONFIG);
firebase.firestore().settings({
  timestampsInSnapshots: true
});

const firestore = firebase.firestore();
const storage = firebase.storage();
const USERS_COLLECTION = 'users';
const PRODUCTS_COLLECTION = 'products';


async function removeProductImage(email, productId) {
    var imagePath = email + '/' + productId;
    try {
        var imageRef = storage.ref().child(imagePath);
        await imageRef.delete();
    } catch (error) {
        
    }
    
}


export async function removeProduct(email, productId){
    try {
        await firestore.collection(USERS_COLLECTION)
        .doc(email).collection(PRODUCTS_COLLECTION)
        .doc(productId).delete();

        removeProductImage(email, productId);
    } catch (error) {
        
    }
    
    
}

export async function getProductImageUrl(id, email){
    let storageRef = storage.ref();
    let imagePath = email + '/' + id;
    const imageRef = storageRef.child(imagePath);
    let url;
    try {
        console.log("woah");
        url = await imageRef.getDownloadURL();
        console.log("bitches");
    } catch (error) {
        console.log(error);
        url = "";
    }
    console.log(url);
    return url;
}

export async function getAllProducts(email){
    const documents = await firestore.collection(USERS_COLLECTION)
    .doc(email).collection(PRODUCTS_COLLECTION).get();
    var products = [];
    documents.forEach( doc => {
        var product = doc.data();
        product.id = doc.id;
        products.push(product);
    });
    return products;
}

export async function addProduct(email, product, file){
    const productDoc = await firestore.collection(USERS_COLLECTION)
    .doc(email).collection(PRODUCTS_COLLECTION).add(product);
    if(file != null){
        await uploadImage(email, productDoc.id, file);
    }
}

async function uploadImage(email, productId, file) {
    var imagePath = email + '/' + productId;
    var imageRef = storage.ref().child(imagePath);
    await imageRef.put(file);
}