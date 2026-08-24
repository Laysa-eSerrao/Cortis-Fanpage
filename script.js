/* ============================================================
   CORTIS — Fanpage | script.js
   Dados centralizados + renderização no DOMContentLoaded.
   Onde faltar detalhe confirmado, mantive // TODO: confirmar
   Autora: Laysa Serrão
   ============================================================ */

/* ── HELPERS GLOBAIS ── */
const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ytSearch = t => 'https://www.youtube.com/results?search_query=' + encodeURIComponent('CORTIS ' + t);
/* Ícone do sprite SVG inline definido no topo do <body> (index.html) */
const svgIcon = (name, cls) => `<svg class="icon${cls ? ' ' + cls : ''}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
const fallbackBox = (letter, big) =>
  `<div class="media-fallback" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:'Anton',sans-serif;font-size:${big ? '3rem' : '2rem'};color:var(--saccent);opacity:.4;background:var(--surface)">${esc(letter)}</div>`;
const mvFallbackThumb = t =>
  `<div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.3rem;background:var(--surface)"><span class="mv-fallback-play" style="color:var(--saccent)">${svgIcon('play', 'icon-lg')}</span><span style="font-family:'Anton',sans-serif;font-size:.85rem;letter-spacing:.04em;color:var(--stext2);text-align:center;padding:0 .5rem">${esc(t)}</span></div>`;

/* ============================================================
   DADOS
   ============================================================ */

/* ── Membros (OT5) ── */
const membros = [
  {
    name: "Martin", kr: "마틴 조너선 에드워즈", full: "Martin Jonathan Edwards",
    role: "Líder",
    nat: "Coreano-canadense",
    birthday: "20 de março de 2008",
    height: "190,5 cm",
    img: "assets/martin.jpg",
    tags: ["Líder"],
    bio: "Líder do CORTIS e um dos cérebros criativos do grupo. É coreano-canadense. Antes mesmo da estreia, já aparecia como <strong>um dos colaboradores creditados</strong> na criação de músicas de outros artistas da HYBE (lista completa nos fatos abaixo).",
    facts: [
      "Líder do CORTIS.",
      "Nome coreano: <strong>Park Woo-joo</strong> (박우주).",
      "Créditos pré-debut (colaborador creditado): “Magnetic” (ILLIT); “Deja Vu”, “Miracle” e “Beautiful Strangers” (TXT); “Pierrot” (LE SSERAFIM); “Outside” (ENHYPEN).",
      "Participou do coro infantil nas Olimpíadas de Inverno de PyeongChang 2018.",
      "Coreano-canadense."
    ]
  },
  {
    name: "James", kr: "", full: "Zhao Yufan (趙雨凡)",
    role: "",
    nat: "Tailandês-taiwanês",
    birthday: "14 de outubro de 2005",
    img: "assets/james.jpg",
    tags: ["O mais velho"],
    bio: "O <strong>mais velho</strong> do grupo — e o único adulto na estreia. Nasceu em Hong Kong (mãe tailandesa, pai chinês) e cresceu em Taipei. Fala 5 línguas: inglês, mandarim, tailandês, coreano e japonês. Foi integrante do grupo pré-debut <em>Trainee A</em> (HYBE, 2021–2022).",
    facts: [
      "O mais velho — e o único adulto na estreia.",
      "Fala 5 línguas: inglês, mandarim, tailandês, coreano e japonês.",
      "Ex-integrante do Trainee A (HYBE, 2021–2022).",
      "Contribuiu na coreografia/composição de “Magnetic” e “Deja Vu” e ajudou na coreografia de “GO!”."
    ]
  },
  {
    name: "Juhoon", kr: "", full: "Kim Ju-hoon (김주훈)",
    role: "",
    nat: "Coreano",
    birthday: "3 de janeiro de 2008",
    img: "assets/juhoon.jpg",
    tags: ["Cor: azul"],
    bio: "Coreano. Ex-modelo infantil, apareceu em campanhas e clipes de Vixx, Zion.T e Melo Mance. Entrou na BigHit Music em 2023. Sua cor representativa é o azul.",
    facts: [
      "Cor representativa: azul.",
      "Ex-modelo infantil (campanhas e clipes de Vixx, Zion.T e Melo Mance).",
      "Entrou na BigHit Music em 2023.",
      "Na estreia, disse buscar uma “pequena faísca especial” dentro das coisas comuns (Weverse Magazine)."
    ]
  },
  {
    name: "Seonghyeon", kr: "", full: "Eom Sung-hyun (엄성현)",
    role: "",
    nat: "Coreano (Seo-gu, Daejeon)",
    birthday: "13 de janeiro de 2009",
    img: "assets/seonghyeon.jpg",
    tags: [],
    bio: "Um dos integrantes mais novos, nascido em Seo-gu, Daejeon. Discreto (soft-spoken), trabalhou em cerca de 100 faixas como trainee e ajudou a compor as 5 músicas do 1º EP; também participou da coreografia de “GO!”. É frequentemente confundido com Keonho (veja “Diferencie os Gêmeos”).",
    facts: [
      "Trabalhou em ~100 faixas como trainee e ajudou a compor as 5 músicas do 1º EP.",
      "Ajudou na coreografia de “GO!”.",
      "Discreto (soft-spoken).",
      "Frequentemente confundido com Keonho."
    ]
  },
  {
    name: "Keonho", kr: "", full: "Ahn Geon-ho (안건호)",
    role: "",
    nat: "Coreano (Suwon, Gyeonggi)",
    birthday: "14 de fevereiro de 2009",
    height: "178 cm",
    img: "assets/keonho.jpg",
    tags: ["O mais novo", "Ex-nadador"],
    bio: "O integrante <strong>mais novo</strong> do CORTIS, nascido em Suwon (Gyeonggi). Foi <strong>nadador competitivo</strong> antes da carreira artística.",
    facts: [
      "O integrante mais novo do grupo.",
      "Ex-nadador competitivo antes da carreira artística.",
      "Em julho de 2026, a BigHit informou uma lesão nas mãos (fraturas próximas aos dedos mínimos); participações em shows podem variar. Atualizações oficiais nos canais do grupo." // NOTA: informação de saúde, volátil — revisar antes de publicar
    ]
  }
];

/* ── Discografia (grupo em ascensão — poucos lançamentos, bem detalhados) ── */
const discografia = [
  {
    name: "COLOR OUTSIDE THE LINES", year: "2025", date: "08/09/2025", type: "ep", badge: "1º EP · Debut",
    titleTrack: "What You Want", trackCount: 6,
    tracks: ["GO!", "What You Want", "FaSHioN", "JoyRide", "Lullaby", "What You Want (feat. Teezo Touchdown)"],
    img: "assets/capa-color-outside-the-lines.jpg",
    desc: "EP de estreia do CORTIS, que estreou em <strong>#15 na Billboard 200</strong> e foi certificado em <strong>2 milhões de cópias</strong> (março de 2026). Contexto das faixas: <strong>GO!</strong> apresenta o grupo (trap + sintetizadores); <strong>What You Want</strong> (faixa-título de estreia) mistura boom bap e rock psicodélico dos anos 60; <strong>FaSHioN</strong> trata da moda como identidade (estética Y2K/punk); <strong>JoyRide</strong> celebra a liberdade do verão; <strong>Lullaby</strong> mostra o lado mais sensível. Fecha com a versão de <strong>What You Want</strong> com participação de Teezo Touchdown."
  },
  {
    name: "GREENGREEN", year: "2026", date: "04/05/2026", type: "ep", badge: "2º EP",
    titleTrack: "REDRED", trackCount: 6,
    tracks: ["TNT", "REDRED", "ACAI", "YOUNGCREATORCREW", "Wassup", "Blue Lips"],
    img: "assets/capa-greengreen.jpg",
    desc: "Segundo EP do CORTIS, com a faixa-título <strong>REDRED</strong> (pré-lançada em 20/04/2026). O conceito, idealizado pelo <strong>James</strong>, usa verde e vermelho para mostrar o que o grupo abraça vs. o que rejeita. Passeia por vários gêneros de propósito: <strong>TNT</strong> tem batida trap, <strong>REDRED</strong> traz electroclash dos anos 2000 e <strong>ACAI</strong> celebra o “superalimento” favorito do grupo. Vendeu <strong>+1,1 milhão de cópias no 1º dia</strong> e estreou em <strong>#3 na Billboard 200</strong>."
  },
  {
    name: "Mention Me", year: "2026", date: "13/02/2026", type: "ost", badge: "Single (OST) · GOAT",
    titleTrack: "Mention Me", trackCount: 1, tracks: ["Mention Me"], img: "assets/capa-mention-me.jpg",
    // NOTA: fontes divergem — álbum da trilha listado em 06/02/2026 (Wikipedia) e a faixa em 13/02/2026 (Apple/Shazam). Usada a data da faixa.
    desc: "Single da trilha (OST) do filme <strong>GOAT</strong> (2026), animação da <strong>Sony Pictures Animation</strong> sobre um bode chamado Will no mundo do “roarball”. É o primeiro OST de filme de Hollywood do grupo desde a estreia. Estilo trap com forte linha de baixo; os membros participaram da escrita e composição."
  }
];

