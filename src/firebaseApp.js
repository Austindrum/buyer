import firebase from 'firebase'
import 'firebase/firestore'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBnCFifp32F3qYDa9JdHVPcIRlpIX6lWnk",
    authDomain: "vuebuyer.firebaseapp.com",
    databaseURL: "https://vuebuyer.firebaseio.com",
    projectId: "vuebuyer",
    storageBucket: "vuebuyer.appspot.com",
    messagingSenderId: "905194068441",
    appId: "1:905194068441:web:3c78034e237149308c61c8"
})

export default firebaseApp.firestore();