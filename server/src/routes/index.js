const { Router } = require('express');
const getAllDogs = require('../controllers/getAllDogs');
const getDogsById = require('../controllers/getDogById');
const getDogsByName = require('../controllers/getDogByName');
const postDog = require('../controllers/postDog');
const getAllTemperaments = require('../controllers/getAllTemperaments');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//+ Requerimientos de los controladores

const router = Router();

//+ Dogs info
router.get("/dogs", getAllDogs)
router.get("/dogs/name", getDogsByName)
router.get("/dogs/:idRaza", getDogsById)

//+ Post dog
router.post("/dogs", postDog)

//+ Temperaments
router.get("/temperaments", getAllTemperaments)


module.exports = router;
