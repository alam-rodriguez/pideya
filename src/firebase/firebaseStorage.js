import { getStorage, ref, uploadBytes } from 'firebase/storage';

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