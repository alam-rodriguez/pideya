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
      id: info.id,
      nombre: info.nombreCategoria,
      sizeView: info.sizeView,
      viewInHome: info.viewInHome,
      viewInMenu: info.viewInMenu,
      imgpath: info.imgpath,
      isCategoryOfPoints: info.isCategoryOfPoints,
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
      pedidoOfPoints: pedido.pedidoOfPoints,
      isDelivery: pedido.isDelivery,
      deliveryInfo: pedido.deliveryInfo,
      wasView: pedido.wasView,
      isReady: pedido.isReady,
      paid: pedido.paid,
      pointsInfo: pedido.pointsInfo,
      recibioPuntos: pedido.recibioPuntos,
      total: pedido.total,
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
    const q = query(collection(db, 'pedidos'), where('isReady', '==' ,false));
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
      sizeView: newInfo.sizeView,
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

// Aptualizar si el pedido esta listo y si lo hemos visto
export const UpdateOrderClient = async (email, idOrder, isReady, paid) => {
  try {
    const orderRef = doc(db, 'pedidos', `${email}-${idOrder}`);
    await updateDoc(orderRef, {
      wasView: true,
      isReady: isReady,
      paid: paid,
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

// Agregar info de los points a la app
export const addInfoPoints = async (email, infoPoints) => {
  try {
    const admin = await obtenerInfoApp();
    if(email != admin.admin) return 'no eres admin';
    const appInfoRef = doc(db, 'app', 'app-info');
    await updateDoc(appInfoRef, {
      infoPoints: infoPoints, 
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

// Actualizar el pedido para poner cuantos puntos genero el pedido
export const savePuntosGeneradosForOrder = async (email, idOrder, puntosGenerados, recibioPuntos) => {
  try {
    const orderRef = doc(db, 'pedidos', `${email}-${idOrder}`);
    await updateDoc(orderRef, {
      puntosGenerados: puntosGenerados,
      recibioPuntos: recibioPuntos
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }

}

// Obtener Puntos de usuario
export const getPointsUser = async (email) => {
  try {
    const docRef = doc(db, 'puntos', email);
    const docSnap = await getDoc(docRef);
    
    if(docSnap.exists()){
      return docSnap.data();
    }else {
      return 'usuario no encontrado';
    }
  } catch (e) {
    console.log(e);
    return 'hubo un error'
  }

}

// guardar puntos generados de usuario
export const savePointsUser = async (email, newPoints) => {
  try {
    await setDoc(doc(db, 'puntos', email), {
      email: email,
      puntos: newPoints,
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}


// crear o actualizar categoria de puntos 
export const createCategoryPunto = async (info) => {
  try{
    await setDoc(doc(db, 'categorias', 'category-puntos'), {
      id: info.id,
      nombre: info.nombreCategoria,
      sizeView: info.sizeView,
      viewInHome: info.viewInHome,
      viewInMenu: info.viewInMenu,
      imgpath: info.imgpath,
    });
    return true;
  }catch(e){
    return e;
  }
}

// Actualizar categoria de puntos
export const updateCategoryPunto = async (info) => {
  try {
    const catRef = doc(db, 'categorias', 'category-puntos');
    await updateDoc(catRef, {
      nombre: info.nombreCategoria,
      sizeView: info.sizeView,
      viewInHome: info.viewInHome,
      viewInMenu: info.viewInMenu,
      isCategoryOfPoints: info.isCategoryOfPoints,
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

// obtener categoria de puntos
export const getCategoryPoints = async () => {
  const docRef = doc(db, 'categorias', 'category-puntos');
  const docSnap = await getDoc(docRef);
  if(docSnap.exists()){
    return docSnap.data();
  }else {
    return 'no existe la categoria de puntos';
  }
}

// Obtener los articulos de la categoria de puntos
export const getArticlesCategoryPoints = async (categoryPointsId) => {
  try {
    const q = query(collection(db, 'articulos'), where('categoria', '==', categoryPointsId));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  } catch (e) {
    console.log(e);
    return false;
  }
}

// Crear articulo
export const createArticleOfPoints = async (id, info) => {
  try{
    await setDoc(doc(db, 'articulos', `articulo-categoria-puntos-${id}`), {
      id: id,
      titulo: info.titulo, 
      subtitulo: info.subtitulo,
      categoria: info.categoria,
      imgpath: info.img,
      disponible: info.disponible,
      complex: info.complex,
      puntos: info.puntos,
    });
    return true;
  }catch(e){
    console.log(e)
    return e.message;
  }
}

export const updateArticleOfPoints = async (article) => {
  try {
    const articleRef = doc(db, 'articulos', `articulo-categoria-puntos-${article.id}`);
    await updateDoc(articleRef, {
      disponible: true,
      puntos: article.puntos,
      subtitulo: article.subtitulo,
      titulo: article.titulo,
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }

}

// Para actualizar la informacion de estadisticas del cliente
export const saveEstadistica = async (email, info) => {
  try {
    await setDoc(doc(db, `user-${email}`, `estadistica-pedido-${info.id}`), {
      isEstadistica: true,
      pedidoId: info.id,
      fecha: info.fecha,
      gastado: info.gastado,
      puntosGenerados: info.puntosGenerados,
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

// Borrar estadistica de la info del usuario
export const deleteEstadistica = async (email, estadisticaId) => {
  try {
    await deleteDoc(doc(db, `user-${email}`, `estadistica-pedido-${estadisticaId}`));
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

// create estadisticas del cliente
export const createEstadisticas = async (email, info) => {
  try {
    await setDoc(doc(db, `user-${email}`, 'estadisticas'), {
      dineroGastado: info.dineroGastado,
      puntosGanados: info.puntosGanados,
      puntosGastados: info.puntosGastados,
      puntosRestantes: info.puntosRestantes,
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

// editar estadistica de usuario
export const editEstadistica = async (email, info) => {
  try {
    const estadisticaRef = doc(db, `user-${email}`, 'estadisticas');
    await updateDoc(estadisticaRef, {
      dineroGastado: info.dineroGastado,
      puntosGanados: info.puntosGanados,
      puntosGastados: info.puntosGastados,
      puntosRestantes: info.puntosRestantes,
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

// Editar puntos generados y restantes de usuario
export const editPoints = async (email, info) => {
  try {
    const statisticRef = doc(db, `user-${email}`, 'estadisticas');
    await updateDoc(statisticRef, {
      dineroGastado: info.dineroGastado,
      puntosGanados: info.puntosGanados,
      puntosRestantes: info.puntosRestantes,
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

// obtener estadisticas del cliente
export const getEstadisticas = async (email) => {
  try {
    const docRef = doc(db, `user-${email}`, 'estadisticas');
    const docSnap = await getDoc(docRef);

    if( docSnap.exists()){
      return docSnap.data();
    }else{
      return 'no estadisticas';
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}

// obtener cada estadisticas del cliente
export const getEachStatitics = async (email) => {
  try {
    const q = query(collection(db, `user-${email}`), where('isEstadistica', '==', true));
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach( (doc) => {
      data.push(doc.data());
    });
    return data;
  } catch (e) {
    console.log(e);
    return false;
  }
}