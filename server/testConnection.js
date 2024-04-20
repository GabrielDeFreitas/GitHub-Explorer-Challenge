const { connection } = require('./db.js');

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados MariaDB');
});

