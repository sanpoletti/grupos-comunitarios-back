const { Connection } = require('tedious');

const config = {
  server: '10.22.0.253',
  authentication: {
    type: 'default',
    options: {
      userName: 'sandra',
      password: 'Ranelagh22',
    }
  },
  options: {
    database: 'gruposcomunitarios',
    encrypt: false,
    trustServerCertificate: true,
    port: 1433,
  }
};

const connection = new Connection(config);

connection.on('connect', err => {
  if (err) {
    console.error('Error de conexión:', err);
  } else {
    console.log('Conectado correctamente a SQL Server!');
  }
  connection.close();
});

connection.connect();
