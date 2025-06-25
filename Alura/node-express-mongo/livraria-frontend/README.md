# 🎨 Livraria Frontend - Angular

Interface web moderna para gerenciamento de livros e autores, desenvolvida em Angular 18 com Angular Material.

## 📋 Sobre

Esta aplicação frontend foi desenvolvida para consumir a API RESTful de gerenciamento de livraria. Oferece uma interface gráfica completa e intuitiva para realizar todas as operações CRUD de livros e autores, servindo como um caso de uso real para testar a API backend.

## 🛠️ Tecnologias

- **Angular 18** - Framework TypeScript para desenvolvimento web
- **Angular Material** - Componentes UI modernos e responsivos
- **Angular CDK** - Kit de ferramentas para desenvolvimento
- **TypeScript** - Linguagem tipada baseada em JavaScript
- **RxJS** - Programação reativa para gerenciamento de estado
- **Angular HTTP Client** - Comunicação com APIs REST
- **Angular Forms** - Formulários reativos e validações

## 🎯 Funcionalidades

### 📚 Gestão de Livros

- ✅ Listar todos os livros com paginação
- ✅ Visualizar detalhes de um livro específico
- ✅ Adicionar novos livros
- ✅ Editar informações de livros existentes
- ✅ Remover livros do sistema
- ✅ Buscar livros por título

### 👥 Gestão de Autores

- ✅ Listar todos os autores
- ✅ Visualizar detalhes de um autor específico
- ✅ Adicionar novos autores
- ✅ Editar informações de autores existentes
- ✅ Remover autores do sistema

### 🎨 Interface e UX

- ✅ Design moderno e responsivo
- ✅ Notificações de sucesso e erro
- ✅ Loading states durante operações
- ✅ Validações de formulário em tempo real
- ✅ Navegação intuitiva entre páginas

## 📂 Estrutura do Projeto

```text
src/
├── app/
│   ├── core/                    # Serviços e configurações centrais
│   │   ├── components/
│   │   │   └── notification/    # Componente de notificações
│   │   ├── config/
│   │   │   └── api.config.ts    # Configuração da API
│   │   ├── handlers/
│   │   │   └── global-error.handler.ts # Tratamento global de erros
│   │   ├── interceptors/
│   │   │   └── error.interceptor.ts     # Interceptador de erros HTTP
│   │   ├── models/              # Modelos de dados centrais
│   │   └── services/            # Serviços compartilhados
│   ├── features/                # Módulos de funcionalidades
│   │   ├── autores/             # Módulo de autores
│   │   │   ├── autores.service.ts
│   │   │   ├── components/      # Componentes específicos
│   │   │   └── containers/      # Páginas/containers
│   │   └── livros/              # Módulo de livros
│   │       ├── livros.service.ts
│   │       ├── components/      # Componentes específicos
│   │       └── containers/      # Páginas/containers
│   ├── models/                  # Modelos TypeScript
│   │   ├── autor.model.ts
│   │   └── livro.model.ts
│   └── shared/                  # Componentes compartilhados
│       ├── layout/              # Layout da aplicação
│       └── page-container/      # Container de páginas
├── index.html                   # Página principal
├── main.ts                      # Ponto de entrada da aplicação
└── styles.scss                  # Estilos globais
```

## 🚀 Instalação e Execução

### Pré-requisitos

- Node.js (versão 18 ou superior)
- Angular CLI instalado globalmente: `npm install -g @angular/cli`
- API backend rodando na porta 3000

### Passos

1. **Instalar dependências**:

   ```bash
   npm install
   ```

2. **Executar em modo desenvolvimento**:

   ```bash
   ng serve
   ```

   ou

   ```bash
   npm start
   ```

3. **A aplicação estará rodando em**: `http://localhost:4200`

## 🔧 Configuração da API

A configuração da API está localizada em `src/app/core/config/api.config.ts`:

```typescript
export const API_CONFIG = {
  baseUrl: 'http://localhost:3000',
  endpoints: {
    livros: '/livros',
    autores: '/autores'
  }
};
```

## 📱 Páginas da Aplicação

### 🏠 Dashboard

- Visão geral do sistema
- Acesso rápido às funcionalidades

### 📚 Livros

- `/livros` - Lista de todos os livros
- `/livros/novo` - Formulário para adicionar livro
- `/livros/:id/editar` - Formulário para editar livro

### 👥 Autores

- `/autores` - Lista de todos os autores
- `/autores/novo` - Formulário para adicionar autor
- `/autores/:id/editar` - Formulário para editar autor

## 🎨 Componentes Principais

### Shared Components

- **App Layout** - Layout principal da aplicação
- **Page Container** - Container padronizado para páginas
- **Notification** - Sistema de notificações

### Feature Components

- **Lista de Livros** - Exibe livros em formato de tabela/cards
- **Formulário de Livro** - Formulário para criar/editar livros
- **Lista de Autores** - Exibe autores em formato de tabela/cards
- **Formulário de Autor** - Formulário para criar/editar autores

## 📦 Scripts Disponíveis

- `npm start` - Executa em modo desenvolvimento
- `npm run build` - Build para produção
- `npm run watch` - Build com watch mode
- `npm test` - Executa testes unitários

## 🔍 Tratamento de Erros

A aplicação possui um sistema robusto de tratamento de erros:

- **Error Interceptor** - Intercepta erros HTTP automaticamente
- **Global Error Handler** - Trata erros não capturados
- **Notification Service** - Exibe mensagens de erro para o usuário
- **Loading States** - Indica quando operações estão em andamento

## 🎯 Validações de Formulário

### Livros

- Título: obrigatório, mínimo 2 caracteres
- Editora: obrigatório
- Preço: obrigatório, deve ser um número positivo
- Páginas: obrigatório, deve ser um número inteiro positivo
- Autor: obrigatório, deve ser um autor válido

### Autores

- Nome: obrigatório, mínimo 2 caracteres
- Nacionalidade: obrigatório

## 🌐 Consumo da API

A aplicação consome os seguintes endpoints:

```typescript
// Livros
GET    /livros           // Lista todos os livros
GET    /livros/:id       // Busca livro por ID
POST   /livros           // Cria novo livro
PUT    /livros/:id       // Atualiza livro
DELETE /livros/:id       // Remove livro

// Autores
GET    /autores          // Lista todos os autores
GET    /autores/:id      // Busca autor por ID
POST   /autores          // Cria novo autor
PUT    /autores/:id      // Atualiza autor
DELETE /autores/:id      // Remove autor
```

## 🐛 Troubleshooting

### Problemas comuns

1. **Erro de conexão com a API**:
   - Verifique se a API está rodando na porta 3000
   - Confirme a configuração em `api.config.ts`

2. **Erro de CORS**:
   - Certifique-se de que a API está configurada para aceitar requisições do Angular
   - Verifique se o frontend está rodando na porta 4200

3. **Problemas de build**:
   - Execute `npm install` para garantir que todas as dependências estão instaladas
   - Verifique se a versão do Node.js é compatível

## 📚 Recursos Adicionais

- [Documentação do Angular](https://angular.io/docs)
- [Angular Material](https://material.angular.io/)
- [RxJS Operators](https://rxjs.dev/api)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

*Interface desenvolvida para fins educativos como complemento prático ao curso de Node.js da Alura, demonstrando integração frontend-backend em um caso de uso real.*
