# Guia CSS - Cabeçalho (Header)

## 📋 Índice

- [Estrutura HTML](#estrutura-html)
- [Classes CSS e Propriedades](#classes-css-e-propriedades)
- [CSS Grid Explicado](#css-grid-explicado)
- [Responsividade - Media Queries](#responsividade---media-queries)

---

## Estrutura HTML

```html
<header class="cabecalho">
  <nav class="cabecalho__nav">
    <ul class="cabecalho__nav_list">
      <!-- Itens do menu -->
    </ul>
  </nav>
</header>
```

---

## Classes CSS e Propriedades

### `.cabecalho`

```css
.cabecalho {
  padding: 32px 12.5%;
  width: 100%;
}
```

**Função da Classe:** Define o container principal do cabeçalho.

**Propriedades:**

- **`padding: 32px 12.5%`** - Cria espaçamento interno
  - `32px` = espaçamento superior e inferior
  - `12.5%` = espaçamento lateral (esquerda/direita) baseado na largura da tela
  - **Para que serve:** Afasta o conteúdo das bordas e centraliza visualmente

- **`width: 100%`** - Define largura total
  - Ocupa 100% da largura disponível do viewport
  - **Para que serve:** Garante que o cabeçalho estenda por toda a tela

**Resultado:** Um cabeçalho que ocupa toda a largura da tela com margens proporcionais nas laterais.

---

### `.cabecalho__nav_list`

```css
.cabecalho__nav_list {
  display: grid;
  grid-template-columns: 1fr auto 50% auto auto auto;
  gap: 40px;
  list-style-type: none;
  align-items: center;
  width: 100%;
}
```

**Função da Classe:** Organiza os itens do menu em um layout de grid horizontal.

**Propriedades:**

- **`display: grid`** - Ativa o sistema Grid Layout
  - Transforma o elemento em um container grid
  - **Para que serve:** Permite controle preciso do posicionamento dos itens

- **`grid-template-columns: 1fr auto 50% auto auto auto`** - Define 6 colunas
  - `1fr` = **Logo** - usa o espaço restante disponível (flexível)
  - `auto` = **"Sobre nós"** - largura baseada no conteúdo
  - `50%` = **Campo de busca** - ocupa metade da largura total
  - `auto` = **"Login"** - largura baseada no conteúdo
  - `auto` = **Ícone perfil** - largura baseada no conteúdo
  - `auto` = **Ícone carrinho** - largura baseada no conteúdo
  - **Para que serve:** Distribui o espaço entre os 6 itens do menu de forma controlada

- **`gap: 40px`** - Espaçamento entre colunas
  - Cria 40px de distância entre cada item do menu
  - **Para que serve:** Impede que os elementos fiquem colados

- **`list-style-type: none`** - Remove marcadores da lista
  - Elimina os bullets padrão do `<ul>`
  - **Para que serve:** Cria um menu limpo, sem bolinhas

- **`align-items: center`** - Alinhamento vertical
  - Centraliza todos os itens no eixo vertical (cross-axis)
  - **Para que serve:** Mantém logo, links e ícones alinhados na mesma linha

- **`width: 100%`** - Largura total
  - Ocupa todo o espaço disponível do container pai
  - **Para que serve:** Garante que o grid use todo o espaço do cabeçalho

**Resultado:** Um menu horizontal com 6 elementos distribuídos: logo à esquerda, campo de busca no centro (ocupando metade do espaço), e links/ícones alinhados.

---

### `.cabecalho__logo`

```css
.cabecalho__logo {
  width: 79.61px;
  height: 48px;
}
```

**Função da Classe:** Define dimensões fixas da logo.

**Propriedades:**

- **`width: 79.61px`** - Largura fixa de 79.61 pixels
- **`height: 48px`** - Altura fixa de 48 pixels
- **Para que serve:** Garante que a logo mantenha proporções consistentes

**Resultado:** Logo com tamanho definido, sem distorções.

---

### `.cabecalho__nav_list_link`

```css
.cabecalho__nav_list_link {
  font-size: 20px;
  line-height: 24px;
  text-decoration: none;
  color: var(--cor-links);
  font-family: var(--fonte-texto);
}
```

**Função da Classe:** Estiliza os links de navegação ("Sobre nós", "Login").

**Propriedades:**

- **`font-size: 20px`** - Tamanho da fonte
  - Define 20 pixels para o texto do link
  - **Para que serve:** Torna o texto legível e proporcional ao design

- **`line-height: 24px`** - Altura da linha
  - Define 24 pixels de altura total da linha de texto
  - **Para que serve:** Cria espaçamento vertical, melhorando legibilidade

- **`text-decoration: none`** - Remove sublinhado
  - Elimina o sublinhado padrão dos links
  - **Para que serve:** Design mais limpo e moderno

- **`color: var(--cor-links)`** - Cor do texto
  - Usa uma variável CSS definida em outro arquivo
  - **Para que serve:** Mantém consistência de cores em todo o site

- **`font-family: var(--fonte-texto)`** - Família da fonte
  - Usa uma variável CSS para a fonte (provavelmente Poppins)
  - **Para que serve:** Garante tipografia consistente

**Resultado:** Links de navegação sem sublinhado, com tamanho e cor padronizados.

---

### `.cabecalho__nav_list_item-input`

```css
.cabecalho__nav_list_item-input {
  position: relative;
}
```

**Função da Classe:** Container do campo de busca que permite posicionamento absoluto do ícone.

**Propriedades:**

- **`position: relative`** - Define contexto de posicionamento
  - Cria um ponto de referência para elementos filhos com `position: absolute`
  - **Para que serve:** Permite que o ícone da lupa seja posicionado dentro do campo de busca

**Resultado:** Container que serve de referência para o ícone de busca.

---

### `.cabecalho__nav_list_input`

```css
.cabecalho__nav_list_input {
  width: 100%;
  height: 100%;
  padding: 24px 20px;
  box-sizing: border-box;
  background-color: var(--cor-texto);
  border-radius: 32px;
  border: none;
  font-size: 20px;
  line-height: 24px;
  font-family: var(--fonte-texto);
  color: var(--cor-links);
}
```

**Função da Classe:** Estiliza o campo de busca (input).

**Propriedades:**

- **`width: 100%`** - Largura total
  - Ocupa toda a largura da coluna do grid (50%)
  - **Para que serve:** Campo de busca responsivo ao espaço disponível

- **`height: 100%`** - Altura total
  - Ocupa toda a altura disponível
  - **Para que serve:** Mantém proporção vertical com outros elementos

- **`padding: 24px 20px`** - Espaçamento interno
  - `24px` = espaçamento superior/inferior
  - `20px` = espaçamento lateral
  - **Para que serve:** Cria área de respiro para o texto digitado

- **`box-sizing: border-box`** - Modelo de caixa
  - Inclui padding e border no cálculo de width/height
  - **Para que serve:** Evita que o padding "estoure" o tamanho definido

- **`background-color: var(--cor-texto)`** - Cor de fundo
  - Usa variável CSS para a cor
  - **Para que serve:** Define a cor de fundo do campo

- **`border-radius: 32px`** - Arredondamento das bordas
  - Cria cantos arredondados de 32 pixels
  - **Para que serve:** Visual moderno e suave (campo "pill-shaped")

- **`border: none`** - Remove borda
  - Elimina a borda padrão do input
  - **Para que serve:** Design mais limpo

- **`font-size: 20px`** - Tamanho da fonte
  - Define 20px para o texto digitado
  - **Para que serve:** Legibilidade e consistência com outros textos

- **`line-height: 24px`** - Altura da linha
  - Espaçamento vertical do texto
  - **Para que serve:** Alinhamento vertical do texto dentro do campo

- **`font-family: var(--fonte-texto)`** - Fonte
  - Usa a mesma fonte do site
  - **Para que serve:** Consistência tipográfica

- **`color: var(--cor-links)`** - Cor do texto
  - Define cor do texto digitado
  - **Para que serve:** Contraste e legibilidade

**Resultado:** Campo de busca com cantos arredondados, espaçamento confortável e estilo consistente com o design.

---

### `.pesquisa-icon`

```css
.pesquisa-icon {
  position: absolute;
  right: 17.5px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  pointer-events: none;
}
```

**Função da Classe:** Posiciona o ícone de lupa dentro do campo de busca.

**Propriedades:**

- **`position: absolute`** - Posicionamento absoluto
  - Remove o elemento do fluxo normal
  - Posiciona em relação ao pai com `position: relative`
  - **Para que serve:** Coloca o ícone "por cima" do input

- **`right: 17.5px`** - Distância da direita
  - Posiciona 17.5px a partir da borda direita do container
  - **Para que serve:** Alinha o ícone próximo à borda direita do campo

- **`top: 50%`** - Posição vertical inicial
  - Posiciona no meio vertical (50% da altura do pai)
  - **Para que serve:** Primeira etapa do centralização vertical

- **`transform: translateY(-50%)`** - Ajuste de centralização
  - Move o elemento 50% de sua própria altura para cima
  - **Para que serve:** Completa a centralização vertical perfeita
  - **Por quê?** `top: 50%` alinha o **topo** do ícone ao centro; `translateY(-50%)` ajusta para centralizar o **meio** do ícone

- **`width: 24px`** e **`height: 24px`** - Dimensões
  - Define tamanho fixo do ícone
  - **Para que serve:** Mantém proporções do ícone SVG

- **`pointer-events: none`** - Desabilita interação
  - O ícone não captura cliques do mouse
  - **Para que serve:** Cliques passam através do ícone para o input abaixo

**Resultado:** Ícone de lupa perfeitamente centralizado à direita do campo de busca, sem interferir na digitação.

---

## CSS Grid Explicado

### Como funciona o Grid neste cabeçalho?

```text
┌─────────┬──────────┬─────────────────────┬───────┬────────┬──────────┐
│  Logo   │ Sobre nós│   Campo de Busca    │ Login │ Perfil │ Carrinho │
│  (1fr)  │  (auto)  │       (50%)         │(auto) │ (auto) │  (auto)  │
└─────────┴──────────┴─────────────────────┴───────┴────────┴──────────┘
    ↑          ↑              ↑               ↑        ↑         ↑
 flexível   conteúdo    metade da tela    conteúdo conteúdo conteúdo
```

**Distribuição do espaço:**

1. **Logo (`1fr`)** - "Fração flexível"
   - Absorve todo o espaço que sobrar após as outras colunas
   - Se sobrar 200px, ela ocupa 200px
   - Se sobrar 50px, ela ocupa 50px

2. **"Sobre nós" (`auto`)** - "Ajuste automático"
   - Largura exata do texto + padding
   - Exemplo: se o texto tem 80px, a coluna tem 80px

3. **Campo de busca (`50%`)** - "Metade do espaço total"
   - Sempre ocupa exatamente 50% da largura do grid
   - Elemento mais importante visualmente

4. **Login, Perfil, Carrinho (`auto`)** - "Ajuste automático"
   - Cada um ocupa apenas o espaço necessário
   - Ícones pequenos = colunas pequenas

**Gap de 40px:** Espaços entre cada coluna para respiração visual.

---

## Conceitos-Chave Resumidos

### Position Relative + Absolute

- **Relative:** "Eu sou a referência"
- **Absolute:** "Me posicione em relação ao meu pai relative"
- **Uso:** Colocar ícone dentro do campo de busca

### Box-sizing: border-box

- **Problema sem ele:** `width: 100%` + `padding: 20px` = **mais que 100%** (estoura!)
- **Solução:** padding e border são **incluídos** nos 100%
- **Analogia:** Uma caixa de 100cm inclui a espessura das paredes

### Transform: translateY(-50%)

- **Problema:** `top: 50%` alinha o **topo** ao centro
- **Solução:** `translateY(-50%)` move o elemento metade da sua altura para cima
- **Resultado:** Centro **perfeito**

### Variáveis CSS (--cor-links, --fonte-texto)

- **Vantagem:** Mudar a cor em **um lugar**, atualiza em **todos**
- **Manutenção:** Facilita ajustes de design

---

## Responsividade - Media Queries

### `@media screen and (max-width: 768px)`

```css
@media screen and (max-width: 768px) {
  .cabecalho__nav_list {
    grid-template-areas:
      "logo sobre login perfil carrinho"
      "input input input input input";
    grid-template-columns: 1fr 2fr 0.5fr 0.5fr 0.5fr;
  }

  .cabecalho__logo {
    grid-area: logo;
    justify-self: center;
  }

  .cabecalho__nav_list_item-sobre {
    grid-area: sobre;
  }

  .cabecalho__nav_list_item-login {
    grid-area: login;
  }

  .cabecalho__nav_list_item-perfil {
    grid-area: perfil;
  }

  .cabecalho__nav_list_item-carrinho {
    grid-area: carrinho;
  }

  .cabecalho__nav_list_item-input {
    grid-area: input;
  }
}
```

**Função:** Adapta o layout do cabeçalho para telas menores (tablets e celulares).

**O que é Media Query?**

- Permite aplicar estilos CSS apenas quando certas condições são atendidas
- `max-width: 768px` = "Aplique estes estilos quando a largura da tela for **até** 768 pixels"
- **Para que serve:** Cria um layout diferente para dispositivos móveis

---

### Propriedades de Responsividade

#### `.cabecalho__nav_list` (Versão Mobile)

**`grid-template-areas`** - Define áreas nomeadas no grid

```text
Linha 1: "logo sobre login perfil carrinho"
Linha 2: "input input input input input"
```

- Cria um grid de **2 linhas** e **5 colunas**
- Primeira linha: logo, sobre nós, login, perfil, carrinho (lado a lado)
- Segunda linha: campo de busca ocupando toda a largura
- **Para que serve:** Reorganiza elementos em duas linhas para economizar espaço horizontal

**`grid-template-columns: 1fr 2fr 0.5fr 0.5fr 0.5fr`** - Define proporção das colunas

- `1fr` = Logo (1 fração)
- `2fr` = "Sobre nós" (2 frações - dobro do espaço)
- `0.5fr` = Login (meia fração)
- `0.5fr` = Perfil (meia fração)
- `0.5fr` = Carrinho (meia fração)
- **Para que serve:** Dá mais espaço ao link "Sobre nós" e mantém ícones compactos

**Visualização do Grid Mobile:**

```text
┌──────┬─────────────┬─────┬──────┬─────────┐
│ Logo │  Sobre nós  │Login│Perfil│Carrinho │  ← Linha 1
│ (1fr)│    (2fr)    │(0.5)│ (0.5)│  (0.5)  │
├──────┴─────────────┴─────┴──────┴─────────┤
│          Campo de Busca (input)           │  ← Linha 2
│         (ocupa todas as colunas)          │
└───────────────────────────────────────────┘
```

---

#### Grid Areas - Propriedades Individuais

**`grid-area`** - Atribui um elemento a uma área nomeada

Cada elemento recebe sua área correspondente:

```css
.cabecalho__logo { grid-area: logo; }
.cabecalho__nav_list_item-sobre { grid-area: sobre; }
.cabecalho__nav_list_item-login { grid-area: login; }
.cabecalho__nav_list_item-perfil { grid-area: perfil; }
.cabecalho__nav_list_item-carrinho { grid-area: carrinho; }
.cabecalho__nav_list_item-input { grid-area: input; }
```

**Para que serve:** Posiciona cada elemento na área definida em `grid-template-areas`

**Como funciona:**

1. `grid-template-areas` cria um "mapa" com nomes
2. `grid-area` coloca cada elemento no lugar correto do mapa
3. O browser organiza tudo automaticamente

---

#### `.cabecalho__logo` (Versão Mobile)

**`justify-self: center`** - Alinhamento horizontal individual

- Centraliza apenas a logo dentro de sua área do grid
- **Para que serve:** Logo fica centralizada em sua coluna, criando equilíbrio visual

---

### Comparação: Desktop vs Mobile

| Aspecto                | Desktop                          | Mobile (≤768px)                    |
|------------------------|----------------------------------|------------------------------------|
| **Estrutura**          | 1 linha, 6 colunas               | 2 linhas, 5 colunas                |
| **Campo de busca**     | Centro (50% da largura)          | Segunda linha (largura total)      |
| **Método Grid**        | `grid-template-columns`          | `grid-template-areas`              |
| **Distribuição**       | `1fr auto 50% auto auto auto`   | `1fr 2fr 0.5fr 0.5fr 0.5fr`        |
| **Logo**               | Alinhada à esquerda              | Centralizada                       |

---

### Conceitos de Responsividade

### Grid Template Areas - Vantagens

- **Semântico:** Usa nomes descritivos em vez de números
- **Visual:** O código CSS "desenha" o layout
- **Flexível:** Fácil reorganizar elementos mudando os nomes nas áreas
- **Legível:** Qualquer desenvolvedor entende o layout rapidamente

**Exemplo prático:**

```css
/* Quer mover o campo de busca para cima? */
grid-template-areas:
  "input input input input input"      /* ← Busca agora está no topo */
  "logo sobre login perfil carrinho";  /* ← Menu abaixo */
```

### Frações em Mobile (fr)

- Desktop usa `50%` e `auto` (valores fixos)
- Mobile usa `fr` (frações flexíveis)
- **Por quê?** Telas pequenas precisam de mais flexibilidade para se adaptar

---

## Resumo Visual - Fluxo de Renderização

```text
1. Browser lê HTML → Encontra <header class="cabecalho">
   ↓
2. Aplica .cabecalho → Cria padding de 12.5% nas laterais
   ↓
3. Encontra <ul class="cabecalho__nav_list">
   ↓
4. Aplica display: grid → Cria 6 colunas
   ↓
5. Distribui os 6 <li> nas colunas conforme grid-template-columns
   ↓
6. Campo de busca (<li> com input):
   - Container fica position: relative
   - Input ocupa 100% da coluna (50% do grid)
   - Ícone é posicionado absolutamente dentro do container
   ↓
7. Resultado: Menu horizontal responsivo com busca centralizada
```

---

## Dicas de Consulta Rápida

| Precisa de...                    | Use...                        |
|----------------------------------|-------------------------------|
| Layout em colunas                | `display: grid`               |
| Espaço entre elementos           | `gap`                         |
| Distribuir espaço flexível       | `1fr`                         |
| Tamanho baseado em conteúdo      | `auto`                        |
| Posicionar elemento "flutuante"  | `position: absolute`          |
| Referência para absolute         | `position: relative`          |
| Centralizar verticalmente        | `top: 50%` + `translateY(-50%)`|
| Padding incluído na largura      | `box-sizing: border-box`      |
| Remover interação com elemento   | `pointer-events: none`        |
| Layout responsivo                | `@media screen and (max-width)`|
| Organizar grid com nomes         | `grid-template-areas`         |
| Atribuir elemento a área         | `grid-area`                   |
| Centralizar item individual      | `justify-self: center`        |

---

**Criado para consolidação de conhecimento em HTML/CSS** 🚀
