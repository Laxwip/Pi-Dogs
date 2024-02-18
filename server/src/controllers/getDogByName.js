//+ Requerimientos
/*
  Libreria para realizar solicitudes http
*/
const axios = require("axios");
/*
  Requerimos los datos de entornos guardados en nuestro archivo .env
*/
require('dotenv').config();
/*
  Extraemos la API_KEY
*/
const { API_KEY } = process.env;  
/*
  Requerimos la libreria Sequelize y los Operadores (Op)
*/
const { Sequelize , Op} = require("sequelize");
/*
  Requerimos el Modelo Dog
*/
const { Dog } = require("../db");

//+ Funcion

const getDogsByName = async (req, res) => {
  try {
    const name = req.query.name;

    

    const { data: dataApi = [] } = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`, {
      /*
        Realizado con headers como buena practica para evitar exponer datos sensibles con los registros de servidores
      */
      headers: {
        "x-api-key": API_KEY
      }
    })

    const dataDb = await Dog.findAll({
      where: {
        nombre: {
          /*
            Operador de sequelize que permite hacer una busqueda dentro de los strings sin diferenciar entre mayus o minus
          */
          [Op.iLike]: `%${name}%`,
        },
      },
    })

    // const AllMatches = [ dataApi, dataDb ]

    const response = {
      apiResults: dataApi,
      dbResults: dataDb
    }

    res.status(200).json(response)
  } catch (error) {
    res.status(400).send("Algo salió mal con la busqueda del perro.")
  }
}

module.exports = getDogsByName