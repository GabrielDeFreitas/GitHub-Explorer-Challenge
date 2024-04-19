# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# Gerenciamento de Repositórios do GitHub - Desafio tecnico

- [Instalação](#instalacao)
- [Briefing do desafio ](#briefing-do-desafio)
- [Requisitos](#requisitos)
- [Desenvolvimento](#desenvolvimento)
- [Conclusão](#conclusao)

## Instalação

### Servidor

```sh
cd server
```

```sh
npm install
```

```sh
npm run start:dev
```

### Client

```sh
npm install
```

```sh
npm run dev
```

## Briefing do desafio

Imagine criar uma plataforma que permita aos usuários pesquisar e gerenciar facilmente os repositórios do GitHub.
Este desafio envolve a criação de um aplicativo web com duas telas distintas e um backend para processamento de dados em segundo plano, afim de atestar o conhecimento em jobs em segundo plano utilizando fila, banco de dados e api rest.

## Requisitos:

### Tela 1: Pesquisa e Exportação

- Deve fornecer uma barra de pesquisa que permite aos usuários buscar por um usuário do GitHub.
- Ao selecionar um usuário, deve exibir todos os seus repositórios.
- Deve incluir um botão para exportar todos os repositórios do usuário no formato CSV.

### Tela 2: Importação e Visualização

- Deve conter um botão para importar os repositórios exportados da tela anterior.
- Deve exibir uma tabela com os repositórios importados, incluindo o nome do repositório,
  o nome do proprietário e a quantidade de estrelas do repositório.

### Backend:

- Processar os dados importados usando jobs em segundo plano e uma fila com RabbitMQ.
- Notificar o frontend quando o processamento estiver completo.

### Recursos Adicionais Desejáveis:

- Implementar filtros para os campos da tabela, permitindo aos usuários refinar sua visualização.

### Deploy

Faça um passo a passo do processo de execução do projeto,
lembrando da obrigatoriedade do uso de Docker

## Desenvolvimento

## Conclusão
