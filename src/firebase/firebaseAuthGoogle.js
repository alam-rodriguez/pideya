import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";

// Firestore Service
import { guardarAdmin, saveInfoUser } from "./firebaseFirestore";
import { doc } from "firebase/firestore";

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


// Registro de usuario como semi admin
export const registrarSemiAdmin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user.email;
  } catch (e) {
    console.log(e);
    return false;
  }
}

// // Registro de usuario como semi admin
// export const registrarSemiAdmin = async () => {
//   const docRef = doc()
//   // try {
//   //   const result = await signInWithPopup(auth, provider);
//   //   await guardarAdmin(result.user.email);
//   //   return result.user.email;
//   // } catch (e) {
//   //   console.log(e);
//   //   return e;
//   // }
// }

// Registrar usuario normal 
export const registrarUsuario = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // const infoUser = {
    //   email: result.user.email,
    //   nombre: '',
    //   direccion: '',
    //   telefono: Number('0'.repeat(8)),
    //   codeRef: Number('0'.repeat(5)),
    // }
    // await saveInfoUser(infoUser);
    return result.user.email;
  } catch (e) {
    console.log(e);
    return false;
  }
}

// Registrar usuario normal 
export const registrarUsuarioAgain = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // const infoUser = {
    //   email: result.user.email,
    //   // nombre: '',
    //   // direccion: '',
    //   // telefono: Number('0'.repeat(8)),
    //   // codeRef: Number('0'.repeat(5)),
    // }
    // await saveInfoUser(infoUser);
    return result.user.email;
  } catch (e) {
    console.log(e);
    return false;
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