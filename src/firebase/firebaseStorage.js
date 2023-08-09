import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const storage = getStorage();

// subir imagen de articulo
export const uploadImageCategory = async (id, file) => {
  try{
    const imgRef = ref(storage, `imagenes-categorias/${id}`);
    await uploadBytes(imgRef, file);
    return true;
  }catch(e){
    console.log(e);
    return false;
  }
}

// subir imagen de articulo
export const uploadImageArticle = async (id, file) => {
  try{
    const imgRef = ref(storage, `imagenes-articulos/${id}`);
    await uploadBytes(imgRef, file);
    return true;
  }catch(e){
    console.log(e);
    return false;
  }
}

// subir imagen de articulo
export const uploadImage = async (id, file) => {
  try{
    const imgRef = ref(storage, `imagenes/${id}`);
    await uploadBytes(imgRef, file);
    return true;
  }catch(e){
    console.log(e);
    return false;
  }
}

// obtener url de imagen
export const getUrlImage = async (path) => {
  try{
    const res = await getDownloadURL(ref(storage, path));
    return res;
  }catch(e){
    console.log(e);
    return false;
  }
}

// Borrar Imagen
export const deleteImageCategory = async (id) => {
 try {
    const imageRef = ref(storage, `imagenes-categorias/${id}`);
    await deleteObject(imageRef);
    return true;
 } catch (e) {
    console.log(e.code);
    return false;
 }
}

// Borrar Imagen
export const deleteImageArticle = async (id) => {
  try {
     const imageRef = ref(storage, `imagenes-articulos/${id}`);
     await deleteObject(imageRef);
     return true;
  } catch (e) {
     console.log(e.code);
     return false;
  }
 }

// Borrar Imagen
export const deleteImage = async (id) => {
  try {
     const imageRef = ref(storage, `imagenes/${id}`);
     await deleteObject(imageRef);
     return true;
  } catch (e) {
     console.log(e.code);
     return false;
  }
 }