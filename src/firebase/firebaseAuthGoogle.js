import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";

// Firestore Service
import { actualizarTokensAdmins, createEstadisticas, getInfoUser, guardarAdmin, saveInfoUser } from "./firebaseFirestore";
import { doc } from "firebase/firestore";
import { getToken } from "firebase/messaging";
import { messaging } from "./firebaseConfig";

export const auth = getAuth();

const provider = new GoogleAuthProvider();

// Registro de usuario como admin
export const registrarAdmin = async (token) => {
  try {
    const result = await signInWithPopup(auth, provider);
    await guardarAdmin(result.user.email, token);
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
export const registrarUsuario = async (admin, adminsTokens) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const exitsUser = await getInfoUser(result.user.email);

    
    if(result.user.email == admin){
      
      
      console.log('si');


      // const messaging = getMessaging();
      getToken(messaging, { vapidKey: 'BFawL779CXJIflZHL6ERnDErm4qUQZiixQPTxAyKyiO3G6Sxv9tyBL3JEtNZhrxTxmzz6hjoepQEjtsf7fXw_co' }).then( (currentToken) => {
        if (currentToken) {
        
          console.log('Si hay token', currentToken)
          // Send the token to your server and update the UI if necessary
          // ...
          console.log(currentToken);

          const newAdminsTokens = {...adminsTokens};
          newAdminsTokens[admin] = currentToken; 

          actualizarTokensAdmins(newAdminsTokens);
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
          // ...

        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
      });

      

      
      return;
    }
    
    if(exitsUser != 'no-exist'){
      return 'usuario-registrado';
    }
    const infoUser = {
      email: result.user.email,
      nombre: '',
      direccion: '',
      telefono: '',
      // codeRef: Number('0'.repeat(5)),
    }
    await saveInfoUser(infoUser);
    await createEstadisticas(result.user.email);
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