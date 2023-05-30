import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const storage = getStorage();

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
    return e;
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