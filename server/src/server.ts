interface User {
  name: string;
  age: number;
}

function saveUserToDatabase(user: User) {
  //salvar no banco de dados alguma coisa bla bla
  console.log(user);
}

saveUserToDatabase({
  name: 'Rarirama',
  age: 32,
});
