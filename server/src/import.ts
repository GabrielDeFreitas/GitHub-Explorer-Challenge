import express from 'express';
import multer from 'multer';
import csvParser from 'csv-parser';
import fs from 'fs';
import amqp from 'amqplib/callback_api'; 

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

      amqp.connect('amqp://localhost', function(error0, connection) {
        if (error0) {
          throw error0;
        }
        connection.createChannel(function(error1, channel) {
          if (error1) {
            throw error1;
          }
          var queue = 'csvFiles';
          var msg = csvFilePath;

          channel.assertQueue(queue, {
            durable: false
          });

          channel.sendToQueue(queue, Buffer.from(msg));
          console.log(" [x] Sent %s", msg);
        });
        setTimeout(function() {
          connection.close();
        }, 500);
      });

      res.status(200).json({ data: results });
    })
    .on('error', (error) => {
      console.error('Erro ao ler arquivo CSV:', error);
      res.status(500).json({ error: 'Erro ao processar arquivo CSV' });
    });
});

export default router;
