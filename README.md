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

Seção **Lightstick** (`#lightstick`, entre *Cortis Ball* e *Novos COER* no menu — navbar e drawer). Documenta a lightstick oficial (lançada em **julho de 2026**, formato de **bastão fino e reto**, corpo branco com "CORTIS" na área transparente). Traz **duas fotos** (`assets/lightstick.jpg` = bastão, `assets/lightstick-kit.jpg` = kit, ambas `loading="lazy"` com `alt` descritivo), a **ficha técnica** (nome, tamanho 3,4 × 3,4 × 25,7 cm, material ABS/policarbonato, 3× pilhas AAA, fabricante **FANLIGHT**, preço **US$ 35,05**, controle sem fio nos shows), **o que vem na caixa** e as **vendas** (pré-venda 13/07/2026 na Weverse Shop; presencial a partir de Incheon 18–19/07/2026). Conteúdo centralizado no objeto `lightstick` em [script.js](script.js) e renderizado por `renderLightstick()`, reutilizando o padrão de seção (mesmo `section-header`/cards e os tokens `--stext/--saccent/--card`, então adapta aos 5 temas).

> **Interpretação (não oficial):** um bloco visualmente destacado — badge *"Leitura dos fãs · interpretação (não oficial)"* — liga o formato reto à identidade *"Color Outside the Lines"*. A **BigHit não publicou explicação oficial detalhada do design**; o bloco deixa isso explícito (marcado no código com `// NOTA: significado do design é interpretação, não oficial`).

---

## TODOs pendentes

O que ainda **falta preencher** hoje em [script.js](script.js) (só o que está de fato pendente):

> **Imagens:** todas as fotos reais já foram inseridas (membros, gêmeos com legendas de posição, capas da discografia, as 4 Cortis Balls, galeria e foto de grupo no hero). Continua pendente apenas o `og:image` oficial no `<head>` (ver "Links oficiais").

### Timeline (pré-debut)
- **Formação** — data do anúncio oficial da formação do grupo

### História
- Dados de fonte de fã do **COER** (significado e membership) — ver `// CONFIRMAR` abaixo

### Links oficiais
- URLs de streaming (`streamLinks[].url`) — hoje são buscas genéricas; trocar pelas oficiais
- Links do rodapé em [index.html](index.html) — os `href="#"` ainda são placeholders
- Guia "Como apoiar" — confirmar os canais oficiais do grupo
- `og:image` no `<head>` de [index.html](index.html) — falta uma imagem oficial (o `og:url` já aponta para o GitHub Pages)

### Lightstick
- **Cores e modos de uso** — cores exatas do modo manual, ordem dos modos, existência de app e compatibilidade Bluetooth fora dos shows **não têm fonte confirmada** e por isso **não** foram afirmados; ver `// TODO: cores/modos da lightstick sem fonte confirmada`. Uma linha discreta na seção avisa que serão confirmados quando o guia oficial completo for publicado.

---

## Sobre os marcadores no código

Além dos `// TODO: confirmar`, o `script.js` usa dois marcadores especiais:

- **`// CONFIRMAR`** — o valor **está preenchido**, mas precisa ser validado antes de tratar como 100% verificado. Hoje marca: os dados do fandom **COER** (fonte de fã — significado + membership global de 05/03/2026); a participação do **James** em *"Cherish (My Love)"* (ILLIT), relatada mas sem crédito público claro; e **4 prêmios de fonte não-independente** — Korea First Brand Awards (Coreia, Vietnã e Indonésia) e D Awards (Dreams Silver Label).
- **`// NOTA:`** — anotações internas para revisar antes de publicar. Hoje marcam: (1) a lesão nas mãos do **Keonho** (julho/2026) — informação de saúde sensível e volátil, mantida discreta e remetendo aos canais oficiais; (2) a divergência de datas do OST **Mention Me** (álbum em 06/02 vs. faixa em 13/02/2026 — usada a data da faixa); (3) o significado do design da **lightstick** é uma leitura de fãs, **não oficial** (bloco de interpretação marcado como tal na seção).
