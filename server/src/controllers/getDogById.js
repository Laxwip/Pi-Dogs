//+ Requerimientos
/*
  Libreria para realizar solicitudes http
*/
const axios = require("axios");
/*
  Requerimos las variables de entorno de nuestro archivo .env
*/
require('dotenv').config();
/*
  Extraemos la variable API_KEY
*/
const { API_KEY } = process.env; 
/*
  Requerimos el Modelo Dog
*/
const { Dog, Temperament } = require('../db.js');


//+ Funcion

const getDogsById = async (req, res) => {
  const idParam = req.params.id;
  try {
    const { data : dataApi = [] } = await axios.get(`https://api.thedogapi.com/v1/breeds/${idParam}`, {
      /*
        Realizado con headers por motivos de seguridad de datos sensibles en los registros de servidores y en la misma URL
      */
      headers: {
        "x-api-key": API_KEY,
      }
    })

  let dataDb = await Dog.findOne({ 
    where: { id: idParam } ,
    include: [{
      model: Temperament,
      attributes: ["nombre"],
      through: { attributes: [] }
    }
    ]
  })

  /*
    Operador de fusion nula, verifica si hay un valor null y lo reemplaza con un objeto vacio
  */
  dataDb = dataDb || {};

  const response = {
    apiResults: dataApi,
    dbResults: dataDb
  }

  res.status(200).json(response)
  } catch (error) {
    console.error(error)  
  }
}

module.exports = getDogsById