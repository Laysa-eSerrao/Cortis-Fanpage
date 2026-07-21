# CORTIS — Fanpage

Fanpage estática (feita por fã) do grupo de K-pop **CORTIS** (BigHit Music / HYBE).
Reúne membros, discografia detalhada, trajetória, curiosidades, uma seção para diferenciar
os "gêmeos" Seonghyeon e Keonho, a Cortis Ball, a **lightstick oficial** e um guia para novos **COER**.

> **CORTIS** = acrônimo de *COLOR OUTSIDE THE LINES* (선 밖에 색칠하다) — "pensar livremente e romper os padrões do mundo".

**Conceito na fanpage:** o grupo é uma *"young creator crew"* — **não há posições fixas**; todos participam de composição, produção, coreografia, vídeos e direção visual. O único papel fixo é o de **líder (Martin)**. Os cards da seção **Sobre** têm efeito de *hover* (o card "acende") e a Cortis Ball tem 4 versões (padrão + ACAI/REDRED/TNT).

## Stack

- **HTML5 semântico** — [index.html](index.html) + página de erro [404.html](404.html)
- **CSS3** — [style.css](style.css): mobile-first, sistema de 5 temas via variáveis CSS, sem framework
- **JavaScript puro (vanilla)** — [script.js](script.js): todos os dados centralizados no topo e renderizados no `DOMContentLoaded`. Sem framework, sem build, sem dependências.
- **Fontes:** Google Fonts — *Anton* (display) + *Inter* (texto)
- **Hospedagem:** GitHub Pages

Site estático puro, sem etapa de build e sem dependências.

## Responsivo (mobile)

Layout **mobile-first** com breakpoints em **600px**, **768px** e **1024px**. Testado em ~375px e ~414px.

- **Hero (versão B no mobile):** a foto de grupo (`grupo.jpg`) aparece **só no desktop**; em telas **≤ 768px** ela é ocultada (junto com o scrim) e o hero usa o **fundo liso do tema** (creme) + gradiente, para o título e a logo aparecerem com contraste total. No mobile o título **CORTIS** é reduzido (respiro nas laterais), os nomes dos membros quebram em ~2 linhas e os botões ficam **empilhados em largura total** (área de toque ~48px).
- **Grades colapsam no mobile:** membros e Cortis Ball em 2 colunas (5 só no desktop), discografia/galeria em 2–3 colunas, **Stream** numa linha centralizada de 3 ícones; Sobre, Curiosidades, Novos COER e a **timeline** ficam em coluna única (a timeline só alterna esquerda/direita a partir de 768px).
- **Prêmios:** as duas tabelas rolam **horizontalmente dentro do próprio wrapper** (`overflow-x`), sem estourar a largura da página.
- **Modais:** o modal de membro empilha foto + info no mobile com a **bio rolando dentro do bloco** (botão de fechar fica fixo no topo); modal de álbum e busca com listas roláveis.
- **Navegação no mobile:** menu **hambúrguer** (drawer com todos os itens, incl. Lightstick e Stream) até 1024px; o seletor **"Modos"** e a **busca** ficam visíveis no topo.
- Sem **scroll horizontal** na página; alvos de toque ampliados no topo/rodapé; respeita `prefers-reduced-motion`.

## Os 5 temas

Visual **vintage/Y2K**. O tema troca o site inteiro (fundo, superfícies, texto e accent) via classe no `<body>`.
O seletor fica na navbar num botão **"Modos"** (🎨 + chevron) que abre um dropdown com os 5 modos —
**Claro · Escuro · REDRED · ACAI · TNT** —, cada um com uma bolinha da cor do tema e o modo ativo
marcado com ✓. O dropdown fecha ao selecionar, ao clicar fora ou com **Escape**, é navegável por teclado
(`aria-expanded`/setas) e respeita `prefers-reduced-motion`. O tema é mantido **em memória** durante a
navegação (sem `localStorage`). Tema padrão (carrega na primeira visita): **Creme** (Claro). Sage (Escuro)
continua como tema secundário.

| Tema (nome no menu) | `data-theme` | Classe no `<body>` | Fundo → Accent | Bolinha no menu |
|------|--------------|--------------------|----------------|-----------------|
| Creme — **Claro** *(padrão)* | `verde-claro` | `theme-green-light` | `#F1ECE5` → detalhe **`#38302F`** (realce sage) | `#F1ECE5` (borda `#38302F`) |
| Sage — **Escuro** | `verde-escuro` | `theme-green-dark` | `#7A8E78` → detalhe **`#352D2E`** (cards sage escuros com texto creme `#F1ECE5`) | `#7A8E78` |
| **REDRED** | `redred` | `theme-redred` | `#930C11` | `#930C11` |
| **ACAI** | `acai` | `theme-acai` | `#7DA641` | `#3A2135` (roxo) |
| **TNT** | `tnt` | `theme-tnt` | `#4A5052` (detalhe vermelho no accent-2) | `#4A5052` |

