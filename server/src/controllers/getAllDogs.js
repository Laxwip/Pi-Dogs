const axios = require("axios");
require('dotenv').config();
const {
  API_KEY
} = process.env; 

const getAllDogs = async (req, res) => {
  try {
    const {data} = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key={${API_KEY}}`)

    res.status(200).json(data)
  } catch (error) {
    console.error(error)
  }

}

module.exports = getAllDogs