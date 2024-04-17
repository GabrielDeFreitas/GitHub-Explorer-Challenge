import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/users', async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.term as string;
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const perPage = 4;

    if (!searchTerm) {
      return res.status(400).send('O parâmetro de termo de busca não foi fornecido.');
    }

    const response = await axios.get(
      `https://api.github.com/search/users?q=${searchTerm}&page=${page}&per_page=${perPage}`,
    );
    const { total_count, items } = response.data;

    const usersWithReposPromises = items.map(async (user: any) => {
      const reposResponse = await axios.get(user.repos_url, {
        headers: {
          Authorization: `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`,
        },
      });
      const repos = reposResponse.data;

      return {
        ...user,
        repos,
        name: user.name,
        public_repos: user.public_repos,
      };
    });

    const usersWithRepos = await Promise.all(usersWithReposPromises);

    const totalPages = Math.ceil(total_count / perPage);

    const paginationInfo = {
      totalItems: items.length,
      totalPages: totalPages,
      currentPage: page,
      perPage: perPage,
    };

    res.json({ users: usersWithRepos, pagination: paginationInfo });
  } catch (error) {
    console.error('Erro ao buscar usuários do GitHub:', error);
    res.status(500).send('Erro ao buscar usuários do GitHub. Por favor, tente novamente mais tarde.');
  }
});

export default router;
