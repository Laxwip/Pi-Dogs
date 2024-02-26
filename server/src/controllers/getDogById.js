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
    
    const newTemperament = dataApi?.temperament?.split(",")
    const newImage = `https://cdn2.thedogapi.com/images/${dataApi?.reference_image_id}.jpg`
    const newDataApi = {
      id: dataApi.id,
      imagen: newImage,
      nombre: dataApi.name,
      altura: dataApi.height.metric,
      peso: dataApi.weight.metric,
      temperamentos: newTemperament,
      añosDeVida: dataApi.life_span,
      origen: "api"
    }


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

    const newData = {
      id: dataDb.id,
      imagen: dataDb.imagen,
      nombre: dataDb.nombre,
      altura: dataDb.altura,
      peso: dataDb.peso,
      temperaments: dataDb.temperaments?.map(temperament => temperament.nombre),
      añosDeVida: dataDb.añosDeVida,
      origen: "db"
    };

    const response = {
      apiResults: newDataApi,
      dbResults: newData
    }

  res.status(200).json(response)
  } catch (error) {
    console.error(error)  
  }
}

module.exports = getDogsById