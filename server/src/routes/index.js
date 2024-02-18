//+ Requerimientos de los controladores

const getAllDogs = require('../controllers/getAllDogs');
const getDogsByName = require('../controllers/getDogByName');
const getDogsById = require('../controllers/getDogById');
const postDog = require('../controllers/postDog');
const getAllTemperaments = require('../controllers/getAllTemperaments');

//+ Requerimiento del Router

const { Router } = require('express');
const router = Router();

//+ Dogs info
router.get("/dogs", getAllDogs)
router.get("/dogs/name", getDogsByName)
router.get("/dogs/:id", getDogsById)

//+ Post dog
router.post("/dogs", postDog)

//+ Temperaments
router.get("/temperaments", getAllTemperaments)


module.exports = router;
