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
/*
  Traemos los modelos para incluirlo en la consulta de todos los perros
*/
const { Dog, Temperament } = require('../db.js');


//+ Funcion 

const getAllDogs = async (req, res) => {
  try {
    //+ Perros de la api
    /*
      Traemos todos los perros que nos ofrece la api, desestructurando data
    */
    const {data} = await axios.get("https://api.thedogapi.com/v1/breeds", {
      /*
        Realizado con headers como buena practica para evitar exponer datos sensibles con los registros de servidores
      */
      headers: {
        "x-api-key": API_KEY
      }
    });
    /*
      Creamos un nuevo array donde iran los perros que recibimos de la api pero con una estructura modificada
    */
    const newDataApi = []
    /*
      Creamos una variable donde guardaremos los temperamentos modificados para que esten dentro de un array y no sea un string
    */
    let newTemperament = []
    /*
      Mapeamos el array de la respuesta de la api
      y creamos un nuevo modelo
      lo pusheamos a el array recientemente creado
      y lo devolvemos en la respuesta
    */
    data.map(dog => {
      /*
        Por cada perro, verificamos si existen temperamentos y los separamos por las comas añadiendose en un array que nos será de utilidad al manejar la informacion
      */
      newTemperament = dog?.temperament?.split(",").map(temperament => temperament.trim());
      const newDog = {
        id: dog.id,
        imagen: dog.image.url,
        nombre: dog.name,
        altura: dog.height.metric,
        peso: dog.weight.metric,
        temperamentos: newTemperament,
        añosDeVida: dog.life_span,
        origen: "api"
      }
      newDataApi.push(newDog)
    })

    //+ Perros de la DB
    const dataDb = await Dog.findAll({
      include: [
        {
          model: Temperament,
          // as: 'temperaments', // Asegúrate de usar el alias correcto aquí si lo has definido en la relación
          attributes: ["nombre"],
          through: {
            // Si has definido un modelo intermedio para la relación muchos a muchos, especifícalo aquí
            attributes: [], // Puedes especificar qué atributos del modelo intermedio deseas incluir
          },
        },
      ],
    })

    const newDataDb = []

    dataDb.map(dog => {
      const newData = {
        id: dog.id,
        imagen: dog.imagen,
        nombre: dog.nombre,
        altura: dog.altura,
        peso: dog.peso,
        temperamentos: dog.temperaments?.map(temperament => temperament.nombre),
        añosDeVida: dog.añosDeVida,
        origen: "db"
      };
      newDataDb.push(newData)
    })


    const response = {
      apiResults: newDataApi,
      dbResults: newDataDb,
    }
    res.status(200).json(response)
  } catch (error) {
    console.error(error)
    res.status(400).send(error.message)
  }
}

module.exports = getAllDogs