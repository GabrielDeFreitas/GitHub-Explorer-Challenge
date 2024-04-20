import mysql from 'mysql';
import { connection } from './db';

connection.connect((err: mysql.MysqlError) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados MariaDB');
});
