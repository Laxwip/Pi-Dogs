/*
  Requerimos la libreria Express
*/
const express = require("express");
/*
  Requerimos la rutas que usaremos
*/
const router = require("./routes");
/*
  Requerimos los middlewares
*/
const morgan = require("morgan");
const cors = require("cors");

//+ CREAMOS EL SERVIDOR
const server = express();

//+ MIDDLEWARES
/*
  "dev" especifica el formato de salida que tendran los datos obtenidos por morgan
*/
server.use(morgan("dev"));
/*
  Analiza el cuerpo Json y lo transforma a un objeto Js con el cual podremos trabajar 
*/
server.use(express.json());
/*
  Permite compartir recursos entre diferentes sitios web
*/
server.use(cors());
/*
  Le indicamos al servidor a donde dirigirse indicandole cual es nuestro manejador de rutas
*/
server.use(router);

/*
  Exportamos nuestro servidor para ser iniciado en index.js
*/
module.exports = server;
