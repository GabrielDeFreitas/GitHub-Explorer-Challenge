import express from 'express';
import cors from 'cors';
import githubRoutes from './github';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use('/api', githubRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
