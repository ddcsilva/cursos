# Weather App

Uma aplicação web moderna desenvolvida em Angular para consulta de informações meteorológicas em tempo real. O projeto foi criado como parte da Formação Angular e demonstra as melhores práticas de desenvolvimento com Angular 15.

## 🌟 Funcionalidades

- **Busca por cidade**: Pesquisar informações meteorológicas de qualquer cidade do mundo
- **Dados em tempo real**: Integração com a API OpenWeatherMap
- **Interface responsiva**: Design moderno e adaptável para diferentes dispositivos
- **Tratamento de erros**: Feedback adequado para diferentes cenários de erro
- **Estados de carregamento**: Indicadores visuais durante o carregamento dos dados
- **Validação de entrada**: Verificação dos dados inseridos pelo usuário

## 🛠️ Tecnologias Utilizadas

- **Angular 15.2.0** - Framework principal
- **TypeScript** - Linguagem de programação
- **SCSS** - Pré-processador CSS
- **FontAwesome** - Ícones
- **OpenWeatherMap API** - Dados meteorológicos
- **RxJS** - Programação reativa

## 📁 Estrutura do Projeto

```text
src/
├── app/
│   ├── modules/
│   │   └── weather/
│   │       ├── components/
│   │       │   └── weather-card/
│   │       ├── models/
│   │       │   └── interfaces/
│   │       │       └── weather.interface.ts
│   │       ├── page/
│   │       │   └── weather-home/
│   │       └── services/
│   │           └── weather.service.ts
│   ├── app.component.ts
│   ├── app.module.ts
│   └── app-routing.module.ts
├── assets/
├── styles.scss
├── index.html
└── main.ts
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Angular CLI instalado globalmente

```bash
npm install -g @angular/cli
```

### Instalação

1. Clone o repositório ou baixe os arquivos
2. Navegue até o diretório do projeto
3. Instale as dependências:

```bash
npm install
```

### Executando a Aplicação

Para iniciar o servidor de desenvolvimento:

```bash
npm start
# ou
ng serve --open
```

A aplicação estará disponível em `http://localhost:4200/` e será aberta automaticamente no navegador.

## 📋 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run watch` - Build em modo watch para desenvolvimento
- `npm test` - Executa os testes unitários

## 🔧 Build para Produção

Para gerar a build otimizada para produção:

```bash
npm run build
```

Os arquivos de build serão armazenados no diretório `dist/`.

## 🧪 Testes

Execute os testes unitários com:

```bash
npm test
```

Os testes são executados via [Karma](https://karma-runner.github.io).

## 🌐 API

Este projeto utiliza a [OpenWeatherMap API](https://openweathermap.org/api) para obter dados meteorológicos em tempo real.

## 📚 Funcionalidades Técnicas

- **Arquitetura modular**: Organização em módulos para melhor manutenibilidade
- **Lazy loading**: Carregamento otimizado dos módulos
- **Error handling**: Tratamento robusto de erros com feedback para o usuário
- **Memory leak prevention**: Uso adequado de subscriptions com takeUntil
- **TypeScript interfaces**: Tipagem forte para dados da API
- **Responsive design**: Interface adaptável para diferentes tamanhos de tela

## 📖 Sobre o Curso

Este projeto foi desenvolvido como parte da Formação Angular, demonstrando conceitos fundamentais como:

- Criação de componentes e serviços
- Integração com APIs REST
- Gerenciamento de estado
- Tratamento de erros
- Boas práticas de desenvolvimento Angular

---

Desenvolvido por Danilo Silva durante a Formação Angular
