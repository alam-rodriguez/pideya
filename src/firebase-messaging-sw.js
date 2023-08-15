
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDikFvbB7WtjJWq0C02tT9QzvFXfZsgmM0",
  authDomain: "pideya-f502d.firebaseapp.com",
  projectId: "pideya-f502d",
  storageBucket: "pideya-f502d.appspot.com",
  messagingSenderId: "288720639525",
  appId: "1:288720639525:web:f0bc44382d075aad9791cc",
  measurementId: "G-EZWFWG1MKH"
};

export const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);


function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      // const messaging = getMessaging();
      getToken(messaging, { vapidKey: 'BHcm5BFwgxOQ6nj2L-HuNsXLSQh1qVspsflueKVlE4INPULAkbY6yTmHuFWc' }).then((currentToken) => {
        if (currentToken) {
          console.log(currentToken)
          // Send the token to your server and update the UI if necessary
          // ...
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
          // ...
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
      });
    }
  })
}

requestPermission();