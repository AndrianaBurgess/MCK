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
    var imageRef = storage.ref().child(imagePath);
    await imageRef.delete();
}


export async function removeProduct(email, productId){
    await firestore.collection(USERS_COLLECTION)
    .doc(email).collection(PRODUCTS_COLLECTION)
    .doc(productId).delete();
    removeProductImage(email, productId);
}

export async function getProductImageUrl(id, email){
    var storageRef = storage.ref();
    var imagePath = email + '/' + id;
    var imageRef = storageRef.child(imagePath);
    const url = await imageRef.getDownloadURL();
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
    await uploadImage(email, productDoc.id, file);
}

async function uploadImage(email, productId, file) {
    var imagePath = email + '/' + productId;
    var imageRef = storage.ref().child(imagePath);
    await imageRef.put(file);
}