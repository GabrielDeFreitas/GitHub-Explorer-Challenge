import { useState } from 'react';
import DefaultAvatar from '/src/assets/defaulAvatar.png';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

  const searchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users?term=${searchTerm}`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
        setPagination(data.pagination);
        setError('');
        setSelectedUser(null); // Limpa o estado do usuário selecionado ao fazer nova consulta
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      setError('Erro ao buscar usuários. Por favor, tente novamente mais tarde.');
    }
  };

  const goToPage = async (page: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users?term=${searchTerm}&page=${page}`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
        setPagination(data.pagination);
        setError('');
        setSelectedUser(null); // Limpa o estado do usuário selecionado ao fazer nova consulta
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      setError('Erro ao buscar usuários. Por favor, tente novamente mais tarde.');
    }
  };

  const loadUserRepos = async (username: string) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      if (response.ok) {
        const reposData = await response.json();
        setSelectedUser({ ...selectedUser, repos: reposData });
      } else {
        throw new Error('Erro ao buscar repositórios do usuário.');
      }
    } catch (error) {
      console.error('Erro ao buscar repositórios do usuário:', error);
    }
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto p-5 flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <div className="flex gap-3 items-center justify-between">
            <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg flex items-center gap-3">
              <input
                className="bg-transparent flex-1 outline-none border-0 p-0 text-sm"
                placeholder="Buscar usuários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={searchUsers}>Buscar</button>
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
                  <button
                    className="bg-cyan-500 hover:bg-cyan-400 text-sm font-bold py-2 px-4 rounded"
                    onClick={() => setSelectedUser(user)}
                  >
                    Exibir Detalhes
                  </button>
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
                    onClick={() => goToPage(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    className="bg-white/10 border border-white/10 rounded-md p-1.5 disabled:opacity-25"
                    onClick={() => goToPage(pagination.currentPage + 1)}
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
              <div className="grid grid-cols-2 items-center py-3 px-4 border border-emerald-500 rounded-lg">
                <h2 className="text-sm text-left">
                  Repositórios de <span className="font-bold">{selectedUser.login}</span>
                </h2>
                <div className="text-right">
                  <button className=" bg-emerald-500 hover:bg-emerald-400 text-sm font-bold py-2 px-4 rounded">
                    Exporta CSV
                  </button>
                </div>
              </div>{' '}
              <ul className="mt-4 grid grid-cols-2 items-center gap-3">
                {selectedUser.repos &&
                  selectedUser.repos.map((repo: any) => (
                    <li key={repo.id} className="text-sm py-3 px-4 border border-emerald-500 rounded-lg">
                      {repo.name}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
