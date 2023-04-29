// importaciones
import { initializeApp } from "firebase/app"; 
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDikFvbB7WtjJWq0C02tT9QzvFXfZsgmM0",
  authDomain: "pideya-f502d.firebaseapp.com",
  projectId: "pideya-f502d",
  storageBucket: "pideya-f502d.appspot.com",
  messagingSenderId: "288720639525",
  appId: "1:288720639525:web:f0bc44382d075aad9791cc"
};

// Inicializaciones
const app = initializeApp(firebaseConfig);

const auth = getAuth();

const provider = new GoogleAuthProvider();

const db = getFirestore(app);

// Registro de usuario
export const registrarAdmin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    console.log(result.user.email);
    await guardarAdmin(result.user.email);
    return result.user.email;
    // return credential.user.email;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const registrarUsuario = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // console.log(result.user.email);
    return result.user.email;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// Firestore
export const guardarAdmin = async (admin) => {
  await setDoc(doc(db, 'admin', 'admin-info'), {
    admin: admin,
  });
}
