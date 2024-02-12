const axios = require("axios");
require('dotenv').config();
const {
  API_KEY
} = process.env; 
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const { Dog } = require("../db");

const getDogsByName = async (req, res) => {
  try {
    const name = req.query.name;

    

    const { data: dataApi = [] } = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)

    const { data: dataDb = [] } = await Dog.findAll({
      where: {
        nombre: {
          /*
            Operador de sequelize que permite hacer una busqueda dentro de los strings sin diferenciar entre mayus o minus
          */
          [Op.iLike]: `%${name}%`,
        },
      },
    })

    const AllMatches = [ dataApi, dataDb ]

    res.status(200).json(AllMatches)
  } catch (error) {
    console.error(error)
  }
}

module.exports = getDogsByName