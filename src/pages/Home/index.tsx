import { useState } from 'react';
import DefaultAvatar from '/src/assets/defaulAvatar.png';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../components/Button';
import { Container } from '../../components/Container';
import { searchUsers, goToPage } from '../../utils/apiCalls';
import { downloadCSV } from '../../utils/fileDownload';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [users, setUsers] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    perPage: 10,
  });
  const [error, setError] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const searchUsersHandler = async () => {
    try {
      if (!searchTerm.trim()) {
        setError('É necessário digitar algo para realizar a busca.');
        return;
      }

      const { users, pagination, error, selectedUser } = await searchUsers(searchTerm);
      setUsers(users);
      setPagination(pagination);
      setError(error);
      setSelectedUser(selectedUser);
    } catch (error) {
      setError('Erro ao buscar usuários. Por favor, tente novamente mais tarde.');
    }
  };

  const goToPageHandler = async (page: number) => {
    const { users, pagination, error, selectedUser } = await goToPage(searchTerm, page);
    setUsers(users);
    setPagination(pagination);
    setError(error);
    setSelectedUser(selectedUser);
  };

  const generateCSVContent = () => {
    if (!selectedUser || !selectedUser.repos) return '';

    const header = 'Nome do Repositório,Descrição,Linguagem,Data de Criação,Estrelas,Link do repositório\n';
    const rows = selectedUser.repos
      .map((repo: any) => {
        const { name, description, language, created_at, stargazers_count, html_url } = repo;
        const formattedLanguage = language || 'Não especificado';
        const formattedDescription = description || 'Não especificado';
        return `${name},${formattedDescription},${formattedLanguage},${new Date(created_at).toLocaleDateString('pt-BR')},${stargazers_count},${html_url}`;
      })
      .join('\n');

    return header + rows;
  };

  const downloadCSVHandler = () => {
    downloadCSV(selectedUser, generateCSVContent);
  };

  return (
    <>
      <Container>
        <section className="flex flex-col gap-4">
          <div className="flex gap-3 items-center justify-between">
            <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg flex items-center gap-3">
              <input
                className="bg-transparent flex-1 outline-none border-0 p-0 text-sm"
                placeholder="Buscar usuários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={searchUsersHandler}>Buscar</button>
            </div>
          </div>

          {error && <div className="text-sm py-3 px-4 border border-rose-500 rounded-lg text-rose-500">{error}</div>}

          {users.map((user) => (
            <div key={user.id} className="py-3 px-4 border border-white/10 rounded-lg">
              <div className="grid grid-cols-2 items-center">
                <div className="text-left flex items-center">
                  <img
                    className="w-10 h-10 rounded-full mr-4"
                    src={user.avatar_url || DefaultAvatar}
                    alt={`Avatar de ${user.login}`}
                    title={`Avatar de ${user.login}`}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-light">
                      Usuário: <span className="font-bold">{user.login}</span>
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <Button onClick={() => setSelectedUser(user)}>Exibir Detalhes</Button>
                </div>
              </div>
            </div>
          ))}

          <div className="py-3 px-4 border border-white/10 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm">
                  Mostrando {users.length} de {pagination.totalItems} itens
                </span>
              </div>
              <div className="inline-flex items-center gap-8">
                <div className="flex gap-1.5">
                  <button
                    className="bg-white/10 border border-white/10 rounded-md p-1.5 disabled:opacity-25"
                    onClick={() => goToPageHandler(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    className="bg-white/10 border border-white/10 rounded-md p-1.5 disabled:opacity-25"
                    onClick={() => goToPageHandler(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {selectedUser && (
            <div className="mt-6">
              <div className="grid grid-cols-2 items-center py-3 px-4 border border-emerald-900 rounded-lg">
                <h2 className="text-sm text-left">
                  Repositórios de <span className="font-bold">{selectedUser.login}</span>
                </h2>
                <div className="text-right">
                  <Button
                    className=" bg-emerald-500 hover:bg-emerald-400 text-sm font-bold py-2 px-4 rounded disabled:opacity-25"
                    onClick={downloadCSVHandler}
                    disabled={!selectedUser.repos || selectedUser.repos.length === 0}
                  >
                    Exporta CSV
                  </Button>
                </div>
              </div>{' '}
              <ul className="mt-4 grid grid-cols-2 items-center gap-3">
                {selectedUser.repos &&
                  selectedUser.repos.map((repo: any) => (
                    <li key={repo.id} className="text-sm py-3 px-4 border border-emerald-900 rounded-lg">
                      <h2 className="font-sm font-bold">{repo.name}</h2>
                      <span className="text-sm">Criado: {new Date(repo.created_at).toLocaleDateString('pt-BR')}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </section>
      </Container>
    </>
  );
}