> Os nomes de classe (`theme-green-dark`/`theme-green-light`) foram mantidos por compatibilidade — hoje representam **sage** e **creme**, não mais verdes.
>
> A bolinha do **ACAI** no menu é **roxa** (`#3A2135`) só como identidade visual do modo; o *accent* interno do tema açaí continua **verde** (`#7DA641`).

**Logo oficial** (PNGs em `assets/`): símbolo na **navbar** e no **hero** (acima do título), logo completa na **intro**. A cor da logo troca junto com o tema (versão `#38302F` no sage/creme; versões coloridas no REDRED/ACAI/TNT). Favicon: `assets/favicon-cortis.png`.

Acessibilidade: `:focus-visible` visível em todos os temas, `prefers-reduced-motion` respeitado
(desliga animações e o canvas do hero), modais/lightbox/drawer/busca fecham com **Escape** e prendem/restauram o foco.

## Discografia

**3 lançamentos** (2 EPs + 1 single), cada um como **card clicável que abre um modal** com informações e tracklist.

**EP 1 — COLOR OUTSIDE THE LINES** · 08/09/2025 · faixa-título *What You Want* · estreou **#15 na Billboard 200**
- Faixas (6): *GO! · What You Want · FaSHioN · JoyRide · Lullaby · What You Want (feat. Teezo Touchdown)*

**EP 2 — GREENGREEN** · 04/05/2026 · faixa-título **REDRED** (pré-lançada em 20/04/2026) · **#3 na Billboard 200**, +1,1 milhão de cópias no 1º dia
- Faixas (6): **TNT · REDRED · ACAI · YOUNGCREATORCREW · Wassup · Blue Lips**

**Single — Mention Me** · 13/02/2026 · OST do filme **GOAT** (Sony Pictures Animation)

## Prêmios

**22 troféus** (contagem até 16/07/2026): **11 vitórias** de *REDRED* em programas musicais (com *grand slam* nos 5 principais e *triple crown* no Music Core e no Inkigayo) + **11 prêmios** em cerimônias anuais/institucionais. A lista completa (duas tabelas) fica na seção **Prêmios** do site. Não inclui indicações, paradas, vendas ou certificados.

## Lightstick

Seção **Lightstick** (`#lightstick`, entre *Cortis Ball* e *Novos COER* no menu — navbar e drawer). Versão **enxuta**: traz apenas o **texto de abertura** descrevendo a lightstick oficial (lançada em **julho de 2026**, formato de **bastão fino e reto**, corpo branco com "CORTIS" na área transparente) e as **duas fotos** (`assets/lightstick.webp` = bastão, `assets/lightstick-kit.webp` = kit, ambas `loading="lazy"` com `alt` descritivo). Conteúdo no objeto `lightstick` (`fotos` + `intro`) em [script.js](script.js), renderizado por `renderLightstick()`, adaptado aos 5 temas pelos tokens de superfície.

> Blocos de ficha técnica, "o que vem na caixa", vendas e a leitura de fãs sobre o design foram **removidos** para deixar a seção enxuta.

## Stream

Seção **Stream** (`#stream`, logo antes do rodapé). Três plataformas com **ícones SVG** clicáveis (`assets/icon-spotify.svg`, `assets/icon-youtube.svg`, `assets/icon-applemusic.svg`), cada um em `<a target="_blank" rel="noopener noreferrer">` com `aria-label` (ex.: "Ouvir no Spotify"). Ícones monocromáticos ~44px: pretos sobre o tema Creme e invertidos para claro nos temas de fundo escuro (bom contraste nos 5 temas). **Melon foi removido.** O **YouTube** aponta para o canal oficial confirmado; **Spotify** e **Apple Music** ainda usam link de busca (`// TODO: colar link oficial verificado`).

---

## Sobre os marcadores no código

Além dos `// TODO: confirmar`, o `script.js` usa dois marcadores especiais:

- **`// CONFIRMAR`** — o valor **está preenchido**, mas precisa ser validado antes de tratar como 100% verificado. Hoje marca: os dados do fandom **COER** (fonte de fã — significado + membership global de 05/03/2026); a participação do **James** em *"Cherish (My Love)"* (ILLIT), relatada mas sem crédito público claro; e **4 prêmios de fonte não-independente** — Korea First Brand Awards (Coreia, Vietnã e Indonésia) e D Awards (Dreams Silver Label).
- **`// NOTA:`** — anotações internas para revisar antes de publicar. Hoje marcam: (1) a lesão nas mãos do **Keonho** (julho/2026) — informação de saúde sensível e volátil, mantida discreta e remetendo aos canais oficiais; (2) a divergência de datas do OST **Mention Me** (álbum em 06/02 vs. faixa em 13/02/2026 — usada a data da faixa).
