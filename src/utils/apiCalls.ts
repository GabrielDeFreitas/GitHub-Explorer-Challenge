export async function searchUsers(searchTerm: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/users?term=${searchTerm}`);
    if (response.ok) {
      const data = await response.json();
      return { users: data.users, pagination: data.pagination, error: '', selectedUser: null };
    } else {
      const errorMessage = await response.text();
      return { error: errorMessage };
    }
  } catch (error) {
    return { error: 'Erro ao buscar usuários. Por favor, tente novamente mais tarde.' };
  }
}

export async function goToPage(searchTerm: string, page: number) {
  try {
    const response = await fetch(`http://localhost:3000/api/users?term=${searchTerm}&page=${page}`);
    if (response.ok) {
      const data = await response.json();
      return { users: data.users, pagination: data.pagination, error: '', selectedUser: null };
    } else {
      const errorMessage = await response.text();
      return { error: errorMessage };
    }
  } catch (error) {
    return { error: 'Erro ao buscar usuários. Por favor, tente novamente mais tarde.' };
  }
}
