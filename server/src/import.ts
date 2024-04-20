import express from 'express';
import multer from 'multer';
import csvParser from 'csv-parser';
import fs from 'fs';
import { connection } from '/home/gabrielfreitasdev/GitHub-Explorer-Challenge/server/db';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/import', upload.single('csvFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  }

  const csvFilePath = req.file.path;

  const results: any[] = [];
  fs.createReadStream(csvFilePath)
    .pipe(csvParser())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      console.log(results);
      for (const result of results) {
        const dataCriacaoParts = result['Data de Criação'].split('/');
        const dataCriacao = `${dataCriacaoParts[2]}-${dataCriacaoParts[1]}-${dataCriacaoParts[0]}`;

        connection.query('INSERT INTO github (nome_repositorio, descricao, linguagem, data_criacao, estrelas, link_repositorio) VALUES (?, ?, ?, ?, ?, ?)', [result['Nome do Repositório'], result['Descrição'], result['Linguagem'], dataCriacao, result['Estrelas'], result['Link do repositório']], (err, results) => {
          if (err) {
            console.error('Erro ao inserir dados no banco de dados:', err);
            res.status(500).json({ error: 'Erro ao inserir dados no banco de dados' });
            return;
          }
          console.log('Dados inseridos com sucesso:', results);
        });
      }
      res.status(200).json({ data: results });
    })
    .on('error', (error) => {
      console.error('Erro ao ler arquivo CSV:', error);
      res.status(500).json({ error: 'Erro ao processar arquivo CSV' });
    });
});

export default router;
