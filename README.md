# Gerenciamento de Repositórios do GitHub - Desafio tecnico

- [Instalação](#instalacao)
- [Briefing do desafio ](#briefing-do-desafio)
- [Requisitos](#requisitos)

## Instalação

### Servidor

Acessar a pasta `server`

```sh
cd server
```

Baixar dependencias

```sh
npm install
```

Iniciar o servidor

```sh
npm run start:dev
```

Conexão com o banco 

Caso necessario altere os dados do banco em - `/server/db.ts`
Ajustar o `paths` do arquivo db.ts para o caminho relativo para o endereço atual - `server
/tsconfig.json
`

```sh
npm run server
```

### Client

```sh
npm install
```

Iniciar o front-end [http://localhost:8080/](http://localhost:8080/) 

```sh
npm run dev
```

### RabbitMQ

Para iniciar o RabbitMQ e acessar o painel de controle web [http://localhost:15672](http://localhost:15672)

Certifique-se de ter o Docker instalado e em execução em sua máquina antes de executar este comando

`docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management`


### Banco de dados



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
