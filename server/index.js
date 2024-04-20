//+ Requerimientos
/*
  Requerimos el servidor creado
*/
const server = require('./src/server.js');
/*
  Requerimos la Base de datos 
*/
const { Database } = require('./src/db.js');

//+ Iniciar servidor
/*
  Se sincroniza la base de datos con el servidor, 
  entonces se inicia el servidor e imprime algo en consola.
*/
Database.sync({ alter: true }).then(() => {
  server.listen(3001, () => {
    console.log('Server listening at 3001');
  });
})
.catch(error => console.error(error));
