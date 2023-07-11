import axios from "axios";

//#region Funciones de Muebles
// Funcion para obtener los muebles para la lista administrativa
async function GetProductsManage(state) {
  const token = localStorage.getItem('token'); // Obtener el token almacenado en el localStorage
  const headers = {
    'Authorization': `Bearer ${token}` // Agregar el encabezado Authorization con el valor del token
  };

  const result = await axios.get("https://apiurl.com/producto/manage", { headers });
  const productos = result.data.productos || [];
  state(productos);
}

// Función para realizar la petición de inserción de un mueble
async function SaveProducts(data, headers) {
  return axios.post("https://apiurl.com/producto", data, { headers });
}

// Función para realizar la petición de actualizacion de un mueble
async function UpdateProducts(id, data, headers) {
  return axios.put(`https://apiurl.com/producto/${id}`, data, { headers });
}

// Función para realizar la petición de eliminacion de un mueble
async function DeleteProducts(id, headers) {
  return axios.delete(`https://apiurl.com/producto/${id}`, { headers });
}
//#endregion

//#region Funciones para obtener muebles 
// Funcion para obtener los muebles en stock
async function GetProducts(state) {
  const result = await axios.get("https://apiurl.com/producto");
  const productos = result.data.productos || [];
  state(productos);
}

// Funcion para obtener un mueble especifico por su id
async function GetProductById(id, state) {
  const result = await axios.get("https://apiurl.com/producto/" + id);
  state(result.data);
}

// Funcion para obtener muebles por un tipo de mueble especifico
async function GetProductsByType(type, state) {
  const result = await axios.get("https://apiurl.com/producto/tipo/" + type);
  const productos = result.data.productos || [];
  state(productos);
}

// Funcion para obtener muebles por una categoria especifica
async function GetProductsByCategory(category, state) {
  const result = await axios.get("https://apiurl.com/producto/categoria/" + category);
  const productos = result.data.productos || [];
  state(productos);
}

// Funcion para obtener muebles por un material especifico
async function GetProductsByMaterial(material, state) {
  const result = await axios.get("https://apiurl.com/producto/material/" + material);
  const productos = result.data.productos || [];
  state(productos);
}

// Funcion para obtener muebles en descuento
async function GetProductsOnSale(state) {
  const result = await axios.get("https://apiurl.com/producto/sale");
  const productos = result.data.productos || [];
  state(productos);
}
//#endregion

//#region Funcion para subir Imagen a Cloudinary
const UploadImages = async (imageSelected) => {
  const formData = new FormData();
  formData.append("file", imageSelected);
  formData.append("upload_preset", `${process.env.REACT_APP_UPLOAD_PRESET_NAME}`);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
      formData
    );
    const imageUrl = response.data.secure_url;
    const imageId = response.data.public_id;
    const result = { imageUrl, imageId };
    return result;
  } catch (error) {
    console.log(error);
  }
};
//#endregion

//#region Funciones de Tipos de mueble
// Funcion para obtener los tipos de mueble y guardarlos
async function GetTypes(state) {
  const result = await axios.get("https://apiurl.com/tipo");
  state(result.data.tipos);
}

// Función para guardar un tipo de mueble en la base de datos
async function SaveTypes(nombre, headers) {
  try {
    await axios.post(
      "https://apiurl.com/tipo",
      {
        nombre: `${nombre.charAt(0).toUpperCase() + nombre.slice(1)}`,
      },
      { headers }
    );
    return true; // Indica que el tipo de mueble se guardó exitosamente
  } catch (err) {
    throw err; // Lanza el error para que sea capturado en el bloque catch externo
  }
}

// Función para actualizar un tipo de mueble en la base de datos
async function UpdateTypes(idTipo, nombre, headers) {
  try {
    await axios.put(
      `https://apiurl.com/tipo/${idTipo}`,
      {
        idTipo: idTipo,
        nombre: `${nombre.charAt(0).toUpperCase() + nombre.slice(1)}`,
      },
      { headers }
    );
    return true; // Indica que el tipo de mueble se actualizó exitosamente
  } catch (err) {
    throw err; // Lanza el error para que sea capturado en el bloque catch externo
  }
}

// Función para eliminar un tipo de mueble de la base de datos
async function DeleteTypes(id, headers) {
  try {
    await axios.delete(`https://apiurl.com/tipo/${id}`, { headers });
    return true; // Indica que el tipo de mueble se eliminó exitosamente
  } catch (err) {
    throw err; // Lanza el error para que sea capturado en el bloque catch externo
  }
}
//#endregion

