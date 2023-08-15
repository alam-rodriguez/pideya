// import firebase from 'firebase/app';
// import 'firebase/messaging';

// // Configura tu app de Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyDikFvbB7WtjJWq0C02tT9QzvFXfZsgmM0",
//   authDomain: "pideya-f502d.firebaseapp.com",
//   projectId: "pideya-f502d",
//   storageBucket: "pideya-f502d.appspot.com",
//   messagingSenderId: "288720639525",
//   appId: "1:288720639525:web:f0bc44382d075aad9791cc",
//   measurementId: "G-EZWFWG1MKH"
// };

// firebase.initializeApp(firebaseConfig);

// // Obtiene la instancia de messaging
// const messaging = firebase.messaging();

// export const enviarNotis = () => {
//   // Definir tokens de registro
//   const registrationTokens = [
//     'cnuHf2SI_-9hNF5yS_e7f7:APA91bF_DT501yiLakxFrRK4qYp0r-9n1qldvUVsxpbHqqDAad0ORBmhudXVlmyC5pFXmGJRTbkJZHDnGiBvcb-JgswXP9BKRWKOt1ROSjXAvmAUj37h_uF59PRxjKfc3oIVpkoiNcD4',
//   ];

//   // Crear el mensaje
//   const message = {
//     data: { score: '850', time: '2:45' },
//     tokens: registrationTokens,
//   };

//   // Enviar el mensaje a través de sendMulticast
//   messaging.sendMulticast(message)
//     .then((response) => {
//       console.log(response.successCount + ' messages were sent successfully');
//     })
//     .catch((error) => {
//       console.error('Error sending multicast message:', error);
//     });
// }
