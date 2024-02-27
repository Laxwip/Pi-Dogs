const { Dog, Temperament } = require('../db.js');

const postDog = async (req, res) => {
  try {
    const data = req.body

    /*
      Creamos el modelo del perro extrayendo los datos que recibimos por body
    */
    const perro = {
      imagen: data.imagen,
      nombre: data.nombre,
      altura: data.altura,
      peso: data.peso,
      añosDeVida: data.añosDeVida
    }

    /*
      Verificamos si temperamentos es un Array y si contiene algo
    */
    const temperaments = Array.isArray(data.temperamentos) ? data.temperamentos : [];
    /*
      Creamos el perro con los datos recibidos por body
    */
    const dog = await Dog.create(perro)
    /*
      Conseguimos todos los temperamentos de nuestro modelo Temnperament que coincidan con los que recibimos por body
    */
    const temperamentos = await Promise.all(temperaments.map(async temperamento => {
      return await Temperament.findOne({where: {nombre: temperamento}})
    }))
    /*
      Ahora por cada temperamento que tengamos coincidentes los vinculamos con el perro que estamos creando
    */
    await Promise.all(temperamentos.map(async temperament => {
      await dog.setTemperaments([temperament])
    }))

    /*
      Conseguimos el perro que se a creado con sus temperamentos vinculados
    */
    const dogAdded = await Dog.findAll({
      include:[{
        model: Temperament,
        attributes: ["nombre"],
        through: { attributes: [] }
      }]
    });

    res.send(dogAdded)
  } catch (error) {
    console.error(error)
    res.status(500).send("Hubo un error al añadir un nuevo perro");
  }
}

module.exports = postDog