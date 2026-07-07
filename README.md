# 📋 To-Do List Fullstack (React + Node.js + MongoDB)

Este é um projeto de **Lista de Tarefas (To-Do List)** completo, contendo um front-end moderno em **React** e um back-end em **Node.js** integrado ao banco de dados **MongoDB** via **Prisma ORM**.

---

## 🛠️ Tecnologias Utilizadas

### **Front-end**
* **React** (utilizando [Vite](https://vitejs.dev/) como builder)
* **Tailwind CSS** (estilização moderna com efeitos de *glassmorphism* e transições suaves)
* **Axios** (para consumo da API REST)
* **Lucide Icons / SVG** (para ícones vetoriais)

### **Back-end & Banco de Dados**
* **Node.js** com **Express** (construção da API REST)
* **Prisma ORM** (mapeamento e manipulação do banco de dados)
* **MongoDB** (banco de dados NoSQL para persistência dos dados)
* **CORS** (configuração de segurança para comunicação entre sistemas)

---

## 📂 Estrutura do Projeto

O repositório é dividido em duas partes principais:

```
To do list front, back e bd/
├── backend api node e bd/       # Servidor Node.js & Banco de dados (Prisma)
│   ├── prisma/                  # Esquemas de banco de dados (schema.prisma)
│   ├── server.js                # Arquivo principal do servidor Express
│   ├── package.json             # Dependências do backend
│   └── .gitignore               # Arquivos a serem ignorados pelo git no backend
│
└── fronend react/
    └── cadastro-usuarios/       # Aplicação web em React (Vite)
        ├── src/                 # Código-fonte do front-end
        │   ├── pages/Home/      # Interface principal da lista de tarefas
        │   └── services/api.js  # Configuração de conexão do Axios
        ├── package.json         # Dependências do frontend
        └── .gitignore               # Arquivos a serem ignorados pelo git no frontend
```

---

## 🚀 Como Executar o Projeto Localmente

### 1. Pré-requisitos
* Ter o [Node.js](https://nodejs.org/) instalado em sua máquina.
* Ter uma conta ou instância ativa do [MongoDB](https://www.mongodb.com/) (pode ser o MongoDB Atlas ou local).

---

### 2. Configurando o Back-end
1. Abra o terminal na pasta do backend:
   ```bash
   cd "backend api node e bd"
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um arquivo `.env` na raiz da pasta `backend api node e bd` e adicione a URL de conexão com o seu MongoDB:
   ```env
   DATABASE_URL="mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/<nome_do_banco>?retryWrites=true&w=majority"
   ```
4. Sincronize o banco de dados com o Prisma:
   ```bash
   npx prisma db push
   ```
5. Inicie o servidor do backend (roda na porta `3000` por padrão):
   ```bash
   node server.js
   ```

---

### 3. Configurando o Front-end
1. Abra um novo terminal na pasta do frontend:
   ```bash
   cd "fronend react/cadastro-usuarios"
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento do React (Vite):
   ```bash
   npm run dev
   ```
4. Acesse a URL gerada no terminal (geralmente `http://localhost:5173` ou `http://localhost:5174`) no seu navegador.

---

## 🔌 Rotas da API (Back-end)

A API do backend está estruturada com as seguintes rotas baseadas no endpoint `/tarefas`:

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| **GET** | `/tarefas` | Lista todas as tarefas ou filtra com base em query params (`name`, `task`, `deadline`) |
| **POST** | `/tarefas` | Cria uma nova tarefa |
| **PUT** | `/tarefas/:id` | Atualiza os dados de uma tarefa existente pelo ID |
| **DELETE**| `/tarefas/:id` | Deleta uma tarefa pelo ID |

---

## 🎨 Funcionalidades do Aplicativo
* **Cadastro de Tarefas**: Definição do Responsável, Descrição da Tarefa e o Prazo de entrega.
* **Leitura em Tempo Real**: Visualização imediata dos cartões de tarefas criados.
* **Exclusão Rápida**: Botão simples de remoção (lixeira) com transição de cor suave.
* **Responsividade**: Interface limpa, responsiva e adaptável tanto para dispositivos móveis quanto desktop.
