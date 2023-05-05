import { collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase Configuraciones
import { app } from "./firebaseConfig";

const db = getFirestore(app);

export const auth = getAuth();

// Verificar si existe usario admin
export const existAdmin = async () => {
  try{
    const docRef = doc(db, 'app', 'app-info');
    const docSnap = await getDoc(docRef);
    if( docSnap.exists()) return true;
    else return false;
  }catch(e){
    return e;
  }
}

// Guardar el admin
export const guardarAdmin = async (admin) => {
  try{
    await setDoc(doc(db, 'app', 'app-info'), {
      admin: admin,
    });
    return true;
  }catch(e){
    return e;
  }
}

// actualizar o guardar info de la app
export const infoApp = async (info) => {
  try{
    const infoAppRef = doc(db, 'app','app-info');
    await updateDoc(infoAppRef, {
      nombre: info.nombre,
      whatsapp: info.whatsapp,
      instagram: info.instagram,
      facebook: info.facebook,
      descripcion: info.descripcion,
    });
    return true;
  } catch(e){
    return e;
  }
}

// obtener info de la app
export const obtenerInfoApp = async () => {
  try{
    const docRef = doc(db, 'app', 'app-info');
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      return docSnap.data();
    }else {
      return 'no hay datos de esta app';
    }
  } catch(e){
    return e;
  }
}

// crear categorias
export const createCategories = async (id, nombre) => {
  try{
    await setDoc(doc(db, 'categorias', id), {
      nombre: nombre,
      id: id,
    });
    return true;
  }catch(e){
    return e;
  }
}

// ObtenerCategorias
export const getCategories = async () => {
  try{
    const data = [];
    const querySnapshot = await getDocs(collection(db, 'categorias'));
    querySnapshot.forEach( (doc) => {
      data.push(doc.data());
    });
    return data;
  }catch(e){
    console.log(e);
    return false;
  }
}

// Crear articulo
export const createArticle = async (id, info) => {
  try{
    await setDoc(doc(db, 'articulos', id), {
      id: id,
      titulo: info.titulo, 
      subtitulo: info.subtitulo,
      imgpath: info.img,
    });
    return true;
  }catch(e){
    return e.message;
  }
}