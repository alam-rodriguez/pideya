import { collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc, query, where } from "firebase/firestore";
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
export const createCategories = async (id, nombre, viewInMenu) => {
  try{
    await setDoc(doc(db, 'categorias', id), {
      nombre: nombre,
      id: id,
      viewInMenu: viewInMenu,
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
      categoria: info.categoria,
      precio: info.precio,
      disponible: info.disponible,
    });
    return true;
  }catch(e){
    console.log(e)
    return e.message;
  }
}

// obtener todos los articulos
export const getAllArticles = async () => {
  try{
    const articles = [];
    const querySnapshot = await getDocs(collection(db, 'articulos'));
    querySnapshot.forEach( (doc) => {
      articles.push(doc.data());
    });
    return articles;
  }catch(e){
    console.log(e);
    return e.message;
  }
}

// Obtener categorias que van al menu
export const getMenuCategories = async () => {
  try{
    const data = [];
    const q = query(collection(db, 'categorias'), where('viewInMenu', '==', true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach( (doc) => {
      data.push(doc.data());
    });
    return data;
  }catch(e){
    console.log(e);
    return e.message;
  }
}

// obtener articulos por categoria
export const getArticlesByCategory = async (categoriaId) => {
  try{
    const data = [];
    const q = query(collection(db, 'articulos'), where('categoria','==',categoriaId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach( (doc) => {
      data.push(doc.data());
    });
    return data;
  }catch(e){
    console.log(e);
    return e.message;
  }
}