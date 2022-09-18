import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: 'no-spoilers-twitter.firebaseapp.com',
  projectId: 'no-spoilers-twitter',
  storageBucket: 'no-spoilers-twitter.appspot.com',
  messagingSenderId: '418190793243',
  appId: '1:418190793243:web:8f348741b78009ea70b6be',
};

initializeApp(firebaseConfig);
