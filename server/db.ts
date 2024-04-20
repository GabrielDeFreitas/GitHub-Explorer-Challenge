import mysql from 'mysql';
import fs from 'fs';
import csvParser from 'csv-parser';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'refricomfrango',
  password: '123',
  database: 'banco'
});

function createGitHubTable(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    connection.query(`
      CREATE TABLE IF NOT EXISTS github (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome_repositorio VARCHAR(255),
        descricao TEXT,
        linguagem VARCHAR(50),
        data_criacao DATE,
        estrelas INT,
        link_repositorio VARCHAR(255)
      )
    `, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function insertDataFromCSV(csvFilePath: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const results: any[] = [];

    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on('data', (data: any) => results.push(data))
      .on('end', () => {
        console.log(results);

        for (const result of results) {
          connection.query('INSERT INTO github (nome_repositorio, descricao, linguagem, data_criacao, estrelas, link_repositorio) VALUES (?, ?, ?, ?, ?, ?)', [result['Nome do Repositório'], result['Descrição'], result['Linguagem'], result['Data de Criação'], result['Estrelas'], result['Link do repositório']], (err, results) => {
            if (err) {
              console.error('Erro ao inserir dados no banco de dados:', err);
              reject(err);
              return;
            }
            console.log('Dados inseridos com sucesso:', results);
          });
        }
        resolve();
      })
      .on('error', (error: Error) => {
        console.error('Erro ao ler arquivo CSV:', error);
        reject(error);
      });
  });
}

export { connection, createGitHubTable, insertDataFromCSV };