/* ── Trajetória / Timeline (carreira individual → formação → estreia → marcos) ── */
const timeline = [
  { year: "Pré-2025", event: "Martin — créditos de composição na HYBE", desc: "Antes do CORTIS, Martin já aparecia como <strong>um dos colaboradores creditados</strong> na criação de músicas de outros artistas da HYBE: “Magnetic” (ILLIT); “Deja Vu”, “Miracle” e “Beautiful Strangers” (TXT); “Pierrot” (LE SSERAFIM); e “Outside” (ENHYPEN). Em “Magnetic”, trabalhou na melodia ao lado de James e do produtor Slow Rabbit.", badge: "Pré-debut" },
  { year: "Pré-2025", event: "James — Trainee A & coreografias", desc: "Dançarino do projeto pré-debut <em>Trainee A</em>, James depois colaborou em performances de outros artistas da HYBE. Em <strong>“Magnetic” (ILLIT)</strong>, improvisou no estúdio o gesto de “atração magnética” com as mãos, que entrou na coreografia oficial — criou <strong>um dos movimentos mais reconhecíveis</strong> (não a coreografia inteira). Participações também divulgadas em <strong>“Deja Vu”</strong> e <strong>“Miracle”</strong> (TXT) e <strong>“Tick-Tack” (ILLIT)</strong>; e relatada em “Cherish (My Love)” (ILLIT). Foi ainda dançarino de apoio de Jung Kook (BTS) em “Seven” — dançarino de apoio, não coreógrafo.", badge: "Pré-debut" }, // CONFIRMAR: “Cherish (My Love)” relatado, sem crédito público claro
  { year: "Pré-2025", event: "Keonho — natação competitiva", desc: "Keonho foi nadador competitivo antes de escolher entrar na Big Hit. // TODO: período/conquistas sem fonte", badge: "Pré-debut" },
  { year: "2025", event: "Formação sob a BigHit Music (HYBE)", desc: "Os cinco membros — Martin, James, Juhoon, Seonghyeon e Keonho — se unem para formar o CORTIS. // TODO: confirmar a data do anúncio da formação.", badge: "Origem" },
  { year: "11/08/2025", event: "Pré-single “GO!”", desc: "Lançamento do pré-single GO!, uma semana antes da estreia oficial.", badge: "Pré-estreia" },
  { year: "18/08/2025", event: "Estreia oficial com “What You Want”", desc: "O CORTIS estreia oficialmente com o single What You Want.", badge: "Debut" },
  { year: "08/09/2025", event: "1º EP: COLOR OUTSIDE THE LINES", desc: "O EP de estreia chega com 6 faixas e estreia em #15 na Billboard 200.", badge: "Billboard #15" },
  { year: "03/2026", event: "2 milhões de cópias", desc: "COLOR OUTSIDE THE LINES é certificado em 2 milhões de cópias.", badge: "2M cópias" },
  { year: "20/04/2026", event: "Pré-lançamento de “REDRED”", desc: "REDRED, faixa-título do 2º EP, é pré-lançada.", badge: "Pré-lançamento" },
  { year: "04/05/2026", event: "2º EP: GREENGREEN", desc: "Segundo EP, com faixa-título REDRED. Vendeu +1,1 milhão de cópias no 1º dia e estreou em #3 na Billboard 200.", badge: "Billboard #3" },
  { year: "2025–2026", event: "22 troféus e o grand slam de “REDRED”", desc: "Somando programas musicais e cerimônias, o CORTIS chega a <strong>22 troféus</strong>. “REDRED” fez o <strong>grand slam</strong> — venceu nos 5 principais programas — com <strong>11 vitórias</strong>, o 2º maior recorde de vitórias em music shows do ano até então, atrás só do BTS (14). A 1ª vitória veio em 30/04/2026, dez dias após o pré-lançamento.", badge: "Grand slam" },
  { year: "08/07/2026", event: "1ª turnê: PUT YOUR PHONE DOWN", desc: "É anunciada a <strong>CORTIS TOUR — PUT YOUR PHONE DOWN</strong>, com etapas na Coreia, América do Norte e Japão (PIA Arena MM, Kanagawa, em 4, 5 e 6 de setembro). O título convida a viver o show no presente, sem tela.", badge: "Turnê" }
];

/* ── Sobre / História do grupo ── */
const historia = [
  { title: "COLOR OUTSIDE THE LINES", text: "<strong>CORTIS</strong> é o acrônimo de <strong>COLOR OUTSIDE THE LINES</strong> (선 밖에 색칠하다) — as seis letras foram escolhidas aleatoriamente da frase. A ideia é <strong>pensar livremente e romper os padrões do mundo</strong>." },
  { title: "Young creator crew", text: "O CORTIS se define como uma <strong>“young creator crew”</strong>: todos os membros participam de composição, produção, coreografia, vídeos e direção visual. Os cinco receberam créditos no projeto de estreia e prepararam <strong>mais de 300 músicas</strong> em cerca de 2 anos." },
  { title: "BigHit Music · HYBE", text: "É o <strong>3º grupo da BigHit Music</strong> depois de BTS e TXT — e o 1º boy group do selo em cerca de 6 anos. Nos EUA, é representado pela <strong>Republic Records</strong>." },
  { title: "Revelação", text: "Antes chamado informalmente de <strong>BIGHITNBG</strong> (BigHit New Boy Group), o grupo foi revelado em abril de 2025; os membros em <strong>14 de julho</strong> e o nome em <strong>7 de agosto de 2025</strong>." },
  { title: "Direção criativa", text: "A direção criativa e o estilo ficam com <strong>Seoyoung Kim</strong> e <strong>Actoy</strong>, com estética <strong>punk + Y2K</strong>." },
  { title: "OT5", text: "São cinco membros: <strong>Martin</strong> (líder), <strong>James</strong> (o mais velho), <strong>Juhoon</strong>, <strong>Seonghyeon</strong> e <strong>Keonho</strong> (o mais novo)." },
  { title: "Fandom: COER", text: "O fandom se chama <strong>COER (코어)</strong> — junção de <strong>“COR”</strong> (de CORTIS) + <strong>“~ER”</strong> (os que ficam juntos), ecoando <em>“CORE”</em> (núcleo): os fãs como força central. Escolhido entre mais de 19 mil sugestões; a membership global abriu em 05/03/2026 (200 dias de estreia)." } // CONFIRMAR: fonte de fã, validar
];

