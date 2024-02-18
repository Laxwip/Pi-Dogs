//+ Requerimientos
/*
  Importamos libreria axios, basada en promesas para realizar solicitudes http
*/
const axios = require("axios");
/*
  Cargamos las variables de entorno desde nuestro archivo .env
*/
require('dotenv').config();
/*
  Extraemos la variable API_KEY de el objeto process.env
*/
const { API_KEY } = process.env; 

//+ Funcion 

const getAllDogs = async (req, res) => {
  try {
    // const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key={${API_KEY}}`)
    const {data} = await axios.get("https://api.thedogapi.com/v1/breeds", {
      /*
        Realizado con headers como buena practica para evitar exponer datos sensibles con los registros de servidores
      */
      headers: {
        "x-api-key": API_KEY
      }
    });
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(400).send(error.message)
  }
}

module.exports = getAllDogs