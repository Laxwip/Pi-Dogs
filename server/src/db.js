//+ Requerimientos
/*
  Requerimos el paquete dotenv y llamamos a su funcion config para leer el archivo .env y cargarlos en el objeto process.env
*/
require("dotenv").config();
/*
  Requerimos la libreria Sequelize
*/
const { Sequelize } = require("sequelize");
/*
  Requerimos fs, nativo de Node, este nos permite manipular los archivos o directorios
*/
const fs = require('fs');
/*
  Requerimos path, nativo de Node, nos permite trabajar con las rutas de archivos y directorios
*/
const path = require('path');
/*
  Extraemos las variables globales del objeto process
*/
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

/*
  Creando la base de datos
*/
const Database = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
/*
  Extrae el nombre del archivo de la ruta en la que estamos
*/
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(Database));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(Database.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
Database.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Dog, Temperament } = Database.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Dog.belongsToMany(Temperament, { through: "dog_temperament" });
Temperament.belongsToMany(Dog, { through: "dog_temperament" });

module.exports = {
  ...Database.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  Database,     // para importart la conexión { Database } = require('./db.js');
};
