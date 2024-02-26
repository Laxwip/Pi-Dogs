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
const { Dog, Temperament } = require("../db");

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

    /*
      Creamos un nuevo array donde iran los perros que recibimos de la api pero con una estructura modificada
    */
    const newDataApi = []
    /*
      Creamos una variable donde guardaremos los temperamentos modificados para que esten dentro de un array y no sea un string
    */
    let newTemperamentApi = []
    /*
      Mapeamos el array de la respuesta de la api
      y creamos un nuevo modelo
      lo pusheamos a el array recientemente creado
      y lo devolvemos en la respuesta
    */
    dataApi.map(dog => {
      /*
        Por cada perro, verificamos si existen temperamentos y los separamos por las comas añadiendose en un array que nos será de utilidad al manejar la informacion
      */
      newTemperamentApi = dog?.temperament?.split(",")
      const newDog = {
        id: dog?.id,
        imagen: dog?.image?.url,
        nombre: dog?.name,
        altura: dog?.height?.metric,
        peso: dog?.weight?.metric,
        temperamentos: newTemperamentApi,
        añosDeVida: dog?.life_span,
        origen: "api"
      }
      newDataApi.push(newDog)
    })

    const newDataDb = []

    if(name !== ""){
      const dataDb = await Dog.findAll({
        where: {
          nombre: {
          /*
            Operador de sequelize que permite hacer una busqueda dentro de los strings sin diferenciar entre mayus o minus
            */
          [Op.iLike]: `%${name}%`,
        },
      },
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
      dataDb?.map(dog => {
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
    }


    
  
    const response = {
      apiResults: newDataApi,
      dbResults: newDataDb,
    };

    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(400).send("Algo salió mal con la busqueda del perro.")
  }
}

module.exports = getDogsByName