import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";

// Firestore Service
import { guardarAdmin } from "./firebaseFirestore";

export const auth = getAuth();

const provider = new GoogleAuthProvider();

// Registro de usuario como admin
export const registrarAdmin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    await guardarAdmin(result.user.email);
    return result.user.email;
  } catch (e) {
    console.log(e);
    return e;
  }
}

// Registrar usuario normal 
export const registrarUsuario = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user.email;
  } catch (e) {
    console.log(e);
    return e;
  }
}

// cerrar sesion de usuario
export const logOut = async () => {
  try{
    await signOut(auth);
    return true;
  }catch(e){
    return false;
  }
}