
import { FlashCardData } from '@/types/flashcard';

export const flashcardsData: FlashCardData[] = [
  {
    pergunta: "Qual é a capital do Brasil?",
    alternativas: [
      { texto: "Rio de Janeiro", correto: false },
      { texto: "São Paulo", correto: false },
      { texto: "Brasília", correto: true },
      { texto: "Belo Horizonte", correto: false },
      { texto: "Salvador", correto: false }
    ],
    resposta: "C) Brasília",
    explicacao: "Brasília foi construída e inaugurada para ser a capital do Brasil em 1960, substituindo o Rio de Janeiro. A cidade foi planejada por Lúcio Costa e Oscar Niemeyer."
  },
  {
    pergunta: "Quem pintou a Mona Lisa?",
    alternativas: [
      { texto: "Michelangelo", correto: false },
      { texto: "Leonardo da Vinci", correto: true },
      { texto: "Rafael Sanzio", correto: false },
      { texto: "Donatello", correto: false }
    ],
    resposta: "B) Leonardo da Vinci",
    explicacao: "A Mona Lisa é uma obra renascentista famosa pelo sorriso enigmático, pintada por Leonardo da Vinci entre 1503 e 1506. Atualmente está exposta no Museu do Louvre, em Paris."
  },
  {
    pergunta: "Qual é o maior planeta do sistema solar?",
    resposta: "Júpiter",
    explicacao: "Júpiter é um gigante gasoso e o maior planeta do nosso sistema solar, sendo 11 vezes maior que a Terra em diâmetro, com aproximadamente 143.000 km de diâmetro."
  },
  {
    pergunta: "Qual é a fórmula química da água?",
    alternativas: [
      { texto: "H2O", correto: true },
      { texto: "CO2", correto: false },
      { texto: "NaCl", correto: false },
      { texto: "O2", correto: false }
    ],
    resposta: "A) H2O",
    explicacao: "A água é composta por dois átomos de hidrogênio (H) e um átomo de oxigênio (O), formando a molécula H2O. É essencial para a vida na Terra."
  },
  {
    pergunta: "Em que ano o homem pisou na Lua pela primeira vez?",
    alternativas: [
      { texto: "1967", correto: false },
      { texto: "1969", correto: true },
      { texto: "1971", correto: false },
      { texto: "1973", correto: false }
    ],
    resposta: "B) 1969",
    explicacao: "Neil Armstrong foi o primeiro homem a pisar na Lua em 20 de julho de 1969, durante a missão Apollo 11 da NASA. Buzz Aldrin foi o segundo, algumas horas depois."
  },
  {
    pergunta: "Qual é a velocidade da luz no vácuo?",
    resposta: "299.792.458 metros por segundo",
    explicacao: "A velocidade da luz no vácuo é uma constante física fundamental, aproximadamente 300.000 km/s ou exatamente 299.792.458 m/s. É a velocidade máxima possível no universo."
  }
];
