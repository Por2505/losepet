import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import  firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBpgSgZL_aKKjjyUZXQBTspW0j5x-S8bSI",
  authDomain: "losepet-c4a51.firebaseapp.com",
  databaseURL: "https://losepet-c4a51.firebaseio.com",
  projectId: "losepet-c4a51",
  storageBucket: "losepet-c4a51.appspot.com",
  messagingSenderId: "268111742243",
  appId: "1:268111742243:web:399f5eba67c4880d9b3896",
  measurementId: "G-GG12Q19QPY"
};


firebase.initializeApp(firebaseConfig)
export const firestore = firebase.firestore()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
