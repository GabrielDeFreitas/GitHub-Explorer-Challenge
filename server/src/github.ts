import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/users', async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.term as string;
    const page = req.query.page ? parseInt(req.query.page as string) : 1; // Página padrão é 1
    const perPage = 4; // Número padrão de usuários por página

    if (!searchTerm) {
      return res.status(400).send('O parâmetro de termo de busca não foi fornecido.');
    }

    const response = await axios.get(
      `https://api.github.com/search/users?q=${searchTerm}&page=${page}&per_page=${perPage}`,
    );
    const { total_count, items } = response.data; // Extrai o total de usuários e os usuários da resposta

    const totalPages = Math.ceil(total_count / perPage); // Calcula o número total de páginas

    const paginationInfo = {
      totalItems: items.length,
      totalPages: totalPages,
      currentPage: page,
      perPage: perPage,
    };

    res.json({ users: items, pagination: paginationInfo }); // Retorna os usuários e informações de paginação
  } catch (error) {
    console.error('Erro ao buscar usuários do GitHub:', error);
    res.status(500).send('Erro ao buscar usuários do GitHub. Por favor, tente novamente mais tarde.');
  }
});

export default router;
