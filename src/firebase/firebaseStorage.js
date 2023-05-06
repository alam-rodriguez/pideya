import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const storage = getStorage();

// subir imagen de articulo
export const uploadImage = async (id, file) => {
  try{
    const imgRef = ref(storage, `imagenes/${id}`);
    await uploadBytes(imgRef, file);
    return true;
  }catch(e){
    return e;
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