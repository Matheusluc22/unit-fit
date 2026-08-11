/* ==========================================================================
   UNIFIT EXERCISE DATABASE
   Comprehensive categorized exercise library with SVG visuals & instructions
   ========================================================================== */

const EXERCISES_DATABASE = [
  // --- PEITO (CHEST) ---
  {
    id: "supino_reto_barra",
    name: "Supino Reto com Barra",
    category: "Peito",
    equipment: "Barra",
    level: "Intermediário",
    targetMuscles: ["Peitoral Maior", "Tríceps", "Deltoide Anterior"],
    instructions: [
      "Deite-se no banco reto com a coluna preservando as curvaturas naturais e pés firmes no chão.",
      "Segure a barra com pegada ligeiramente mais larga que os ombros.",
      "Desça a barra de forma controlada até encostar suavemente na linha do esterno.",
      "Empurre a barra estendendo os cotovelos sem travar bruscamente as articulações no topo."
    ],
    commonMistakes: ["Elevar o quadril excessivamente do banco", "Bater a barra no peito sem controle", "Cotovelos muito abertos em 90 graus"],
    alternatives: ["Supino Reto com Halteres", "Supino Reto na Máquina"],
    svgIllustration: `<svg viewBox="0 0 200 120" class="exercise-svg-illustration"><path d="M 30 90 L 170 90" stroke="#374151" stroke-width="8" stroke-linecap="round"/><circle cx="100" cy="70" r="14" fill="#4ADE80"/><path d="M 70 85 L 130 85" stroke="#22C55E" stroke-width="6"/><path d="M 50 45 L 150 45" stroke="#FFFFFF" stroke-width="8"/><rect x="40" y="35" width="15" height="20" rx="3" fill="#4ADE80"/><rect x="145" y="35" width="15" height="20" rx="3" fill="#4ADE80"/><path d="M 85 70 L 65 45 M 115 70 L 135 45" stroke="#4ADE80" stroke-width="5" stroke-linecap="round"/></svg>`
  },
  {
    id: "supino_inclinado_halteres",
    name: "Supino Inclinado com Halteres",
    category: "Peito",
    equipment: "Halteres",
    level: "Intermediário",
    targetMuscles: ["Peitoral Superior", "Deltoide Anterior", "Tríceps"],
    instructions: [
      "Ajuste o banco em um ângulo de 30° a 45°.",
      "Com um halter em cada mão na altura dos ombros, mantenha as escápulas retraídas.",
      "Empurre os halteres para cima até se encontrarem na linha média do peito.",
      "Desça de forma lenta sentindo o alongamento da porção clavicular do peitoral."
    ],
    commonMistakes: ["Inclinação excessiva do banco (acima de 45°)", "Juntar os halteres batendo-os no topo"],
    alternatives: ["Supino Inclinado com Barra", "Crossover na Polia Alta"],
    svgIllustration: `<svg viewBox="0 0 200 120" class="exercise-svg-illustration"><path d="M 40 100 L 150 50" stroke="#374151" stroke-width="8"/><circle cx="95" cy="65" r="14" fill="#4ADE80"/><circle cx="65" cy="35" r="8" fill="#FFFFFF"/><circle cx="130" cy="20" r="8" fill="#FFFFFF"/></svg>`
  },
  {
    id: "crossover_polia",
    name: "Crossover na Polia Alta",
    category: "Peito",
    equipment: "Máquina",
    level: "Iniciante",
    targetMuscles: ["Peitoral Inferior e Médio"],
    instructions: [
      "Posicione as polias na altura máxima e dê um passo à frente com uma perna.",
      "Com os cotovelos levemente flexionados, traga as pegadas para frente e para baixo até se cruzarem.",
      "Contraia o peitoral por 1 segundo na posição final e retorne controlando o peso."
    ],
    commonMistakes: ["Usar o impulso do tronco", "Dobrar demais os cotovelos virando um supino"],
    alternatives: ["Peck Deck (Voador)", "Flexão de Braço"],
    svgIllustration: `<svg viewBox="0 0 200 120" class="exercise-svg-illustration"><circle cx="100" cy="40" r="14" fill="#4ADE80"/><path d="M 100 54 L 100 95 L 80 115 M 100 95 L 120 115" stroke="#4ADE80" stroke-width="5"/><path d="M 30 20 L 80 65 M 170 20 L 120 65" stroke="#22C55E" stroke-width="4"/></svg>`
  },

  // --- COSTAS (BACK) ---
  {
    id: "puxada_frente_polia",
    name: "Puxada Aberta na Polia (Lat Pulldown)",
    category: "Costas",
    equipment: "Máquina",
    level: "Iniciante",
    targetMuscles: ["Latíssimo do Dorso", "Bíceps", "Romboides"],
    instructions: [
      "Sente-se no aparelho com as coxas bem fixadas no apoio.",
      "Segure a barra com pegada pronada mais larga que os ombros.",
      "Puxe a barra em direção à parte superior do peito, estufando o tórax e projetando as cotovelos para baixo.",
      "Retorne lentamente até estender completamente os braços."
    ],
    commonMistakes: ["Puxar a barra atrás do pescoço", "Inclinado o tronco muito para trás"],
    alternatives: ["Barra Fixa (Pull-up)", "Puxada com Pegada Triângulo"],
    svgIllustration: `<svg viewBox="0 0 200 120" class="exercise-svg-illustration"><path d="M 40 20 L 160 20" stroke="#FFFFFF" stroke-width="6"/><rect x="80" y="50" width="40" height="50" rx="4" fill="#374151"/><circle cx="100" cy="35" r="12" fill="#4ADE80"/><path d="M 50 20 L 85 40 M 150 20 L 115 40" stroke="#22C55E" stroke-width="4"/></svg>`
  },
  {
    id: "remada_curvada_barra",
    name: "Remada Curvada com Barra",
    category: "Costas",
    equipment: "Barra",
    level: "Avançado",
    targetMuscles: ["Dorso Central", "Latíssimo do Dorso", "Lombar", "Bíceps"],
    instructions: [
      "Incline o tronco à frente a cerca de 45° mantendo a coluna neutra e joelhos levemente flexionados.",
      "Segure a barra com pegada pronada.",
      "Puxe a barra em direção ao umbigo trazendo os cotovelos rente ao corpo.",
      "Comprima as escápulas no final da puxada."
    ],
    commonMistakes: ["Curvar a coluna lombar (hiperflexão)", "Utilizar solavancos com o quadril"],
    alternatives: ["Remada Serrote com Halter", "Remada Baixa na Polia"],
    svgIllustration: `<svg viewBox="0 0 200 120" class="exercise-svg-illustration"><path d="M 70 80 L 130 50" stroke="#4ADE80" stroke-width="6"/><circle cx="135" cy="45" r="12" fill="#4ADE80"/><path d="M 110 55 L 110 85" stroke="#FFFFFF" stroke-width="6"/></svg>`
  },

  // --- OMBROS (SHOULDERS) ---
  {
    id: "desenvolvimento_halteres",
    name: "Desenvolvimento de Ombros com Halteres",
    category: "Ombros",
    equipment: "Halteres",
    level: "Iniciante",
    targetMuscles: ["Deltoide Anterior", "Deltoide Lateral", "Tríceps"],
    instructions: [
      "Sente-se num banco com apoio vertical de costas.",
      "Com os halteres na altura das orelhas e palmas para frente, empurre-os verticalmente.",
      "Estenda os braços quase por completo no topo sem travar bruscamente.",
      "Desça de maneira controlada até a altura dos ombros."
    ],
    commonMistakes: ["Arquear excessivamente a lombar", "Bater os halteres no topo"],
    alternatives: ["Desenvolvimento com Barra (Overhead Press)", "Desenvolvimento Arnold"],
    svgIllustration: `<svg viewBox="0 0 200 120" class="exercise-svg-illustration"><rect x="80" y="60" width="40" height="50" rx="4" fill="#374151"/><circle cx="100" cy="40" r="14" fill="#4ADE80"/><path d="M 50 30 L 70 50 L 86 40 M 150 30 L 130 50 L 114 40" stroke="#22C55E" stroke-width="5"/></svg>`
  },
  {
    id: "elevacao_lateral_halteres",
    name: "Elevação Lateral com Halteres",
    category: "Ombros",
    equipment: "Halteres",
    level: "Iniciante",
    targetMuscles: ["Deltoide Lateral (Cabeça Média)"],
    instructions: [
      "Fique em pé com os joelhos sutilmente destravados e um halter em cada mão ao lado do corpo.",
      "Eleve os braços para os lados até a altura dos ombros, mantendo um cotovelo levemente dobrado.",
      "Imagine derramar água de uma jarra no topo para focar no deltoide lateral.",
      "Desça resistindo à gravidade."
    ],
    commonMistakes: ["Balançar o corpo para pegar impulso", "Elevar além da linha dos ombros causando impacto articular"],
    alternatives: ["Elevação Lateral na Polia", "Elevação Lateral na Máquina"],
    svgIllustration: `<svg viewBox="0 0 200 120" class="exercise-svg-illustration"><circle cx="100" cy="35" r="12" fill="#4ADE80"/><path d="M 100 47 L 100 95 M 40 50 L 100 50 L 160 50" stroke="#4ADE80" stroke-width="5"/></svg>`
  },

  // --- BÍCEPS (BICEPS) ---
  {
    id: "rosca_direta_barra_w",
    name: "Rosca Direta com Barra W",
    category: "Bíceps",
    equipment: "Barra",
    level: "Iniciante",
    targetMuscles: ["Bíceps Braquial", "Braquial"],
    instructions: [
      "Em pé, segure a barra W com pegada supinada na largura dos ombros.",
      "Mantenha os cotovelos colados nas laterais do tronco.",
      "Flexione os cotovelos trazendo a barra em direção aos ombros.",
      "Contraia o bíceps no topo por 1 segundo e desça devagar."
    ],
    commonMistakes: ["Mover os cotovelos para frente durante a subida", "Usar balanço do quadril"],
    alternatives: ["Rosca Alternada com Halteres", "Rosca Scott na Máquina"],
    svgIllustration: `<svg viewBox="0 0 200 120" class="exercise-svg-illustration"><circle cx="100" cy="35" r="12" fill="#4ADE80"/><path d="M 100 47 L 100 95 M 85 55 L 85 85 L 100 70 M 115 55 L 115 85 L 100 70" stroke="#22C55E" stroke-width="4"/></svg>`
  },

  // --- TRÍCEPS (TRICEPS) ---
  {
    id: "triceps_corda_polia",
    name: "Tríceps Corda na Polia High",
    category: "Tríceps",
    equipment: "Máquina",
    level: "Iniciante",
    targetMuscles: ["Tríceps Braquial (Cabeça Lateral e Medial)"],
    instructions: [
      "Fixe a corda na polia alta. Dê meio passo para trás com tronco levemente inclinado.",
      "Mantenha cotovelos fixos ao lado do corpo.",
      "Empurre a corda para baixo afastando as pontas no final do movimento.",
      "Retorne controlando até formar um ângulo de 90° nos cotovelos."
    ],
    commonMistakes: ["Abrir os cotovelos", "Usar o peso do corpo para empurrar"],
    alternatives: ["Tríceps Testa com Barra W", "Tríceps Francês na Polia"],
    svgIllustration: `<svg viewBox="0 0 200 120" class="exercise-svg-illustration"><circle cx="100" cy="35" r="12" fill="#4ADE80"/><path d="M 100 47 L 100 95 M 80 50 L 80 85 M 120 50 L 120 85" stroke="#4ADE80" stroke-width="4"/></svg>`
  },

  // --- PERNAS / QUADRÍCEPS (LEGS) ---
  {
    id: "agachamento_livre_barra",
    name: "Agachamento Livre com Barra",
    category: "Pernas",
    equipment: "Barra",
    level: "Avançado",
    targetMuscles: ["Quadríceps", "Glúteo Máximo", "Isquiotibiais", "Core"],
    instructions: [
      "Apoie a barra sobre o trapézio (não na cervical) e afaste os pés na largura dos ombros.",
      "Inicie o movimento projetando o quadril para trás e dobrando os joelhos.",
      "Agache até que os quadris fiquem pelo menos paralelos aos joelhos.",
      "Empurre o chão com os calcanhares para retornar à posição inicial."
    ],
    commonMistakes: ["Valgo dinâmico (joelhos para dentro)", "Curvar a lombar (retroversão pélvica)", "Elevar os calcanhares"],
    alternatives: ["Leg Press 45°", "Agachamento Hack", "Agachamento Goblet"],
    svgIllustration: `<svg viewBox="0 0 200 120" class="exercise-svg-illustration"><path d="M 60 40 L 140 40" stroke="#FFFFFF" stroke-width="8"/><circle cx="100" cy="30" r="12" fill="#4ADE80"/><path d="M 100 42 L 100 70 L 75 105 M 100 70 L 125 105" stroke="#22C55E" stroke-width="6"/></svg>`
  },
  {
    id: "leg_press_45",
    name: "Leg Press 45°",
    category: "Pernas",
    equipment: "Máquina",
    level: "Iniciante",
    targetMuscles: ["Quadríceps", "Glúteos"],
    instructions: [
      "Sente-se no aparelho com as costas totalmente apoiadas no encosto.",
      "Posicione os pés na plataforma na largura dos ombros.",
      "Destrave a máquina e flexione os joelhos trazendo a plataforma em direção ao peito.",
      "Empurre até quase estender os joelhos, sem travá-los no final."
    ],
    commonMistakes: ["Tirar o quadril do encosto no ponto mais fundo", "Travar os joelhos em hiperextensão"],
    alternatives: ["Cadeira Extensora", "Agachamento Livre"],
    svgIllustration: `<svg viewBox="0 0 200 120" class="exercise-svg-illustration"><path d="M 40 100 L 140 30" stroke="#374151" stroke-width="8"/><rect x="110" y="20" width="50" height="15" fill="#4ADE80" transform="rotate(-35 110 20)"/></svg>`
  },

  // --- GLÚTEOS (GLUTES) ---
  {
    id: "elevacao_pelvica_barra",
    name: "Elevação Pélvica com Barra (Hip Thrust)",
    category: "Glúteos",
    equipment: "Barra",
    level: "Intermediário",
    targetMuscles: ["Glúteo Máximo", "Isquiotibiais"],
    instructions: [
      "Apoie a parte superior das costas em um banco estável.",
      "Posicione a barra acolchoada sobre a prega do quadril.",
      "Com os pés firmes no chão, eleve o quadril até alinhar tronco e coxas.",
      "Contraia os glúteos fortemente no topo por 1 a 2 segundos."
    ],
    commonMistakes: ["Hiperestender a lombar no topo em vez de usar os glúteos", "Pés muito distantes ou muito próximos"],
    alternatives: ["Elevação Pélvica na Máquina", "Glúteo no Cabo"],
    svgIllustration: `<svg viewBox="0 0 200 120" class="exercise-svg-illustration"><rect x="30" y="70" width="40" height="40" fill="#374151"/><path d="M 60 70 L 120 40 L 160 90" stroke="#4ADE80" stroke-width="6"/><circle cx="120" cy="40" r="10" fill="#FFFFFF"/></svg>`
  },

  // --- POSTERIOR DE COXA (HAMSTRINGS) ---
  {
    id: "stiff_halteres",
    name: "Stiff com Halteres",
    category: "Posterior",
    equipment: "Halteres",
    level: "Intermediário",
    targetMuscles: ["Isquiotibiais (Posterior de Coxa)", "Glúteo Máximo", "Lombar"],
    instructions: [
      "Fique em pé segurando um halter em cada mão à frente das coxas.",
      "Mantenha os joelhos levemente destravados e flexione o quadril para trás.",
      "Desça os halteres rente às pernas até sentir um forte alongamento no posterior.",
      "Retorne projetando o quadril para frente e contraindo os glúteos."
    ],
    commonMistakes: ["Arredondar a coluna torácica e lombar", "Dobrar demais os joelhos virando agachamento"],
    alternatives: ["Mesa Flexora", "Cadeira Flexora"],
    svgIllustration: `<svg viewBox="0 0 200 120" class="exercise-svg-illustration"><circle cx="140" cy="40" r="12" fill="#4ADE80"/><path d="M 140 52 L 100 80 L 80 110 M 100 80 L 120 110" stroke="#4ADE80" stroke-width="5"/><path d="M 130 55 L 130 90" stroke="#FFFFFF" stroke-width="4"/></svg>`
  },

  // --- PANTURRILHA (CALVES) ---
  {
    id: "panturrilha_em_pe_smith",
    name: "Gêmeos em Pé no Smith / Degrau",
    category: "Panturrilha",
    equipment: "Máquina",
    level: "Iniciante",
    targetMuscles: ["Gastrocnêmio", "Sóleo"],
    instructions: [
      "Apoie a meia ponta dos pés na borda de um degrau ou plataforma.",
      "Desça os calcanhares o máximo possível para obter amplitude completa de alongamento.",
      "Empurre o corpo para cima ficando na ponta dos pés.",
      "Pausa de 1 segundo no pico de contração."
    ],
    commonMistakes: ["Fazer repetições curtas e rápidas sem amplitude", "Dobra os joelhos durante a subida"],
    alternatives: ["Panturrilha Sentado na Máquina"],
    svgIllustration: `<svg viewBox="0 0 200 120" class="exercise-svg-illustration"><rect x="60" y="90" width="80" height="20" fill="#374151"/><path d="M 100 30 L 100 80 L 110 88" stroke="#4ADE80" stroke-width="6"/><circle cx="100" cy="20" r="10" fill="#4ADE80"/></svg>`
  },

  // --- ABDÔMEN (ABS) ---
  {
    id: "infra_infra_paralelas",
    name: "Abdominal Infra nas Paralelas (Leg Raise)",
    category: "Abdômen",
    equipment: "Peso Corporal",
    level: "Intermediário",
    targetMuscles: ["Reto Abdominal (Infra)", "Iliopsoas"],
    instructions: [
      "Apoie os antebraços nas barras paralelas e mantenha a coluna firme no encosto.",
      "Eleve os joelhos flexionados ou pernas estendidas em direção ao tórax.",
      "Arredonde sutilmente a pelve no topo para ativar o abdômen.",
      "Desça de forma totalmente controlada."
    ],
    commonMistakes: ["Balançar o corpo usando inércia", "Descer rápido demais sem controle"],
    alternatives: ["Abdominal Supra na Polia", "Prancha Frontal"],
    svgIllustration: `<svg viewBox="0 0 200 120" class="exercise-svg-illustration"><path d="M 60 40 L 60 100 M 140 40 L 140 100" stroke="#374151" stroke-width="6"/><circle cx="100" cy="30" r="12" fill="#4ADE80"/><path d="M 100 42 L 100 70 L 130 70" stroke="#4ADE80" stroke-width="5"/></svg>`
  },

  // --- CARDIO (CARDIO) ---
  {
    id: "hiit_esteira",
    name: "Treino Intervalado HIIT na Esteira",
    category: "Cardio",
    equipment: "Academia",
    level: "Todos",
    targetMuscles: ["Sistema Cardiorrespiratório", "Membros Inferiores"],
    instructions: [
      "Aqueça por 3 a 5 minutos a uma caminhada moderada.",
      "Alterne 30 segundos de tiro em alta intensidade (corrida) com 60 segundos de caminhada leve de recuperação.",
      "Repita o ciclo de 8 a 12 vezes.",
      "Realize a desaceleração final por 3 minutos."
    ],
    commonMistakes: ["Iniciar tiros sem aquecimento prévio", "Apoiar nos braços da esteira durante a corrida"],
    alternatives: ["Bike Ergométrica HIIT", "Elíptico / Transport"],
    svgIllustration: `<svg viewBox="0 0 200 120" class="exercise-svg-illustration"><rect x="40" y="90" width="120" height="15" rx="4" fill="#374151"/><circle cx="110" cy="40" r="12" fill="#4ADE80"/><path d="M 110 52 L 100 75 L 80 90 M 100 75 L 125 90" stroke="#22C55E" stroke-width="5"/></svg>`
  }
];