/* ── Curiosidades ── */
const curiosidades = [
  { tag: "Estreia", text: "O grupo estreou em <strong>18/08/2025</strong> com o single <em>What You Want</em>, precedido pelo pré-single <em>GO!</em> (11/08/2025)." },
  { tag: "Billboard", text: "O 1º EP <strong>COLOR OUTSIDE THE LINES</strong> estreou em <strong>#15 na Billboard 200</strong>; o 2º EP <strong>GREENGREEN</strong> subiu para <strong>#3</strong>." },
  { tag: "GREENGREEN", text: "O EP <strong>GREENGREEN</strong> vendeu <strong>+1,1 milhão de cópias no 1º dia</strong> de lançamento." },
  { tag: "Streams", text: "“GO!”, “What You Want” e “FaSHioN” passaram de <strong>400 milhões de streams</strong> no Spotify em 5 meses." },
  { tag: "Grupo internacional", text: "<strong>Martin</strong> é coreano-canadense e <strong>James</strong> é tailandês-taiwanês (nasceu em Hong Kong, cresceu em Taipei) e fala 5 línguas." },
  { tag: "Do esporte ao palco", text: "<strong>Keonho</strong>, o maknae, foi <strong>nadador competitivo</strong> antes de se tornar idol." },
  { tag: "Os “gêmeos”", text: "Os fãs costumam confundir os maknaes <strong>Seonghyeon</strong> e <strong>Keonho</strong> — por isso esta fanpage tem uma seção só para diferenciá-los." },
  { tag: "ACAI", text: "A faixa <strong>ACAI</strong> (do EP GREENGREEN) é uma homenagem ao açaí, o “superalimento” favorito do grupo." },
  { tag: "OST de cinema", text: "O grupo assinou a OST <em>“Mention Me”</em>, do filme <strong>GOAT</strong>." },
  { tag: "Cortis Ball", text: "O merch oficial do grupo inclui as <strong>Cortis Ball</strong> — pelúcias/bolinhas que representam o CORTIS." }
];

/* ── Prêmios (contagem até 16/07/2026) ── */
const premios = {
  total: 22,
  // A) 11 vitórias de "REDRED" em programas musicais
  musicShows: [
    { n: "1ª", date: "30/04/2026", program: "M Countdown" },
    { n: "2ª", date: "07/05/2026", program: "M Countdown" },
    { n: "3ª", date: "13/05/2026", program: "Show Champion" },
    { n: "4ª", date: "14/05/2026", program: "M Countdown" },
    { n: "5ª", date: "15/05/2026", program: "Music Bank" },
    { n: "6ª", date: "16/05/2026", program: "Show! Music Core" },
    { n: "7ª", date: "17/05/2026", program: "Inkigayo" },
    { n: "8ª", date: "23/05/2026", program: "Show! Music Core" },
    { n: "9ª", date: "24/05/2026", program: "Inkigayo" },
    { n: "10ª", date: "30/05/2026", program: "Show! Music Core" },
    { n: "11ª", date: "31/05/2026", program: "Inkigayo" }
  ],
  // B) 11 prêmios em cerimônias anuais/institucionais
  cerimonias: [
    { year: "2025", event: "TikTok Awards Korea", award: "Global Rookie Award" },
    { year: "2025", event: "MAMA Awards", award: "Best New Artist" },
    { year: "2025", event: "Asia Artist Awards", award: "Rookie of the Year — Singer" },
    { year: "2025", event: "Asia Artist Awards", award: "Best Performance" },
    { year: "2026", event: "Korea First Brand Awards (Coreia)", award: "Rookie Male Idol", confirmar: true },       // CONFIRMAR: fonte não-independente
    { year: "2026", event: "Korea First Brand Awards (Vietnã)", award: "Male Rookie Idol", confirmar: true },      // CONFIRMAR: fonte não-independente
    { year: "2026", event: "Korea First Brand Awards (Indonésia)", award: "Male Rookie Idol", confirmar: true },   // CONFIRMAR: fonte não-independente
    { year: "2026", event: "Golden Disc Awards", award: "Rookie Artist of the Year" },
    { year: "2026", event: "D Awards", award: "Dreams Silver Label", confirmar: true },                            // CONFIRMAR: fonte não-independente
    { year: "2026", event: "Hanteo Music Awards", award: "Rookie of the Year" },
    { year: "2026", event: "iHeartRadio Music Awards", award: "Best New Artist — K-pop" }
  ]
};

/* ── MVs & músicas ── */
/* MVs do canal oficial (id = trecho após watch?v= na URL do YouTube).
   YOUNGCREATORCREW e Wassup (faixas de GREENGREEN) não têm MV oficial e não são listados aqui. */
const mvs = [
  { title: "What You Want", year: "2025", badge: "Single de estreia", views: "", id: "e2OpbOv_JiQ" },
  { title: "GO!", year: "2025", views: "", id: "WXS-o57VJ5w" },
  { title: "FaSHioN", year: "2025", views: "", id: "42wfEs7oIP8" },
  { title: "JoyRide", year: "2025", views: "", id: "8QZeXvOjgGE" },
  { title: "Lullaby", year: "2025", views: "", id: "8ej2YOBsimQ" },
  { title: "REDRED", year: "2026", views: "", id: "U6BDbXIah-Y" },
  { title: "TNT", year: "2026", views: "", id: "kRpaqR5sbf0" },
  { title: "ACAI", year: "2026", views: "", id: "nCElUD0jvgo" },
  { title: "Blue Lips", year: "2026", views: "", id: "hOIY3OhvD94" },
  { title: "Mention Me (OST · GOAT)", year: "2026", views: "", id: "iGGxMGeJzmw" }
];

/* ── Galeria ── */
const galeria = [
  { alt: "Martin", url: "assets/galeria-01.jpg" },
  { alt: "Juhoon", url: "assets/galeria-02.jpg" },
  { alt: "Keonho", url: "assets/galeria-03.jpg" },
  { alt: "James", url: "assets/galeria-04.jpg" },
  { alt: "Seonghyeon", url: "assets/galeria-05.jpg" },
  { alt: "CORTIS", url: "assets/galeria-06.jpg" }
];

/* ── Os Gêmeos (Seonghyeon vs Keonho) ── */
const gemeos = {
  intro: "No começo é fácil confundir os dois, principalmente porque ambos nasceram em 2009 e costumam aparecer juntos. O jeito mais confiável de diferenciar é observar o formato do rosto, os olhos e o maxilar.",
  membros: [
    {
      name: "Seonghyeon", sub: "Rosto fino · olhar suave", img: "assets/gemeo-seonghyeon.jpg", photoClass: "gemeo-photo--seonghyeon",
      traits: [
        "Rosto mais comprido, estreito e delicado",
        "Queixo mais fino, formando um rosto próximo de um “V”",
        "Olhos mais suaves e levemente caídos nas extremidades",
        "Nariz visualmente mais fino",
        "Lábios menores e mais delicados",
        "Dependendo do penteado, aparência mais “fofinha” ou elegante"
      ]
    },
    {
      name: "Keonho", sub: "Sobrancelha forte · olhar intenso", img: "assets/gemeo-keonho.jpg", photoClass: "gemeo-photo--keonho",
      traits: [
        "Rosto mais largo e estruturado",
        "Maxilar e maçãs do rosto mais marcados",
        "Sobrancelhas mais fortes e normalmente mais retas",
        "Olhos maiores, mais intensos e definidos",
        "Nariz um pouco mais destacado",
        "Costuma transmitir expressão mais séria ou intensa nas fotos"
      ]
    }
  ],
  truque: [
    "<strong>Seonghyeon</strong> = rosto fino, olhar suave e queixo delicado",
    "<strong>Keonho</strong> = sobrancelha forte, olhar intenso e maxilar marcado"
  ]
};

/* ── Cortis Ball (merch) ── */
const cortisBall = {
  intro: "A <strong>Cortis Ball</strong> é o mascote/merch do CORTIS. Além da versão <strong>padrão</strong> (do grupo), há três versões que representam músicas: <strong>ACAI</strong>, <strong>REDRED</strong> e <strong>TNT</strong>.",
  items: [
    { name: "Padrão", rep: "Bola oficial do grupo", img: "assets/cortisball-padrao.jpg" },
    { name: "ACAI", rep: "Versão da música ACAI", img: "assets/cortisball-acai.jpg" },
    { name: "REDRED", rep: "Versão da música REDRED", img: "assets/cortisball-redred.jpg" },
    { name: "TNT", rep: "Versão da música TNT", img: "assets/cortisball-tnt.jpg" }
  ]
};

