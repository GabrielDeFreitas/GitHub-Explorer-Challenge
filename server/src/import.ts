import express from 'express';
import multer from 'multer';
import csvParser from 'csv-parser';
import fs from 'fs';

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
      res.status(200).json({ data: results });
    })
    .on('error', (error) => {
      console.error('Erro ao ler arquivo CSV:', error);
      res.status(500).json({ error: 'Erro ao processar arquivo CSV' });
    });
});

export default router;
