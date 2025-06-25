# 🟢 Node.js: criando uma API Rest com Express e MongoDB

**Instrutor**: Juliana Amoasei
**Plataforma**: [Alura](https://cursos.alura.com.br/course/node-js-api-rest-express-mongodb)
**Duração**: 10 horas
**Avaliação**: 9.5/10 ⭐

## 📋 Sobre o Curso

Este curso ensina como desenvolver uma API RESTful completa do zero utilizando Node.js, Express e MongoDB. É ideal para iniciantes que buscam desenvolver aplicações back-end utilizando frameworks e bibliotecas consolidadas no mercado.

> **💡 Complemento Prático**: Para demonstrar um caso de uso real, foi desenvolvido um frontend em Angular que consome a API, permitindo testar todas as funcionalidades através de uma interface gráfica intuitiva.

## 🎯 O que você vai aprender

- ✅ Criar uma API do zero, seguindo o estilo arquitetural REST
- ✅ Entender como as requisições HTTP funcionam
- ✅ Conhecer o framework Express para desenvolver aplicações robustas e escaláveis
- ✅ Conectar sua API com um banco de dados MongoDB
- ✅ Criar buscas por campos específicos na API

## 📚 Estrutura do Curso

### 1️⃣ **Criando o projeto com Node.js** (32min)
- Entendendo APIs
- Criando o servidor
- Criando rotas

### 2️⃣ **Express e primeiras rotas** (48min)
- Iniciando com Express
- Criando registros com POST
- Buscando e atualizando livros
- Deletando livros

### 3️⃣ **Persistindo dados** (46min)
- Bancos de dados
- Criando coleção no MongoDB
- Conectando MongoDB e API
- Criando models e schemas

### 4️⃣ **Evoluindo a API** (43min)
- Criando controller para Livro
- Controller POST
- Controller PUT
- Controller DELETE

### 5️⃣ **Adicionando funcionalidades** (40min)
- Criando autores
- Unindo livros e autores
- Buscas por parâmetro

## 👩‍💻 Sobre a Instrutora

**Juliana Amoasei** é desenvolvedora JavaScript com background multidisciplinar, sempre aprendendo para ensinar e vice-versa. Acredita no potencial do conhecimento como agente de mudança pessoal e social. Atua como instrutora na Escola de Programação da Alura.

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js**: Runtime JavaScript para backend
- **Express**: Framework web para Node.js
- **MongoDB**: Banco de dados NoSQL
- **Mongoose**: ODM para MongoDB
- **REST API**: Padrão arquitetural para APIs

### Frontend (Adicionado)
- **Angular**: Framework TypeScript para desenvolvimento web
- **TypeScript**: Linguagem tipada baseada em JavaScript
- **Angular HTTP Client**: Para comunicação com a API
- **Bootstrap/CSS**: Para estilização da interface
- **Reactive Forms**: Para formulários reativos

## 📂 Estrutura do Projeto

```
node-express-mongo/
├── livraria-api/              # 🔧 Backend API
│   ├── src/
│   │   ├── app.js             # Configuração principal da aplicação
│   │   ├── config/
│   │   │   └── dbConnect.js   # Configuração do banco de dados
│   │   ├── controllers/
│   │   │   ├── autorController.js # Controller dos autores
│   │   │   └── livroController.js # Controller dos livros
│   │   ├── models/
│   │   │   ├── Autor.js       # Model do autor
│   │   │   └── Livro.js       # Model do livro
│   │   └── routes/
│   │       ├── autoresRoutes.js # Rotas dos autores
│   │       ├── livrosRoutes.js  # Rotas dos livros
│   │       └── index.js       # Configuração das rotas
│   ├── server.js              # Servidor principal
│   ├── package.json           # Dependências do projeto
│   └── package-lock.json      # Lock das dependências
└── livraria-frontend/         # 🎨 Frontend Angular
    ├── src/
    │   ├── app/
    │   │   ├── core/          # Serviços e configurações centrais
    │   │   ├── features/      # Módulos de funcionalidades
    │   │   │   ├── autores/   # Gestão de autores
    │   │   │   └── livros/    # Gestão de livros
    │   │   ├── models/        # Modelos TypeScript
    │   │   └── shared/        # Componentes compartilhados
    │   ├── index.html
    │   └── main.ts
    ├── angular.json
    ├── package.json
    └── package-lock.json
```

## 🚀 Como Executar

### 🔧 Backend (API)

1. **Navegar para a pasta da API**:
   ```bash
   cd livraria-api
   ```

2. **Instalar dependências**:
   ```bash
   npm install
   ```

3. **Configurar MongoDB**:
   - Certifique-se de ter o MongoDB instalado e rodando
   - Configure a string de conexão no arquivo `dbConnect.js`

4. **Executar a API**:
   ```bash
   npm start
   ```
   - A API estará disponível em `http://localhost:3000`

### 🎨 Frontend Angular

1. **Navegar para a pasta do frontend**:
   ```bash
   cd livraria-frontend
   ```

2. **Instalar dependências**:
   ```bash
   npm install
   ```

3. **Executar o frontend**:
   ```bash
   ng serve
   ```
   - O frontend estará disponível em `http://localhost:4200`

### 🌐 Testando a Aplicação Completa

- **Frontend Angular**: Interface gráfica para interagir com a API
- **API REST**: Use Postman, Insomnia ou o próprio frontend para testar
- **Caso Real**: O frontend Angular permite testar todas as funcionalidades da API de forma visual e intuitiva

## 📝 Endpoints da API

### Livros
- `GET /livros` - Listar todos os livros
- `GET /livros/:id` - Buscar livro por ID
- `POST /livros` - Criar novo livro
- `PUT /livros/:id` - Atualizar livro
- `DELETE /livros/:id` - Deletar livro

### Autores
- `GET /autores` - Listar todos os autores
- `GET /autores/:id` - Buscar autor por ID
- `POST /autores` - Criar novo autor
- `PUT /autores/:id` - Atualizar autor
- `DELETE /autores/:id` - Deletar autor

## 🎯 Público-Alvo

Iniciantes que buscam desenvolver aplicações back-end utilizando Node.js, com foco em frameworks e bibliotecas consolidadas no mercado para construção de APIs RESTful.

## 🎨 Funcionalidades do Frontend Angular

O frontend desenvolvido oferece:

- 📚 **Gestão de Livros**: Listar, criar, editar e excluir livros
- 👥 **Gestão de Autores**: Listar, criar, editar e excluir autores
- 🔍 **Busca Avançada**: Filtros por título, autor e outros campos
- 📱 **Interface Responsiva**: Design adaptável para diferentes dispositivos
- ⚡ **Tempo Real**: Atualizações imediatas via comunicação com a API
- 🎯 **Validações**: Formulários com validação de dados
- 🔄 **Loading States**: Indicadores visuais durante operações

## 🌟 Benefícios da Implementação Completa

- **Aprendizado Prático**: Veja a API funcionando em um caso real
- **Testes Visuais**: Interface amigável para testar endpoints
- **Integração Full-Stack**: Experiência completa de desenvolvimento
- **Debugging Facilitado**: Identificação rápida de problemas na API
- **Portfolio**: Projeto completo para demonstrar habilidades

---

*Material do curso organizado para consulta e revisão dos conceitos de desenvolvimento de APIs com Node.js, Express e MongoDB, complementado com implementação frontend para demonstração prática.*