/* ── Lightstick oficial ── */
const lightstick = {
  fotos: [
    { src: "assets/lightstick.webp",    alt: "Lightstick oficial do CORTIS em detalhe — bastão fino e reto, corpo branco, com o nome CORTIS em preto na área central transparente e o botão liga/desliga perto da base" },
    { src: "assets/lightstick-kit.webp", alt: "Kit completo da lightstick do CORTIS — o que vem na caixa: o bastão, a embalagem, a bolsa de tecido, a alça de pulso, 5 photocards, adesivos e o manual" }
  ],
  intro: "A lightstick oficial do CORTIS foi lançada em <strong>julho de 2026</strong>, pouco antes da turnê <strong>PUT YOUR PHONE DOWN</strong>. Diferente das lightsticks tradicionais com esfera no topo, ela tem formato de um <strong>bastão fino e reto</strong>, corpo branco com uma área central transparente onde aparece o nome <strong>CORTIS</strong> em relevo, e o símbolo do grupo perto da base. Visual minimalista e industrial — lembra um marcador/caneta ou um tubo de luz."
};

/* ── Stream / plataformas (3 oficiais: Spotify, YouTube, Apple Music) ── */
const streamLinks = [
  // TODO: colar link oficial verificado do perfil do Spotify (por ora, busca genérica)
  { name: "Spotify", action: "Ouvir", icon: "assets/icon-spotify.svg", color: "#1ED760", url: "https://open.spotify.com/search/CORTIS" },
  // YouTube: canal oficial confirmado
  { name: "YouTube", action: "Assistir", icon: "assets/icon-youtube.svg", color: "#FF0000", url: "https://www.youtube.com/channel/UCZMYvSPulDSUdx7bdtTFdrg" },
  // TODO: colar link oficial verificado do perfil do Apple Music (por ora, busca genérica)
  { name: "Apple Music", action: "Ouvir", icon: "assets/icon-applemusic.svg", color: "#FA243C", url: "https://music.apple.com/search?term=CORTIS" }
];

/* ── Guia para novos COER ── */
const guiaNovosCoer = [
  { icon: "play", title: "Por onde começar", text: "Comece pelo single de estreia <strong>What You Want</strong> e pelo EP <strong>COLOR OUTSIDE THE LINES</strong> (2025). Depois explore a era <strong>GREENGREEN</strong> (2026)." },
  { icon: "globe", title: "Sobre o grupo", text: "O <strong>CORTIS</strong> é um grupo da <strong>BigHit Music (HYBE)</strong>, estreado em <strong>2025</strong>, com 5 membros — o 3º grupo do selo, depois de BTS e TXT. O nome significa <strong>COLOR OUTSIDE THE LINES</strong>." },
  { icon: "users", title: "Os membros", text: "<strong>Martin</strong> (líder, produtor)<br><strong>James</strong> (o mais velho, coreógrafo)<br><strong>Juhoon</strong> (dançarino)<br><strong>Seonghyeon</strong> (maknae)<br><strong>Keonho</strong> (maknae, o mais novo)" },
  { icon: "disc", title: "Discografia rápida", text: "<strong>2025:</strong> GO! · What You Want · FaSHioN · COLOR OUTSIDE THE LINES (1º EP)<br><strong>2026:</strong> GREENGREEN (2º EP · faixa-título REDRED; inclui TNT e ACAI) · Mention Me (OST)" },
  { icon: "heart", title: "Como apoiar", text: "Faça <strong>streaming</strong> nas plataformas, assista aos MVs no YouTube e acompanhe o grupo nas redes oficiais. // TODO: confirmar canais oficiais." },
  {
    icon: "book", title: "Glossário COER", glossary: [
      { word: "COER", def: "Fandom: “COR” (de CORTIS) + “~ER”, ecoando “CORE” (núcleo) — os fãs como força central" }, // CONFIRMAR: fonte de fã, validar
      { word: "OT5", def: "Os 5 membros do grupo" },
      { word: "Maknae", def: "O(s) mais novo(s): Seonghyeon e Keonho" },
      { word: "Cortis Ball", def: "Pelúcias/bolinhas oficiais do grupo" },
      { word: "COTL", def: "COLOR OUTSIDE THE LINES — sigla e nome do 1º EP" },
      { word: "Creator crew", def: "“Young creator crew”: todos os membros criam (composição, produção, coreografia, vídeos)" }
    ]
  }
];

/* ── Stats (contagem animada) ── */
const stats = [
  { target: 5, label: "membros (OT5)" },
  { target: 2, label: "EPs lançados" },
  { target: 15, prefix: "#", label: "estreia na Billboard 200" },
  { target: 2, suffix: "M", label: "cópias certificadas" },
  { target: 2025, label: "ano de estreia", noCount: true }
];

/* ── Seções (para a busca) ── */
const SECTIONS = [
  { title: "Membros", anchor: "#membros" },
  { title: "Discografia", anchor: "#discografia" },
  { title: "Trajetória", anchor: "#timeline" },
  { title: "Sobre a CORTIS", anchor: "#historia" },
  { title: "Curiosidades", anchor: "#curiosidades" },
  { title: "Prêmios", anchor: "#premios" },
  { title: "MVs", anchor: "#mvs" },
  { title: "Galeria", anchor: "#galeria" },
  { title: "Os Gêmeos", anchor: "#gemeos" },
  { title: "Cortis Ball", anchor: "#cortisball" },
  { title: "Lightstick", anchor: "#lightstick" },
  { title: "Stream", anchor: "#stream" },
  { title: "Novos COER", anchor: "#novos-coer" }
];

/* ── Mapa data-theme (swatch) → classe no <body> ── */
const THEME_CLASS = {
  "verde-escuro": "theme-green-dark",
  "verde-claro": "theme-green-light",
  "redred": "theme-redred",
  "acai": "theme-acai",
  "tnt": "theme-tnt"
};

/* Logo por tema (símbolo → navbar/hero; completa → intro).
   Sage e creme usam a versão #38302F; os temas de música usam a versão colorida. */
const LOGO_SYMBOL = {
  "verde-escuro": "assets/cortis-simbolo-38302F.png",
  "verde-claro":  "assets/cortis-simbolo-38302F.png",
  "redred":       "assets/cortis-simbolo-redred.png",
  "acai":         "assets/cortis-simbolo-acai.png",
  "tnt":          "assets/cortis-simbolo-tnt.png"
};
const LOGO_FULL = {
  "verde-escuro": "assets/cortis-logo-full-38302F.png",
  "verde-claro":  "assets/cortis-logo-full-38302F.png",
  "redred":       "assets/cortis-logo-full-redred.png",
  "acai":         "assets/cortis-logo-full-acai.png",
  "tnt":          "assets/cortis-logo-full-tnt.png"
};

