const axios = require("axios");
require('dotenv').config();
const {
  API_KEY
} = process.env; 

const getDogsById = async (req, res) => {
  const id = req.params.id;
  try {
    const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}?api_key={${API_KEY}}`)

    res.status(200).json(data);
  } catch (error) {
    console.error(error)  
  }
}

module.exports = getDogsById