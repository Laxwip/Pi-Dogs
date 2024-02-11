const server = require('./src/app.js');
const { Database } = require('./src/db.js');

Database.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('Server listening at 3001');
  });
}).catch(error => console.error(error));
