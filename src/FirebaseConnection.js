import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCftVrarypAClz8PkH69HPPURWI-IQodKE",
    authDomain: "devzap-28b80.firebaseapp.com",
    databaseURL: "https://devzap-28b80.firebaseio.com",
    projectId: "devzap-28b80",
    storageBucket: "devzap-28b80.appspot.com",
    messagingSenderId: "137295852261"
  };
  firebase.initializeApp(config);

export default firebase;