//#region Funciones de Categorías
// Funcion para obtener las categorías y guardarlas 
async function GetCategories(state) {
  const result = await axios.get("https://apiurl.com/categoria");
  state(result.data.categorias);
}

// Función para guardar una categoría en la base de datos
async function SaveCategories(nombre, headers) {
  try {
    await axios.post(
      "https://apiurl.com/categoria",
      {
        nombre: `${nombre.charAt(0).toUpperCase() + nombre.slice(1)}`,
      },
      { headers }
    );
    return true; // Indica que la categoría se guardó exitosamente
  } catch (err) {
    throw err; // Lanza el error para que sea capturado en el bloque catch externo
  }
}

// Función para actualizar una categoría en la base de datos
async function UpdateCategories(idCategoria, nombre, headers) {
  try {
    await axios.put(
      `https://apiurl.com/categoria/${idCategoria}`,
      {
        idCategoria: idCategoria,
        nombre: `${nombre.charAt(0).toUpperCase() + nombre.slice(1)}`,
      },
      { headers }
    );
    return true; // Indica que la categoría se actualizó exitosamente
  } catch (err) {
    throw err; // Lanza el error para que sea capturado en el bloque catch externo
  }
}

// Función para eliminar una categoría de la base de datos
async function DeleteCategories(id, headers) {
  try {
    await axios.delete(`https://apiurl.com/categoria/${id}`, { headers });
    return true; // Indica que la categoría se eliminó exitosamente
  } catch (err) {
    throw err; // Lanza el error para que sea capturado en el bloque catch externo
  }
}
//#endregion

//#region Funciones de Materiales
// Funcion para obtener los materiales y guardarlos
async function GetMaterials(state) {
  const result = await axios.get("https://apiurl.com/material");
  state(result.data.materiales);
}

// Función para guardar un material en la base de datos
async function SaveMaterials(nombre, headers) {
  try {
    await axios.post(
      "https://apiurl.com/material",
      {
        nombre: `${nombre.charAt(0).toUpperCase() + nombre.slice(1)}`,
      },
      { headers }
    );
    return true; // Indica que el material se registró exitosamente
  } catch (err) {
    throw err; // Lanza el error para que sea capturado en el bloque catch externo
  }
}

// Función para actualizar un material en la base de datos
async function UpdateMaterials(idMaterial, nombre, headers) {
  try {
    await axios.put(
      `https://apiurl.com/material/${idMaterial}`,
      {
        idMaterial: idMaterial,
        nombre: `${nombre.charAt(0).toUpperCase() + nombre.slice(1)}`,
      },
      { headers }
    );
    return true; // Indica que el material se actualizó exitosamente
  } catch (err) {
    throw err; // Lanza el error para que sea capturado en el bloque catch externo
  }
}

// Función para eliminar un material de la base de datos
async function DeleteMaterials(id, headers) {
  try {
    await axios.delete(`https://apiurl.com/material/${id}`, { headers });
    return true; // Indica que el material se eliminó exitosamente
  } catch (err) {
    throw err; // Lanza el error para que sea capturado en el bloque catch externo
  }
}
//#endregion

//#region Funcion para el login
// Función para realizar el inicio de sesión del usuario
async function LoginUserFunction(username, password) {
  try {
    const response = await axios.post("https://apiurl.com/usuario/login", {
      username: username,
      password: password,
    });

    if (response.data.statusCode === 200) {
      localStorage.setItem('token', response.data.token);
      return true; // Indica que el inicio de sesión fue exitoso
    } else {
      throw Error;
    }
  } catch (err) {
    throw err; // Lanza el error para que sea capturado en el bloque catch externo
  }
}
//#endregion

export {
  //#region Exportar funciones de muebles
  GetProductsManage,
  SaveProducts,
  UpdateProducts,
  DeleteProducts,
  //#endregion

  //#region Exportar funciones para obtener muebles
  GetProducts,

  GetProductById,

  GetProductsByType,
  GetProductsByMaterial,
  GetProductsByCategory,
  GetProductsOnSale,
  //#endregion

  //#region Exportar funcion para subir imagen a Cloudinary
  UploadImages,
  //#endregion 

  //#region Exportar Funciones de tipos de mueble
  GetTypes,
  SaveTypes,
  UpdateTypes,
  DeleteTypes,
  //#endregion

  //#region Exportar funciones de categorías
  GetCategories,
  SaveCategories,
  UpdateCategories,
  DeleteCategories,
  //#endregion

  //#region Exportar funciones de materiales
  GetMaterials,
  SaveMaterials,
  UpdateMaterials,
  DeleteMaterials,
  //#endregion

  //#region Exportar funcion de Login
  LoginUserFunction
  //#endregion
}