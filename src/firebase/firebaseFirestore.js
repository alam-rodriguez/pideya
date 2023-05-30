import { collection, doc, getDoc, getDocs, getFirestore, setDoc, updateDoc, query, where, deleteDoc } from "firebase/firestore";
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
export const createCategories = async (info) => {
  try{
    await setDoc(doc(db, 'categorias', info.id), {
      nombre: info.nombreCategoria,
      id: info.id,
      viewInHome: info.viewInHome,
      viewInMenu: info.viewInMenu,
      imgpath: info.imgpath,
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
      categoria: info.categoria,
      imgpath: info.img,
      disponible: info.disponible,
      complex: info.complex,
      precios: info.precios
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

// Obtener categorias que van al home
export const getCategoriesFilted = async (filtro) => {
  try{
    const data = [];
    const q = query(collection(db, 'categorias'), where(filtro, '==', true));
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

// Guardar info de usuario 
export const saveInfoUser = async (pedido) => {
  try {
    await setDoc(doc(db, `user-${pedido.email}`, 'info'), {
      email: pedido.email,
      nombre: pedido.nombre,
      direccion: pedido.direccion,
      telefono: pedido.telefono,
      codeRef: pedido.codeRef,
    });
    return true;
  } catch (e) {
    console.log(e.code);
    return false;
  }
}

// Crear Pedido de cliente
export const crearPedidoUser = async (pedido) => {
  try {
    await setDoc(doc(db, 'pedidos', `${pedido.email}-${pedido.pedidoId}`), {
      id: pedido.pedidoId,
      user: pedido.nombre,
      direccion: pedido.direccion,
      telefono: pedido.telefono,
      comentario: pedido.comentario,
      email: pedido.email,
      hora: pedido.hora,
      dia: pedido.dia,
      pedido: pedido.pedido,
      isDelivery: pedido.isDelivery,
      deliveryInfo: pedido.deliveryInfo,
      wasView: pedido.wasView,
      isReady: pedido.isReady,
      wasReceived: pedido.wasReceived,
    });
    return true;
  } catch (e) {
    console.log(e.code);
    return false;
  }
}

// Mostrar Pedidos a cliente
export const getPedidosByClient = async (email) => {
  try{
    const q = query(collection(db, 'pedidos'), where('email', '==' ,email));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  }catch(e){
    console.log(e);
    return [];
  }
}

// Mostrar pedidos que no estan listos
export const getordersNotView = async () => {
  try{
    const q = query(collection(db, 'pedidos'), where('wasView', '==' ,false));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  }catch(e){
    console.log(e);
    return [];
  }
}

// obtener info del cliente
export const getInfoUser = async (email) => {
  try {
    const docRef = doc(db, `user-${email}`, 'info');
    const docSnap = await getDoc(docRef);
    if( docSnap.exists() ){
      return docSnap.data();
    }else {
      return false;
    }

  } catch (e) {
    console.log(e.message);
    return false;
  }
}

// Atualizar info de categoria
export const ACtualizarCategory = async (id, newInfo) => {

  try {
    const docRef = doc(db, 'categorias', id);
    await updateDoc(docRef, {
      nombre: newInfo.nombreCategoria,
      viewInHome: newInfo.viewInHome,
      viewInMenu: newInfo.viewInMenu,
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }

}

// Borrar categoria
export const deleteCategory =  async (id) => {
  try {
    await deleteDoc(doc(db, 'categorias', id));
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

// Actualizar Articulo 
export const updateArticle = async (id, articleUpdated) => {
  try {
    const docRef = doc(db, 'articulos', id)
    await updateDoc(docRef, {
      titulo: articleUpdated.titulo,
      subtitulo: articleUpdated.subtitulo,
      categoria: articleUpdated.categoria,
      precios: articleUpdated.precios,
      disponible: articleUpdated.disponible
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

// Borrar categoria
export const deleteArticle =  async (id) => {
  try {
    await deleteDoc(doc(db, 'articulos', id));
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

// Afregar code Ref de user a la base de datos
export const saveCodeRef = async (email, nombre, codeRef) => {
  try {
    await setDoc(doc(db, 'codesRefs', `codeRef-${email}`), {
      codeRef: codeRef,
      email: email,
      nombre: nombre,
    });
    return true;
  } catch (e) {
    console.log(e.code);
    return false;
  }
}

// Encontrar el codigo referido
export const searchCodeRef = async (codeRef) => {

  try {
    const q = query(collection(db, 'codesRefs'), where('codeRef','==', codeRef));
    const querySnapshot = await getDocs(q);
    let res = {}
    querySnapshot.forEach( (doc) => {
      res = doc.data();
      return;
    });
    return res;
  } catch (e) {
    console.log(e);
  }

}

// Actualizar para agregar referidos a user
export const addReferidoPor = async (email, infoCodeRef) => {
  try {
    const docRef = doc(db, `user-${email}`, 'info');
    await updateDoc(docRef, {
      referidoPor: infoCodeRef,
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}