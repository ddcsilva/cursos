# 🔧 Livraria API - Backend

API RESTful para gerenciamento de livros e autores desenvolvida em Node.js com Express e MongoDB.

## 📋 Sobre

Esta API foi desenvolvida seguindo os conceitos do curso "Node.js: criando uma API Rest com Express e MongoDB" da Alura. Implementa um sistema completo de CRUD para gerenciar uma livraria virtual com livros e autores.

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **CORS** - Habilitado para integração com frontend
- **Dotenv** - Gerenciamento de variáveis de ambiente
- **Nodemon** - Auto-reload em desenvolvimento

## 📂 Estrutura do Projeto

```text
src/
├── app.js                    # Configuração principal da aplicação
├── config/
│   └── dbConnect.js         # Configuração de conexão com MongoDB
├── controllers/
│   ├── autorController.js   # Lógica de negócio para autores
│   └── livroController.js   # Lógica de negócio para livros
├── models/
│   ├── Autor.js            # Schema do modelo Autor
│   └── Livro.js            # Schema do modelo Livro
└── routes/
    ├── index.js            # Configuração geral das rotas
    ├── autoresRoutes.js    # Rotas específicas para autores
    └── livrosRoutes.js     # Rotas específicas para livros
```

## 🚀 Instalação e Execução

### Pré-requisitos

- Node.js instalado
- MongoDB instalado e rodando
- Git (opcional)

### Passos

1. **Instalar dependências**:

   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente**:
   - Crie um arquivo `.env` na raiz do projeto
   - Configure a string de conexão do MongoDB:

   ```env
   MONGODB_URI=mongodb://localhost:27017/livraria
   ```

3. **Executar em modo desenvolvimento**:

   ```bash
   npm run dev
   ```

4. **A API estará rodando em**: `http://localhost:3000`

## 📝 Endpoints da API

### 📚 Livros

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/livros` | Lista todos os livros |
| GET | `/livros/:id` | Busca um livro específico |
| POST | `/livros` | Cria um novo livro |
| PUT | `/livros/:id` | Atualiza um livro |
| DELETE | `/livros/:id` | Remove um livro |
| GET | `/livros/busca?titulo=valor` | Busca livros por título |

### 👥 Autores

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/autores` | Lista todos os autores |
| GET | `/autores/:id` | Busca um autor específico |
| POST | `/autores` | Cria um novo autor |
| PUT | `/autores/:id` | Atualiza um autor |
| DELETE | `/autores/:id` | Remove um autor |

## 📊 Modelos de Dados

### Livro

```json
{
  "titulo": "String",
  "editora": "String",
  "preco": "Number",
  "paginas": "Number",
  "autor": "ObjectId (referência ao Autor)"
}
```

### Autor

```json
{
  "nome": "String",
  "nacionalidade": "String"
}
```

## 🔧 Exemplos de Uso

### Criar um novo livro

```bash
POST /livros
Content-Type: application/json

{
  "titulo": "Dom Casmurro",
  "editora": "Companhia das Letras",
  "preco": 29.90,
  "paginas": 256,
  "autor": "ObjectId_do_autor"
}
```

### Buscar livros por título

```bash
GET /livros/busca?titulo=Dom
```

## 🌐 CORS Configuration

A API está configurada para aceitar requisições do frontend Angular:

- **Origin**: `http://localhost:4200`
- **Methods**: GET, POST, PUT, DELETE
- **Headers**: Content-Type, Authorization

## 🔍 Testes

Você pode testar a API usando:

- **Postman** - Para testes manuais
- **Insomnia** - Para testes de API
- **Frontend Angular** - Interface gráfica disponível na pasta adjacente

## 📦 Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento com nodemon
- `npm test` - Executa testes (ainda não implementado)

## 🐛 Troubleshooting

### Problemas comuns

1. **Erro de conexão com MongoDB**:
   - Verifique se o MongoDB está rodando
   - Confirme a string de conexão no `.env`

2. **Porta já em uso**:
   - A API roda na porta 3000 por padrão
   - Certifique-se de que a porta está livre

3. **Problemas de CORS**:
   - Verifique se o frontend está rodando na porta 4200
   - Ajuste as configurações de CORS se necessário

## 📚 Recursos Adicionais

- [Documentação do Express](https://expressjs.com/)
- [Documentação do MongoDB](https://docs.mongodb.com/)
- [Mongoose Guide](https://mongoosejs.com/docs/guide.html)

---

*API desenvolvida para fins educativos baseada no curso da Alura sobre Node.js, Express e MongoDB.*