/* ============================================================
   INICIALIZAÇÃO
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

  /* ── Refs ── */
  const memberModal = document.getElementById('memberModal');
  const imgSide = document.getElementById('modalImgSide');
  const infoSide = document.getElementById('modalInfoSide');
  const albumModal = document.getElementById('albumModal');
  const albumBody = document.getElementById('albumModalBody');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const searchWrap = document.getElementById('searchWrap');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const drawer = document.getElementById('drawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  const mvsCarousel = document.getElementById('mvsCarousel');

  /* ── Gerência de diálogos: foco preso + restaurado ── */
  let activeDialog = null, dialogRestoreFocus = null, lbIndex = 0;
  function getFocusable(c) {
    return Array.from(c.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])'))
      .filter(el => el.getClientRects().length > 0);
  }
  function restoreFocus() { if (dialogRestoreFocus && dialogRestoreFocus.focus) dialogRestoreFocus.focus(); }
  function openModalEl(el) {
    dialogRestoreFocus = document.activeElement;
    el.classList.remove('hidden'); document.body.style.overflow = 'hidden'; activeDialog = el;
    setTimeout(() => { const f = getFocusable(el); (f[0] || el).focus(); }, 30);
  }
  function closeModalEl(el) {
    el.classList.add('hidden'); document.body.style.overflow = '';
    if (activeDialog === el) activeDialog = null; restoreFocus();
  }
  function openOverlayEl(el) {
    dialogRestoreFocus = document.activeElement;
    el.classList.add('open'); document.body.style.overflow = 'hidden'; activeDialog = el;
    setTimeout(() => { const f = getFocusable(el); (f[0] || el).focus(); }, 30);
  }
  function closeOverlayEl(el) {
    el.classList.remove('open'); document.body.style.overflow = '';
    if (activeDialog === el) activeDialog = null; restoreFocus();
  }
  function trapTab(e, container) {
    const f = getFocusable(container); if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ── Modal de membro ── */
  function openMemberDetail(i) {
    const m = membros[i]; if (!m || !memberModal) return;
    imgSide.innerHTML = m.img
      ? `<img src="${esc(m.img)}" alt="${esc(m.name)}" loading="lazy" onerror="this.style.display='none'">`
      : fallbackBox(m.name.charAt(0), true);
    infoSide.innerHTML =
      `<div class="modal-stage">${esc(m.name)}</div>
       <div class="modal-fullname">${esc([m.kr, m.full].filter(Boolean).join(' · ') || m.role)}</div>
       <div style="display:flex;gap:.5rem;flex-wrap:wrap">${m.tags.map(t => `<span class="modal-pill">${esc(t)}</span>`).join('')}</div>
       <div class="modal-divider"></div>
       <div class="modal-stats">
         <div><div class="modal-stat-label">Nascimento</div><div class="modal-stat-value">${esc(m.birthday)}</div></div>
         <div><div class="modal-stat-label">Nacionalidade</div><div class="modal-stat-value">${esc(m.nat)}</div></div>
         ${m.height ? `<div><div class="modal-stat-label">Altura</div><div class="modal-stat-value">${esc(m.height)}</div></div>` : ''}
         <div><div class="modal-stat-label">No grupo</div><div class="modal-stat-value">${esc(m.role || 'Creator crew')}</div></div>
       </div>
       <div class="modal-divider"></div>
       <div class="modal-bio">${m.bio}</div>
       <div class="modal-divider"></div>
       <div>${m.facts.map(f => `<div class="modal-fact">${f}</div>`).join('')}</div>`;
    openModalEl(memberModal);
  }

  /* ── Modal de álbum ── */
  function openAlbumDetail(i) {
    const a = discografia[i]; if (!a || !albumModal) return;
    const cover = a.img
      ? `<img class="album-modal-cover" src="${esc(a.img)}" alt="${esc(a.name)}" loading="lazy" onerror="this.style.display='none'">`
      : '';
    const tracks = (a.tracks && a.tracks.length)
      ? `<div class="album-track-list">${a.tracks.map((t, n) =>
          `<div class="album-track${t === a.titleTrack ? ' title-track' : ''}"><span class="album-track-num">${String(n + 1).padStart(2, '0')}</span><span>${t}</span></div>`).join('')}</div>`
      : '';
    albumBody.innerHTML =
      `${cover}
       <div class="album-modal-title">${esc(a.name)}</div>
       <div class="album-modal-meta">${esc(a.badge)} · ${esc(a.date)}</div>
       <div class="album-modal-desc">${a.desc}</div>
       ${tracks}`;
    openModalEl(albumModal);
  }

  /* ── Render: Stats ── */
  function renderStats() {
    const bar = document.getElementById('statsBar'); if (!bar) return;
    bar.innerHTML = stats.map(s =>
      `<div class="stat-item"><span class="stat-num" data-target="${s.target}" data-prefix="${s.prefix || ''}" data-suffix="${s.suffix || ''}"${s.noCount ? ' data-nocount="1"' : ''}>${s.noCount ? (s.prefix || '') + s.target + (s.suffix || '') : '0'}</span><span class="stat-label">${esc(s.label)}</span></div>`
    ).join('');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target; obs.unobserve(el);
        if (el.dataset.nocount) return;
        const target = +el.dataset.target, pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
        let cur = 0; const step = Math.max(1, target / 50);
        const t = setInterval(() => {
          cur = Math.min(cur + step, target);
          el.textContent = pre + Math.floor(cur) + suf;
          if (cur >= target) clearInterval(t);
        }, 20);
      });
    }, { threshold: .5 });
    bar.querySelectorAll('.stat-num').forEach(n => obs.observe(n));
  }

  /* ── Render: Membros ── */
  function renderMembers() {
    const grid = document.getElementById('membersGrid'); if (!grid) return;
    grid.innerHTML = '';
    membros.forEach((m, i) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'member-card reveal';
      card.style.transitionDelay = (i * 0.06) + 's';
      card.setAttribute('aria-label', 'Ver perfil de ' + m.name);
      const media = m.img
        ? `<img src="${esc(m.img)}" alt="${esc(m.name)}" loading="lazy" onerror="this.style.display='none'">`
        : fallbackBox(m.name.charAt(0), true);
      card.innerHTML =
        `<div class="member-img-wrap">${media}<div class="member-overlay"></div>
          <div class="member-bottom">
            <span class="member-badge">${esc(m.role || 'Creator crew')}</span>
            <div class="member-stage">${esc(m.name)}</div>
            <div class="member-name">${esc(m.nat)}</div>
          </div>
        </div>`;
      card.addEventListener('click', () => openMemberDetail(i));
      grid.appendChild(card);
    });
  }

  /* ── Render: Discografia ── */
  function renderDisco() {
    const grid = document.getElementById('discoGrid'); if (!grid) return;
    grid.innerHTML = '';
    discografia.forEach((a, i) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'disco-card reveal';
      card.setAttribute('aria-label', 'Ver detalhes de ' + a.name);
      const cover = a.img
        ? `<img src="${esc(a.img)}" alt="${esc(a.name)}" loading="lazy" onerror="this.style.display='none'">`
        : `<div class="disco-cover-fallback">${esc(a.name.charAt(0))}</div>`;
      const faixas = a.trackCount ? `${a.trackCount} faixa${a.trackCount === 1 ? '' : 's'}` : 'faixas a confirmar';
      card.innerHTML =
        `<div class="disco-cover">${cover}<span class="disco-type-tag">${esc(a.badge)}</span></div>
         <div class="disco-info">
           <div class="disco-name">${esc(a.name)}</div>
           <div class="disco-year">${esc(a.year)} · ${faixas}</div>
           <div class="disco-track">${svgIcon('play', 'icon-xs')}${esc(a.titleTrack)}</div>
         </div>`;
      card.addEventListener('click', () => openAlbumDetail(i));
      grid.appendChild(card);
    });
  }

  /* ── Render: Timeline (alternada) ── */
  function renderTimeline() {
    const c = document.getElementById('timelineContainer'); if (!c) return;
    c.innerHTML = timeline.map((ev, i) =>
      `<div class="tl-item ${i % 2 === 0 ? 'left' : 'right'} reveal">
         <span class="tl-node" aria-hidden="true"></span>
         <div class="tl-card">
           <div class="tl-year">${esc(ev.year)}</div>
           <div class="tl-event">${esc(ev.event)}</div>
           <div class="tl-desc">${ev.desc}</div>
           ${ev.badge ? `<span class="tl-badge">${esc(ev.badge)}</span>` : ''}
         </div>
       </div>`
    ).join('');
  }

  /* ── Render: Sobre/História ── */
  function renderHistoria() {
    const c = document.getElementById('historiaContainer'); if (!c) return;
    c.innerHTML = historia.map(h =>
      `<article class="historia-card reveal"><div class="historia-title">${esc(h.title)}</div><div class="historia-text">${h.text}</div></article>`
    ).join('');
  }

  /* ── Render: Curiosidades ── */
  function renderFacts() {
    const c = document.getElementById('factsGrid'); if (!c) return;
    c.innerHTML = curiosidades.map((f, i) =>
      `<div class="fact-card reveal" style="transition-delay:${i * 0.05}s"><div class="fact-tag">${esc(f.tag)}</div><div class="fact-text">${f.text}</div></div>`
    ).join('');
  }

  /* ── Render: Prêmios (2 tabelas — programas musicais + cerimônias) ── */
  function renderPremios() {
    const c = document.getElementById('premiosContainer'); if (!c) return;
    const cell = "padding:.55rem .7rem;border-bottom:1px solid color-mix(in srgb, var(--stext) 16%, transparent);font-size:.82rem;color:var(--stext)";
    const th = "padding:.55rem .7rem;text-align:left;font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;color:var(--saccent);border-bottom:1px solid color-mix(in srgb, var(--stext) 30%, transparent)";
    const sub = "font-family:'Anton',sans-serif;font-size:1.3rem;letter-spacing:.03em;color:var(--stext);text-align:center;margin-bottom:1rem";
    const wrap = inner => `<div style="overflow-x:auto;border:1px solid color-mix(in srgb, var(--stext) 16%, transparent);border-radius:14px;background:var(--card)"><table style="width:100%;border-collapse:collapse">${inner}</table></div>`;

    const total = `<div style="text-align:center;margin-bottom:2.2rem">
        <div class="premios-total">${premios.total} troféus</div>
        <div style="font-size:.82rem;color:var(--stext2);margin-top:.4rem">11 vitórias em programas musicais + 11 prêmios em cerimônias</div>
        <div style="font-size:.72rem;color:var(--stext2);opacity:.8;margin-top:.3rem">Não inclui indicações, posições em paradas, vendas ou certificados.</div>
      </div>`;

    const rowsA = premios.musicShows.map(w =>
      `<tr><td style="${cell};font-family:'Anton',sans-serif;color:var(--saccent);width:52px">${esc(w.n)}</td><td style="${cell}">${esc(w.date)}</td><td style="${cell}">${esc(w.program)}</td></tr>`).join('');
    const blocoA = `<div class="reveal" style="margin-bottom:2.6rem">
        <div style="${sub}">“REDRED” — 11 vitórias em programas musicais</div>
        ${wrap(`<thead><tr><th style="${th}">#</th><th style="${th}">Data</th><th style="${th}">Programa</th></tr></thead><tbody>${rowsA}</tbody>`)}
        <div class="callout">
          <p class="callout-row">${svgIcon('trophy')}<span><strong>Grand slam:</strong> venceu nos 5 principais programas — Show Champion, M Countdown, Music Bank, Show! Music Core e Inkigayo.</span></p>
          <p class="callout-row">${svgIcon('crown')}<span><strong>Triple crown</strong> no Show! Music Core (3 vitórias) e também no Inkigayo (3 vitórias).</span></p>
        </div>
      </div>`;

    const rowsB = premios.cerimonias.map(a =>
      `<tr><td style="${cell};color:var(--saccent);width:56px">${esc(a.year)}</td><td style="${cell}">${esc(a.event)}</td><td style="${cell}">${esc(a.award)}</td></tr>`).join('');
    const blocoB = `<div class="reveal">
        <div style="${sub}">11 prêmios em cerimônias</div>
        ${wrap(`<thead><tr><th style="${th}">Ano</th><th style="${th}">Premiação</th><th style="${th}">Prêmio</th></tr></thead><tbody>${rowsB}</tbody>`)}
      </div>`;

    c.innerHTML = total + blocoA + blocoB;
  }

  /* ── Render: MVs (destaque + carrossel) ── */
  function renderMVs() {
    const feat = document.getElementById('mvsFeatured');
    if (mvsCarousel) mvsCarousel.innerHTML = '';
    const first = mvs[0];
    if (feat && first) {
      const thumb = first.id
        ? `<img src="https://img.youtube.com/vi/${first.id}/maxresdefault.jpg" onerror="this.src='https://img.youtube.com/vi/${first.id}/hqdefault.jpg'" alt="${esc(first.title)}" loading="lazy">`
        : mvFallbackThumb(first.title);
      feat.innerHTML =
        `<div class="mv-featured-card">
           <div class="mv-featured-thumb" id="mvFeatThumb">
             ${thumb}
             <div class="mv-featured-overlay">
               <button class="mv-featured-play" id="mvPlayBtn" type="button" aria-label="Assistir ${esc(first.title)}">${svgIcon('play')}</button>
               <div class="mv-featured-info">
                 <span class="mv-featured-badge">${esc(first.badge || 'Destaque')}</span>
                 <div class="mv-featured-title">${esc(first.title)}</div>
                 <div class="mv-featured-year">${esc(first.year)}</div>
               </div>
             </div>
           </div>
           <div id="mvEmbedWrap" class="hidden" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:18px">
             <iframe id="mvEmbed" style="position:absolute;inset:0;width:100%;height:100%;border:0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
           </div>
         </div>`;
      document.getElementById('mvPlayBtn')?.addEventListener('click', () => {
        if (first.id) {
          document.getElementById('mvFeatThumb').classList.add('hidden');
          const w = document.getElementById('mvEmbedWrap'); w.classList.remove('hidden');
          document.getElementById('mvEmbed').src = `https://www.youtube.com/embed/${first.id}?autoplay=1&rel=0`;
        } else {
          window.open(ytSearch(first.title), '_blank', 'noopener,noreferrer');
        }
      });
    }
    if (!mvsCarousel) return;
    mvs.slice(1).forEach(mv => {
      const card = document.createElement(mv.id ? 'a' : 'button');
      if (mv.id) {
        card.href = `https://www.youtube.com/watch?v=${mv.id}`; card.target = '_blank'; card.rel = 'noopener noreferrer';
      } else {
        card.type = 'button';
        card.addEventListener('click', () => window.open(ytSearch(mv.title), '_blank', 'noopener,noreferrer'));
      }
      card.className = 'mv-card';
      card.setAttribute('aria-label', 'Assistir ' + mv.title);
      const thumb = mv.id
        ? `<img src="https://img.youtube.com/vi/${mv.id}/mqdefault.jpg" alt="${esc(mv.title)}" loading="lazy">`
        : mvFallbackThumb(mv.title);
      card.innerHTML =
        `<div class="mv-thumb">${thumb}<div class="mv-play">${svgIcon('play')}</div></div>
         <div class="mv-info"><div class="mv-title">${esc(mv.title)}</div><div class="mv-year">${esc(mv.year)}</div>${mv.views ? `<div class="mv-views">${svgIcon('play', 'icon-xs')}${esc(mv.views)}</div>` : ''}</div>`;
      mvsCarousel.appendChild(card);
    });
  }

  /* ── Render: Galeria ── */
  function openLightbox(i) {
    lbIndex = i; const g = galeria[i]; if (!g || !lightbox) return;
    lbImg.src = g.url || ''; lbImg.alt = g.alt || '';
    openModalEl(lightbox);
  }
  function lbNav(dir) {
    if (!galeria.length) return;
    lbIndex = (lbIndex + dir + galeria.length) % galeria.length;
    const g = galeria[lbIndex]; lbImg.src = g.url || ''; lbImg.alt = g.alt || '';
  }
  function renderGallery() {
    const grid = document.getElementById('galleryGrid'); if (!grid) return;
    grid.innerHTML = '';
    galeria.forEach((g, i) => {
      const item = document.createElement('button');
      item.type = 'button'; item.className = 'gallery-item';
      item.setAttribute('aria-label', 'Ampliar foto: ' + g.alt);
      const media = g.url
        ? `<img src="${esc(g.url)}" alt="${esc(g.alt)}" loading="lazy" onerror="this.style.opacity='0.15'">`
        : `<div style="aspect-ratio:3/4;display:flex;align-items:center;justify-content:center;font-family:'Anton',sans-serif;font-size:2rem;color:var(--saccent);opacity:.4;background:var(--surface)">${esc(g.alt.charAt(0))}</div>`;
      item.innerHTML = `${media}<div class="gallery-hover"><span class="gallery-name">${esc(g.alt)}</span></div>`;
      item.addEventListener('click', () => openLightbox(i));
      grid.appendChild(item);
    });
  }

  /* ── Render: Os Gêmeos ── */
  function renderGemeos() {
    const c = document.getElementById('gemeosContainer'); if (!c) return;
    const cardHTML = g =>
      `<article class="gemeo-card reveal">
        ${g.img
          ? `<div class="gemeo-photo-frame"><img class="gemeo-photo${g.photoClass ? ' ' + g.photoClass : ''}" src="${esc(g.img)}" alt="${esc(g.name)}" loading="lazy" onerror="this.style.display='none'"></div>`
          : `<div class="gemeo-photo" style="display:flex;align-items:center;justify-content:center;font-family:'Anton',sans-serif;font-size:3rem;color:var(--saccent);opacity:.4">${esc(g.name.charAt(0))}</div>`}
        <div class="gemeo-name">${esc(g.name)}</div>
        <div class="gemeo-sub">${esc(g.sub)}</div>
        <div class="gemeo-traits">${g.traits.map(t => `<div class="gemeo-trait">${t}</div>`).join('')}</div>
      </article>`;
    const truque =
      `<div class="callout callout-boxed">
        <div class="callout-title">${svgIcon('zap')}Truque rápido</div>
        ${gemeos.truque.map(t => `<p class="callout-line">${t}</p>`).join('')}
      </div>`;
    c.innerHTML =
      `<p style="max-width:720px;margin:0 auto 2rem;text-align:center;font-size:.92rem;color:var(--stext2);line-height:1.85">${gemeos.intro}</p>
       <div class="gemeos-grid">${cardHTML(gemeos.membros[0])}<div class="gemeos-vs" aria-hidden="true">VS</div>${cardHTML(gemeos.membros[1])}</div>
       ${truque}`;
  }

  /* ── Render: Cortis Ball ── */
  function renderCortisBall() {
    const c = document.getElementById('cortisballContainer'); if (!c) return;
    c.innerHTML =
      `<p class="cortisball-intro">${cortisBall.intro}</p>
       <div class="cortisball-grid">${cortisBall.items.map(it =>
        `<article class="cortisball-card reveal">
           ${it.img
             ? `<img class="cortisball-img" src="${esc(it.img)}" alt="Cortis Ball ${esc(it.name)}" loading="lazy" onerror="this.style.display='none'">`
             : `<div class="cortisball-img cortisball-img-empty">${svgIcon('sphere')}</div>`}
           <div class="cortisball-name">${esc(it.name)}</div>
           <div class="cortisball-member">${esc(it.rep)}</div>
         </article>`).join('')}</div>`;
  }

  /* ── Render: Lightstick (enxuto — só texto de abertura + as duas fotos) ── */
  function renderLightstick() {
    const c = document.getElementById('lightstickContainer'); if (!c) return;
    const fotos = lightstick.fotos.map(f =>
      `<figure class="lightstick-photo"><img src="${esc(f.src)}" alt="${esc(f.alt)}" loading="lazy" onerror="this.closest('.lightstick-photo').style.display='none'"></figure>`).join('');
    c.innerHTML =
      `<p class="lightstick-intro">${lightstick.intro}</p>
       <div class="lightstick-hero reveal">${fotos}</div>`;
  }

  /* ── Render: Stream (ícones SVG, link em nova aba) ── */
  function renderStream() {
    const c = document.getElementById('streamGrid'); if (!c) return;
    c.innerHTML = streamLinks.map(s =>
      `<a class="stream-card reveal" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" style="--card-color:${esc(s.color)}" aria-label="${esc(s.action)} no ${esc(s.name)}"><div class="stream-icon"><img src="${esc(s.icon)}" alt="" loading="lazy"></div><div class="stream-name">${esc(s.name)}</div><div class="stream-action">${esc(s.action)}</div></a>`
    ).join('');
  }

  /* ── Render: Novos COER ── */
  function renderCoer() {
    const c = document.getElementById('novosCoerGrid'); if (!c) return;
    c.innerHTML = guiaNovosCoer.map(card => {
      let inner = `<div class="coer-icon">${svgIcon(card.icon)}</div><div class="coer-title">${esc(card.title)}</div>`;
      if (card.glossary) {
        inner += `<div class="coer-glossary">${card.glossary.map(g => `<div class="coer-term"><span class="coer-word">${esc(g.word)}</span><span class="coer-def">${g.def}</span></div>`).join('')}</div>`;
      } else {
        inner += `<div class="coer-text">${card.text}</div>`;
      }
      return `<div class="coer-card reveal">${inner}</div>`;
    }).join('');
  }

  /* ── Reveal on scroll ── */
  function initReveal() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(x => { if (x.isIntersecting) { x.target.classList.add('visible'); obs.unobserve(x.target); } });
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
  }

  /* ── Seletor de tema (em memória, sem localStorage) ── */
  let currentTheme = 'verde-claro';
  function applyTheme(key) {
    if (!THEME_CLASS[key]) return;
    Object.values(THEME_CLASS).forEach(cls => document.body.classList.remove(cls));
    document.body.classList.add(THEME_CLASS[key]);
    currentTheme = key;
    document.querySelectorAll('.theme-option').forEach(o => {
      const active = o.dataset.theme === key;
      o.classList.toggle('active', active);
      o.setAttribute('aria-checked', active ? 'true' : 'false');
    });
    // troca a cor da logo junto com o tema
    if (LOGO_SYMBOL[key]) document.querySelectorAll('.js-logo-symbol').forEach(img => { img.src = LOGO_SYMBOL[key]; });
    if (LOGO_FULL[key]) document.querySelectorAll('.js-logo-full').forEach(img => { img.src = LOGO_FULL[key]; });
  }

  /* ── Dropdown "Modos" (seletor de tema) ── */
  const themeMenu = document.getElementById('themeMenu');
  const themeMenuBtn = document.getElementById('themeMenuBtn');
  const themeMenuList = document.getElementById('themeMenuList');
  const themeOptions = () => [...(themeMenuList?.querySelectorAll('.theme-option') || [])];
  function onDocClickTheme(e) { if (themeMenu && !themeMenu.contains(e.target)) closeThemeMenu(false); }
  function onKeyTheme(e) {
    if (e.key === 'Escape') { closeThemeMenu(true); return; }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const opts = themeOptions(); if (!opts.length) return;
      e.preventDefault();
      const i = opts.indexOf(document.activeElement);
      const next = e.key === 'ArrowDown' ? opts[(i + 1) % opts.length] : opts[(i - 1 + opts.length) % opts.length];
      next?.focus();
    }
  }
  function openThemeMenu() {
    themeMenuList.classList.add('open');
    themeMenuBtn.setAttribute('aria-expanded', 'true');
    document.addEventListener('click', onDocClickTheme);
    document.addEventListener('keydown', onKeyTheme);
    (themeMenuList.querySelector('.theme-option.active') || themeOptions()[0])?.focus();
  }
  function closeThemeMenu(focusBtn) {
    if (!themeMenuList) return;
    themeMenuList.classList.remove('open');
    themeMenuBtn.setAttribute('aria-expanded', 'false');
    document.removeEventListener('click', onDocClickTheme);
    document.removeEventListener('keydown', onKeyTheme);
    if (focusBtn) themeMenuBtn.focus();
  }
  themeMenuBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    themeMenuList.classList.contains('open') ? closeThemeMenu(false) : openThemeMenu();
  });
  themeOptions().forEach(o => {
    o.addEventListener('click', () => { applyTheme(o.dataset.theme); closeThemeMenu(true); });
  });

  /* ── Busca global ── */
  const INDEX = [
    ...membros.map((m, i) => ({ title: m.name, sub: m.role, tag: 'Membro', type: 'member', idx: i, img: m.img })),
    ...discografia.map((a, i) => ({ title: a.name, sub: a.year + ' · ' + a.titleTrack, tag: 'Álbum', type: 'album', idx: i, img: a.img })),
    ...SECTIONS.map(s => ({ title: s.title, sub: 'Seção', tag: 'Seção', type: 'section', anchor: s.anchor })),
    ...curiosidades.map(f => ({ title: f.tag, sub: f.text.replace(/<[^>]+>/g, '').slice(0, 70) + '…', tag: 'Curiosidade', type: 'section', anchor: '#curiosidades' }))
  ];
  searchInput?.addEventListener('input', function () {
    const q = this.value.trim().toLowerCase();
    if (!q) { searchResults.innerHTML = ''; return; }
    const hits = INDEX.filter(it => it.title.toLowerCase().includes(q) || (it.sub && it.sub.toLowerCase().includes(q)));
    if (!hits.length) { searchResults.innerHTML = `<div class="search-empty">Nada encontrado para “${esc(q)}”</div>`; return; }
    searchResults.innerHTML = hits.slice(0, 12).map(h => {
      const thumb = h.img
        ? `<img class="search-result-thumb" src="${esc(h.img)}" alt="" loading="lazy">`
        : `<div class="search-result-thumb search-result-thumb-empty">${svgIcon(h.tag === 'Membro' ? 'user' : h.tag === 'Álbum' ? 'disc' : h.tag === 'Curiosidade' ? 'bulb' : 'link')}</div>`;
      return `<button class="search-result-item" type="button" data-type="${h.type}" data-idx="${h.idx ?? ''}" data-anchor="${h.anchor || ''}">${thumb}<div class="search-result-info"><div class="search-result-title">${esc(h.title)}</div><div class="search-result-sub">${esc(h.sub || '')}</div></div><span class="search-result-tag">${esc(h.tag)}</span></button>`;
    }).join('');
  });
  searchResults?.addEventListener('click', e => {
    const item = e.target.closest('.search-result-item'); if (!item) return;
    const type = item.dataset.type, idx = item.dataset.idx, anchor = item.dataset.anchor;
    closeOverlayEl(searchWrap);
    if (type === 'member') {
      document.querySelector('#membros')?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => openMemberDetail(+idx), 500);
    } else if (type === 'album') {
      document.querySelector('#discografia')?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => openAlbumDetail(+idx), 500);
    } else if (anchor) {
      document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' });
    }
  });

  /* ── Intro ── */
  const intro = document.getElementById('introScreen');
  const enterBtn = document.getElementById('introEnterBtn');
  const skipBtn = document.getElementById('introSkipBtn');
  function dismissIntro() {
    if (!intro) return;
    intro.classList.add('out');
    document.body.style.overflow = '';
    setTimeout(() => { intro.style.display = 'none'; }, 800);
  }
  if (intro) document.body.style.overflow = 'hidden';
  enterBtn?.addEventListener('click', dismissIntro);
  skipBtn?.addEventListener('click', dismissIntro);

  /* ── Navbar + back-to-top no scroll ── */
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 60);
    backToTop?.classList.toggle('visible', window.scrollY > 500);
  });
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ── Drawer ── */
  function openDrawer() {
    dialogRestoreFocus = document.activeElement;
    drawer.classList.add('open'); drawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden'; activeDialog = drawer;
    setTimeout(() => getFocusable(drawer)[0]?.focus(), 30);
  }
  function closeDrawer() {
    drawer?.classList.remove('open'); drawerOverlay?.classList.remove('open');
    document.body.style.overflow = '';
    if (activeDialog === drawer) activeDialog = null; restoreFocus();
  }
  document.getElementById('navToggle')?.addEventListener('click', openDrawer);
  document.getElementById('drawerClose')?.addEventListener('click', closeDrawer);
  drawerOverlay?.addEventListener('click', closeDrawer);
  drawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

  /* ── Fechamento dos modais ── */
  document.getElementById('modalCloseBtn')?.addEventListener('click', () => closeModalEl(memberModal));
  document.getElementById('albumModalCloseBtn')?.addEventListener('click', () => closeModalEl(albumModal));
  document.getElementById('lbClose')?.addEventListener('click', () => closeModalEl(lightbox));
  memberModal?.addEventListener('click', e => { if (e.target === memberModal) closeModalEl(memberModal); });
  albumModal?.addEventListener('click', e => { if (e.target === albumModal) closeModalEl(albumModal); });
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeModalEl(lightbox); });

  /* ── Busca: abrir/fechar ── */
  document.getElementById('searchOpenBtn')?.addEventListener('click', () => { openOverlayEl(searchWrap); searchInput?.focus(); });
  document.getElementById('searchCloseBtn')?.addEventListener('click', () => closeOverlayEl(searchWrap));
  searchWrap?.addEventListener('click', e => { if (e.target === searchWrap) closeOverlayEl(searchWrap); });

  /* ── Carrossel de MVs ── */
  document.getElementById('mvsPrev')?.addEventListener('click', () => mvsCarousel?.scrollBy({ left: -280, behavior: 'smooth' }));
  document.getElementById('mvsNext')?.addEventListener('click', () => mvsCarousel?.scrollBy({ left: 280, behavior: 'smooth' }));

  /* ── Teclado global (Escape, foco preso, atalhos, navegação do lightbox) ── */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (lightbox && !lightbox.classList.contains('hidden')) closeModalEl(lightbox);
      else if (albumModal && !albumModal.classList.contains('hidden')) closeModalEl(albumModal);
      else if (memberModal && !memberModal.classList.contains('hidden')) closeModalEl(memberModal);
      else if (searchWrap && searchWrap.classList.contains('open')) closeOverlayEl(searchWrap);
      else if (drawer && drawer.classList.contains('open')) closeDrawer();
      return;
    }
    if (e.key === 'Tab' && activeDialog) { trapTab(e, activeDialog); return; }
    if (lightbox && !lightbox.classList.contains('hidden')) {
      if (e.key === 'ArrowLeft') lbNav(-1);
      else if (e.key === 'ArrowRight') lbNav(1);
    }
    const tag = (document.activeElement && document.activeElement.tagName) || '';
    if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
      e.preventDefault(); openOverlayEl(searchWrap); searchInput?.focus();
    }
  });

  /* ── Swipe no lightbox ── */
  if (lightbox) {
    let sx = 0;
    lightbox.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) lbNav(dx < 0 ? 1 : -1);
    });
  }

  /* ── HERO CANVAS ── */
  (function () {
    const canvas = document.getElementById('heroCanvas'); if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { canvas.style.display = 'none'; return; }
    const ctx = canvas.getContext('2d');
    let W, H, particles = [], raf, mouse = { x: -999, y: -999 };
    function accent() { return (getComputedStyle(document.body).getPropertyValue('--accent') || '#A7EAE1').trim(); }
    function hexToRgba(hex, a) {
      hex = hex.replace('#', ''); if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
      const n = parseInt(hex, 16); return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
    }
    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    function make() {
      particles = [];
      const small = window.innerWidth < 680;
      const count = Math.min(small ? 34 : 100, Math.floor(W * H / (small ? 16000 : 9000)));
      for (let i = 0; i < count; i++) {
        particles.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 2 + .6, a: Math.random() * .5 + .2 });
      }
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      const col = accent();
      const linkDist = window.innerWidth < 680 ? 80 : 110;
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 120 && d > 0) { p.vx += dx / d * .05; p.vy += dy / d * .05; }
        const sp = Math.hypot(p.vx, p.vy);
        if (sp > .9) { p.vx = p.vx / sp * .9; p.vy = p.vy / sp * .9; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(col, p.a); ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, d = Math.hypot(dx, dy);
          if (d < linkDist) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = hexToRgba(col, (1 - d / linkDist) * .12); ctx.lineWidth = .6; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }
    resize(); make(); draw();
    window.addEventListener('resize', () => { resize(); make(); });
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(draw);
    });
  })();

  /* ── INIT ── */
  renderStats();
  renderMembers();
  renderDisco();
  renderTimeline();
  renderHistoria();
  renderFacts();
  renderPremios();
  renderMVs();
  renderGallery();
  renderGemeos();
  renderCortisBall();
  renderLightstick();
  renderStream();
  renderCoer();
  applyTheme('verde-claro');
  setTimeout(initReveal, 150);

}); // DOMContentLoaded
