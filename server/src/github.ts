import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/users', async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.term as string;
    const response = await axios.get(`https://api.github.com/search/users?q=${searchTerm}`);
    const users = response.data.items;
    res.json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários do GitHub:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários do GitHub' });
  }
});

export default router;
