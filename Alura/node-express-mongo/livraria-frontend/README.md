# 📚 Livraria Frontend

Interface Angular simples e clean para gerenciar livros e autores.

## 🏗️ Estrutura

```
src/app/
├── core/           # Serviços singleton
│   └── services/   # API service
├── features/       # Funcionalidades
│   ├── livros/     # Gerenciar livros
│   └── autores/    # Gerenciar autores
└── shared/         # Modelos compartilhados
    └── models/     # Interfaces TypeScript
```

## 🚀 Executar

1. **API**: `cd ../livraria-api && npm start`
2. **Frontend**: `ng serve`

## ✨ Características

- ✅ **Arquitetura limpa** - core/features/shared
- ✅ **Zero CSS customizado** - apenas Material Design
- ✅ **Inline templates** - tudo em um arquivo
- ✅ **Código mínimo** - máxima simplicidade
- ✅ **TypeScript puro** - bem tipado

## 📋 Funcionalidades

- 📖 CRUD completo de livros
- 👤 CRUD completo de autores
- 🔄 Relacionamento livro-autor
- 📱 Interface responsiva
