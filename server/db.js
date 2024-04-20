const mysql = require('mysql');
const fs = require('fs');
const csvParser = require('csv-parser');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'refricomfrango',
  password: '123',
  database: 'banco'
});

function insertDataFromCSV(csvFilePath) {
  const results = [];

  fs.createReadStream(csvFilePath)
    .pipe(csvParser())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      console.log(results);

      connection.connect();
      for (const result of results) {
        connection.query('INSERT INTO github (nome_repositorio, descricao, linguagem, data_criacao, estrelas, link_repositorio) VALUES (?, ?, ?, ?, ?, ?)', [result['Nome do Repositório'], result['Descrição'], result['Linguagem'], result['Data de Criação'], result['Estrelas'], result['Link do repositório']], (err, results) => {
          if (err) {
            console.error('Erro ao inserir dados no banco de dados:', err);
            return;
          }
          console.log('Dados inseridos com sucesso:', results);
        });
      }
      connection.end();
    })
    .on('error', (error) => {
      console.error('Erro ao ler arquivo CSV:', error);
    });
}

module.exports = {
  connection,
  insertDataFromCSV
};
