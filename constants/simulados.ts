export interface Question {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface Simulado {
  id: string;
  title: string;
  description: string;
  questionsCount: number;
  durationMinutes: number;
  icon: string;
  questions: Question[];
}

export const SIMULADOS: Simulado[] = [
  {
    id: "meteorologia",
    title: "Meteorologia",
    description: "Prepare-se para entender fenômenos meteorológicos e sua influência na navegação aérea, essencial para a prova da ANAC.",
    questionsCount: 20,
    durationMinutes: 30,
    icon: "weather-cloudy",
    questions: [
      {
        question: "Qual altitude mínima para voo VFR sobre áreas povoadas?",
        options: ["500ft", "1000ft", "1500ft", "2000ft"],
        answer: 1,
        explanation: "Sobre áreas povoadas o voo VFR deve manter pelo menos 1000 pés acima do obstáculo mais alto."
      },
      {
        question: "O que significa a sigla CAVOK?",
        options: ["Céu limpo", "Visibilidade OK", "Teto e visibilidade OK", "Nuvens baixas"],
        answer: 2,
        explanation: "CAVOK indica que a visibilidade é superior a 10km e não há nuvens abaixo de 5000ft."
      },
      // Adicionando mais questões para simular o banco de 20
      { question: "O que é um gradiente térmico?", options: ["Vento forte", "Variação de temperatura com a altura", "Pressão atmosférica", "Nuvens de chuva"], answer: 1, explanation: "Gradiente térmico é a taxa de variação da temperatura em relação à altitude." },
      { question: "Nuvens do tipo CB indicam:", options: ["Tempo bom", "Nevoeiro", "Tempestades e turbulência", "Vento calmo"], answer: 2, explanation: "Cumulonimbus (CB) são nuvens de grande desenvolvimento vertical associadas a tempestades." },
      { question: "A pressão padrão ao nível do mar é:", options: ["1013.2 hPa", "1000 hPa", "990 hPa", "1020 hPa"], answer: 0, explanation: "A pressão padrão (ISA) ao nível do mar é 1013.25 hPa ou 29.92 inHg." },
      { question: "O que é o QNH?", options: ["Ajuste de altímetro", "Pressão no aeródromo", "Temperatura do ar", "Direção do vento"], answer: 0, explanation: "QNH é o ajuste de pressão para que o altímetro indique a altitude em relação ao nível do mar." },
      { question: "Qual o principal gás da atmosfera?", options: ["Oxigênio", "Nitrogênio", "Argônio", "Gás Carbônico"], answer: 1, explanation: "A atmosfera é composta por aproximadamente 78% de Nitrogênio." },
      { question: "A troposfera é a camada onde:", options: ["Ocorre o clima", "Não há oxigênio", "A temperatura aumenta", "É vácuo"], answer: 0, explanation: "A troposfera é a camada mais baixa onde ocorrem quase todos os fenômenos meteorológicos." },
      { question: "Vento de cauda no pouso:", options: ["Ajuda a parar", "Aumenta a distância de pouso", "Diminui a velocidade", "É o ideal"], answer: 1, explanation: "Vento de cauda aumenta a velocidade de solo, exigindo mais pista para parar." },
      { question: "O nevoeiro reduz a visibilidade para menos de:", options: ["2km", "5km", "1km", "500m"], answer: 2, explanation: "Por definição meteorológica, nevoeiro reduz a visibilidade horizontal para menos de 1000 metros." },
      // ... simplificando para o exemplo atingir 20
      { question: "Questão 11: O que é o orvalho?", options: ["Gelo", "Condensação noturna", "Chuva", "Nuvem"], answer: 1, explanation: "Orvalho é a condensação do vapor d'água sobre superfícies frias." },
      { question: "Questão 12: Camada de ozônio fica na:", options: ["Troposfera", "Estratosfera", "Mesosfera", "Exosfera"], answer: 1, explanation: "A camada de ozônio situa-se na estratosfera." },
      { question: "Questão 13: Qual instrumento mede a pressão?", options: ["Termômetro", "Anemômetro", "Barômetro", "Higrômetro"], answer: 2, explanation: "O barômetro é usado para medir a pressão atmosférica." },
      { question: "Questão 14: Umidade relativa é medida por:", options: ["Higrômetro", "Anemômetro", "Pluviômetro", "Altímetro"], answer: 0, explanation: "O higrômetro mede a umidade do ar." },
      { question: "Questão 15: O que é vento?", options: ["Ar parado", "Ar em movimento horizontal", "Chuva", "Pressão"], answer: 1, explanation: "Vento é o deslocamento de massas de ar, predominantemente horizontal." },
      { question: "Questão 16: Brisa marítima ocorre:", options: ["À noite", "Durante o dia", "Sempre", "Nunca"], answer: 1, explanation: "A brisa marítima sopra do mar para a terra durante o dia." },
      { question: "Questão 17: O que é a tropopausa?", options: ["Início da atmosfera", "Limite entre troposfera e estratosfera", "Fim do mundo", "Nuvem"], answer: 1, explanation: "Tropopausa é a camada de transição entre a troposfera e a estratosfera." },
      { question: "Questão 18: Isotermas são linhas de:", options: ["Pressão igual", "Vento igual", "Temperatura igual", "Chuva igual"], answer: 2, explanation: "Isotermas ligam pontos com a mesma temperatura." },
      { question: "Questão 19: O granizo cai de nuvens:", options: ["Stratus", "Cumulus", "Cumulonimbus", "Cirrus"], answer: 2, explanation: "O granizo é formado no interior de nuvens de tempestade (CB)." },
      { question: "Questão 20: Visibilidade vertical é medida em:", options: ["Metros", "Pés", "Quilômetros", "Milhas"], answer: 1, explanation: "Em aviação, a visibilidade vertical (teto) costuma ser reportada em pés." }
    ]
  },
  {
    id: "navegacao",
    title: "Navegação Aérea",
    description: "Domine cálculos de rota, uso de computadores de voo e interpretação de cartas aeronáuticas.",
    questionsCount: 20,
    durationMinutes: 40,
    icon: "compass-outline",
    questions: []
  },
  {
    id: "regulamentos",
    title: "Regulamentos ANAC",
    description: "Conheça as leis e normas que regem a aviação civil brasileira e o espaço aéreo.",
    questionsCount: 20,
    durationMinutes: 30,
    icon: "file-document-outline",
    questions: []
  },
  {
    id: "conhecimentos-tecnicos",
    title: "Conhecimentos Técnicos",
    description: "Estude a estrutura das aeronaves, motores e sistemas para garantir a segurança operacional.",
    questionsCount: 20,
    durationMinutes: 45,
    icon: "engine-outline",
    questions: []
  }
];
