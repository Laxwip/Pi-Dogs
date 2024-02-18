//+ Requerimientos
/*
  Usamos la libreria axios para realizar solicitudes http
*/
const axios = require('axios');
/*
  Requerimos el modelo Temperament de la DB
*/
const { Temperament } = require('../db.js');

//+ Funcion

const getAllTemperaments = async (req, res) => {
  try {
    const { data } = await axios.get("https://api.thedogapi.com/v1/breeds");

    /*
      Usamos Set para que nos sea más facil tener un conjunto en el que no habrá temperamentos duplicados
    */
    const temperamentsSet = new Set();

    data.forEach(dog => {
      /*
        Verificamos si el dog tiene temperamentos
      */
      if (dog.temperament){
        /*
          Separamos los temperamentos en un array
        */
        const temperamentArray = dog.temperament.split(', ');
        /*
          Y por cada uno de ellos se insertan en nuestro conjunto (Set)
        */
        temperamentArray.forEach(temperament => {
            temperamentsSet.add(temperament);
        });
      }
    });

    /*
      Pasa de conjunto(Set) a Array
    */
    const uniqueTemperaments = Array.from(temperamentsSet);

    /*
      Segundo filtro
    */
    for (const temperament of uniqueTemperaments) {
      /*
        Verificamos si hay algun temperamento existente antes de añadirlo 
      */
      const existingTemperament = await Temperament.findOne({ where: { nombre: temperament } });
      if (!existingTemperament) {
        await Temperament.create({ nombre: temperament });
      }
    }
    /*
      Recuperamos todos los datos cargados en la db para mostrarlos en la respuesta
    */
    const allTemperaments = await Temperament.findAll()

    res.status(200).send(allTemperaments)
  } catch (error) {
    console.error(error)
  }
}

module.exports = getAllTemperaments