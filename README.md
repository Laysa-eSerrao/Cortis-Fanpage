# CORTIS — Fanpage

Fanpage estática (feita por fã) do grupo de K-pop **CORTIS** (BigHit Music / HYBE).
Reúne membros, discografia detalhada, trajetória, curiosidades, uma seção para diferenciar
os "gêmeos" Seonghyeon e Keonho, a Cortis Ball e um guia para novos **COER**.

> **CORTIS** = acrônimo de *COLOR OUTSIDE THE LINES* (선 밖에 색칠하다) — "pensar livremente e romper os padrões do mundo".

## Stack

- **HTML5 semântico** — [index.html](index.html) + página de erro [404.html](404.html)
- **CSS3** — [style.css](style.css): mobile-first, sistema de 5 temas via variáveis CSS, sem framework
- **JavaScript puro (vanilla)** — [script.js](script.js): todos os dados centralizados no topo e renderizados no `DOMContentLoaded`. Sem framework, sem build, sem dependências.
- **Fontes:** Google Fonts — *Anton* (display) + *Inter* (texto)
- **Hospedagem:** GitHub Pages

Sem etapa de build: é só abrir os arquivos.

## Como rodar localmente

Qualquer uma das opções:

- **VS Code + Live Server:** botão direito em `index.html` → **"Open with Live Server"**.
- **Python** (sem instalar nada):
  ```bash
  cd "Cortis Fanpage"
  python3 -m http.server 8000
  ```
  Depois acesse **http://localhost:8000**.
- **Direto:** dar duplo-clique em `index.html` (abre via `file://`).

## Os 5 temas

Visual **vintage/Y2K**. O tema troca o site inteiro (fundo, superfícies, texto e accent) via classe no `<body>`.
O seletor fica na navbar (os 5 swatches) e o tema é mantido **em memória** durante a navegação
(sem `localStorage`). Tema padrão: **Sage** (funciona como base, mesmo sendo claro).

| Tema | Swatch (`data-theme`) | Classe no `<body>` | Fundo → Accent |
|------|-----------------------|--------------------|----------------|
| Sage vintage *(padrão)* | `verde-escuro` | `theme-green-dark` | `#7A8E78` → detalhe **`#352D2E`** (cards sage escuros com texto creme `#F1ECE5`) |
| Creme *(claro)* | `verde-claro` | `theme-green-light` | `#F1ECE5` → detalhe **`#38302F`** (realce sage) |
| REDRED | `redred` | `theme-redred` | `#930C11` |
| ACAI | `acai` | `theme-acai` | `#7DA641` |
| TNT | `tnt` | `theme-tnt` | `#4A5052` (detalhe vermelho no accent-2) |

> Os nomes de classe (`theme-green-dark`/`theme-green-light`) foram mantidos por compatibilidade — hoje representam **sage** e **creme**, não mais verdes.

**Logo oficial** (PNGs em `assets/`): símbolo na **navbar** e no **hero** (acima do título), logo completa na **intro**. A cor da logo troca junto com o tema (versão `#38302F` no sage/creme; versões coloridas no REDRED/ACAI/TNT). Favicon: `assets/favicon-cortis.png`.

Acessibilidade: `:focus-visible` visível em todos os temas, `prefers-reduced-motion` respeitado
(desliga animações e o canvas do hero), modais/lightbox/drawer/busca fecham com **Escape** e prendem/restauram o foco.

## Discografia

Grupo em ascensão — poucos lançamentos, cada um detalhado a fundo (cada card abre um modal com a tracklist).

**2025 — COLOR OUTSIDE THE LINES** · 1º EP · 08/09/2025 · faixa-título *What You Want* · estreou **#15 na Billboard 200**
- Singles: *GO!* (11/08/2025, pré-single) · *What You Want* (18/08/2025, estreia) · *FaSHioN* (08/09/2025)

**2026 — GREENGREEN** · 2º EP · 04/05/2026 · faixa-título **REDRED** (pré-lançada em 20/04/2026) · **#3 na Billboard 200**, +1,1 milhão de cópias no 1º dia
- Tracklist (6 faixas): **TNT · REDRED · ACAI · YOUNGCREATORCREW · Wassup · Blue Lips**
- ⚠️ *TNT*, *REDRED* e *ACAI* são **faixas deste EP**, não singles avulsos.

**Outros 2026**
- *Mention Me* (13/02/2026) — OST do filme **GOAT**

## Prêmios

**22 troféus** (contagem até 16/07/2026): **11 vitórias** de *REDRED* em programas musicais (com *grand slam* nos 5 principais e *triple crown* no Music Core e no Inkigayo) + **11 prêmios** em cerimônias anuais/institucionais. A lista completa (duas tabelas) fica na seção **Prêmios** do site. Não inclui indicações, paradas, vendas ou certificados.

---

## TODOs pendentes

O que ainda **falta preencher** hoje em [script.js](script.js) (só o que está de fato pendente):

### Imagens (todas vazias)
- Fotos dos membros (`membros[].img`)
- Imagens da Cortis Ball dos membros (`membros[].ballImg`)
- Fotos da galeria (`galeria[].url`)
- Imagens das bolinhas na seção Cortis Ball (`cortisBall.items[].img`) + detalhes de cada bolinha (nome, cor, se há uma por membro)
- Capas dos álbuns/singles (`discografia[].img`) — hoje mostram a inicial como fallback
- Fotos comparativas dos gêmeos (`gemeos.membros[].img`) + as legendas de posição (quem está à esquerda/direita) — preencher junto com as imagens reais

### Timeline (pré-debut)
- **Formação** — data do anúncio oficial da formação do grupo

### História
- Dados de fonte de fã do **COER** (significado e membership) — ver `// CONFIRMAR` abaixo

### Links oficiais
- URLs de streaming (`streamLinks[].url`) — hoje são buscas genéricas; trocar pelas oficiais
- Links do rodapé em [index.html](index.html) — os `href="#"` ainda são placeholders
- Guia "Como apoiar" — confirmar os canais oficiais do grupo
- `og:image` no `<head>` de [index.html](index.html) — falta uma imagem oficial (o `og:url` já aponta para o GitHub Pages)

---

## Sobre os marcadores no código

Além dos `// TODO: confirmar`, o `script.js` usa dois marcadores especiais:

- **`// CONFIRMAR`** — o valor **está preenchido**, mas precisa ser validado antes de tratar como 100% verificado. Hoje marca: os dados do fandom **COER** (fonte de fã — significado + membership global de 05/03/2026); a participação do **James** em *"Cherish (My Love)"* (ILLIT), relatada mas sem crédito público claro; e **4 prêmios de fonte não-independente** — Korea First Brand Awards (Coreia, Vietnã e Indonésia) e D Awards (Dreams Silver Label).
- **`// NOTA:`** — anotações internas para revisar antes de publicar. Hoje marcam: (1) a lesão nas mãos do **Keonho** (julho/2026) — informação de saúde sensível e volátil, mantida discreta e remetendo aos canais oficiais; (2) a divergência de datas do OST **Mention Me** (álbum em 06/02 vs. faixa em 13/02/2026 — usada a data da faixa).
